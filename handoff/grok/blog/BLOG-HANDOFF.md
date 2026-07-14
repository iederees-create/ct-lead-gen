# Blog Handoff — Construction Quote Planner SEO Package

**Branch:** `agent/grok-commerce`  
**Agent ownership:** `handoff/grok/` and `seller-pack/drafts/` only  
**Date:** 2026-07-13  

This package is ready for **Claude / portfolio integration**. Do not publish the article, contact Etsy, or merge to main from this commerce branch as part of this handoff.

---

## Article files

| File | Role |
|---|---|
| `handoff/grok/blog/construction-website-quote-planner.md` | Full SEO article draft |
| `handoff/grok/blog/construction-website-quote-planner-metadata.json` | Titles, meta, OG, JSON-LD drafts, CTA rules |
| `handoff/grok/blog/blog-media-plan.md` | Hero, screenshots, diagram, OG image plan |
| `handoff/grok/blog/blog-promotion-pack.md` | Social + email distribution copy |
| `handoff/grok/blog/BLOG-HANDOFF.md` | This file |

Related commerce context (existing):

- `handoff/grok/etsy-listing-copy.md`  
- `handoff/grok/market-positioning.md`  
- `handoff/grok/portfolio-case-study.md`  
- `handoff/grok/BUILD-FACTS-TO-VERIFY.md`  
- `seller-pack/drafts/listing-copy-ready.txt`  

---

## Recommended title

**H1 / working title:**  
How to Build a Construction Website That Generates Better Quote Requests

**SERP page title:**  
Construction Website Quote Planner: Better Builder Lead Forms

---

## Recommended slug

```
/blog/construction-website-quote-planner/
```

Full path placeholder:

```
CANONICAL_SITE_ORIGIN/blog/construction-website-quote-planner/
```

---

## Primary keyword

**Primary:** `construction website template`  

**Strong co-targets (not stuffed):** construction quote form, builder website template, builder lead generation, renovation quote calculator, contractor website design  

No fabricated keyword volumes.

---

## CTA rules

| Level | Label | URL | Enabled |
|---|---|---|---|
| **Soft** | Try the live Renovation Scope & Budget Planner demo | `https://iederees-create.github.io/southern-suburbs-builders-ct/` | **Yes** |
| **Mid** | View the complete Southern Suburbs Builders Website Template case study | `PORTFOLIO_PROJECT_URL` | **When portfolio route confirmed** |
| **Purchase** | Buy the template on Etsy | `ETSY_PRODUCT_URL_PENDING_PUBLICATION` | **No — hidden/disabled until exact public product URL** |

### Hard rules

1. Do **not** link the purchase CTA to a generic Etsy shop homepage.  
2. Do **not** invent an Etsy product URL.  
3. Add the exact Etsy product URL **only after** the human owner has publicly published the listing.  
4. Soft CTA (demo) is the default conversion action until purchase is live.  
5. Never promise first-page Google rankings or guaranteed leads.

---

## Media still required

Capture only after final product UI exists (`VERIFY_AFTER_BUILD`):

1. Hero / editorial graphic  
2. Renovation Scope & Budget Planner overview  
3. Project-input screen  
4. Budget-range screen (disclaimer readable)  
5. Quote-summary screen  
6. Mobile layout  
7. WhatsApp handoff  
8. Process diagram (can be designed without final UI, then refreshed)  
9. Open Graph 1200×630 social image  

Details: `blog-media-plan.md`  
**Do not use fake project photographs.**

---

## Product facts requiring verification

Mark shipped only when confirmed in Claude’s final build summary:

