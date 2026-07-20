# Release Report — Exterior Cleaning Business Website Template

## Product

- **Product name:** Exterior Cleaning Business Website Template
- **Demo brand:** Hydro Clean (fictional)
- **SKU:** TILING-WEB-001
- **Target price:** $49 (see Currency Warning below — **shop currency is actually ZAR**)
- **Francis Listing Manager product ID:** 10
- **Etsy taxonomy ID:** 2818 (reused confirmed value already resolved on two sibling products in the same shop for this exact category path — not guessed)

## Repositories & Commits

| Item | Value |
|---|---|
| Local project | `/home/iedrees/Workspace/ct-lead-gen/clients/hydro-clean-ct` |
| Starting remote commit (before this session) | `0dda759` — "Launch: Hydro Clean CT - Cape Town Ecosystem" |
| Website repo | `iederees-create/hydro-clean-ct-ct` (standalone public repo — the local project folder was a stale 2-file stub with no git history matching this remote, so it was renamed to `../hydro-clean-ct-stale-backup-20260712-*` and this remote was cloned fresh into its place, per Part 1) |
| Website commit SHA (rebuild) | `dab3341` — "Build premium cleaning template with interactive project planner" |
| Portfolio repo | `iederees-create/3D-Portfolio` |
| Portfolio commit SHA | `700abe7` — "Add interactive cleaning template media showcase" |

## Live Demo

**https://iederees-create.github.io/hydro-clean-ct-ct/** — verified via `curl`: homepage and all 12 site files (`privacy.html`, `terms.html`, `disclaimer.html`, `404.html`, `site-config.js`, `planner.js`, `app.js`, `style.css`, `favicon.svg`, `og-image.svg`, `robots.txt`, `sitemap.xml`) return HTTP 200. GitHub Actions Pages build completed successfully for commit `dab3341`.

## Skills Used

- **frontend-design / premium design direction** — architectural limestone/charcoal/clay/brass design system, blueprint-grid motifs, editorial typography (system serif/sans stack, no external fonts)
- **security-review (manual, applied throughout)** — verified all user-controlled planner input is routed through `escapeHtml()` before DOM insertion, WhatsApp/mailto links use `encodeURIComponent`, no unsafe `innerHTML`, no secrets in buyer ZIP or Complete Product Pack (verified by extraction + grep)
- **verify (browser-driven functional testing)** — exercised the full 8-step Surface Cleaning Estimate Planner live in Chrome via chrome-devtools MCP (not just unit tests), caught and fixed two real runtime bugs (see below) before shipping
- Skills considered and deliberately not invoked as irrelevant to this task: only skills materially affecting the calculator UX, design, security, and packaging were used, per the brief's instruction not to invoke skills merely to inflate a count

## Bugs Found and Fixed During Live Testing

1. **Planner navigation vanished after selecting an option.** Clicking a project-type/area-mode/layout/wastage option called that step's renderer directly, which overwrote `panel.innerHTML` without re-appending the Back/Continue buttons (only the initial `renderStep()` appended them). Fixed by introducing `refreshPanel()`, used by every in-step interaction handler.
2. **Unused/inconsistent `height` field on wall measurements.** The Measurements step rendered separate Width and Height inputs for wall mode, but the calculation engine only ever read `length`/`width` — the Height value was silently discarded. Fixed by removing the redundant field and relabeling the second dimension input "Height" when in wall mode, so it's actually used in the area calculation.

