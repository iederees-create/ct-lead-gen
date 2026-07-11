# Release Report — Westlake Pest Control Website Template

## Product

- **Product name:** Westlake Pest Control Website Template
- **SKU:** PEST-WEB-001
- **Target price:** $49 (see Currency Warning below)
- **Francis Listing Manager product ID:** 8

## Repositories & Commits

| Item | Value |
|---|---|
| Website repo (source of truth, monorepo) | `iederees-create/ct-lead-gen` |
| Website commit SHA (rebuild) | `5ebb3ad` — "Build Westlake Pest Control commercial website template" |
| Workflow docs commit SHA | `1768cae` — RELEASE-WORKFLOW.md / CLAUDE.md |
| Seller-pack commit SHA | `9e9e19c` — buyer ZIP, listing content, Complete Product Pack |
| Public demo repo | `iederees-create/westlake-pest-control-template` (new repo, created this session) |
| Demo repo commit SHA | `cc22f69` — "Westlake Pest Control — pest control website template (v1.0)" |
| Portfolio repo | `iederees-create/3D-Portfolio` |
| Portfolio commit SHA | `79e85cb` — "Add Pest Control Website Template to portfolio" (rebased cleanly onto unrelated design-iteration commits already on remote `main`) |

## Live Demo

**https://iederees-create.github.io/westlake-pest-control-template/** — verified HTTP 200, verified free of the old branding/external dependencies via `curl`.

## Local Test Results

- Verified via chrome-devtools MCP + `curl`: no console errors (aside from an unrelated browser-extension debug log), all 12 site files return HTTP 200, no broken internal links.
- Hamburger nav: `nav-toggle` correctly switches to `display:block` under the 860px breakpoint; class/ARIA toggle verified via script at a narrow real viewport.
- FAQ accordion, service-card expand/collapse, quote-form validation (name/contact/service required, email-or-phone regex), and WhatsApp message construction (`wa.me/<number>?text=...`) all verified working via live DOM interaction.
- Full-page/mobile/theme screenshots captured successfully after an initial tool-side screenshot-timeout issue in this sandbox was worked around (documented, not a site defect).
- **Not independently re-verified in this session:** pixel-exact rendering at every one of the 5 requested breakpoints via screenshot (tool emulation reported inconsistent `window.innerWidth` values in this sandbox); the underlying CSS is a single standard `max-width: 860px` media query already confirmed functional at a real narrow width.

## Buyer Package

