/** Shared helpers: path roots, redaction, tag/title validation. No secrets. */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
/** ct-lead-gen worktree root (scripts/etsy -> ../..) */
export const REPO_ROOT = path.resolve(__dirname, '../..');
export const GROWTH_DIR = path.join(REPO_ROOT, 'etsy-growth');
export const BACKUP_PATH = path.join(GROWTH_DIR, 'backups', 'current-etsy-listings-backup.json');
export const PLAN_PATH = path.join(GROWTH_DIR, 'ETSY-LISTING-UPDATE-PLAN.json');
export const DRY_RUN_REPORT_PATH = path.join(GROWTH_DIR, 'ETSY-LISTING-DRY-RUN-REPORT.md');
export const APPLY_LOG_DIR = path.join(GROWTH_DIR, 'backups', 'apply-logs');

const SENSITIVE_KEY = /^(authorization|access_token|refresh_token|token|api_key|shared_secret|password|cookie|set-cookie|encryption_key|client_secret)$/i;

export function redact(value) {
  if (Array.isArray(value)) return value.map(redact);
  if (value && typeof value === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      if (SENSITIVE_KEY.test(k)) out[k] = '[REDACTED]';
      else out[k] = redact(v);
    }
    return out;
  }
  if (typeof value === 'string' && /Bearer\s+\S+/i.test(value)) {
    return value.replace(/Bearer\s+\S+/gi, 'Bearer [REDACTED]');
  }
  return value;
}

export function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

export function validateTitle(title) {
  const errors = [];
  if (!title || !String(title).trim()) errors.push('title is empty');
  if (title && String(title).length > 140) errors.push(`title length ${String(title).length} > 140`);
  return errors;
}

export function validateTags(tags) {
  const errors = [];
  if (!Array.isArray(tags)) return ['tags must be an array'];
  if (tags.length !== 13) errors.push(`expected exactly 13 tags, got ${tags.length}`);
  const seen = new Set();
  for (const raw of tags) {
    const t = String(raw ?? '').trim();
    if (!t) errors.push('empty tag');
    if (t.length > 20) errors.push(`tag exceeds 20 chars: "${t}" (${t.length})`);
    const key = t.toLowerCase();
    if (seen.has(key)) errors.push(`duplicate tag: "${t}"`);
    seen.add(key);
  }
  return errors;
}

export function validateOpening(opening) {
  const errors = [];
  if (!opening || !String(opening).trim()) errors.push('description opening is empty');
  // Soft check — Etsy has large description limits; opening guidance is ~160
  if (opening && String(opening).length > 300) {
    errors.push(`description opening is unusually long (${String(opening).length} chars); prefer ~160`);
  }
  return errors;
}

export function bannedClaimHits(text) {
  const t = String(text || '').toLowerCase();
  const hits = [];
  const patterns = [
    [/guaranteed (leads|sales|ranking|results)/, 'guaranteed results language'],
    [/bestseller|#1 on etsy|number one/, 'fake bestseller language'],
    [/limited time only|only \d+ left/, 'fake urgency'],
    [/cure|diagnos|medical treatment|clinical result/, 'medical/clinical claim risk'],
    [/exact (final )?price|binding quotation guaranteed/, 'exact quote claim risk'],
  ];
  for (const [re, label] of patterns) {
    if (re.test(t)) hits.push(label);
  }
  return hits;
}

/** Try to locate Francis Listing Manager root */
export function findFrancisRoot() {
  const candidates = [
    process.env.FRANCIS_LISTING_MANAGER_ROOT,
    path.resolve(REPO_ROOT, '../../francis-listing-manager'),
    path.resolve(REPO_ROOT, '../../../francis-listing-manager'),
    '/home/iedrees/Workspace/francis-listing-manager',
  ].filter(Boolean);
  for (const c of candidates) {
    if (fs.existsSync(path.join(c, 'server', 'services', 'etsyService.js'))) return c;
  }
  return null;
}
