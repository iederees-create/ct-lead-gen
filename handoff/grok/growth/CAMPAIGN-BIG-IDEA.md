# Campaign Big Idea — Growth Layer

**Product:** Southern Suburbs Builders Website Template  
**Branch:** `agent/grok-commerce`  
**Layer:** `handoff/grok/growth/` (extends, does not replace, prior commerce/campaign packs)  
**Build status:** Claude still building site + planner · Codex on QA/release · **no invented finished features**

---

## Big idea

**From vague enquiries to build-ready leads.**

> “Hi, how much to renovate my house?”  
> becomes a defined project type, measurements, finish level, required trades, site conditions, preliminary budget assumptions, missing information, structured brief, and site-visit request.

**Positioning line:**  
This is not merely a construction website.  
It is a **lead-generation and project-qualification system** for builders.

---

## Core product (intent — verify after build)

### Planner inputs (product intent)
project type · measurements · rooms · finish level · demolition · plumbing · electrical · structural · waterproofing · roofing · flooring · painting · access · timeline · target budget · suburb · contact · notes  

### Planner outputs (product intent)
preliminary scope · area calculations · configurable budget range · trade checklist · assumptions · missing-info checklist · photo checklist · site-visit recommendation · structured quote summary · WhatsApp handoff · email handoff · print/download summary  

**Hard truth:** output is **not** a binding construction quotation. Price depends on drawings, specifications, materials, labour, approvals, access and site conditions.

All shipped UI claims: `VERIFY_AFTER_BUILD`.

---

## Target buyers

Builders · construction companies · renovation contractors · extension specialists · project managers · paving / boundary-wall contractors · home-improvement businesses · web designers serving construction clients  

---

## Allowed channels only

Etsy · 3D Portfolio · portfolio SEO blog · Facebook personal + page · Instagram · LinkedIn · X · Pinterest · YouTube · email · Udemy · communities where promotion is allowed  

**Do not create assets for:** Creem, Gumroad, Payhip, Shopify, WooCommerce, Lemon Squeezy, Creative Market, Envato, Creative Fabrica, Ko-fi, or other marketplaces.

---

## Narrative acts

| Act | Days | Message |
|---|---|---|
| 1 | 1–2 | Vague enquiries are not quote requests; price needs scope |
| 2 | 3–5 | Planner qualifies leads; structured brief; transparency builds trust |
| 3 | 6–7 | Full system + launch |

---

## Placeholder registry (use consistently)

| Key | Meaning |
|---|---|
| `LIVE_DEMO_URL_PENDING_VERIFICATION` | Demo URL after Claude/Codex confirm |
| `PORTFOLIO_PROJECT_URL_PENDING` | Portfolio showcase route |
| `BLOG_URL_PENDING` | SEO blog article URL |
| `EXACT_ETSY_PRODUCT_URL_PENDING_PUBLICATION` | Exact product listing only |
| `UDEMY_COURSE_URL_PENDING` | Course not built yet |
| `ACTUAL_HOMEPAGE_SCREENSHOT` | Real UI |
| `ACTUAL_MOBILE_SCREENSHOT` | Real UI |
| `ACTUAL_PLANNER_SCREENSHOT` | Real UI |
| `ACTUAL_PROJECT_SUMMARY_SCREENSHOT` | Real UI |
| `ACTUAL_LISTING_COVER` | Real cover |
| `ACTUAL_VIDEO` | Real product video |
| `FINAL_SCREENSHOTS_PENDING` | Listing media gate |
| `FINAL_VIDEO_PENDING` | Listing video gate |
| `CONFIRMED_PRICE_PENDING` | Human pricing |
| `CONFIRMED_CURRENCY_PENDING` | Shop currency |

**Never** use a generic shop homepage as the product listing URL.

---

## Prior work to preserve (do not duplicate as source of truth)

| Path | Role |
|---|---|
| `handoff/grok/etsy-listing-copy.md` | Original listing draft |
| `handoff/grok/campaign/*` | First 7-day creative pack |
| `handoff/grok/blog/*` | SEO article package |
| `handoff/grok/BUILD-FACTS-TO-VERIFY.md` | Verification gate |

Growth files are the **integrated go-to-market layer**. Prefer growth + verify against prior packs.

---

## Voice

Direct · practical · intelligent · slightly humorous · useful · non-corporate · not desperate  

**Banned:** fake scarcity, guaranteed leads/sales/estimate accuracy, bestseller claims, fake reviews, fake completed-client photos.

---

## Funnel (one line)

Search/social → blog (`BLOG_URL_PENDING`) → portfolio project (`PORTFOLIO_PROJECT_URL_PENDING`) → live demo (`LIVE_DEMO_URL_PENDING_VERIFICATION`) → exact Etsy URL → purchase  
