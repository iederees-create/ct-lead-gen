# Etsy API Capability Audit — Francis Listing Manager

**Inspected:** `/home/iedrees/Workspace/francis-listing-manager`  
**Date:** 2026-07-14  
**Shop context:** NextGenWebs  
**Secret policy:** This document never records API keys, OAuth tokens, refresh tokens, cookies, or encryption keys.

---

## 1. Architecture summary

| Module | Role |
|---|---|
| `server/services/etsyService.js` | Facade: mock when disabled; live when `ETSY_API_ENABLED=true` |
| `server/services/etsyApiClient.js` | Low-level Open API v3 HTTP (GET/POST/PUT/PATCH/DELETE), timeouts, GET retries |
| `server/services/etsyOAuthService.js` | PKCE OAuth connect, code exchange, refresh |
| `server/services/etsyTokenStore.js` | AES-256-GCM encrypted tokens at rest; proactive refresh; masked status only to UI |
| `server/services/etsyDeploymentService.js` | Draft deploy workflow (create, images, files, apply details, verify, publish) |
| `server/routes/etsy.js` | HTTP API for status, listings read, draft deploy, publish confirmation |
| `server/utils/tokenCrypto.js` | Encryption helpers |

Official Etsy Open API only. **No** browser automation of etsy.com. **No** scraping.

---

## 2. How tokens are stored

- Encrypted fields in SQLite table `etsy_connection` (`access_token_encrypted`, `refresh_token_encrypted`).
- Optional disk mirror path via env (`TOKEN_STORAGE_PATH` / data dir) — still encrypted material, not plaintext secrets in git.
- Encryption key: `ETSY_ACCESS_TOKEN_ENCRYPTION_KEY` (32-byte base64) in env only.
- UI status endpoint returns **masked** booleans/names/ids/timestamps only — tokens never sent to frontend JS.
- Scopes requested (minimum): `listings_r`, `listings_w`, `shops_r`.

**Local inspection (this environment):**

| Check | Result |
|---|---|
| `etsy_connection.connected` | `0` / not connected |
| Encrypted tokens present | No |
| Products with `etsy_listing_id` | **0** |
| Live listing IDs for NextGenWebs verticals | **Not available locally** |

Do not assume listing IDs. Re-fetch when shop is connected.

---

## 3. Available Etsy-facing functions (facade)

| Function | Write? | Notes |
|---|---|---|
| `getStatus` / `isEnabled` | No | Config + connection mask |
| `startOAuthFlow` / `completeOAuthFlow` | Auth only | PKCE |
| `testConnection` | No | Connectivity check |
| `getMyListings({ states })` | **No** | Shop listings by state (active/draft/…) |
| `getListing(listingId)` | **No** | Single listing (+ includes when requested) |
| `createDraftListing` | Yes | Creates **draft** only |
| `updateListing(listingId, patchFields)` | **Yes** | Generic PATCH — can set title, description, tags, price, state, etc. |
| `setListingTypeDownload` | Yes | type=download |
| `uploadListingImage` / `reorderListingImage` | Yes | Media |
| `uploadListingVideo` | Yes | Media |
| `uploadDigitalFile` / `deleteListingFile` | Yes | Buyer files |
| `publishListing` | Yes | Sets `state: active` — requires `confirmed: true` |
| `duplicateListingAsDraft` | Yes | Copy as draft |
| `searchTaxonomyNodes` | No | Taxonomy helper |
| Deployment: `applyListingDetails` | Yes | PATCH title, description, tags, **price**, quantity, taxonomy together |
| Deployment: `publish` | Yes | Two-step phrase `PUBLISH` + confirmed |

### Routes useful for SEO recovery

| Route | Purpose |
|---|---|
| `GET /api/etsy/listings` | Fetch shop listings (read) |
| `POST /api/etsy/products/:id/apply-details` | Push local product title/tags/description (also price) |
| `GET /api/etsy/products/:id/deploy-preview` | Verify remote draft |

There is **no** dedicated route named “SEO-only update” that forbids price/state. The primitive is `etsyService.updateListing(id, patch)`.

---

## 4. Missing / incomplete for safe bulk SEO updates

