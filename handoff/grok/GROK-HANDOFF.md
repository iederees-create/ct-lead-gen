# Grok Handoff — Precision Laser Website Template

**Agent:** Grok commerce (`agent/grok-commerce`)  
**Date:** 2026-07-14  
**Product:** Precision Laser Website Template  
**Core feature positioning:** Laser Cut & Engraving Quote Planner  
**Sales platform:** Etsy only  

---

## Files created (this workstream)

### `handoff/grok/` (flat package)

| File | Purpose |
|---|---|
| `COMMERCE-INTAKE.md` | Product direction, buyers, claims to avoid, verification list |
| `ETSY-CONVERSION-PACK.md` | Titles, description, FAQs, CTAs, objections |
| `ETSY-TAGS.json` | Exactly 13 tags ≤20 chars |
| `LISTING-IMAGE-STORYBOARD.md` | 10 listing images planned |
| `VIDEO-STORYBOARD.md` | 15s / 30–45s / 2–4 min plans |
| `BUYER-GUIDE-DRAFT.md` | Buyer guide source for packaging |
| `PORTFOLIO-CONVERSION-PACK.md` | 3D Portfolio copy (do not edit portfolio from here) |
| `BLOG-PACK.md` | Full SEO article + metadata + JSON-LD drafts |
| `SEO-CONTENT-FUNNEL.md` | Funnel + keyword clusters + pin/video ideas |
| `7-DAY-LAUNCH-CAMPAIGN.md` | Day-by-day multi-platform campaign |
| `SOCIAL-CONTENT-BANK.md` | Evergreen social bank |
| `PINTEREST-PACK.md` | Pins and boards |
| `YOUTUBE-PACK.md` | Walkthrough + Shorts |
| `EMAIL-SEQUENCE.md` | Launch + post-purchase emails |
| `COMMENT-REPLY-BANK.md` | Public comment replies |
| `CUSTOMER-SUPPORT-REPLIES.md` | Etsy support macros |
| `LISTING-AB-TEST-PLAN.md` | Sequential listing tests |
| `GROK-HANDOFF.md` | This file |

### `seller-pack/drafts/`

| File | Purpose |
|---|---|
| `listing-copy-ready.txt` | Paste-ready title/summary/tags pointer |
| `tags-13.txt` | 13 tags plain list |
| `README.md` | Draft folder usage |

**Note:** Older southern-suburbs commerce files may still exist under nested `handoff/grok/growth/`, `campaign/`, `blog/` from prior branch history. **Authoritative Precision Laser package is the flat file list above.**

---

## Strongest Etsy title

```
Laser Cutting Website Template with Engraving Quote Planner, Signage and Fabrication Business Website, Responsive Digital Download
```

---

## 13 tags

1. laser cutting site  
2. engraving website  
3. signage website  
4. quote planner  
5. fabrication site  
6. maker business web  
7. acrylic laser site  
8. website template  
9. html css template  
10. digital download  
11. small business web  
12. lead capture form  
13. responsive website  

---

## Strongest campaign hook

**“This is not a laser quote request.”**  
(Campaign narrative: From vague laser enquiries to production-ready quote briefs.)

---

## Blog title and slug

| Field | Value |
|---|---|
| **Title** | How to Build a Laser Cutting Website That Gets Better Quote Requests |
| **Slug** | `laser-cutting-website-quote-planner` |
| **Status** | Draft only — not published |

---

## Media still required from Claude

| Item | Marker |
|---|---|
| Stable finished site UI | `VERIFY_AFTER_BUILD` |
| All 10 listing screenshots | `FINAL_SCREENSHOTS_PENDING` / `REQUIRES_FINAL_SCREENSHOT` |
| 15s Etsy video source frames | `FINAL_VIDEO_PENDING` |
| Portfolio 30–45s video frames | `FINAL_VIDEO_PENDING` |
| YouTube walkthrough capture | `FINAL_VIDEO_PENDING` |
| Confirmed feature list for planner steps | build summary |
| Theme names + count | build summary |
| Exact buyer file names | package list |
| Live demo URL | `LIVE_DEMO_URL_PENDING_VERIFICATION` |

