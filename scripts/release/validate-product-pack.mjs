#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const selfTest = process.argv.includes('--self-test');
const root = selfTest ? createFixture() : path.resolve(process.argv[2] || '.');
const maxBytes = Number(process.env.PRODUCT_PACK_MAX_FILE_BYTES || 100 * 1024 * 1024);
const manifestName = 'francis-listing-manager-import.json';
const errors = [];
const warnings = [];
const textExts = new Set(['.json', '.html', '.htm', '.css', '.js', '.mjs', '.txt', '.md', '.xml', '.csv']);
const mediaExts = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.mp4', '.webm', '.pdf', '.svg']);
const blockedDirs = new Set(['.git', 'node_modules']);
const blockedNames = new Set(['.env']);
const executableExts = new Set(['.exe', '.dll', '.bat', '.cmd', '.com', '.scr', '.ps1', '.sh', '.app', '.jar', '.msi']);
const secretPatterns = [
  ['AWS access key', /\bAKIA[0-9A-Z]{16}\b/g],
  ['Google API key', /\bAIza[0-9A-Za-z_-]{35}\b/g],
  ['GitHub token', /\bgh[pousr]_[0-9A-Za-z]{36,255}\b/g],
  ['Cookie header', /\bcookie\s*[:=]\s*['"][^'"]{12,}/gi],
  ['Private key block', /-----BEGIN [A-Z ]*PRIVATE KEY-----/g],
  ['Generic secret assignment', /\b(?:api[_-]?key|secret|token|password|passwd|pwd)\b\s*[:=]\s*['"]?[A-Za-z0-9_./+=-]{16,}/gi],
];

function createFixture() {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'precision-laser-pack-'));
  const pack = path.join(tmp, 'pack');
  fs.mkdirSync(path.join(pack, 'images'), { recursive: true });
  fs.mkdirSync(path.join(pack, 'buyer-files'), { recursive: true });
  fs.mkdirSync(path.join(pack, 'site'), { recursive: true });
  const png = Buffer.from('89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c4890000000a49444154789c636000000200015d0b2a0b0000000049454e44ae426082', 'hex');
  fs.writeFileSync(path.join(pack, 'images/01-cover.png'), png);
  fs.writeFileSync(path.join(pack, 'buyer-files/START-HERE.html'), '<!doctype html><title>Start</title>');
  fs.writeFileSync(path.join(pack, 'buyer-files/LICENSE.txt'), 'License text');
  fs.writeFileSync(path.join(pack, 'site/index.html'), '<!doctype html><title>Precision Laser</title><a href="https://wa.me/27840000000?text=Quote%20summary">WhatsApp</a>');
  fs.writeFileSync(path.join(pack, 'francis-listing-manager-import.json'), JSON.stringify({
    sku: 'precision-laser-template',
    title: 'Precision Laser Website Template',
    description: 'Website template for laser cutting and engraving businesses.',
    productUrl: 'https://www.etsy.com/listing/123456789/precision-laser-website-template',
    demoUrl: 'https://example.com/precision-laser/',
    tags: ['laser cutting', 'laser engrave', 'website', 'template', 'quote planner', 'local seo', 'lead gen', 'signage', 'fabrication', 'html css', 'javascript', 'responsive', 'digital'],
    images: [{ path: 'images/01-cover.png', role: 'cover', alt: 'Cover' }],
    buyerFiles: [{ path: 'buyer-files/START-HERE.html' }, { path: 'buyer-files/LICENSE.txt' }]
  }, null, 2));
  return pack;
}

function rel(abs) {
  return path.relative(root, abs).split(path.sep).join('/');
}

function isSafeRelative(value) {
  return typeof value === 'string' && value.length > 0 && !path.isAbsolute(value) && !value.includes('\0') && !value.split(/[\\/]+/).includes('..');
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
    if (entry.isDirectory()) {
      if (blockedDirs.has(entry.name)) errors.push(`${entryRel} is not allowed in a product pack`);
      files.push(...collectFiles(abs));
      continue;
    }
    if (!entry.isFile()) continue;
    files.push(abs);
    const stat = fs.statSync(abs);
    if (stat.size > maxBytes) errors.push(`${entryRel} exceeds ${maxBytes} bytes`);
    if (blockedNames.has(entry.name) || entry.name.startsWith('.env.')) errors.push(`${entryRel} is an environment file`);
    if (executableExts.has(path.extname(entry.name).toLowerCase())) errors.push(`${entryRel} is unsupported executable content`);
    if (!isSafeRelative(entryRel)) errors.push(`${entryRel} is not a safe relative path`);
  }
  return files;
}

function findManifest() {
  const matches = [];
  function walk(dir, depth) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const abs = path.join(dir, entry.name);
      if (entry.isDirectory() && depth < 3 && !blockedDirs.has(entry.name)) walk(abs, depth + 1);
      if (entry.isFile() && entry.name === manifestName) matches.push(abs);
    }
  }
  walk(root, 0);
  return matches;
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
  if (item && typeof item === 'object') return item.path || item.file || item.src || item.filename;
  return undefined;
}

