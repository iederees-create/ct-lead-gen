# Francis Listing Manager — Schema Used (Inspected Live From Source)

Inspected directly from `/home/iedrees/Workspace/francis-listing-manager`
(server code, not old docs) on this release date, plus the live production
instance at `https://product-listing-server.onrender.com` (an already
authenticated browser session was available — Etsy connection confirmed
live: shop "NextGenWebs", shop ID 57611249).

## Complete Product Pack manifest

- **Required root manifest filename:** `francis-listing-manager-import.json`
  — must sit at the ZIP root, or up to 2 directory levels deep (the importer
  searches recursively, `MANIFEST_SEARCH_MAX_DEPTH = 2`, to tolerate a single
  wrapping folder from how the ZIP was created).
  Source: `server/services/productPackImportService.js` (`findManifestFile`).

- **Required manifest fields** (`validateProductPack`):
  - `internal_product_name` (non-empty string)
  - `target_price` (number ≥ 0)
  - `listing_image_paths` (non-empty array of paths relative to the
    manifest's own directory)
  - `buyer_file_paths` (non-empty array of paths, relative to the manifest's
    directory unless `buyer_package_dir` is set, in which case relative to
    that sibling folder)

- **Optional fields actually read by the importer:** `category`,
  `subcategory`, `target_customer`, `features` (array → joined string),
  `included_files` (array → joined string), `how_it_works` (array → joined
  string), `customer_benefits` (array → joined string), `quantity` (default
  999), `sku`, `shop_section`, `live_demo_url`, `materials`, `style`,
  `keywords`, `ai_tools_used`, `tags` (array, truncated to 13), `video_path`
  (single string, not an array — Etsy allows exactly one video per
  listing), `buyer_package_dir`, and `content_fields.{title_options[],
  description, short_summary}`.

- **No currency field exists anywhere in the schema or the product
  database row.** `price` is stored and passed to Etsy as a bare number;
  the actual currency is entirely determined by the Etsy shop's own
  currency setting, which this tool does not query or expose via any API
  route (confirmed: zero references to "currency" in
  `server/services/etsyApiClient.js`, the real live-API client — only the
  separate mock service `etsyService.js` mock-mode stub hardcodes
  `currency_code: 'USD'` for demo purposes). Per the release brief's own
  fallback rule, price was confirmed with the human owner before packaging
  (see `RELEASE-REPORT.md`) rather than guessed.

## Image / file / tag / video limits (`server/config/constants.js`)

| Constraint | Value |
|---|---|
| Max listing images | 10 |
| Recommended/minimum image size | 2000×2000px (warning only if smaller — "may look blurry or Etsy may reject it") |
| Max digital buyer files | 5 |
| Buyer-file allowed extensions | `.pdf .zip .png .jpg .jpeg .svg .txt .mp3 .mp4 .mov .docx .xlsx .pptx .epub` — **`.html` is not in this list** (warning only, not a hard block) |
| Max digital file size | 20MB each |
| Max listing videos | 1 |
| Video allowed extensions | `.mp4`, `.mov` only (no `.webm`) |
| Max video size | 100MB |
| Tags | exactly 13, ≤20 characters each |
| Title | ≤140 characters |

**Known warning for this release:** the two `.html` buyer files
(`02-START-HERE.html`, `03-COMPLETE-BUYER-GUIDE.html`) will trigger a
non-blocking "unusual extension for a digital download" warning during
`/product-pack/validate-zip`. This matches this monorepo's own established
buyer-package convention (`RELEASE-WORKFLOW.md`) and the same pattern used
for every prior template (Southern Suburbs Builders, Westlake Pest Control,
etc.) — it is a validator warning, not an import failure, and does not meet
the "real bug preventing import" bar for modifying Francis Listing Manager
source.

## API endpoints used

All routes below are mounted under `/api` and require an authenticated
session (`requireAuth`) plus a CSRF token for POST requests
(`server/middleware/auth.js` — single admin account, session-cookie based,
no service-account/API-key bypass). This release used an already
authenticated browser session (confirmed live on the Dashboard/Settings
pages) rather than attempting to acquire new credentials.

| Endpoint | Purpose |
|---|---|
| `POST /api/import-export/product-pack/validate-zip` (multipart, field `packZip`) | Validate a Complete Product Pack ZIP without writing anything |
| `POST /api/import-export/product-pack/import-zip` (multipart, field `packZip`) | Import the pack: creates one product row, its content, tags, images, buyer files, and optional video. **Never touches Etsy** — purely local DB write (confirmed in source comments). |
| `GET /api/etsy/taxonomy?q=<text>` | Real seller-taxonomy lookup by keyword. Used to confirm "Website Templates" = taxonomy id **2818** (verified live, same id already used by every prior "Website Templates" product in this shop). |
| `POST /api/etsy/products/:id/create-draft` (and related `/draft`, `/full-draft` steps) | Creates the actual Etsy draft listing for an imported product. This is the only step in the whole pipeline that talks to Etsy. |
| `GET /api/etsy/products/:id/deploy-status` | Read back the deploy/draft status for verification. |
| `GET /api/products/:id` | Read back every stored product field for verification. |

## Draft creation

`POST /api/etsy/products/:id/create-draft` (and its companion status/step
routes) is the only mechanism this release used to reach Etsy, and it goes
through Etsy's own documented Listings API via Francis Listing Manager's own
server-side OAuth token — never etsy.com directly, never browser automation
against etsy.com. No publish action was called; publishing requires a
separate, explicit `/publish` or `/publish-listing` route that this release
never invokes.
