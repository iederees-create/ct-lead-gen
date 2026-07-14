# Etsy Listing Dry-Run Report

Generated: 2026-07-14T11:21:17.473Z

**Write calls:** none (dry-run only)

## Summary

| Metric | Value |
|---|---:|
| Plan listings | 9 |
| Backup present | yes |
| Backup active_listings_found | 0 |
| Shop connected (backup) | false |
| Rows with listing_id set | 0 |
| Validation pass (strict) | 0 |
| Validation fail | 9 |

## Overall dry-run result

**FAIL (expected until live export)** — SEO proposals may be valid, but listing IDs and/or live verification are incomplete.

Typical next steps:
1. Connect Francis Listing Manager to the Etsy shop (OAuth).
2. Run `node scripts/etsy/export-active-listings-backup.mjs`
3. Merge real `listing_id` values into `ETSY-LISTING-UPDATE-PLAN.json`
4. Re-run this dry-run until PASS
5. Only then consider apply with `--approved`

## L01 — Construction Website Template

- **listing_id:** _null / PENDING_LIVE_FETCH_
- **strict result:** FAIL

### Before

- title: _unknown_
- tags (0): _unknown_
- opening: _unknown_
- state: _unknown_

### After (proposed)

- title: Construction Website Template with Renovation Quote Planner, Builder Contractor Website, Responsive Digital Download
- tags (13): construction site, builder website, contractor website, renovation website, quote planner, budget planner, website template, html css template, responsive website, digital download, small business web, home remodel site, lead capture form
- opening: Construction website template for builders and contractors with a renovation quote planner that structures project scope before the call. Digital download.

### Errors

- listing_id missing (PENDING_LIVE_FETCH) — cannot verify against Etsy yet

## L02 — Bank Desert Analysis Project

- **listing_id:** _null / PENDING_LIVE_FETCH_
- **strict result:** FAIL

### Before

- title: _unknown_
- tags (0): _unknown_
- opening: _unknown_
- state: _unknown_

### After (proposed)

- title: Python Data Analysis Project Bank Desert Student Lab, Geospatial Census Toolkit, Jupyter Digital Download
- tags (13): python project, data analysis lab, pandas project, geospatial data, student lab, jupyter project, census data, data visualization, python tutorial, digital download, analytics project, map dashboard, education download
- opening: Python data analysis student lab for geospatial financial-access research: Pandas, maps, and guided analysis workflows. Educational digital download — not banking advice.

### Errors

- listing_id missing (PENDING_LIVE_FETCH) — cannot verify against Etsy yet

## L03 — Small Business Analytics Dashboard

- **listing_id:** _null / PENDING_LIVE_FETCH_
- **strict result:** FAIL

### Before

- title: _unknown_
- tags (0): _unknown_
- opening: _unknown_
- state: _unknown_

### After (proposed)

- title: Small Business Analytics Dashboard CSV Sales Charts, Privacy-First Data Studio, Digital Download
- tags (13): business dashboard, csv analytics, sales dashboard, data dashboard, analytics tool, small business bi, chart dashboard, data visualization, react dashboard, digital download, csv upload tool, business charts, privacy dashboard
- opening: Small business analytics dashboard: turn CSV sales, customer and review data into interactive charts. Privacy-first workflow. Digital download — not a hosted SaaS plan.

### Errors

- listing_id missing (PENDING_LIVE_FETCH) — cannot verify against Etsy yet

## L04 — Tiling Contractor Website Template

- **listing_id:** _null / PENDING_LIVE_FETCH_
- **strict result:** FAIL

### Before

- title: _unknown_
- tags (0): _unknown_
- opening: _unknown_
- state: _unknown_

### After (proposed)

- title: Tiling Contractor Website Template with Tile Calculator, Flooring Quote Site, Responsive Digital Download
- tags (13): tiling website, tile calculator, contractor site, flooring website, renovation site, website template, html css template, responsive website, digital download, small business web, quote form website, bathroom tile site, lead capture form
- opening: Tiling contractor website template with an interactive tile calculator for area, boxes and wastage guidance. Digital download — preliminary estimates only.

### Errors

- listing_id missing (PENDING_LIVE_FETCH) — cannot verify against Etsy yet

## L05 — Wellness Website Template

- **listing_id:** _null / PENDING_LIVE_FETCH_
- **strict result:** FAIL

### Before

