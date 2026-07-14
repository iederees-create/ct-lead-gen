#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] || '.');
const maxBytes = Number(process.env.SECRET_SCAN_MAX_BYTES || 2 * 1024 * 1024);
const ignoredDirs = new Set(['.git', 'node_modules', 'dist', 'build', '.next', '.cache']);
const ignoredExts = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.mp4', '.webm', '.pdf', '.zip', '.woff', '.woff2']);
const findings = [];

const patterns = [
  ['AWS access key', /\bAKIA[0-9A-Z]{16}\b/g],
  ['Google API key', /\bAIza[0-9A-Za-z_-]{35}\b/g],
  ['GitHub token', /\bgh[pousr]_[0-9A-Za-z]{36,255}\b/g],
  ['Stripe key', /\b(?:sk|pk)_(?:live|test)_[0-9A-Za-z]{16,}\b/g],
  ['Slack token', /\bxox[baprs]-[0-9A-Za-z-]{10,}\b/g],
  ['Cookie header', /\bcookie\s*[:=]\s*['"][^'"]{12,}/gi],
  ['Private key block', /-----BEGIN [A-Z ]*PRIVATE KEY-----/g],
  ['Generic secret assignment', /\b(?:api[_-]?key|secret|token|password|passwd|pwd)\b\s*[:=]\s*['"]?[A-Za-z0-9_./+=-]{16,}/gi],
];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    const rel = path.relative(root, abs).split(path.sep).join('/');
    if (entry.isSymbolicLink()) continue;
    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) walk(abs);
      continue;
    }
    if (!entry.isFile() || ignoredExts.has(path.extname(entry.name).toLowerCase())) continue;
    const stat = fs.statSync(abs);
    if (stat.size > maxBytes) continue;
    const text = fs.readFileSync(abs, 'utf8');
    for (const [label, regex] of patterns) {
      regex.lastIndex = 0;
      let match;
      while ((match = regex.exec(text))) {
        const line = text.slice(0, match.index).split(/\r?\n/).length;
        findings.push(`${rel}:${line} possible ${label}`);
      }
    }
  }
}

if (!fs.existsSync(root)) {
  console.error(`Path not found: ${root}`);
  process.exit(2);
}

walk(root);

if (findings.length) {
  console.error('Secret scan failed:');
  for (const finding of findings) console.error(`- ${finding}`);
  process.exit(1);
}

console.log(`Secret scan passed: ${root}`);