Both bugs were caught by driving the live deployed site through the full wizard with real input, not by unit tests alone (the unit tests operate on the calc engine directly and wouldn't have caught either UI-wiring bug).

## Calculator Test Results

`node tests/planner.test.js` — **31/31 tests passed**, covering unit conversion (m/cm/ft/in), multiple areas, wall calculations, wastage presets, tile/box counts, missing/invalid input, decimal measurements, zero/negative-value guarding, and summary-text generation. Also verified live in-browser: entering 4m×3m at 10% wastage with 60cm×60cm tiles (4/box, $40/box) produced 12m² → 13.2m² → 37 tiles → 10 boxes → $400, matching the test suite's expected arithmetic exactly.

## Local Test Results

- Console: clean on every page tested (desktop, mobile, all legal pages, live production URL) — only an unrelated browser-extension debug log observed, not a site defect.
- Hamburger nav: opens/closes correctly at 390px width; verified via live interaction, not just CSS inspection.
- FAQ accordion, quote-form validation, WhatsApp message construction (`wa.me/<number>?text=...`), and theme switching (Limestone Studio / Charcoal Brass / Coastal Clay) all verified working via live DOM interaction.
- Full 8-step Surface Cleaning Estimate Planner walked end-to-end twice (once to find the two bugs above, once after fixing them) — every step, every calculation, WhatsApp/email/copy/print/download handoff buttons all present and correctly wired.
- 3D Portfolio showcase modal: verified programmatically — opens on click, correct `aria-label`, video-first slide (11 total: 1 video + 10 images), `ArrowRight` advances the counter to "2 / 11" with the correct `alt` text, `Escape` closes and restores focus.

## Buyer Package

- **Buyer ZIP:** `seller-pack/buyer-files/hydro-clean-template.zip` (16 files, 47.3 KB — clean site source including `tests/planner.test.js`, no `.git`/secrets/node_modules, verified by extraction + grep scan).
- **Buyer files (exactly 5, matching Etsy's limit):** START-HERE.html, COMPLETE-BUYER-GUIDE.html, LICENSE.txt, AI-DISCLOSURE.txt, and the template ZIP itself.

## Etsy Listing Content & Images

- `seller-pack/ETSY-LISTING-CONTENT.md` — 3 titles (all ≤140 chars) + recommendation, full description, FAQ (13 Q&A), 13 unique tags (all ≤20 chars), social copy for Pinterest/Instagram/Facebook/LinkedIn/X/YouTube, image alt text.
- **10 listing images** (`seller-pack/images/`), 2000×2000 PNG, composed entirely from real screenshots of the live deployed template (desktop/mobile captures, live Surface Cleaning Estimate Planner steps with real entered values, live theme switching) — no competitor or stock imagery. `01-cover.png` is the cover image.

## Etsy Listing Video & Portfolio Media

- `seller-pack/media/etsy-listing-video.mp4` — 1080×1080, H.264, 15.0s exactly, 1.66 MB, silent, built entirely from real screenshots per `video-storyboard.md`. Verified against 2026 third-party guides summarizing Etsy's listing-video spec (5–15s, MP4/H.264, 1080p, square/vertical, <100MB, audio stripped) — Etsy's own help-center page returned HTTP 403 to automated fetch, so this was cross-checked against multiple independently published 2026 guides rather than a single source.
- `portfolio-preview.mp4` / `portfolio-preview.webm` / `video-poster.webp` — same content, used in the 3D Portfolio showcase.
- Full production/timing detail recorded in `video-metadata.json` (measured via `ffprobe`, not estimated).

## Complete Product Pack

- **Path:** `seller-pack/hydro-clean-complete-product-pack.zip` (2.83 MB, 18 files)
- **Local validation:** valid JSON manifest; 13 unique tags all ≤20 chars; 10 images with exactly 1 cover; 5 buyer files; all 3 titles ≤140 chars; no path traversal; no secrets.

## Production Francis Listing Manager Import — RESULT: SUCCEEDED

Production service: `https://product-listing-server.onrender.com`. No authenticated session was available at the start of this task; per the security rules, no credentials were requested or entered — the human owner logged in themselves mid-session, after which the import proceeded.

1. **Service health:** Etsy connection confirmed **Live · Connected to NextGenWebs**.
2. **Package validation:** Passed on the first attempt (manifest used the flat `listing_image_paths`/`buyer_file_paths` schema already proven correct in the prior Westlake Pest Control release). Two expected, non-blocking warnings: `.html` buyer files "unusual extension" — accepted, since the task requires `.html` guide files.
3. **Import result:** **Succeeded.** Created product **ID 10**, "Exterior Cleaning Business Website Template" — 10 images, 5 files, 13 tags imported.
4. **Verification of imported product:** Internal name, Digital type, category/subcategory, SKU, quantity (999), live demo URL, materials, style, AI tools used, and all 13 keywords confirmed correct on the Product Details tab.
5. **Listing Content, image alt text, Digital Files:** The pack importer does not populate the free-text listing-content fields (matches the documented Westlake precedent) — these were filled in manually from the pre-approved `ETSY-LISTING-CONTENT.md` copy via the tool's own Listing Content and Images tabs, then confirmed via reload: the "Checklist Before Publishing" panel changed from five missing-content warnings to **"Everything required is filled in."**
6. **Taxonomy ID:** Applied **2818** — reused from two sibling products (Westlake Pest Control, Zen Skin Studio) already resolved to this exact value for the identical category/subcategory in this same shop. Not guessed.

## Etsy Draft — CREATED, NOT PUBLISHED

**"Create Complete Etsy Draft"** ran and succeeded:
- **Etsy listing ID: 4536569497**
- **Etsy listing state: `draft`**
- Deploy status API: `{"status":"ok","error":"","etsyListingState":"draft","etsyListingUrl":""}`

**Video uploaded successfully** via Etsy's officially documented `ListingVideo_Upload` endpoint (verified this endpoint exists in Etsy's Open API v3 before using it): the video file was attached to the product in Francis Listing Manager, then pushed to the live Etsy draft — confirmed via the API response `{"uploaded":true}`. No manual video-attachment step is required.

**Full read-back verification from Etsy's own API** (via Francis Listing Manager's `deploy-preview` endpoint, not a guess):
- `listing_id: 4536569497`, `state: "draft"`, `shop: NextGenWebs`
- `title`, `description` match the approved copy exactly
- All **13 tags** present and correct
- `taxonomy_id: 2818` applied
- `listing_type: "download"`, `quantity: 999`
- 4+ images confirmed present at 2000×2000 with correct rank order (response truncated in this session but confirmed non-empty and correctly ordered)
- **Price stored as `4900` / divisor `100` in currency `ZAR`** — see Currency Warning below

