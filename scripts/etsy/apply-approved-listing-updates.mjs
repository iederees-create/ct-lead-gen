#!/usr/bin/env node
/**
 * Apply allowlisted SEO updates (title, tags, description) to existing Etsy listings.
 *
 * HARD REQUIREMENTS:
 *   --approved                         must be present
 *   backup file must exist             etsy-growth/backups/current-etsy-listings-backup.json
 *   valid tags / non-empty title       validated before any write
 *   listing_id required per row
 *   approved_for_apply === true        per listing in plan
 *
 * NEVER:
 *   - change price
 *   - change state
 *   - publish / delete / deactivate / renew
 *   - upload buyer files
 *   - hardcode API secrets
 *
 * Usage (ONLY after human approval):
 *   node scripts/etsy/apply-approved-listing-updates.mjs --approved
 */

import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import {
  APPLY_LOG_DIR,
  BACKUP_PATH,
  PLAN_PATH,
  REPO_ROOT,
  bannedClaimHits,
  findFrancisRoot,
  readJson,
  redact,
  validateOpening,
  validateTags,
  validateTitle,
  writeJson,
} from './lib-redact.mjs';

function hasApprovedFlag(argv) {
  return argv.includes('--approved');
}

function buildDescription(item, liveDescription) {
  // Prefer explicit full description if provided in plan; otherwise splice opening.
  if (item.proposed_full_description && String(item.proposed_full_description).trim()) {
    return String(item.proposed_full_description).trim();
  }
  const opening = String(item.proposed_description_opening || '').trim();
  const live = String(liveDescription || '').trim();
  if (!live) return opening;
  // Replace first paragraph-ish block with new opening; keep remainder.
  const parts = live.split(/\n\s*\n/);
  if (parts.length <= 1) {
    return `${opening}\n\n${live}`;
  }
  parts[0] = opening;
  return parts.join('\n\n');
}

async function main() {
  const argv = process.argv.slice(2);

  if (!hasApprovedFlag(argv)) {
    console.error('Refusing to run: missing --approved');
    console.error('Usage: node scripts/etsy/apply-approved-listing-updates.mjs --approved');
    process.exit(2);
  }

  if (!fs.existsSync(BACKUP_PATH)) {
    console.error('Refusing to run: backup file missing at', BACKUP_PATH);
    process.exit(2);
  }

  const backup = readJson(BACKUP_PATH);
  if (!Array.isArray(backup.listings)) {
    console.error('Refusing to run: backup.listings is not an array');
    process.exit(2);
  }
  if (backup.active_listings_found === 0 && backup.listings.length === 0) {
    console.error('Refusing to run: backup contains zero listings. Export live data first.');
    process.exit(2);
  }

  const plan = readJson(PLAN_PATH);
  const backupById = new Map(
    backup.listings.filter((l) => l.listing_id != null).map((l) => [String(l.listing_id), l]),
  );

  const candidates = [];
  for (const item of plan.listings || []) {
    if (item.optional_future_listing) continue;
    if (!item.approved_for_apply) continue;

    const errors = [
      ...validateTitle(item.proposed_title),
      ...validateTags(item.proposed_tags || []),
      ...validateOpening(item.proposed_description_opening),
      ...bannedClaimHits(`${item.proposed_title} ${item.proposed_description_opening}`).map((h) => `policy: ${h}`),
    ];
    if (!item.listing_id) errors.push('listing_id missing');
    if (item.price_change_requested) errors.push('price change not allowed');
    if (item.state_change_requested) errors.push('state change not allowed');
    if (!backupById.has(String(item.listing_id))) {
      errors.push('listing_id not present in backup');
    }

    if (errors.length) {
      console.error(`Skip ${item.plan_id}: ${errors.join('; ')}`);
      continue;
    }
    candidates.push(item);
  }

  if (!candidates.length) {
    console.error('No listings eligible to apply. Set approved_for_apply=true and listing_id after backup export.');
    process.exit(2);
  }

  const francisRoot = findFrancisRoot();
  if (!francisRoot) {
    console.error('Francis Listing Manager root not found. Set FRANCIS_LISTING_MANAGER_ROOT.');
    process.exit(2);
  }

  const require = createRequire(path.join(francisRoot, 'package.json'));
  process.chdir(francisRoot);
  const etsyService = require('./server/services/etsyService.js');

  if (!etsyService.isEnabled()) {
    console.error('Refusing to run: ETSY_API_ENABLED is not true in Francis.');
    process.exit(2);
  }

  const runId = new Date().toISOString().replace(/[:.]/g, '-');
  const rollback = {
    run_id: runId,
    started_at: new Date().toISOString(),
    repo_root: REPO_ROOT,
    francis_root: francisRoot,
    backup_path: BACKUP_PATH,
    plan_path: PLAN_PATH,
    changes: [],
  };

  for (const item of candidates) {
    const listingId = item.listing_id;
    const live = backupById.get(String(listingId));
    const description = buildDescription(item, live.description);

    // ALLOWLIST ONLY — never price, never state
    const patch = {
      title: String(item.proposed_title).slice(0, 140),
      tags: item.proposed_tags.slice(0, 13),
      description,
    };

    console.log(`Updating listing_id=${listingId} plan_id=${item.plan_id} fields=title,tags,description`);

    try {
      const response = await etsyService.withRateLimitHandling(() =>
        etsyService.updateListing(listingId, patch),
      );
      rollback.changes.push({
        plan_id: item.plan_id,
        listing_id: listingId,
        status: 'updated',
        before: {
          title: live.title,
          tags: live.tags,
          description: live.description,
          price: live.price,
          state: live.state,
        },
        after_patch: patch,
        api_response_redacted: redact(response),
      });
      console.log(`OK listing_id=${listingId}`);
    } catch (err) {
      rollback.changes.push({
        plan_id: item.plan_id,
        listing_id: listingId,
        status: 'failed',
        error: err.message || String(err),
      });
      console.error(`FAIL listing_id=${listingId}:`, err.message);
    }
  }

  rollback.finished_at = new Date().toISOString();
  const outPath = path.join(APPLY_LOG_DIR, `apply-${runId}.json`);
  writeJson(outPath, rollback);
  console.log(`Rollback / apply log (redacted): ${outPath}`);
  console.log(
    'Changed listing IDs:',
    rollback.changes.filter((c) => c.status === 'updated').map((c) => c.listing_id).join(', ') || '(none)',
  );
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
