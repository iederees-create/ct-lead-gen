# BUILD FACTS TO VERIFY — Southern Suburbs Builders Website Template

**Purpose:** Commerce copy in this folder was written from the product brief and the Westlake-style release pattern **before** Claude’s final build summary.  
**Rule:** Do **not** state a feature exists in public Etsy/portfolio copy until it is checked off here against the finished site + package.

**Owner after build:** Release / packaging agent or human reviewer  
**Commerce author:** Grok (`agent/grok-commerce`)  
**Last commerce draft:** 2026-07-13  

---

## How to use

1. Claude (or builder) finishes the commercial template.  
2. Reviewer opens the live demo + buyer ZIP.  
3. For each row: mark **PASS**, **FAIL**, or **N/A**, and note the evidence (file path / screenshot / commit).  
4. Update `etsy-listing-copy.md` / social pack to remove `VERIFY_AFTER_BUILD` only for PASS items.  
5. FAIL items must be removed from listing claims or fixed in code before draft publish.

---

## A. Core differentiator (must-pass for positioning)

| ID | Fact claimed in commerce | Evidence to collect | Status |
|---|---|---|---|
| A1 | Interactive Renovation Scope & Budget Planner exists | URL/section + UI screenshot | PENDING |
| A2 | Visitor can specify or select **project area** | Planner step/field | PENDING |
| A3 | Visitor can specify or select **scope** | Planner step/field | PENDING |
| A4 | Planner provides **complexity** guidance | Visible output | PENDING |
| A5 | Planner provides **preliminary budget guidance** | Visible output | PENDING |
| A6 | Planner produces a **structured quote request** | Summary payload fields listed | PENDING |
| A7 | UI states planner is **not a binding quotation** | Visible disclaimer copy | PENDING |
| A8 | Budget view surfaces **assumptions** or equivalent caution | Screenshot | PENDING |

---

## B. Lead handoff & contact

| ID | Fact | Evidence | Status |
|---|---|---|---|
| B1 | WhatsApp handoff from quote summary | Working `wa.me` or equivalent with structured text | PENDING |
| B2 | Click-to-call works with config phone | Mobile test | PENDING |
| B3 | Email CTA works with config email | Click test | PENDING |
| B4 | Quote form validation (if present) | Invalid submit blocked | PENDING |
| B5 | Print-friendly summary (if claimed) | Print preview | PENDING |

---

## C. Site structure & UX

| ID | Fact | Evidence | Status |
|---|---|---|---|
| C1 | Responsive mobile-first layout | 375 / 768 / 1280 widths | PENDING |
| C2 | Real mobile nav (hamburger or equivalent) | Mobile screenshot | PENDING |
| C3 | Services section for construction/renovation | Section present | PENDING |
| C4 | Gallery / project placeholders | Section present; not fake “real jobs” claims | PENDING |
| C5 | FAQ accordion (if claimed) | Keyboard operable preferred | PENDING |
| C6 | About / process / why-us sections | Present or removed from copy | PENDING |
| C7 | Footer legal links | Working links | PENDING |
| C8 | Custom 404 page | Route test on host | PENDING |

---

## D. Configuration & theming

| ID | Fact | Evidence | Status |
|---|---|---|---|
| D1 | Buyer-facing `site-config.js` (or documented equivalent) | File + fields | PENDING |
| D2 | Ordinary rebrand without HTML edits | Documented fields cover name/contact/services | PENDING |
| D3 | Multiple colour themes | Theme keys + visual proof | PENDING |
| D4 | Theme names documented for listing | Exact names for copy | PENDING |
| D5 | Planner assumptions/rates editable in config (if claimed) | Config keys | PENDING |

---

## E. SEO & technical hygiene

| ID | Fact | Evidence | Status |
|---|---|---|---|
| E1 | Unique meta title/description | View source | PENDING |
| E2 | Open Graph tags + share image | View source / file | PENDING |
| E3 | Structured data (if claimed) | JSON-LD present & valid-ish | PENDING |
| E4 | `robots.txt` | File | PENDING |
| E5 | `sitemap.xml` | File | PENDING |
| E6 | No required external paid APIs for core planner | Network tab on clean load | PENDING |
| E7 | Relative paths work on GitHub Pages subpath if used | Deploy test | PENDING |
| E8 | Console free of hard errors on load | DevTools | PENDING |
| E9 | `prefers-reduced-motion` support (if claimed) | CSS/media check | PENDING |
| E10 | Visible keyboard focus states (if claimed) | Tab through UI | PENDING |

