#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const root = path.resolve(process.argv[2] || '.');
const maxBytes = Number(process.env.PRODUCT_PACK_MAX_FILE_BYTES || 100 * 1024 * 1024);
const manifestName = 'francis-listing-manager-import.json';
const errors = [];
const warnings = [];

const executableExts = new Set(['.exe', '.dll', '.bat', '.cmd', '.com', '.scr', '.ps1', '.sh', '.app', '.jar', '.msi']);
const mediaExts = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.mp4', '.webm', '.pdf', '.svg']);
const seenSkus = new Map();
const textExts = new Set(['.json', '.html', '.htm', '.css', '.js', '.mjs', '.txt', '.md', '.xml', '.csv']);
const secretPatterns = [
  ['AWS access key', /\bAKIA[0-9A-Z]{16}\b/g],
  ['Google API key', /\bAIza[0-9A-Za-z_-]{35}\b/g],
  ['GitHub token', /\bgh[pousr]_[0-9A-Za-z]{36,255}\b/g],
  ['Stripe key', /\b(?:sk|pk)_(?:live|test)_[0-9A-Za-z]{16,}\b/g],
  ['Private key block', /-----BEGIN [A-Z ]*PRIVATE KEY-----/g],
  ['Generic secret assignment', /\b(?:api[_-]?key|secret|token|password|passwd|pwd)\b\s*[:=]\s*['"]?[A-Za-z0-9_./+=-]{16,}/gi],
];

function rel(abs) {
  return path.relative(root, abs).split(path.sep).join('/');
}

function isSafeRelative(p) {
  return typeof p === 'string' && p.length > 0 && !path.isAbsolute(p) && !p.includes('\0') && !p.split(/[\\/]+/).includes('..');
}

function findManifest() {
  const candidates = [];
  function walk(dir, depth) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const abs = path.join(dir, entry.name);
      if (entry.isDirectory() && depth < 2) walk(abs, depth + 1);
      if (entry.isFile() && entry.name === manifestName) candidates.push(abs);
    }
  }
  walk(root, 0);
  return candidates;
}

function collectFiles(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    const entryRel = rel(abs);
    if (entry.isSymbolicLink()) {
      errors.push(`${entryRel} is a symlink`);
      continue;
    }
    if (entry.name === '.git' || entry.name === 'node_modules') errors.push(`${entryRel} is not allowed in a product pack`);
    if (entry.isDirectory()) {
      collectFiles(abs).forEach((file) => files.push(file));
      continue;
    }
    if (!entry.isFile()) continue;
    files.push(abs);
    const stat = fs.statSync(abs);
    if (stat.size > maxBytes) errors.push(`${entryRel} exceeds ${maxBytes} bytes`);
    if (entry.name === '.env' || entry.name.startsWith('.env.')) errors.push(`${entryRel} is an environment file`);
    if (executableExts.has(path.extname(entry.name).toLowerCase())) errors.push(`${entryRel} is unsupported executable content`);
  }
  return files;
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    errors.push(`${rel(file)} is not valid JSON: ${error.message}`);
    return null;
  }
}

function asArray(value, name) {
  if (!Array.isArray(value)) {
    errors.push(`${name} must be an array`);
    return [];
  }
  return value;
}

function getPathField(item) {
  if (typeof item === 'string') return item;
  if (item && typeof item === 'object') return item.path || item.file || item.src || item.url || item.filename;
  return undefined;
}

function validateManifest(file) {
  const data = readJson(file);
  if (!data) return;
  const manifestDir = path.dirname(file);
  const manifestRelFiles = new Set(collectFiles(manifestDir).map((candidate) => path.relative(manifestDir, candidate).split(path.sep).join('/')));

  const sku = data.sku || data.productSku || data.product_sku;
  if (!sku) errors.push('Manifest is missing sku');
  else if (seenSkus.has(sku)) errors.push(`Duplicate SKU ${sku} in ${rel(file)} and ${seenSkus.get(sku)}`);
  else seenSkus.set(sku, rel(file));

  const tags = asArray(data.tags, 'tags').map((tag) => String(tag));
  const uniqueTags = new Set(tags.map((tag) => tag.toLowerCase()));
  if (tags.length !== 13) errors.push(`Expected exactly 13 tags, found ${tags.length}`);
  if (uniqueTags.size !== tags.length) errors.push('Tags must be unique case-insensitively');
  for (const tag of tags) {
    if (tag.length > 20) errors.push(`Tag "${tag}" exceeds 20 characters`);
  }

  const images = asArray(data.images || data.listingImages || data.listing_images, 'images');
  if (images.length > 10) errors.push(`Expected at most 10 listing images, found ${images.length}`);
  const coverCount = images.filter((image, index) => {
    if (typeof image === 'string') return index === 0 && /(^|\/)01-cover\./i.test(image);
    return image && (image.isCover || image.cover || image.role === 'cover' || image.kind === 'cover');
  }).length;
  if (coverCount !== 1) errors.push(`Expected exactly one cover image, found ${coverCount}`);

  const buyerFiles = asArray(data.buyerFiles || data.buyer_files || data.files, 'buyerFiles');
  if (buyerFiles.length > 5) errors.push(`Expected at most 5 buyer files, found ${buyerFiles.length}`);

  for (const [section, items] of [['images', images], ['buyerFiles', buyerFiles]]) {
    for (const item of items) {
      const p = getPathField(item);
      if (!isSafeRelative(p)) {
        errors.push(`${section} path is not a safe relative path: ${JSON.stringify(p)}`);
        continue;
      }
      if (!manifestRelFiles.has(p)) errors.push(`Referenced file is missing: ${p}`);
    }
  }
}

function validateMediaSignatures(files) {
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!mediaExts.has(ext)) continue;
    const stat = fs.statSync(file);
    if (stat.size === 0) errors.push(`${rel(file)} is empty media`);
  }
}

if (!fs.existsSync(root)) {
  console.error(`Path not found: ${root}`);
  process.exit(2);
}

const files = collectFiles(root);
const manifests = findManifest();
if (manifests.length === 0) errors.push(`Missing ${manifestName}`);
if (manifests.length > 1) errors.push(`Expected one ${manifestName}, found ${manifests.length}`);
for (const manifest of manifests) validateManifest(manifest);
validateMediaSignatures(files);

for (const file of files) {
  const fileRel = rel(file);
  if (!isSafeRelative(fileRel)) errors.push(`${fileRel} is not a safe relative path`);
  if (textExts.has(path.extname(file).toLowerCase()) && fs.statSync(file).size <= 2 * 1024 * 1024) {
    const text = fs.readFileSync(file, 'utf8');
    for (const [label, regex] of secretPatterns) {
      regex.lastIndex = 0;
      if (regex.test(text)) errors.push(`${fileRel} contains possible ${label}`);
    }
  }
}

if (warnings.length) {
  console.warn('Warnings:');
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (errors.length) {
  console.error('Product pack validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Product pack validation passed: ${root}`);