function validateUrlFields(data) {
  const urls = [data.productUrl, data.product_url, data.etsyUrl, data.etsy_url].filter(Boolean);
  for (const url of urls) {
    if (/^https:\/\/(?:www\.)?etsy\.com\/shop\/[^/?#]+\/?$/i.test(String(url))) errors.push('Product URL must not be a generic Etsy shop URL');
    if (/^(?:file:|[a-zA-Z]:\\|\/home\/|\/Users\/|\/tmp\/)/.test(String(url))) errors.push(`URL must not be an absolute local path: ${url}`);
  }
}

function validateManifest(file) {
  const data = readJson(file);
  if (!data) return;
  const manifestDir = path.dirname(file);
  const manifestFiles = new Set(collectFiles(manifestDir).map((candidate) => path.relative(manifestDir, candidate).split(path.sep).join('/')));
  if (!data.sku) errors.push('Manifest is missing sku');
  if (!data.title) errors.push('Manifest is missing title');
  if (!data.description) errors.push('Manifest is missing description');
  validateUrlFields(data);

  const tags = asArray(data.tags, 'tags').map(String);
  if (tags.length !== 13) errors.push(`Expected exactly 13 tags, found ${tags.length}`);
  const seenTags = new Set();
  for (const tag of tags) {
    const key = tag.trim().toLowerCase();
    if (tag.length > 20) errors.push(`Tag "${tag}" exceeds 20 characters`);
    if (seenTags.has(key)) errors.push(`Duplicate tag: ${tag}`);
    seenTags.add(key);
  }

  const images = asArray(data.images || data.listingImages || data.listing_images, 'images');
  if (images.length > 10) errors.push(`Expected at most 10 listing images, found ${images.length}`);
  const buyerFiles = asArray(data.buyerFiles || data.buyer_files || data.files, 'buyerFiles');
  if (buyerFiles.length === 0) warnings.push('No buyer files declared');
  if (buyerFiles.length > 5) warnings.push(`Buyer file count ${buyerFiles.length}; confirm Etsy limit for current account`);

  for (const [section, items] of [['images', images], ['buyerFiles', buyerFiles]]) {
    for (const item of items) {
      const itemPath = getPathField(item);
      if (!isSafeRelative(itemPath)) {
        errors.push(`${section} path is not safe relative: ${JSON.stringify(itemPath)}`);
        continue;
      }
      if (!manifestFiles.has(itemPath)) errors.push(`Referenced file is missing: ${itemPath}`);
    }
  }
}

function validateMediaSignatures(files) {
  const result = spawnSync(process.execPath, [new URL('./validate-media.mjs', import.meta.url).pathname, root], { encoding: 'utf8' });
  if (result.status !== 0) errors.push(result.stderr.trim() || result.stdout.trim() || 'Media validation failed');
  for (const file of files) {
    if (mediaExts.has(path.extname(file).toLowerCase()) && fs.statSync(file).size === 0) errors.push(`${rel(file)} is empty media`);
  }
}

function scanSecrets(files) {
  for (const file of files) {
    if (!textExts.has(path.extname(file).toLowerCase()) || fs.statSync(file).size > 2 * 1024 * 1024) continue;
    const text = fs.readFileSync(file, 'utf8');
    for (const [label, regex] of secretPatterns) {
      regex.lastIndex = 0;
      if (regex.test(text)) errors.push(`${rel(file)} contains possible ${label}`);
    }
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
scanSecrets(files);

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