---

## QA required from Codex

- Planner happy path + disclaimer visibility  
- WhatsApp/email handoff correctness  
- Mobile breakpoints  
- Config rebrand without HTML edits for ordinary fields  
- No medical-laser copy leftover from legacy seed  
- No unsupported claims (ratings, insurance, guarantees)  
- Privacy posture matches listing claims  
- Buyer ZIP hygiene (no secrets, no `.git`)  
- Accessibility smoke (labels, keyboard on planner)  

---

## Facts requiring verification

See full table in `COMMERCE-INTAKE.md` (F1–F20). High priority:

1. Planner exists with material/thickness/size/qty/process  
2. File checklist exists  
3. Summary + non-final price disclaimer  
4. WhatsApp + email handoff  
5. `site-config.js` (or equivalent)  
6. Themes  
7. Static stack confirmation  
8. Licence/resale wording  
9. Support window text  
10. Demo fully fictional  

---

## Placeholders still pending

```
FINAL_SCREENSHOTS_PENDING
FINAL_VIDEO_PENDING
CONFIRMED_PRICE_PENDING
CONFIRMED_CURRENCY_PENDING
EXACT_ETSY_PRODUCT_URL_PENDING_PUBLICATION
LIVE_DEMO_URL_PENDING_VERIFICATION
PORTFOLIO_PROJECT_URL_PENDING
VERIFY_AFTER_BUILD
REQUIRES_FINAL_SCREENSHOT
PUBLICATION_DATE_PENDING (blog JSON-LD)
PORTFOLIO_OG_IMAGE_PENDING
PORTFOLIO_HOME_URL_PENDING
PORTFOLIO_BLOG_INDEX_URL_PENDING
```

---

## Instructions for final integration

### Claude (site)

1. Rebuild Precision Laser as cutting/engraving/fabrication demo — **not** aesthetic/medical clinic.  
2. Implement Laser Cut & Engraving Quote Planner per product brief.  
3. Emit a build summary mapping F1–F20 pass/fail.  
4. Provide screenshot-ready demo URL.

### Codex (QA / release packaging)

1. QA against commerce claims; strip or fix failures.  
2. Produce buyer ZIP + Francis pack assets from verified facts only.  
3. Generate real listing images/video from storyboards.  

### Portfolio agent (human-gated)

1. Add project using `PORTFOLIO-CONVERSION-PACK.md`.  
2. Set `liveUrl` when demo verified.  
3. **Do not** set `etsyUrl` until exact public product URL exists.  
4. Optionally publish blog from `BLOG-PACK.md` (still draft until human says publish).

### Francis / Etsy (human)

1. Import listing draft from verified copy + media.  
2. Set price/currency.  
3. **Human publishes manually** — agents never publish.  
4. After publish, replace `EXACT_ETSY_PRODUCT_URL_PENDING_PUBLICATION` everywhere and enable Etsy CTAs.

### Marketing

1. Run `7-DAY-LAUNCH-CAMPAIGN.md` education days pre- or post-listing.  
2. Day 7 hard sell only with exact product URL.  
3. Use support + comment banks for replies.

---

## Explicit non-actions completed correctly

- Did **not** edit website source as commerce agent ownership  
- Did **not** edit 3D Portfolio repo  
- Did **not** edit Francis Listing Manager  
- Did **not** publish Etsy  
- Did **not** create Creem/Gumroad/Payhip/Shopify/etc. packs  
- Did **not** push to `main` or merge  

---

## Branch expectation

- Branch: `agent/grok-commerce`  
- Commit message: `Add precision laser Etsy SEO and launch strategy`  
- Push: `origin/agent/grok-commerce` only  
