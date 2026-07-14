#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] || '.');
const errors = [];
const forbidden = new Set(['.env', '.git', 'node_modules']);
const textExts = new Set(['.html', '.css', '.js', '.mjs', '.json', '.xml', '.txt', '.md']);

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    const rel = path.relative(root, abs).split(path.sep).join('/');
    if (entry.isSymbolicLink()) {
      errors.push(`${rel} is a symlink`);
      continue;
    }
    if (entry.isDirectory()) {
      if (forbidden.has(entry.name)) errors.push(`${rel} must not be in build output`);
      else walk(abs);
      continue;
    }
    if (!entry.isFile()) continue;
    if (entry.name.startsWith('.env.')) errors.push(`${rel} must not be in build output`);
    if (textExts.has(path.extname(entry.name).toLowerCase()) && fs.statSync(abs).size < 2 * 1024 * 1024) {
      const text = fs.readFileSync(abs, 'utf8');
      if (/\/home\/|\/Users\/|[A-Za-z]:\\/.test(text)) errors.push(`${rel} contains an absolute local path`);
      if (/EXACT_ETSY_PRODUCT_URL_PENDING_PUBLICATION/.test(text)) errors.push(`${rel} still contains pending Etsy URL placeholder`);
    }
  }
}

if (!fs.existsSync(root)) {
  console.error(`Path not found: ${root}`);
  process.exit(2);
}

if (!fs.existsSync(path.join(root, 'index.html'))) errors.push('Build output is missing index.html');
walk(root);

if (errors.length) {
  console.error('Build output validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Build output validation passed: ${root}`);