---

## F. Legal, ethics, demo content

| ID | Fact | Evidence | Status |
|---|---|---|---|
| F1 | Demo business clearly fictional/sample | Copy on page or config comments | PENDING |
| F2 | No hard “fully insured / certified / guaranteed results” as facts | Content audit | PENDING |
| F3 | No invented star ratings presented as real | Content audit | PENDING |
| F4 | Privacy / Terms / estimate disclaimer pages | Files exist | PENDING |
| F5 | Disclaimer pages labelled as starters not legal advice | Buyer guide + pages | PENDING |
| F6 | No real client PII in demo | Audit | PENDING |
| F7 | Gallery does not claim unowned project photos as real completed jobs | Asset audit | PENDING |

---

## G. Buyer package (Etsy ≤5 digital files)

| ID | Fact | Evidence | Status |
|---|---|---|---|
| G1 | Clean ZIP without `.git`, secrets, `node_modules` | Unzip audit | PENDING |
| G2 | `START-HERE.html` or equivalent | File | PENDING |
| G3 | Complete buyer guide | File | PENDING |
| G4 | `LICENSE.txt` | File | PENDING |
| G5 | `AI-DISCLOSURE.txt` | File | PENDING |
| G6 | Support policy available (standalone or inside guide) | File section | PENDING |
| G7 | File count ≤5 buyer downloads after consolidation | Package manifest | PENDING |
| G8 | ASSET licenses documented if third-party assets used | ASSET-LICENSES or guide | PENDING |

---

## H. Demo & portfolio

| ID | Fact | Evidence | Status |
|---|---|---|---|
| H1 | Public demo URL live | HTTP 200 | PENDING |
| H2 | Demo URL matches listing | String compare | PENDING |
| H3 | Portfolio blurb uses only verified facts | Diff vs this checklist | PENDING |
| H4 | Portfolio has no `etsyUrl` pre-publish | Portfolio entry | PENDING |
| H5 | Listing images are real UI captures | Asset review | PENDING |
| H6 | Etsy ≤15s video matches product | Playback | PENDING |
| H7 | Portfolio 30–45s video matches product | Playback | PENDING |

---

## I. Commerce compliance cross-check

| ID | Item | Status |
|---|---|---|
| I1 | Exactly 13 tags, each ≤20 chars, unique | PASS in `etsy-tags.json` (re-check if edited) |
| I2 | Title ≤140 chars at paste time | PENDING human paste |
| I3 | Digital download / no physical item stated | In listing draft |
| I4 | AI disclosure stated | In listing draft |
| I5 | Refund wording subject to applicable law | In listing draft |
| I6 | Estimate non-binding disclaimer present | In listing draft |
| I7 | No invented trademarks in tags/titles | Review PASS pending final title pick |
| I8 | Price/currency confirmed in Francis (human) | NOT THIS AGENT |

---

## J. Open questions for builder (if not specified)

1. Exact planner step count and field names?  
2. Currency display and regional assumptions?  
3. Theme preset names?  
4. Is WhatsApp required or optional?  
5. Multi-page vs single-page architecture?  
6. Final public demo repo name + Pages URL?  
7. Any third-party fonts/icons and their licences?  
8. Does planner persist state in `localStorage`?  
9. Accessibility review completed?  
10. Final licence: client-work allowed?

---

## K. Sign-off

| Role | Name | Date | Notes |
|---|---|---|---|
| Build owner | | | |
| Commerce update | | | Remove VERIFY flags after PASS |
| Human listing reviewer | | | Before Publish |

**Publish gate:** All of section **A** must be PASS (or positioning rewritten). No FAIL in F (ethics) or G (package secrets).  

---

## L. Quick map — commerce files to update after verification

| File | Action |
|---|---|
| `etsy-listing-copy.md` | Delete VERIFY hedges for PASS features |
| `faq.md` | Align answers to real behaviour |
| `buyer-guide-draft.md` | Become source for HTML buyer guide |
| `seo-social-pack.md` | Insert real demo URL |
| `portfolio-case-study.md` | Insert liveUrl; keep etsyUrl empty until publish |
| `listing-image-storyboard.md` | Capture checklist |
| `video-storyboard.md` | Produce finals |
| `etsy-tags.json` | Only if search strategy changes |
| `market-positioning.md` | Optional tightening |

---

*End of verification checklist.*