- title: _unknown_
- tags (0): _unknown_
- opening: _unknown_
- state: _unknown_

### After (proposed)

- title: Wellness Website Template for Spa Skincare & Beauty Salon, React Studio Site, Digital Download
- tags (13): wellness website, spa website, skincare website, beauty salon site, wellness studio, salon website, website template, react website, digital download, small business web, responsive website, beauty business, spa landing page
- opening: Wellness website template for spas, skincare studios and beauty salons. React digital download with themes and a simple consultation preference finder — not medical advice.

### Errors

- listing_id missing (PENDING_LIVE_FETCH) — cannot verify against Etsy yet

## L06 — Pest Control Website Template

- **listing_id:** _null / PENDING_LIVE_FETCH_
- **strict result:** FAIL

### Before

- title: _unknown_
- tags (0): _unknown_
- opening: _unknown_
- state: _unknown_

### After (proposed)

- title: Pest Control Website Template for Exterminators, Termite & Local Service Site, Responsive Digital Download
- tags (13): pest control site, exterminator site, termite website, rodent control web, fumigation site, local service site, website template, html css template, responsive website, digital download, small business web, quote form website, lead capture form
- opening: Pest control website template for exterminators and termite services. Mobile-ready local business site with quote and WhatsApp paths. Digital download — fictional demo content.

### Errors

- listing_id missing (PENDING_LIVE_FETCH) — cannot verify against Etsy yet

## L07 — Zen Skin Studio Website Template

- **listing_id:** _null / PENDING_LIVE_FETCH_
- **strict result:** FAIL

### Before

- title: _unknown_
- tags (0): _unknown_
- opening: _unknown_
- state: _unknown_

### After (proposed)

- title: Skincare Studio Website Template Aesthetic Beauty Salon Site, Static HTML CSS, Digital Download
- tags (13): skincare website, beauty salon site, aesthetic website, spa website, beauty studio web, salon website, website template, html css template, responsive website, digital download, small business web, beauty business, clinic marketing
- opening: Skincare studio website template for beauty and aesthetic marketing sites. Static HTML digital download with easy rebrand config — not a medical records system.

### Errors

- listing_id missing (PENDING_LIVE_FETCH) — cannot verify against Etsy yet

## L08 — Solar Website Template

- **listing_id:** _null / PENDING_LIVE_FETCH_
- **strict result:** FAIL

### Before

- title: _unknown_
- tags (0): _unknown_
- opening: _unknown_
- state: _unknown_

### After (proposed)

- title: Solar Installer Website Template with Savings Calculator, Renewable Energy Contractor Site, Digital Download
- tags (13): solar website, solar installer, renewable energy, contractor website, electrician site, green energy web, website template, html css template, responsive website, digital download, small business web, lead capture form, savings calculator
- opening: Solar installer website template for renewable energy contractors. Mobile-ready lead site with savings calculator guidance. Digital download — not a utility quote.

### Errors

- listing_id missing (PENDING_LIVE_FETCH) — cannot verify against Etsy yet

## L09 — Precision Laser Website Template

- **listing_id:** _null / PENDING_LIVE_FETCH_
- **strict result:** FAIL

### Before

- title: _unknown_
- tags (0): _unknown_
- opening: _unknown_
- state: _unknown_

### After (proposed)

- title: Laser Cutting Website Template with Engraving Quote Planner, Signage and Fabrication Business Website, Responsive Digital Download
- tags (13): laser cutting site, engraving website, signage website, quote planner, fabrication site, maker business web, acrylic laser site, website template, html css template, digital download, small business web, lead capture form, responsive website
- opening: Laser cutting website template with Engraving Quote Planner — turn vague “how much to laser this?” messages into production-ready quote briefs. Digital download.

### Errors

- listing_id missing (PENDING_LIVE_FETCH) — cannot verify against Etsy yet

### Warnings

- optional/future listing — skip apply until product exists on Etsy

## SEO proposal validation (ignoring missing listing_id)

- L01: SEO fields OK
- L02: SEO fields OK
- L03: SEO fields OK
- L04: SEO fields OK
- L05: SEO fields OK
- L06: SEO fields OK
- L07: SEO fields OK
- L08: SEO fields OK
- L09: SEO fields OK

SEO-only failures: 0

## Apply command (do not run without explicit approval)

```bash
node scripts/etsy/apply-approved-listing-updates.mjs --approved
```

