# Listing A/B Test Plan — Precision Laser Website Template

**Platform:** Etsy  
**Constraint:** Etsy does not always offer clean simultaneous A/B tools—treat this as a **sequential test plan** (change one variable per window).  
**Do not** fake urgency or bestseller badges as a “test.”

---

## Goals (primary → secondary)

1. **Listing visit → favourite** rate  
2. **Visit → conversion** (purchase)  
3. **Questions quality** (fewer “is this physical?” / medical-laser mismatches)  
4. **Refund rate** (watch after any price or claim change)

---

## Test windows

| Window | Duration | Notes |
|---|---|---|
| Baseline | 14 days | Ship recommended title + cover |
| Test N | 14 days each | One change only |
| Learn | 3 days | Document winner before next test |

If traffic is very low, extend windows rather than reading noise.

---

## Hypothesis backlog

### T1 — Title emphasis

| Variant | Title angle |
|---|---|
| A (control) | Laser Cutting Website Template with Engraving Quote Planner, Signage and Fabrication Business Website, Responsive Digital Download |
| B | Laser Engraving Website Template — Cut & Engrave Quote Planner for Signage Shops \| HTML CSS Digital Download |
| C | Signage Website Template with Laser Cut Quote Planner \| Engraving Business Site \| Responsive Digital Download |

**Metric:** conversion + search impressions if available  
**Watchout:** stay ≤140 chars; no trademark stuffing

### T2 — Cover headline

| Variant | Cover text |
|---|---|
| A | From vague laser chats to quote-ready briefs |
| B | Laser Cut & Engraving Quote Planner — built in |
| C | Ask material, thickness, size & files before you price |

**Metric:** click-through from search/browse + favourite rate  
**Requires:** `FINAL_SCREENSHOTS_PENDING` resolved

### T3 — Opening 160 characters

| Variant | Opening |
|---|---|
| A | Laser cutting website template with Engraving Quote Planner — turn vague “how much to laser this?” messages into production-ready quote briefs. Digital download. |
| B | Website template for laser cutting, engraving & signage shops. Structured quote planner for material, thickness, size & files. Digital download — not a physical product. |
| C | Stop quoting from napkin photos. Precision Laser template adds a Laser Cut & Engraving Quote Planner with WhatsApp/email handoff. Digital download. |

### T4 — Price (only after `CONFIRMED_PRICE_PENDING` set)

Test **one** step up/down at a time within brand strategy.  
Document currency: `CONFIRMED_CURRENCY_PENDING`.  
Never “compare-at” fake discounts.

### T5 — Video vs no video

| Variant | Media |
|---|---|
| A | 10 images, no video |
| B | Same images + 15s video (`FINAL_VIDEO_PENDING`) |

**Metric:** conversion; watch bounce on mobile

### T6 — Tags reorder / swap (keep 13)

Swap 1–2 lower performers for alternatives still ≤20 chars, e.g.:

- `trophy website` (15)  
- `acrylic cutting` (15)  
- `workshop website` (16)

Do not exceed 13 tags. Re-check uniqueness.

---

## What not to test

- Guaranteed lead claims  
- Medical laser keywords  
- Fake reviews  
- Misleading “physical + digital” categories  
- Using shop homepage as product URL in external ads

---

## Logging template

```
Date:
Variant ID:
Change:
Traffic notes:
Visits:
Favourites:
Orders:
Messages (themes):
Refunds:
Decision: ship / revert / iterate
```

---

## Decision rules (lightweight)

- Prefer **conversion** over vanity favourites if sample allows.  
- If messages show niche confusion (medical lasers), fix **title/tags/cover** before price tests.  
- If refunds cite “thought it was physical,” strengthen digital notices in images 1 and 10.  
- Revert any variant that increases defects or policy risk.

---

## Pre-test checklist

- [ ] All `VERIFY_AFTER_BUILD` claims true or removed  
- [ ] Screenshots final  
- [ ] Price/currency confirmed  
- [ ] Exact product URL recorded for ads/portfolio  
- [ ] Human approved listing copy  
