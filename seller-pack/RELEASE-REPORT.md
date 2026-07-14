# Release Report — Precision Laser Website Template

## Branches Merged

`release/precision-laser-template` (from `main` @ `c5df1ce`), merging in
order: `agent/claude-site` (`cfc84bc`) → `agent/grok-commerce` (`8152c19`)
→ `agent/codex-release` (`66066a6`). Zero merge conflicts — each branch
touched disjoint paths. Full detail: `handoff/FINAL-MERGE-PLAN.md`.

## Website

- **Commit SHA (final, includes this release's seller-pack/handoff docs):**
  see `git log -1` on `release/precision-laser-template` after this report
  is committed — fast-forwarded onto `main` after validation.
- **Public demo URL:** https://iederees-create.github.io/precision-laser-works-template/
  (verified live: HTTP 200, zero console errors, planner computes correctly,
  no mobile overflow — see `handoff/PUBLIC-DEMO-VERIFICATION.md`)
- **Test results:** 38/38 unit tests passing, htmlhint 0 errors, Lighthouse
  100/100/100/100 (Accessibility/Best Practices/SEO/Agentic Browsing)

## Portfolio

- **Commit SHA:** `c26f640`
- **Portfolio project route:** `/work/precision-laser-website-template/`
  (title-derived slug, matching the sibling `/work/construction-website-template/`
  pattern)
- **Blog route:** `/blog/laser-cutting-website-quote-planner/`
- No `etsyUrl` was added to the portfolio entry — the Etsy listing is a
  draft only.
- `npm run build` (tsc + vite) passed cleanly. No `lint` script exists in
  this repo. A live browser smoke-test of the built preview server was
  attempted but the local preview process did not come up in time within
  this session; build-time TypeScript type-checking of the `Project` array
  shape and JSX compilation succeeding is the verification actually
  performed — flagged as a known gap below.

## Buyer & Product Pack Paths

- Buyer ZIP: `seller-pack/buyer-files/01-PRECISION-LASER-WEBSITE-TEMPLATE.zip`
  (+ 4 companion files: START-HERE, Complete Buyer Guide, Licence, AI
  Disclosure — 5 files total, at Etsy's digital-file limit)
- Complete Product Pack: `seller-pack/precision-laser-complete-product-pack.zip`
  (manifest `francis-listing-manager-import.json` + `images/` + `buyer-files/`
  + `etsy-video.mp4`, validated against Francis Listing Manager's real
  `validateProductPack()` function — `valid: true`)
- Media: `seller-pack/media/` — 10 real screenshots (`images/`), 1 Etsy
  video (`etsy-video.mp4`, 14.46s, 1080×1080, silent), 1 portfolio MP4/WebM
  pair + poster. Full manifest: `seller-pack/media/MEDIA-MANIFEST.json`.
- Image count: 10 (Etsy max is 10). Video: 1 Etsy listing video (Etsy max
  is 1), plus separate portfolio-only MP4/WebM/poster not submitted to Etsy.

## Product Identity

- **SKU:** PRECISION-LASER-WEB-001
- **Price:** 49 (explicitly labelled "Price (USD)" in Francis Listing
  Manager's own UI). **Human-confirmed** during this session — FLM has no
  currency field anywhere in its schema or API, so this could not be
  derived automatically; the user confirmed matching the $49 precedent
  already used by 5 of 6 other "Website Templates"-category products in
  this shop.
- **Currency:** No dedicated currency field exists in Francis Listing
  Manager (confirmed by inspecting `server/services/etsyApiClient.js` — zero
  currency handling in the real live-API client). The UI labels the price
  field "Price (USD)"; actual settlement currency is determined entirely by
  the connected Etsy shop's own account-level currency setting, which this
  tool does not expose.
- **Taxonomy:** "Website Templates" = **2818**, confirmed live via
  `GET /api/etsy/taxonomy?q=website%20template` — the same taxonomy ID
  already used by every other "Website Templates" product in this shop. Not
  invented.

## Francis Listing Manager

- **Product ID:** 14
- Full field read-back verified (not just the import success message):
  name, SKU, price, category, taxonomy, live demo URL, 13 tags (all valid),
  10 images, 5 buyer files — see `seller-pack/FRANCIS-LISTING-MANAGER-SCHEMA-USED.md`
  for the exact schema this was built against (inspected directly from the
  current server source, not old docs).
- Import never touches Etsy (confirmed in source comments on
  `productPackImportService.js`) — it only writes to Francis Listing
  Manager's own local database.

## Etsy Draft

- **Etsy listing ID:** 4537642227
- **Etsy listing state:** `draft`
- **Deploy step:** `ready_for_review` (the pipeline's designated safe
  stopping point — status `ok`, no error)
- Created via Francis Listing Manager's "Create Complete Etsy Draft" action
  (`POST /api/etsy/products/14/create-draft` and its companion steps), which
  is explicitly documented in its own UI as: "Runs the full safe workflow in
  one click ... then stops at draft status. Never publishes." No publish
  endpoint was ever called, no `confirmed: true` or publish-confirmation
  payload was ever sent.
- Session used: an already-authenticated Francis Listing Manager browser
  session (Etsy connection confirmed live: shop "NextGenWebs", ID
  57611249) — no credentials were requested, entered, or guessed.

## Warnings

- Two buyer files (`02-START-HERE.html`, `03-COMPLETE-BUYER-GUIDE.html`)
  trigger a non-blocking "unusual extension for a digital download" warning
  from Francis Listing Manager's validator, because `.html` is not in its
  `digitalFiles.allowedExtensions` list. This matches this monorepo's own
  established buyer-package convention (`RELEASE-WORKFLOW.md`) used by
  every prior template release. Import still succeeds; this is a warning,
  not a failure.
- `scripts/release/validate-links.mjs` (Codex's own tooling) produces a
  false-positive failure on `package.json`'s `test` script string, treating
  the whole npm command as a single file path. Not a real broken link —
  documented in `handoff/PUBLIC-DEMO-VERIFICATION.md`.
- `scripts/release/validate-product-pack.mjs` and `validate-zip-content.js`
  (Codex's own tooling) expect a different, older manifest schema
  (`images`/`buyerFiles`/`title` fields) than what Francis Listing Manager's
  actual current importer requires. The real schema was inspected directly
  from `productPackImportService.js` and validated against Francis Listing
  Manager's own real `validateProductPack()` function (`valid: true`) rather
  than trusting Codex's possibly-outdated local validator, per this task's
  explicit "do not trust old docs" instruction.
- Portfolio build was verified via `tsc && vite build` succeeding cleanly,
  not via a full live click-through of the built site in a browser (the
  local preview server did not come up in time within this session). No
  `lint` script exists in the portfolio repo.
- 3 pre-existing npm audit vulnerabilities (2 moderate, 1 high) exist in the
  portfolio repo's dependency tree, unrelated to this release; not
  addressed, since `npm audit fix --force` is a breaking-change operation
  out of scope for this task.

## Blockers

None remaining. The Etsy draft was created and verified.

## Manual Actions Required (Human Owner)

1. **Review the Etsy draft** (listing ID 4537642227, shop NextGenWebs) in
   Etsy's own Seller Dashboard — check title, description, price/currency
   as Etsy actually displays it, images, tags, and digital files exactly as
   a buyer would see them, not just Francis Listing Manager's read-back.
2. **Confirm the $49 price lands in the currency you expect** on Etsy's own
   side, since Francis Listing Manager has no currency field to verify this
   automatically.
3. **Publish manually** when satisfied — no agent in this pipeline can or
   will do this.
4. **After publishing**, add the real Etsy product URL to the portfolio
   entry (`src/pages/WorkPage.tsx`, `etsyUrl` field) — never before, and
   never the generic shop URL.
5. Optionally capture real project photography to replace the gallery
   placeholder cards in `site-config.js` before heavy marketing.
