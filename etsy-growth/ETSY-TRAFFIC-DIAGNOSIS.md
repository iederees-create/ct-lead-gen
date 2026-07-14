# Etsy Traffic Diagnosis — NextGenWebs

**Shop:** NextGenWebs (Etsy)  
**Role of this pack:** Discoverability recovery — not publishing automation  
**Date:** 2026-07-14  
**Traffic snapshot (owner-reported, not invented):**

| Source | Visits |
|---|---:|
| Etsy app & other Etsy pages | 4 |
| Direct & other | 1 |
| Etsy search | **0** |
| Etsy marketing & SEO | **0** |
| Social media | **0** |
| Etsy Ads | **0** |

**Interpretation (honest):** Almost no buyers are discovering listings through Etsy Search, Etsy SEO surfaces, social, or ads. The shop is effectively **invisible to search intent** and is not yet running a deliberate external traffic engine. Five total attributed visits is a cold-start / low-exposure problem, not proof that the products are unusable.

Do **not** invent rankings, conversion rates, or search volumes. Do **not** treat the generic shop URL `https://nextgenwebs.etsy.com` as an exact product link for ads or portfolio CTAs.

---

## 1. What the numbers actually say

1. **Etsy Search = 0** → titles, tags, category taxonomy, and listing relevance are not connecting to buyer queries *or* the shop has too little history/engagement for Etsy to surface listings. Both can be true at once; only SEO rewrites are under our control this week.
2. **Etsy marketing & SEO = 0** → no meaningful contribution from Etsy’s own marketing surfaces (email, ads network, SEO placements). Fix on-listing SEO first; paid later.
3. **Social = 0** → no measured referral traffic from Pinterest, YouTube, Facebook, LinkedIn, X, etc. External pins/posts either are not running or are not using **exact listing URLs**.
4. **Etsy Ads = 0** → ads are off or not spending. Good for budget; bad for cold-start. Run a **tiny, controlled test** only after titles/covers are fixed (Week 4).
5. **App/other + Direct = 5** → a few people opened listings (you, friends, Francis draft checks, portfolio curiosity). Not a market signal yet.

---

## 2. Root-cause map (evidence-based)

| Cause | Evidence in repo / shop behaviour | Impact on traffic |
|---|---|---|
| **Cold shop / low engagement history** | Near-zero visits across all sources | Etsy ranking systems have almost no behavioural signal |
| **Zero external funnel** | Social = 0; portfolio audit shows many projects without exact `etsyUrl` | No Pinterest/YouTube/LinkedIn → listing path |
| **Buyer-search language gaps** | Older batch titles lean on aesthetics (“Rose Gold Glassmorphism,” “Dark Mode UI”) over job titles (“pest control website,” “tiling website”) | Misses how owners type queries |
| **Artistic / project names in marketing** | “Bank Desert,” “InsightForge,” “Southern Suburbs,” “Vitality,” “Westlake,” “Zen Skin” as hero names | Fine as demo brands; weak as primary search titles |
| **Category / attribute consistency risk** | Digital website templates must be clearly **digital download**, correct taxonomy | Wrong attributes reduce search eligibility |
| **Cover images not search-thumbnail optimized** | Storyboards exist; live covers may still lead with brand art over benefit | Low CTR even if impressions appear later |
| **No listing video on some SKUs** | Video present for some packs (tiling/wellness media), not confirmed for all | Misses browse/video surfaces |
| **Ads off** | Ads visits = 0 | No paid assist during cold start |
| **Possible draft vs active mix** | Portfolio Etsy link audit: several products still “verify publication state” | If a listing is inactive/draft, it cannot get search traffic |

---

## 3. Active listing set for this recovery plan

Audited as **priority active / commercially positioned** products from seller packs, portfolio, and owner brief:

| ID | Product (buyer-facing name) | Type | Repo evidence |
|---|---|---|---|
| L01 | Construction Website Template | Local service website + quote planner | Southern Suburbs builders commerce pack |
| L02 | Bank Desert Analysis Project | Python / data education lab | Portfolio “Bank Desert Analysis Student Lab” |
| L03 | Small Business Analytics Dashboard | CSV analytics web app / dashboard | Portfolio “InsightForge Business Analytics Studio” |
| L04 | Tiling Contractor Website Template | Website + tile calculator | Tableview tiling seller pack |
| L05 | Wellness Website Template | Spa / beauty / wellness site (React) | Vitality wellness seller pack |
| L06 | Pest Control Website Template | Local service website | Westlake pest seller pack |
| L07 | Zen Skin Studio Website Template | Aesthetic / skincare studio site (static) | Zen Skin README + demo |
| L08 | Solar Website Template | Solar installer site + savings calculator | Portfolio AC Solar + industry solar listing copy |

**Out of primary scope for Week 1 rewrites (unless confirmed active on Etsy):** Summit Painting, Amore Nails, Pixel Perfect Hair, plumbing/window demos, Creator Hub, RAVERSUS (clinical portal — do not force into template SEO without product decision).

---

## 4. Diagnosis by channel

### 4.1 Etsy Search (highest strategic gap)

**Problem:** 0 visits.  
**Fix order:**

1. Rewrite **titles** so the first ~40–60 characters are pure buyer search language.  
2. Align **13 tags** to intent clusters (service + “website template” + “digital download” + differentiator).  
3. Open **description** with searchable benefit language (not demo brand storytelling).  
4. Confirm each listing is **Active**, digital, correct category, ships nowhere, files attached.  
5. Improve **cover CTR** so any future impressions convert to visits.