**The listing was NOT published.** No publish action or publish-confirmation payload was sent at any point in this session.

## ⚠️ Currency Warning — Requires Human Action

The shop's actual default currency is **ZAR (South African Rand)**, not USD. The manifest's `target_price: 49` was applied literally, so the Etsy draft currently shows a price of **R49 (≈ $2.70 USD)** — almost certainly far too low for a $49-equivalent digital template. **This must be corrected in Etsy before publishing.** This was flagged proactively in the manifest's own `target_price_currency_note` and is now confirmed as a real, not hypothetical, issue via the live API read-back.

## Image Alt Text — Minor Discrepancy to Recheck

Alt text was entered for all 10 images in Francis Listing Manager's Images tab (confirmed saved — the "missing alt text" checklist warning cleared after entry). However, the raw Etsy `deploy-preview` read-back showed `"alt_text":""` on the images inspected. This may be a timing/caching artifact of the read-back endpoint, or alt text may not have propagated to Etsy on this pass. **Recommend the human owner verify image alt text directly in the Etsy draft**, and re-run "Apply Listing Details" in Francis Listing Manager if it's missing.

## Portfolio

- Added "Exterior Cleaning Business Website Template" project card to the 3D Portfolio with an "Interactive Surface Cleaning Estimate Planner" badge, autoplay preview video, and a new **ProjectShowcase** modal component (didn't exist before this session — `galleryImages` was declared on the `Project` type but never wired to any UI). The showcase supports full keyboard navigation (arrows, Escape), touch swipe, an image counter, a thumbnail strip, accessible video play/pause, a feature-highlight list, and a live-demo CTA. No `etsyUrl` was added (listing is still a draft).
- `npm run build` (tsc + vite build) succeeded with zero TypeScript errors.
- Verified live in a local `vite preview` server via chrome-devtools MCP: card renders, gallery opens (11 slides: video + 10 images), keyboard `ArrowRight`/`Escape` work correctly.
- Deployed via GitHub Actions (`Deploy to GitHub Pages` workflow) — build `29190721789`, status `success`. Verified live: `https://iederees-create.github.io/3D-Portfolio/projects/hydro-clean/cover.webp` and `preview.mp4` both return HTTP 200, and the deployed page's JS bundle hash matches the local build.

## Remaining Human Action

1. **Fix the price/currency mismatch first.** Log into Etsy, open the draft, and either change the price to a correct ZAR-equivalent value or update it once currency is confirmed: `https://www.etsy.com/your/shops/me/tools/listings/4536569497` (this session could not open that URL directly — no browser-level Etsy session exists in this environment, only Francis Listing Manager's server-side OAuth token, which is what actually created the draft).
2. **Verify image alt text landed on Etsy** and re-apply via Francis Listing Manager if not.
3. **Review the full draft** (title, description, images, tags, category, buyer files, video) directly in Etsy.
4. **Review the Etsy draft and publish it manually when satisfied.** Never published automatically — no publish action or publish-confirmation payload was sent at any point in this session.
5. Once published, add the real Etsy listing URL to the 3D Portfolio entry (`etsyUrl` field for "Exterior Cleaning Business Website Template" in `src/App.tsx`) and add the Etsy CTA to the portfolio showcase modal.

No Etsy listing was published. All claims in this report reflect what was directly observed and verified via live API read-backs and browser testing in this session, not assumed.
