#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] || '.');
const errors = [];
const linkPattern = /\b(?:href|src)\s*=\s*["']([^"']+)["']/gi;

function isLocalUnsafe(value) {
  return /^(?:file:|[a-zA-Z]:\\|\/home\/|\/Users\/|\/tmp\/)/.test(value) || value.includes('\0') || value.split(/[\\/]+/).includes('..');
}

function validateUrl(value, file) {
  if (isLocalUnsafe(value)) errors.push(`${file} contains unsafe local/path-traversal URL: ${value}`);
  if (/^https:\/\/(?:www\.)?etsy\.com\/shop\/[^/?#]+\/?$/i.test(value)) errors.push(`${file} uses a generic Etsy shop URL as product URL`);
  if (/^https:\/\/wa\.me\//i.test(value) && /[\s<>"]/.test(value)) errors.push(`${file} has malformed WhatsApp URL: ${value}`);
  if (/^mailto:/i.test(value) && /[\s<>"]/.test(value)) errors.push(`${file} has malformed mailto URL: ${value}`);
}

function validateJson(file) {
  let data;
  try {
    data = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return;
  }
  const manifestDir = path.dirname(file);
  const refs = [];
  function visit(value) {
    if (typeof value === 'string') {
      validateUrl(value, path.relative(root, file));
      if (!/^([a-z][a-z0-9+.-]*:|#)/i.test(value) && /\.[a-z0-9]{2,5}$/i.test(value)) refs.push(value);
    } else if (Array.isArray(value)) {
      value.forEach(visit);
    } else if (value && typeof value === 'object') {
      Object.values(value).forEach(visit);
    }
  }
  visit(data);
  for (const ref of refs) {
    if (isLocalUnsafe(ref)) continue;
    const target = path.resolve(manifestDir, ref);
    if (!target.startsWith(manifestDir) || !fs.existsSync(target)) errors.push(`${path.relative(root, file)} references missing file: ${ref}`);
  }
}

function validateHtml(file) {
  const rel = path.relative(root, file).split(path.sep).join('/');
  const html = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = linkPattern.exec(html))) validateUrl(match[1], rel);
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isSymbolicLink()) {
      errors.push(`${path.relative(root, abs)} is a symlink`);
      continue;
    }
    if (entry.isDirectory()) {
      if (!['.git', 'node_modules'].includes(entry.name)) walk(abs);
      continue;
    }
    if (!entry.isFile()) continue;
    const ext = path.extname(entry.name).toLowerCase();
    if (ext === '.html' || ext === '.htm') validateHtml(abs);
    if (ext === '.json') validateJson(abs);
  }
}

if (!fs.existsSync(root)) {
  console.error(`Path not found: ${root}`);
  process.exit(2);
}

walk(root);

if (errors.length) {
  console.error('Link validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Link validation passed: ${root}`);