### 4.2 Etsy marketing & SEO surfaces

**Problem:** 0 visits.  
**Fix:** Same on-listing quality + complete attributes + video where allowed. No separate “SEO plugin” exists — Etsy SEO **is** the listing.

### 4.3 Social media

**Problem:** 0 visits.  
**Fix:** Pinterest-first (long shelf life for templates), then Shorts, then Facebook/LinkedIn. Always link **exact product URL** (`EXACT_ETSY_PRODUCT_URL_PENDING` until human pastes real listing URLs into a private URL sheet).

### 4.4 Etsy Ads

**Problem:** 0 visits / not running.  
**Fix:** Week 4 micro-budget test on **1–2 strongest SEO-ready listings only** after rewrites. Cap spend. Kill losers fast. See `ETSY-ADS-TEST-PLAN.md`.

### 4.5 Direct / app

**Use:** QA, friends-and-family, Francis checks. Do not optimise for this as a growth channel.

---

## 5. Products most likely to earn search traffic first

Ranked for **search recovery potential** (buyer clarity × niche intent × package maturity) — **not** a sales forecast:

| Rank | Listing | Why first |
|---|---|---|
| 1 | **Pest Control Website Template** | Clear vertical keywords; mature seller pack; simple static template story |
| 2 | **Tiling Contractor Website Template** | Differentiator (tile calculator / quote planner) + clear trade keywords |
| 3 | **Construction Website Template** | High-intent “builder/contractor website” language if title leads with that |
| 4 | **Solar Website Template** | Clear installer niche; avoid “Claude Code” as primary search phrase |
| 5 | **Wellness Website Template** | Competitive beauty niche but strong “spa/salon website template” intent |
| 6 | **Zen Skin Studio Website Template** | Overlaps wellness; needs distinct “skincare studio / aesthetic clinic website” language without medical claims |
| 7 | **Small Business Analytics Dashboard** | Different category (tools/education/software-ish); buyers exist but Etsy behaviour differs from craft |
| 8 | **Bank Desert Analysis Project** | Education/Python lab; narrower Etsy demand; portfolio+YouTube/Pinterest education may outperform pure Etsy search |

---

## 6. Weakest listings (discoverability risk)

| Listing | Weakness | Repair |
|---|---|---|
| Bank Desert Analysis | Project/course name not a common shopper query | Title as “Python data analysis project / student lab / census geospatial” |
| InsightForge-branded dashboard | Brand name steals first characters | Lead with “CSV analytics dashboard” / “small business analytics” |
| Solar if titled around “Claude Code” | Tool used ≠ buyer search | Lead with “solar installer website template” |
| Zen Skin if titled only with studio name | Brand-first | Lead with “skincare studio website template” |
| Any listing with aesthetic-jargon titles | Glassmorphism/rose-gold first | Move style words after intent keywords |
| Any listing without exact URL in external posts | Social stays at 0 | Maintain private exact-URL sheet |

---

## 7. Claims & compliance guardrails (non-negotiable)

- No guaranteed sales, rankings, or traffic.  
- No fake urgency or fabricated reviews.  
- No exact quote / binding price claims for planners/calculators.  
- No medical, clinical, or treatment outcome claims for wellness / Zen Skin.  
- Digital download + no physical product always stated.  
- Demo businesses are fictional.  
- Exact product URLs only — never shop homepage as the product link in growth content meant to convert.

---

## 8. 30-day recovery thesis

```
Week 1  Fix on-Etsy SEO + covers  →  become eligible for search
Week 2  Pinterest exact-URL pins →  first external visits
Week 3  Shorts + FB/LinkedIn     →  repeat external visits + saves
Week 4  Tiny Ads test + iterate  →  buy data on best SEO listings only
```

Success is **measured visits by source**, not vanity “we posted.” Weekly metrics are defined in `GROWTH-HANDOFF.md` and `30-DAY-TRAFFIC-CALENDAR.md`.

---

## 9. Immediate action list (human operator)

1. Export live listing titles/tags/URLs from Etsy into a private sheet (agents must not invent URLs).  
2. Apply rewrites from `TITLE-REWRITE-PACK.md` + `TAG-REWRITE-PACK.json` listing-by-listing.  
3. Rebuild covers using `COVER-IMAGE-HEADLINES.md`.  
4. Replace description openings with `DESCRIPTION-OPENING-REWRITES.md`.  
5. Start Pinterest board + 3 pins/listing for top 4 SKUs.  
6. Do **not** turn on Ads until Week 1 SEO + covers done.  
7. Do **not** publish new listings mid-fix without tagging them in the audit CSV.

---

## 10. Related files in this folder

| File | Purpose |
|---|---|
| `LISTING-SEO-AUDIT.csv` | Per-listing audit grid |
| `TITLE-REWRITE-PACK.md` | Titles + full 15-point packs |
| `TAG-REWRITE-PACK.json` | 13 tags each |
| `COVER-IMAGE-HEADLINES.md` | Cover H1/H2 |
| `DESCRIPTION-OPENING-REWRITES.md` | First 160 chars + openers |
| `PINTEREST-TRAFFIC-PLAN.md` | Pin engine |
| `YOUTUBE-SHORTS-PLAN.md` | Shorts engine |
| `FACEBOOK-LINKEDIN-POSTS.md` | FB + LinkedIn + X |
| `ETSY-ADS-TEST-PLAN.md` | Controlled ads |
| `30-DAY-TRAFFIC-CALENDAR.md` | Day-by-day plan |
| `GROWTH-HANDOFF.md` | Executive summary + weekly measures |
