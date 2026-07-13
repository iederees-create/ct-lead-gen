#!/usr/bin/env node
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const zipPath = path.resolve(process.argv[2] || '');
const validator = path.join(__dirname, 'validate-product-pack.js');

if (!zipPath || !fs.existsSync(zipPath)) {
  console.error(`ZIP not found: ${zipPath || '<missing>'}`);
  process.exit(2);
}

function run(cmd, args) {
  return spawnSync(cmd, args, { encoding: 'utf8' });
}

if (run('unzip', ['-v']).status !== 0) {
  console.error('unzip is required for ZIP validation');
  process.exit(2);
}

const list = run('unzip', ['-Z1', zipPath]);
if (list.status !== 0) {
  console.error(`Unable to read ZIP entries:\n${list.stderr || list.stdout}`);
  process.exit(1);
}

const entries = list.stdout.split(/\r?\n/).filter(Boolean);
const errors = [];
for (const entry of entries) {
  if (path.isAbsolute(entry) || entry.includes('\0') || entry.split('/').includes('..')) {
    errors.push(`Unsafe ZIP entry path: ${entry}`);
  }
  if (entry === '.env' || entry.includes('/.env') || entry.includes('/.env.')) errors.push(`Environment file in ZIP: ${entry}`);
  if (entry === '.git' || entry.startsWith('.git/') || entry.includes('/.git/')) errors.push(`.git content in ZIP: ${entry}`);
  if (entry === 'node_modules' || entry.startsWith('node_modules/') || entry.includes('/node_modules/')) errors.push(`node_modules content in ZIP: ${entry}`);
}

if (errors.length) {
  console.error('ZIP content validation failed before extraction:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'product-pack-'));
const extracted = path.join(tmp, 'extract');
fs.mkdirSync(extracted);

const unzip = run('unzip', ['-qq', zipPath, '-d', extracted]);
if (unzip.status !== 0) {
  console.error(`ZIP extraction failed:\n${unzip.stderr || unzip.stdout}`);
  process.exit(1);
}

const result = spawnSync(process.execPath, [validator, extracted], { encoding: 'utf8' });
if (result.stdout) process.stdout.write(result.stdout);
if (result.stderr) process.stderr.write(result.stderr);
process.exit(result.status === null ? 1 : result.status);
