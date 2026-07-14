# Listing Fact-Check — Precision Laser Website Template

Source draft: `handoff/grok/ETSY-CONVERSION-PACK.md` and
`handoff/grok/ETSY-TAGS.json` (agent/grok-commerce). Every `VERIFY_AFTER_BUILD`
claim below was checked against the actual merged codebase
(`clients/precision-laser-ct-claude/`), the 38-test unit suite, and the live
browser verification recorded in `handoff/FINAL-PRODUCT-FACTS.json`.

## Title

Used Grok's recommended title verbatim (130 characters, under the 140-char
limit): "Laser Cutting Website Template with Engraving Quote Planner, Signage
and Fabrication Business Website, Responsive Digital Download."

## Claims verified PASS (VERIFY_AFTER_BUILD hedge removed)

| Claim | Verification |
|---|---|
| Interactive Laser Cut & Engraving Quote Planner exists | Built, unit-tested (38/38), live-browser-verified, deployed and re-verified live |
| Material, thickness, size, quantity inputs | All present as documented in `FINAL-PRODUCT-FACTS.json` planner_inputs |
| File-preparation checklist | Present, keyed by file-readiness answer |
| Quote summary / structured brief | `result.summary` plain-text output, verified |
| Non-binding estimate disclaimer | `disclaimer.html` + inline copy + footer, exact required wording present |
| WhatsApp handoff, explicit-confirm, structured message | Verified live: zero sends before confirm, one correctly-encoded `wa.me` URL after |
| Email / mailto handoff | Verified in code and live, same confirm-gate pattern |
| `site-config.js` rebrand surface | Present; buyer guide documents every field |
| Configurable materials/rates | `planner.materials` with per-material rate range + engrave rate, editable |
| Theme switcher, 3 themes | Confirmed exact names: Graphite Laser, Cyan Blueprint, Amber Workshop |
| Responsive mobile layout | Verified live at 390×844 viewport, no horizontal overflow, working hamburger |
| Services + gallery sections | 7 services, gallery with labelled placeholder cards (not real photos) |
| Privacy/terms/disclaimer starters | All 3 pages present, each labelled as a non-legal-advice starting point |
| Buyer guide + licence + AI disclosure | All 5 buyer files created in Phase 6, verified 5-file count |
| No build tools required for ordinary use | Confirmed — `package.json` has only a `test` script, no build/lint step |
| Rates hideable (`budgetEnabled`) | Confirmed via unit tests and disabled-mode behaviour description |

## Claims corrected or removed (did not match the actual build)

- **"Process type: cut / engrave / mark"** rewritten to the actual 9 service
  types (cutting, engraving, cutting & engraving, signage, acrylic
  fabrication, trophy/award, branded gift, prototype, other) plus the actual
  9-material list, since "mark" is not a standalone service type in the
  build — metal marking is covered by the Metal Marking service section and
  the anodised-aluminium/stainless-steel materials, not a distinct planner
  option named "mark."
- **PRICE/CURRENCY placeholder line** removed from the final description —
  Etsy prices are a separate listing field, not description body text; this
  line existed only for Grok's internal tracking.
- **"Optional: a WhatsApp Business number"** simplified to "a WhatsApp
  number" — the template does not require or reference the WhatsApp
  Business product specifically, only a standard WhatsApp-reachable number.
- Removed all remaining `VERIFY_AFTER_BUILD`, `FINAL_SCREENSHOTS_PENDING`,
  and `FINAL_VIDEO_PENDING` markers from the final description — screenshots
  and video now exist (`seller-pack/media/`).

## Not yet resolved (left out of the description, handled separately)

- **Price / currency** — not stated anywhere in `final-description.txt`
  (correct — Etsy prices are a separate field). Per the release brief, the
  actual numeric price and currency must come from a confirmed value (the
  Francis Listing Manager shop currency, or explicit human confirmation) —
  see Phase 8/9 notes in `seller-pack/RELEASE-REPORT.md`.
- **Exact Etsy product URL** — not referenced anywhere in listing copy; only
  the verified live demo URL (`https://iederees-create.github.io/precision-laser-works-template/`)
  is used. No general Etsy shop URL is used anywhere as a product link.

## Compliance validation

- 13 tags, each ≤20 characters, unique — confirmed via
  `node scripts/release/validate-tags.mjs seller-pack/listing/final-tags.json`
  (passed).
- No exact-price claims, no medical/cosmetic laser confusion, no fake
  urgency/bestseller language, no fake reviews/certifications — manually
  reviewed against `listing-disclosures.md` above; none found in
  `final-description.txt`, `final-title.txt`, or `final-faq.md`.
- No general Etsy shop homepage used as a product URL anywhere in this
  package.
