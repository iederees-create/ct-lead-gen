#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const input = process.argv[2];
const errors = [];

function fail(message) {
  errors.push(message);
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    fail(`${file} is not valid JSON: ${error.message}`);
    return null;
  }
}

function findTags(data) {
  return data?.tags || data?.etsy?.tags || data?.listing?.tags;
}

function checkUrl(data) {
  const productUrl = data?.productUrl || data?.product_url || data?.etsyUrl || data?.etsy_url || data?.listing?.productUrl;
  if (typeof productUrl !== 'string' || productUrl.length === 0) return;
  if (/^https:\/\/(?:www\.)?etsy\.com\/shop\/[^/?#]+\/?$/i.test(productUrl)) {
    fail('Product URL must not be a generic Etsy shop URL');
  }
}

if (!input) {
  console.error('Usage: node scripts/release/validate-tags.mjs <manifest.json>');
  process.exit(2);
}

const file = path.resolve(input);
if (!fs.existsSync(file)) {
  console.error(`Path not found: ${file}`);
  process.exit(2);
}

const data = readJson(file);
if (data) {
  const tags = findTags(data);
  if (!Array.isArray(tags)) {
    fail('tags must be an array');
  } else {
    if (tags.length !== 13) fail(`Expected exactly 13 Etsy tags, found ${tags.length}`);
    const seen = new Set();
    for (const tag of tags) {
      const value = String(tag);
      const key = value.trim().toLowerCase();
      if (!key) fail('Tags must not be blank');
      if (value.length > 20) fail(`Tag "${value}" exceeds 20 characters`);
      if (seen.has(key)) fail(`Duplicate tag: ${value}`);
      seen.add(key);
    }
  }
  checkUrl(data);
}

if (errors.length) {
  console.error('Tag validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Tag validation passed: ${file}`);