- **Buyer ZIP:** `seller-pack/buyer-files/westlake-pest-control-template.zip` (clean site source, 14 files, no `.git`/secrets/node_modules — verified by extraction + grep scan).
- **Buyer files (exactly 5, matching Etsy's limit):** START-HERE.html, COMPLETE-BUYER-GUIDE.html, LICENSE.txt, AI-DISCLOSURE.txt, and the template ZIP itself.

## Complete Product Pack

- **Path:** `/home/iedrees/Workspace/ct-lead-gen/clients/westlake-pest-control/seller-pack/westlake-pest-control-complete-product-pack.zip`
- **Local validation:** valid JSON manifest; 13 unique tags, all ≤20 characters; 10 images with exactly 1 cover; 5 buyer files; all 3 titles ≤140 characters; no path traversal; no secrets; no `.git`/`node_modules`.

## Production Francis Listing Manager Import — RESULT: SUCCEEDED (with one open item)

Production service: `https://product-listing-server.onrender.com` (an existing authenticated browser session was available and used; no credentials were requested, printed, or stored).

1. **Service health:** Dashboard loaded, Etsy API connected, shop = **NextGenWebs** — confirmed.
2. **Package validation:** First upload failed validation (manifest used the wrong field names for images/buyer files — `listing_image_paths` / `buyer_file_paths` required, not the nested-object schema I initially guessed from the task spec). Manifest was corrected and re-validated locally and on the server until the tool reported: *"Manifest and all referenced files look valid. Ready to import."* Two non-blocking warnings remain ("unusual extension .html" on the two guide files) — expected and accepted, since the task explicitly requires `.html` guide files.
3. **Import result:** **Succeeded.** Created product **ID 8**, "Westlake Pest Control Website Template" — 10 images, 5 files, 13 tags imported.
4. **Verification of imported product:**
   - Internal name, product type (Digital), category/subcategory (plain-English "Website Templates" / "Templates > Website Templates" as instructed), SKU, quantity (999), live demo URL — all correct.
   - Price stored as **49** (see Currency Warning below).
   - Title options, full description, short summary, What's Included, FAQ, and buyer instructions were initially blank after import (the pack importer does not populate these `content` fields from the manifest) — filled in manually using the pre-approved listing copy from `ETSY-LISTING-CONTENT.md` via the tool's own "Listing Content" tab, then saved and confirmed via API re-fetch. Description explicitly states: digital download, no physical item, fictional demo business, AI disclosure (Claude Code / Anthropic), and refund terms.
   - All 10 images confirmed present in the correct order with `01-cover.png` as cover; alt text for all 10 images filled in and confirmed saved via API.
   - All 5 buyer files confirmed present with correct filenames/sizes; no forbidden file types.
   - Etsy connection: **Live**, connected to **NextGenWebs**. "Test Connection" run and succeeded ("Etsy connection is working"), token status **Valid**.
   - Product checklist now reads: *"Everything required is filled in. Review the Preview page before publishing."*

## STOPPED HERE — Blocker: Etsy Taxonomy ID

The product-edit page's "Etsy taxonomy ID" field is **empty** and is explicitly labeled *"Required before creating an Etsy draft. Look up the numeric id for your category in Etsy's seller taxonomy reference."* This is a manual-entry field — Francis Listing Manager does **not** auto-resolve a numeric Etsy taxonomy ID from the plain-English category/subcategory text at this stage.

Per explicit instruction, **no numeric taxonomy ID was invented or guessed.** The "Create Complete Etsy Draft" action was **not** clicked, and no Etsy draft has been created.

## Confirmed Shop Currency: UNCONFIRMED

The Settings page shows Etsy connection details (shop name, shop ID 57611249, connection status) but does **not** expose a currency field, and no shop-currency API endpoint was discoverable through the tool's own interface. The product-edit form labels the price field "Price (USD)" as the tool's own display convention, but this is not confirmation of the connected Etsy shop's actual billing/listing currency. **This must be verified independently before publishing** — do not assume the $49 price will list in USD.

## Warnings

- Etsy taxonomy ID not resolved (blocker, above).
- Shop currency not independently confirmed (above).
- Two non-blocking "unusual extension (.html)" warnings on the buyer guide files (expected/accepted).

## Remaining Human Action

1. Look up the correct numeric Etsy taxonomy ID for "Website Templates" (digital templates category) using [Etsy's seller taxonomy reference](https://www.etsy.com/seller-handbook), and enter it in the **Etsy taxonomy ID** field on the Product Details tab for product ID 8 at `https://product-listing-server.onrender.com/product-edit.html?id=8`.
2. Confirm the NextGenWebs Etsy shop's actual billing/listing currency and adjust the $49 price field if it is not already in the intended currency.
3. Click **"Create Complete Etsy Draft"** on the Etsy Listing tab (this validates, creates/syncs the draft, uploads images/files, and applies all listing details — it stops at draft status and never publishes).
4. Open the resulting draft in Etsy and verify title, description, price/currency, tags, images, buyer files, and category before doing anything further.
5. **Review the Etsy draft and publish it manually when satisfied.** (The listing must never be published automatically.)
6. Once published, add the real Etsy listing URL to the 3D Portfolio entry (`etsyUrl` field for "Pest Control Website Template" in `src/App.tsx`).

No Etsy listing was published. No numeric taxonomy ID was invented. All claims above reflect what was directly observed and verified in this session, not assumed.