| Gap | Risk | Recommendation |
|---|---|---|
| No first-class “update title/tags/description only” API route | Callers might pass price/state accidentally | New controlled script that PATCHes **only** allowlisted keys |
| No dry-run mode in Francis UI | Operators might apply live too early | ct-lead-gen dry-run script (this pack) |
| No bulk “backup all active listings” CLI in Francis | Hard to rollback | Export script writing `etsy-growth/backups/*.json` |
| `applyListingDetails` always sends **price** | Violates “do not change price unless approved” | Do not use applyListingDetails for SEO recovery; use allowlisted patch |
| Local shop not connected | Cannot resolve live listing IDs | Connect Francis production/local OAuth; re-run export |
| No automatic mapping product name → listing_id | Plan must stay ID-pending until fetch | Match by title keywords after export |

---

## 5. Safe update path (recommended)

```
1. Connect Francis (OAuth) with listings_r + listings_w + shops_r
2. GET active listings → backup JSON (read-only)
3. Build/merge ETSY-LISTING-UPDATE-PLAN.json with real listing_ids
4. node scripts/etsy/dry-run-listing-updates.mjs  (no writes)
5. Human reviews dry-run report + plan
6. node scripts/etsy/apply-approved-listing-updates.mjs --approved
     → PATCH only { title, description, tags }
     → never state, never price, never delete, never publish
7. Save redacted API response + rollback reference
```

Prefer calling Francis `etsyService.updateListing` **or** the same Open API PATCH path with env credentials already in the secure runtime — **never** hardcode secrets in scripts.

---

## 6. Required scopes

| Scope | Needed for SEO title/tag/description update? |
|---|---|
| `listings_r` | Yes — read/backup |
| `listings_w` | Yes — PATCH listing |
| `shops_r` | Yes — list shop listings |
| `listings_d` | **No** — do not request (delete) |
| `transactions_*` | **No** |
| `email_r` / `address_r` | **No** |

---

## 7. Dry-run and confirmation behaviour (today)

| Surface | Dry-run? | Confirmation? |
|---|---|---|
| `GET /listings` | N/A (read) | No |
| `applyListingDetails` | No | No extra phrase (writes immediately) |
| `publish` / `publish-listing` | No | **Yes** — `confirmed` + phrase `PUBLISH` |
| Legacy `publishListing` | No | `confirmed: true` required |

**SEO recovery scripts in this pack add dry-run + `--approved` gate** because Francis does not provide them for generic PATCH.

---

## 8. Secret logging risks

| Area | Assessment |
|---|---|
| `getMaskedStatus` | Designed to avoid token leakage |
| Activity log | Logs product events; avoid logging Authorization headers |
| Error bodies from Etsy | May contain messages — scripts must redact `access_token`, `refresh_token`, `Authorization` |
| `.env` / `etsy-tokens.enc` | Must stay untracked; never commit |

Scripts in `scripts/etsy/` redact sensitive keys from any saved response JSON.

---

## 9. Risks of live updates

1. Overwriting a good title with a weaker one without backup.  
2. Accidentally PATCHing `price` or `state` via `applyListingDetails`.  
3. Tag validation failure on Etsy side (length/count).  
4. Partial multi-listing runs (need per-listing success log).  
5. Updating draft vs active without checking `state`.  
6. Rate limits (client handles GET retry; writes do not auto-retry — correct).

---

## 10. Recommended implementation (this repo)

| Artifact | Purpose |
|---|---|
| `etsy-growth/ETSY-API-CAPABILITY-AUDIT.md` | This audit |
| `etsy-growth/backups/current-etsy-listings-backup.json` | Pre-update snapshot (refresh when API connected) |
| `etsy-growth/ETSY-LISTING-UPDATE-PLAN.json` | Proposed SEO fields + approval flags |
| `scripts/etsy/export-active-listings-backup.mjs` | Read-only export into backups/ |
| `scripts/etsy/dry-run-listing-updates.mjs` | Validate plan; no writes |
| `scripts/etsy/apply-approved-listing-updates.mjs` | Allowlisted PATCH only with `--approved` |
| `etsy-growth/ETSY-LISTING-DRY-RUN-REPORT.md` | Human-readable dry-run output |

---

## 11. Runtime status at audit time

| Item | Status |
|---|---|
| Local Francis Etsy connection | **Not connected** |
| Active listings fetched via API | **0** |
| Live write capability from this environment | **Blocked until OAuth + API enabled** |
| SEO proposal content | Available from `TITLE-REWRITE-PACK.md` / `TAG-REWRITE-PACK.json` |

Re-run `node scripts/etsy/export-active-listings-backup.mjs` after connecting the shop to populate real listing IDs and titles into the backup, then merge IDs into the update plan before any apply.