| Fact | Status |
|---|---|
| Interactive Renovation Scope & Budget Planner | VERIFY_AFTER_BUILD |
| Visitor can define project (type/area/constraints) | VERIFY_AFTER_BUILD |
| Preliminary scope + budget ranges | VERIFY_AFTER_BUILD |
| Identify required trades | VERIFY_AFTER_BUILD |
| Photo checklist | VERIFY_AFTER_BUILD |
| Structured quote request / summary | VERIFY_AFTER_BUILD |
| Configurable calculator assumptions | VERIFY_AFTER_BUILD |
| WhatsApp handoff | VERIFY_AFTER_BUILD |
| Email handoff | VERIFY_AFTER_BUILD |
| Responsive construction layout | VERIFY_AFTER_BUILD |
| Central business configuration (`site-config.js` or equivalent) | VERIFY_AFTER_BUILD |
| Three visual themes | VERIFY_AFTER_BUILD |
| Digital download packaging (no physical product) | Commercial model — package VERIFY_AFTER_BUILD |
| On-page non-binding estimate disclaimer | VERIFY_AFTER_BUILD |
| Fictional demo content clearly replaceable | VERIFY_AFTER_BUILD |

Master checklist: `../BUILD-FACTS-TO-VERIFY.md` (extend with trades + photo checklist rows if not already present).

---

## Listing ↔ blog reconciliation

Reviewed against `handoff/grok/etsy-listing-copy.md` and `seller-pack/drafts/listing-copy-ready.txt` on 2026-07-13. Aligned messaging (listing updated to match blog product spine):

- Renovation Scope & Budget Planner  
- Preliminary budget ranges (never binding)  
- Configurable calculator assumptions (`VERIFY_AFTER_BUILD`)  
- Structured quote summaries  
- WhatsApp and email handoff (`VERIFY_AFTER_BUILD`)  
- Responsive construction website  
- Central business configuration  
- Three visual themes (`VERIFY_AFTER_BUILD`)  
- Digital download / no physical product  
- Trades identification + photo checklist (`VERIFY_AFTER_BUILD`)  

Honesty rules repeated in both surfaces:

- Real quotations depend on inspection, drawings, specifications, materials, labour, approvals and site conditions  
- Fictional demo info must be replaced  
- Do not publish “fully insured,” “certified,” “guaranteed…” unless true  

Items still gated pending Claude’s final build confirmation remain marked `VERIFY_AFTER_BUILD` in the listing, article, media plan and metadata. Do not remove those gates until the finished product proves the shipped UI and package support the claim.

---

## Instructions for Claude — integrate into portfolio blog

1. **Do not edit** from this Grok ownership boundary if you are the site builder — use this package as source content.  
2. Create a portfolio blog route matching slug `/blog/construction-website-quote-planner/`.  
3. Convert markdown → site MDX/HTML/CMS entry; preserve H1–H3 hierarchy and FAQ.  
4. Inject metadata from `construction-website-quote-planner-metadata.json`:  
   - `pageTitle`, `metaDescription`  
   - Open Graph title/description/image  
   - `BlogPosting`, `BreadcrumbList`, `FAQPage` JSON-LD (replace `CANONICAL_SITE_ORIGIN` and date placeholders)  
5. Wire CTAs:  
   - Soft → live demo URL (enabled)  
   - Mid → portfolio project URL when known  
   - Purchase → keep disabled component or omit until `ETSY_PRODUCT_URL` is real  
6. Add images only from finished product captures per `blog-media-plan.md`.  
7. Cross-link related templates (tiling, pest control, solar) and services pages when those URLs exist.  
8. Set `datePublished` / `dateModified` on human publish — not before.  
9. Smoke-test mobile, internal links, and that no generic Etsy shop URL is used as product CTA.  
10. Optional: schedule items from `blog-promotion-pack.md` after the post is live.

---

## Instruction — Etsy URL

```
ETSY_PRODUCT_URL_PENDING_PUBLICATION
```

Replace this placeholder **once** with the exact active product listing URL after publication.  
Until then: hide/disable purchase CTA; use demo + case study only.

---

## Out of scope for this handoff

- Website source changes  
- 3D Portfolio code edits (integration is a separate step)  
- Etsy contact / draft publish  
- Merging `agent/grok-commerce` into `main`  
- Generating final screenshots/video  

---

## Done definition for portfolio agent

- [ ] Article live at recommended slug  
- [ ] Meta + JSON-LD valid  
- [ ] Demo CTA works  
- [ ] Purchase CTA gated correctly  
- [ ] Media uses real product UI only  
- [ ] No rank/lead guarantees  
- [ ] Product claims match verified build  

---

*End of blog handoff.*
