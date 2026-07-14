# Etsy Ads Test Plan — NextGenWebs

**Status:** Do **not** run ads until Week 1 SEO + cover fixes are live.  
**Current ads visits:** 0  
**Philosophy:** Buy a small amount of **learning**, not a big amount of hope.

No revenue guarantees. No “ROAS will be X” forecasts without data.

---

## Preconditions (gate)

Ads may start only when **all** are true:

- [ ] Listings Active (not draft)  
- [ ] Titles rewritten with buyer-search language (`TITLE-REWRITE-PACK.md`)  
- [ ] 13 tags applied (`TAG-REWRITE-PACK.json`)  
- [ ] Description openings updated  
- [ ] Cover images updated with benefit headlines  
- [ ] Digital download attributes correct  
- [ ] Exact product URLs recorded privately  
- [ ] Budget approved by human owner  

---

## Test design

### Phase A — Single-listing learning (7 days)

| Setting | Recommendation |
|---|---|
| **Listings** | Start with **one** only: **L06 Pest Control** (clearest vertical) |
| **Daily budget** | Small fixed cap (owner sets amount they can lose for data) |
| **Goal** | Measure cost per visit / click and whether search terms look relevant |
| **Bid strategy** | Start with Etsy automatic; review search terms if UI exposes them |
| **Duration** | 7 full days without mid-week panic edits |

**Why L06 first:** Clear buyer language, mature pack, high search-recovery likelihood per diagnosis.

### Phase B — Challenger (7 days) if Phase A produces qualified visits

| Setting | Recommendation |
|---|---|
| **Listings** | Add **L04 Tiling** (differentiator calculator) **or** keep L06 only if tiling not live |
| **Budget** | Same daily cap split or slight increase only if Phase A visits were relevant |
| **Kill rule** | Pause any listing with clicks but zero listing views engagement / high irrelevant queries |

### Phase C — Optional third (only if A/B worked)

Candidates: **L01 Construction** or **L08 Solar**.  
Do **not** ads-push L02 Bank Desert early (education niche; better organic YouTube/Pinterest).  
Do **not** ads-push brand-first titles that were not rewritten.

---

## What “success” means in a cold shop

| Signal | Read as |
|---|---|
| Ads visits > 0 | Channel works technically |
| Listing views from ads with >30s dwell (if available) | Creative/title relevant |
| Favourites from ads | Interest |
| Orders | Possible but **not required** to learn in week 1 of ads |
| Irrelevant search terms | Rewrite title/tags or negative where platform allows |

Failure is only “spend with zero learning.” Zero orders after $tiny test ≠ product death.

---

## Budget guardrails

1. Hard monthly ads ceiling set by human before start  
2. No “boost everything” across all 8 SKUs  
3. Pause immediately if charges exceed cap  
4. Do not raise budget because of anxiety—only because of relevant visit data  

Suggested structure (amounts are **framework**, not prescribed currency values):

```
Week 4 total ads ≤ amount you accept as pure market research
50–70% → L06
30–50% → L04 (if live and SEO-ready)
0% → unfixed titles
```

---

## Creative for ads

Ads inherit listing cover + title. Therefore:

- Cover must pass thumbnail test (`COVER-IMAGE-HEADLINES.md`)  
- Title must lead with buyer language  
- First image should not be abstract art only  

Optional: ensure listing video uploaded; some surfaces prefer motion.

---

## Tracking sheet columns

```
date
listing_id
ad_spend
ad_clicks_or_visits
etsy_ads_visits (shop stats)
listing_views
favourites
orders
notes_on_queries
action (keep/pause/rewrite)
```

---

## Decisions after 14 days of ads data

| Outcome | Action |
|---|---|
| Relevant visits, no orders | Keep tiny ads; improve images 2–5 + FAQ; add social proof only if real |
| Irrelevant visits | Title/tag rewrite; pause ads |
| Orders with acceptable cost | Scale that SKU slowly |
| No visits despite spend | Check listing Active, ads running, billing, region targeting |

---

## Explicit non-goals

- Not competing with big craft brands on huge budgets  
- Not running ads on unfinished drafts  
- Not using ads to hide broken SEO  
- Not inventing attribution screenshots  
