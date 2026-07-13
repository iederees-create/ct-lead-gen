#!/usr/bin/env node
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const repo = path.resolve(__dirname, '../..');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'release-validator-test-'));
const pack = path.join(tmp, 'pack');
fs.mkdirSync(path.join(pack, 'images'), { recursive: true });
fs.mkdirSync(path.join(pack, 'buyer-files'), { recursive: true });

const png = Buffer.from('89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c4890000000a49444154789c636000000200015d0b2a0b0000000049454e44ae426082', 'hex');
fs.writeFileSync(path.join(pack, 'images/01-cover.png'), png);
fs.writeFileSync(path.join(pack, 'buyer-files/START-HERE.html'), '<!doctype html><title>Start</title>');
fs.writeFileSync(path.join(pack, 'buyer-files/COMPLETE-BUYER-GUIDE.html'), '<!doctype html><title>Guide</title>');
fs.writeFileSync(path.join(pack, 'buyer-files/LICENSE.txt'), 'License text');
fs.writeFileSync(path.join(pack, 'buyer-files/AI-DISCLOSURE.txt'), 'AI disclosure');
fs.writeFileSync(path.join(pack, 'buyer-files/template.zip'), Buffer.from('504b0506' + '00'.repeat(18), 'hex'));
fs.writeFileSync(path.join(pack, 'francis-listing-manager-import.json'), JSON.stringify({
  sku: 'test-sku',
  title: 'Test Product',
  description: 'Test description',
  tags: ['builder', 'contractor', 'website', 'template', 'cape town', 'renovation', 'construction', 'landing page', 'local seo', 'quote form', 'responsive', 'digital', 'download'],
  images: [{ path: 'images/01-cover.png', role: 'cover', alt: 'Cover' }],
  buyerFiles: [
    { path: 'buyer-files/START-HERE.html' },
    { path: 'buyer-files/COMPLETE-BUYER-GUIDE.html' },
    { path: 'buyer-files/LICENSE.txt' },
    { path: 'buyer-files/AI-DISCLOSURE.txt' },
    { path: 'buyer-files/template.zip' }
  ]
}, null, 2));

function run(label, args) {
  const result = spawnSync(process.execPath, args, { cwd: repo, encoding: 'utf8' });
  if (result.status !== 0) {
    process.stderr.write(`${label} failed
${result.stdout}${result.stderr}`);
    process.exit(result.status || 1);
  }
  process.stdout.write(`${label} passed
`);
}

run('scan-secrets', ['scripts/release/scan-secrets.js', pack]);
run('validate-media', ['scripts/release/validate-media.js', pack]);
run('validate-product-pack', ['scripts/release/validate-product-pack.js', pack]);

const zipCheck = spawnSync('zip', ['-v'], { stdio: 'ignore' });
if (zipCheck.status === 0) {
  const zipPath = path.join(tmp, 'pack.zip');
  const zipResult = spawnSync('zip', ['-qr', zipPath, '.'], { cwd: pack, encoding: 'utf8' });
  if (zipResult.status !== 0) {
    process.stderr.write(`zip creation failed\n${zipResult.stdout}${zipResult.stderr}`);
    process.exit(zipResult.status || 1);
  }
  run('validate-zip-content', ['scripts/release/validate-zip-content.js', zipPath]);
} else {
  process.stdout.write('validate-zip-content skipped: zip unavailable\n');
}
