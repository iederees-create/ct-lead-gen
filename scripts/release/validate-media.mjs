#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = path.resolve(process.argv[2] || '.');
const allowed = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.mp4', '.webm', '.pdf', '.svg']);
const maxBytes = Number(process.env.MEDIA_MAX_BYTES || 100 * 1024 * 1024);
const errors = [];

function commandExists(cmd) {
  return spawnSync(cmd, ['-version'], { stdio: 'ignore' }).status === 0;
}

const hasFfprobe = commandExists('ffprobe');

function isValidMagic(file, ext) {
  const buf = fs.readFileSync(file);
  if (buf.length === 0) return false;
  if (ext === '.png') return buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  if (ext === '.jpg' || ext === '.jpeg') return buf[0] === 0xff && buf[1] === 0xd8 && buf[buf.length - 2] === 0xff && buf[buf.length - 1] === 0xd9;
  if (ext === '.gif') return ['GIF87a', 'GIF89a'].includes(buf.subarray(0, 6).toString('ascii'));
  if (ext === '.webp') return buf.subarray(0, 4).toString('ascii') === 'RIFF' && buf.subarray(8, 12).toString('ascii') === 'WEBP';
  if (ext === '.pdf') return buf.subarray(0, 5).toString('ascii') === '%PDF-';
  if (ext === '.svg') return /<svg[\s>]/i.test(buf.toString('utf8', 0, Math.min(buf.length, 4096)));
  if (ext === '.mp4') return buf.includes(Buffer.from('ftyp'));
  if (ext === '.webm') return buf[0] === 0x1a && buf[1] === 0x45 && buf[2] === 0xdf && buf[3] === 0xa3;
  return false;
}

function validateWithFfprobe(file) {
  return spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration,size', '-of', 'json', file], { encoding: 'utf8' }).status === 0;
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    const rel = path.relative(root, abs).split(path.sep).join('/');
    if (entry.isSymbolicLink()) {
      errors.push(`${rel} is a symlink`);
      continue;
    }
    if (entry.isDirectory()) {
      walk(abs);
      continue;
    }
    if (!entry.isFile()) continue;
    const ext = path.extname(entry.name).toLowerCase();
    if (!allowed.has(ext)) continue;
    const stat = fs.statSync(abs);
    if (stat.size > maxBytes) errors.push(`${rel} exceeds ${maxBytes} bytes`);
    if (!isValidMagic(abs, ext)) errors.push(`${rel} has malformed or unsupported file signature`);
    if ((ext === '.mp4' || ext === '.webm') && hasFfprobe && !validateWithFfprobe(abs)) {
      errors.push(`${rel} failed ffprobe validation`);
    }
  }
}

if (!fs.existsSync(root)) {
  console.error(`Path not found: ${root}`);
  process.exit(2);
}

walk(root);

if (errors.length) {
  console.error('Media validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Media validation passed: ${root}${hasFfprobe ? ' (ffprobe enabled)' : ' (ffprobe unavailable; signature checks only)'}`);
