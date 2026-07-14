#!/usr/bin/env node
/**
 * Dry-run SEO listing updates. NO Etsy write calls.
 *
 * Usage:
 *   node scripts/etsy/dry-run-listing-updates.mjs
 */

import fs from 'node:fs';
import {
  BACKUP_PATH,
  DRY_RUN_REPORT_PATH,
  PLAN_PATH,
  bannedClaimHits,
  readJson,
  validateOpening,
  validateTags,
  validateTitle,
} from './lib-redact.mjs';

function openingOf(description) {
  if (!description) return null;
  const text = String(description).replace(/\s+/g, ' ').trim();
  return text.slice(0, 160);
}

function main() {
  const plan = readJson(PLAN_PATH);
  let backup = null;
  let backupOk = false;
  try {
    backup = readJson(BACKUP_PATH);
    backupOk = true;
  } catch {
    backup = null;
  }

  const backupById = new Map();
  if (backup && Array.isArray(backup.listings)) {
    for (const row of backup.listings) {
      if (row.listing_id != null) backupById.set(String(row.listing_id), row);
    }
  }

  const results = [];
  let passCount = 0;
  let failCount = 0;

  for (const item of plan.listings || []) {
    const errors = [];
    const warnings = [];

    errors.push(...validateTitle(item.proposed_title).map((e) => `proposed_title: ${e}`));
    errors.push(...validateTags(item.proposed_tags || []).map((e) => `proposed_tags: ${e}`));
    errors.push(...validateOpening(item.proposed_description_opening).map((e) => `proposed_opening: ${e}`));

    for (const hit of bannedClaimHits(`${item.proposed_title} ${item.proposed_description_opening}`)) {
      errors.push(`policy: ${hit}`);
    }

    if (!item.listing_id) {
      errors.push('listing_id missing (PENDING_LIVE_FETCH) — cannot verify against Etsy yet');
    } else if (backupOk && backupById.size > 0 && !backupById.has(String(item.listing_id))) {
      errors.push(`listing_id ${item.listing_id} not found in backup export`);
    } else if (backupOk && backupById.has(String(item.listing_id))) {
      const live = backupById.get(String(item.listing_id));
      item._resolved_current_title = live.title;
      item._resolved_current_tags = live.tags;
      item._resolved_current_opening = openingOf(live.description);
      item._resolved_state = live.state;
      if (live.state && live.state !== 'active') {
        warnings.push(`listing state is "${live.state}" (plan targets active SEO recovery)`);
      }
    }

    if (item.price_change_requested) errors.push('plan requests price change — blocked by policy');
    if (item.state_change_requested) errors.push('plan requests state change — blocked by policy');
    if (item.file_update_needed && !item.file_update_approved) {
      warnings.push('file update flagged but not approved — apply script will skip files');
    }
    if (item.optional_future_listing) {
      warnings.push('optional/future listing — skip apply until product exists on Etsy');
    }
    if (!item.requires_user_approval) {
      warnings.push('requires_user_approval is false — still require --approved flag at apply time');
    }

    const ok = errors.length === 0;
    if (ok) passCount += 1;
    else failCount += 1;

    results.push({
      plan_id: item.plan_id,
      product_name: item.product_name,
      listing_id: item.listing_id,
      ok,
      errors,
      warnings,
      before: {
        title: item.current_title ?? item._resolved_current_title ?? null,
        tags: item.current_tags?.length ? item.current_tags : (item._resolved_current_tags ?? []),
        opening: item.current_description_opening ?? item._resolved_current_opening ?? null,
        state: item._resolved_state ?? null,
      },
      after: {
        title: item.proposed_title,
        tags: item.proposed_tags,
        opening: item.proposed_description_opening,
      },
    });
  }

  const lines = [];
  lines.push('# Etsy Listing Dry-Run Report');
  lines.push('');
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push('');
  lines.push('**Write calls:** none (dry-run only)');
  lines.push('');
  lines.push('## Summary');
  lines.push('');
  lines.push(`| Metric | Value |`);
  lines.push(`|---|---:|`);
  lines.push(`| Plan listings | ${(plan.listings || []).length} |`);
  lines.push(`| Backup present | ${backupOk ? 'yes' : 'no'} |`);
  lines.push(`| Backup active_listings_found | ${backup?.active_listings_found ?? 'n/a'} |`);
  lines.push(`| Shop connected (backup) | ${backup?.shop_connected ?? 'n/a'} |`);
  lines.push(`| Rows with listing_id set | ${(plan.listings || []).filter((l) => l.listing_id).length} |`);
  lines.push(`| Validation pass (strict) | ${passCount} |`);
  lines.push(`| Validation fail | ${failCount} |`);
  lines.push('');
  lines.push('## Overall dry-run result');
  lines.push('');
  if (failCount === 0) {
    lines.push('**PASS** — all plan rows validated and listing IDs verified against backup.');
  } else {
    lines.push('**FAIL (expected until live export)** — SEO proposals may be valid, but listing IDs and/or live verification are incomplete.');
    lines.push('');
    lines.push('Typical next steps:');
    lines.push('1. Connect Francis Listing Manager to the Etsy shop (OAuth).');
    lines.push('2. Run `node scripts/etsy/export-active-listings-backup.mjs`');
    lines.push('3. Merge real `listing_id` values into `ETSY-LISTING-UPDATE-PLAN.json`');
    lines.push('4. Re-run this dry-run until PASS');
    lines.push('5. Only then consider apply with `--approved`');
  }
  lines.push('');

  for (const r of results) {
    lines.push(`## ${r.plan_id} — ${r.product_name}`);
    lines.push('');
    lines.push(`- **listing_id:** ${r.listing_id ?? '_null / PENDING_LIVE_FETCH_'}`);
    lines.push(`- **strict result:** ${r.ok ? 'PASS' : 'FAIL'}`);
    lines.push('');
    lines.push('### Before');
    lines.push('');
    lines.push(`- title: ${r.before.title ?? '_unknown_'}`);
    lines.push(`- tags (${(r.before.tags || []).length}): ${(r.before.tags || []).join(', ') || '_unknown_'}`);
    lines.push(`- opening: ${r.before.opening ?? '_unknown_'}`);
    lines.push(`- state: ${r.before.state ?? '_unknown_'}`);
    lines.push('');
    lines.push('### After (proposed)');
    lines.push('');
    lines.push(`- title: ${r.after.title}`);
    lines.push(`- tags (13): ${(r.after.tags || []).join(', ')}`);
    lines.push(`- opening: ${r.after.opening}`);
    lines.push('');
    if (r.errors.length) {
      lines.push('### Errors');
      lines.push('');
      for (const e of r.errors) lines.push(`- ${e}`);
      lines.push('');
    }
    if (r.warnings.length) {
      lines.push('### Warnings');
      lines.push('');
      for (const w of r.warnings) lines.push(`- ${w}`);
      lines.push('');
    }
  }

  lines.push('## SEO proposal validation (ignoring missing listing_id)');
  lines.push('');
  let seoOnlyFail = 0;
  for (const r of results) {
    const seoErrors = r.errors.filter((e) => !e.includes('listing_id'));
    if (seoErrors.length) {
      seoOnlyFail += 1;
      lines.push(`- ${r.plan_id}: FAIL — ${seoErrors.join('; ')}`);
    } else {
      lines.push(`- ${r.plan_id}: SEO fields OK`);
    }
  }
  lines.push('');
  lines.push(`SEO-only failures: ${seoOnlyFail}`);
  lines.push('');
  lines.push('## Apply command (do not run without explicit approval)');
  lines.push('');
  lines.push('```bash');
  lines.push('node scripts/etsy/apply-approved-listing-updates.mjs --approved');
  lines.push('```');
  lines.push('');

  fs.writeFileSync(DRY_RUN_REPORT_PATH, `${lines.join('\n')}\n`, 'utf8');
  console.log(`Dry-run report: ${DRY_RUN_REPORT_PATH}`);
  console.log(`Strict pass=${passCount} fail=${failCount} seoOnlyFail=${seoOnlyFail}`);
  // Exit 0 if SEO proposals are valid even when IDs pending — operator still sees FAIL in report.
  // Use exit 1 only when SEO content itself is invalid.
  process.exitCode = seoOnlyFail > 0 ? 1 : 0;
}

main();
