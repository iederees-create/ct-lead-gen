#!/usr/bin/env node
/**
 * Read-only export of active (and optionally other) Etsy listings into
 * etsy-growth/backups/current-etsy-listings-backup.json
 *
 * Uses Francis Listing Manager etsyService when available.
 * Never prints secrets. Never writes to Etsy.
 *
 * Usage:
 *   node scripts/etsy/export-active-listings-backup.mjs
 *   node scripts/etsy/export-active-listings-backup.mjs --states=active
 */

import path from 'node:path';
import { createRequire } from 'node:module';
import {
  BACKUP_PATH,
  findFrancisRoot,
  redact,
  writeJson,
} from './lib-redact.mjs';

function parseStates(argv) {
  const arg = argv.find((a) => a.startsWith('--states='));
  if (!arg) return ['active'];
  return arg.split('=')[1].split(',').map((s) => s.trim()).filter(Boolean);
}

function normalizeListing(raw) {
  const images = raw.images || raw.Images || [];
  const files = raw.files || raw.Files || [];
  const imageIds = Array.isArray(images)
    ? images.map((img) => img.listing_image_id ?? img.listingImageId ?? img.image_id).filter(Boolean)
    : [];
  const fileIds = Array.isArray(files)
    ? files.map((f) => f.listing_file_id ?? f.listingFileId ?? f.file_id).filter(Boolean)
    : [];

  const priceObj = raw.price;
  let price = null;
  let currency = null;
  if (priceObj && typeof priceObj === 'object') {
    // Etsy money object shapes vary (amount/divisor or amount as string)
    if (priceObj.amount != null && priceObj.divisor) {
      price = Number(priceObj.amount) / Number(priceObj.divisor);
    } else if (priceObj.amount != null) {
      price = Number(priceObj.amount);
    }
    currency = priceObj.currency_code || priceObj.currencyCode || null;
  } else if (typeof priceObj === 'number') {
    price = priceObj;
  }

  const listingId = raw.listing_id ?? raw.listingId ?? null;
  const url = raw.url
    || (listingId ? `https://www.etsy.com/listing/${listingId}` : null);

  return {
    listing_id: listingId,
    title: raw.title ?? null,
    description: raw.description ?? null,
    tags: raw.tags ?? [],
    price,
    currency,
    state: raw.state ?? null,
    url,
    image_ids: imageIds,
    file_ids: fileIds,
    taxonomy_id: raw.taxonomy_id ?? raw.taxonomyId ?? null,
    updated_timestamp: raw.last_modified_tsz
      ?? raw.updated_timestamp
      ?? raw.original_creation_tsz
      ?? null,
    is_digital: raw.is_digital ?? raw.isDigital ?? null,
    shop_id: raw.shop_id ?? raw.shopId ?? null,
  };
}

async function main() {
  const states = parseStates(process.argv.slice(2));
  const francisRoot = findFrancisRoot();
  const exportedAt = new Date().toISOString();

  if (!francisRoot) {
    writeJson(BACKUP_PATH, {
      exported_at: exportedAt,
      source: 'export-active-listings-backup.mjs',
      etsy_api_reachable: false,
      shop_connected: false,
      active_listings_found: 0,
      listings: [],
      fetch_errors: ['Francis Listing Manager root not found. Set FRANCIS_LISTING_MANAGER_ROOT.'],
      schema_version: 1,
    });
    console.error('Francis root not found. Wrote empty backup shell.');
    console.error(`Backup: ${BACKUP_PATH}`);
    process.exitCode = 2;
    return;
  }

  // Load Francis as CommonJS from its own directory so relative requires work.
  const require = createRequire(path.join(francisRoot, 'package.json'));
  process.chdir(francisRoot);

  let etsyService;
  try {
    etsyService = require('./server/services/etsyService.js');
  } catch (err) {
    writeJson(BACKUP_PATH, {
      exported_at: exportedAt,
      source: 'export-active-listings-backup.mjs',
      francis_root: francisRoot,
      etsy_api_reachable: false,
      shop_connected: false,
      active_listings_found: 0,
      listings: [],
      fetch_errors: [`Failed to load etsyService: ${err.message}`],
      schema_version: 1,
    });
    console.error(err.message);
    process.exitCode = 2;
    return;
  }

  const status = typeof etsyService.getStatus === 'function' ? etsyService.getStatus() : {};
  const enabled = typeof etsyService.isEnabled === 'function' ? etsyService.isEnabled() : false;

  if (!enabled) {
    writeJson(BACKUP_PATH, {
      exported_at: exportedAt,
      source: 'export-active-listings-backup.mjs',
      francis_root: francisRoot,
      etsy_api_enabled: false,
      etsy_api_reachable: false,
      shop_connected: Boolean(status.connected),
      shop_name: status.shop_name || null,
      shop_id: status.shop_id || null,
      active_listings_found: 0,
      listings: [],
      fetch_errors: [
        'ETSY_API_ENABLED is not true in Francis. Enable API + OAuth connect, then re-run export.',
      ],
      status_masked: redact(status),
      schema_version: 1,
    });
    console.log('Etsy API disabled in Francis. Empty backup written (no write calls made).');
    console.log(`Backup: ${BACKUP_PATH}`);
    process.exitCode = 2;
    return;
  }

  try {
    const rawListings = await etsyService.withRateLimitHandling(() =>
      etsyService.getMyListings({ states }),
    );
    const listings = (rawListings || []).map(normalizeListing);
    const activeCount = listings.filter((l) => l.state === 'active').length;

    writeJson(BACKUP_PATH, {
      exported_at: exportedAt,
      source: 'export-active-listings-backup.mjs',
      francis_root: francisRoot,
      etsy_api_enabled: true,
      etsy_api_reachable: true,
      shop_connected: Boolean(status.connected),
      shop_name: status.shop_name || null,
      shop_id: status.shop_id || null,
      states_requested: states,
      active_listings_found: activeCount,
      listings_exported: listings.length,
      listings: redact(listings),
      fetch_errors: [],
      schema_version: 1,
    });

    console.log(`Exported ${listings.length} listing(s); active=${activeCount}.`);
    console.log(`Backup: ${BACKUP_PATH}`);
  } catch (err) {
    writeJson(BACKUP_PATH, {
      exported_at: exportedAt,
      source: 'export-active-listings-backup.mjs',
      francis_root: francisRoot,
      etsy_api_enabled: true,
      etsy_api_reachable: false,
      shop_connected: Boolean(status.connected),
      shop_name: status.shop_name || null,
      shop_id: status.shop_id || null,
      active_listings_found: 0,
      listings: [],
      fetch_errors: [err.message || String(err)],
      schema_version: 1,
    });
    console.error('Export failed (no Etsy writes attempted):', err.message);
    process.exitCode = 2;
  }
}

main();
