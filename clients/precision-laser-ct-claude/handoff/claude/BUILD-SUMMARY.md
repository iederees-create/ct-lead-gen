# Build Summary — Precision Laser Website Template

Branch: `agent/claude-site` · Location: `clients/precision-laser-ct-claude/`

## Architecture

Static HTML/CSS/JS, no build step, matching the established pattern in this
monorepo (see `clients/southern-suburbs-builders-claude/` as the reference
implementation this build's structure was modeled on).

```
index.html          Single-page site: all 28 required sections
style.css            Full design system + 3 theme variants (CSS custom properties)
site-config.js        Central editable config (window.SITE_CONFIG) — business
                       identity, contact, services, materials, planner rates/
                       multipliers, themes, legal/disclaimer text. Buyers edit
                       only this file.
planner.js           Pure calculation engine for the Laser Cut & Engraving
                       Quote Planner (UMD: works in-browser and under Node for
                       tests). Zero DOM access — every function takes plain
                       data in, returns plain data out.
app.js               DOM rendering + all interactivity: config-driven section
                       rendering, nav/FAQ accordions, theme switching, quote
                       form, and the Planner's UI wiring (reads/writes the
                       form, calls into planner.js, renders results).
privacy.html / terms.html / disclaimer.html / 404.html
                       Legal pages ("disclaimer.html" is the Quote Disclaimer)
                       + custom 404.
robots.txt / sitemap.xml / favicon.svg / og-image.svg
                       SEO/social assets.
package.json          `npm test` → node --test tests/planner.test.js
tests/planner.test.js  38 unit tests against planner.js.
handoff/claude/        This document + PROJECT-INTAKE.md.
```

**Why this split**: `planner.js` is deliberately free of DOM/browser globals so
its area/budget math can be unit-tested in Node without a browser or mocking
framework — `app.js` is the only file that touches `document`/`window` beyond
reading `SITE_CONFIG`.

## Implemented Features (mapped to the 28 required sections)

1. Announcement bar (config-driven, links to the Planner)
2. Responsive navigation
3. Mobile hamburger menu (fixed off-canvas panel)
4. Hero (with blueprint-grid decorative overlay)
5. Quote CTA (hero + nav + mobile bar)
6. WhatsApp CTA (hero + contact + mobile bar)
7. Services overview (jump-chip grid)
8–14. Laser Cutting / Laser Engraving / Signage / Acrylic Fabrication / Wood
   Engraving / Metal Marking / Corporate Gifts & Branded Products — each
   independently anchorable (`#laser-cutting`, `#laser-engraving`, etc.) with
   expandable detail
15. Materials section (9 materials, sourced from the same `planner.materials`
    config the Quote Planner uses — one source of truth, no duplication)
16. Project gallery — clearly labelled **replaceable placeholder cards**, not
    fake photography
17. Process section (6 steps)
18. File preparation section (static guidance + links into the Planner)
19. **Laser Cut & Engraving Quote Planner** — see below
20. Quote form (validated, explicit-confirm send)
21. FAQ (12 entries, accordion)
22. About section (business description + workshop-safety statement, no
    stats/ratings/certifications per the brief's claims restrictions)
23. Service areas (12 Cape Town industrial-area suburbs, editable)
24. Contact & workshop hours
25. Privacy Policy (`privacy.html`)
26. Terms of Service (`terms.html`)
27. Quote Disclaimer (`disclaimer.html`)
28. 404 page

### Deliberate omissions vs. the sibling reference build

The brief's Phase 3 section list does not include testimonials, team
profiles, or statistics, and Phase 6 explicitly lists "customer ratings" and
"completed project counts" among claims to avoid — unlike the sibling
construction-site build (which included clearly-labelled-fictional
testimonials/stats/team). This build omits those sections entirely rather
than including fictional-but-labelled versions; see `PROJECT-INTAKE.md` for
the full reasoning.

## The Laser Cut & Engraving Quote Planner

Inputs: contact details (name/email/phone/suburb), project name, service type
(9 options), material (9 options), material thickness (mm), width/height with
a unit selector (mm/cm/m/inches), quantity, optional engraving area, cut
complexity (4 levels), file readiness (4 levels), file types available (7
checkboxes: SVG/DXF/AI/PDF/PNG/JPG/none), finish (5 options), deadline,
delivery preference, notes.

Outputs: project summary, approximate material area (unit-converted to cm²/
m², per-piece), quantity summary, service checklist (per service type),
file-preparation checklist (per file-readiness level), missing-information
list, complexity indicator (Low/Medium/High with reasons), a design-support
warning whenever file readiness is anything other than "vector file ready",
a preliminary budget range gated behind `planner.budgetEnabled`, assumptions,
a next-step recommendation, and a full text summary.

Budget calculation: `area.cm2 × materialRate × thicknessBandMultiplier ×
cutComplexityMultiplier × finishMultiplier`, plus an engraving surcharge
(`engraveArea × material.engraveRatePerCm2`) added once per piece when the
service type involves engraving or an explicit engraving area was given,
multiplied by quantity, with a contingency percentage added to the upper
figure only, then rounded. Every rate, multiplier and threshold lives in
`site-config.js` under `planner` — nothing is hardcoded in `planner.js`.
Verified live in the browser against a hand-computed example (20cm × 10cm ×
5mm acrylic, cutting+engraving, moderate detail, polished edge, qty 3 →
R1,050–R2,100), matching exactly.

Actions: Copy / Print / Download Summary, WhatsApp Quote Request, Email Quote
Request, Reset. **WhatsApp/Email route through a shared explicit-confirmation
modal** (`role="dialog"`, `aria-modal="true"`) that shows the exact outgoing
message — verified live that `window.open`/`mailto:` navigation only fires
after clicking "Confirm & Send" (patched `window.open` and confirmed zero
calls before confirmation, exactly one correctly-encoded `wa.me` URL after).

## Test Results

**Unit tests** — `npm test` (Node's built-in test runner):
```
tests 38
pass  38
fail  0
```
Covers: area calculation across all 4 units (mm/cm/m/inches), quantity
parsing, disabled-budget mode, unknown material, missing area/quantity,
thickness-band and cut-complexity multiplier effects, engraving surcharge,
file-readiness/design-support warning logic, missing-information logic,
WhatsApp/email URL encoding (including `&`/`,`/space handling), copy/print/
download-compatible plain-text summaries, reset independence, and a sweep of
invalid/zero/negative/very-large edge inputs asserting no NaN/Infinity/
negative output.

**Static checks**: `node -c` syntax check on `app.js`/`planner.js` (pass);
`site-config.js` structure sanity-checked via a `window` shim (9 materials, 7
services, 3 themes); `htmlhint` against all 5 HTML pages — 0 errors.

**Live browser verification** (local static server + Chrome DevTools MCP, not
just unit tests):
- Full planner flow driven end-to-end (fill form → calculate → verify every
  result field against a hand-computed expected value → confirm-and-send →
  verify the exact `wa.me` URL and encoded message via a patched
  `window.open`, confirming zero opens before confirmation and exactly one
  correctly-encoded open after).
- Reset verified to clear all fields (including checkboxes) and hide results.
- All 4 secondary pages (privacy/terms/disclaimer/404) loaded and checked for
  console errors — zero on every page.
- Mobile viewport (390×844) checked for horizontal overflow (none) and
  hamburger-menu open height (780px — full height, no CSS containing-block
  regression).
- **Lighthouse audit** (desktop, navigation mode): Accessibility 100, Best
  Practices 100, SEO 100, Agentic Browsing 100, 56/57 audits passed
  (Cumulative Layout Shift scored 0.99/1, displayValue 0.043 — well within
  the "good" <0.1 threshold).

## Remaining Work / Known Limitations

- **Gallery media**: ships with labelled placeholder cards, not photography
  (per the "avoid fake project photography" instruction). Capture real
  project photos and set the `image` field on each `gallery` entry in
  `site-config.js`.
- **Real contact details and workshop-safety statements** are placeholders
  that must be replaced before any real business uses this template — every
  such field is labelled `(sample)`/`(placeholder)` in the UI and flagged in
  the footer disclaimer.
- **Legal pages are starting points only** — `terms.html` and
  `disclaimer.html` explicitly tell the buyer to have them reviewed by a
  qualified professional for their jurisdiction before publishing.
- This build stops at "site + tool complete, tested, documented." Per the
  task's explicit scope boundary: no seller-pack, no Etsy draft, no
  portfolio update, and `main` was not touched.

## Expected Media Capture Pages

For a future packaging/release pass (out of scope here), screenshots should
be captured from: the hero + trust bar, the Services grid (desktop and one
expanded card), the Materials grid, the Laser Cut & Engraving Quote Planner
form, a completed Planner results panel (with the design-support warning
visible), the confirm-before-send modal, mobile hamburger menu open, and the
theme picker showing at least two of the three themes.

## Configuration Instructions

Everything a buyer needs to rebrand this template lives in `site-config.js`:

- `business` / `contact` / `hours` / `social` — identity and contact details
- `serviceAreas` — coverage list
- `services` — the 7 service cards (Laser Cutting/Engraving/Signage/Acrylic
  Fabrication/Wood Engraving/Metal Marking/Corporate Gifts)
- `filePrepGuidance`, `gallery`, `process`, `faqs` — content
- `themes` + `activeTheme` — pick one of `graphite-laser` / `cyan-blueprint` /
  `amber-workshop`, or edit the colour values directly
- `planner` — all Quote Planner rates (per-material `rateMinPerCm2`/
  `rateMaxPerCm2`/`engraveRatePerCm2`), thickness bands, cut-complexity and
  finish multipliers, currency, contingency percentage, and the
  `budgetEnabled` on/off switch
- `legal` — workshop-safety statement and the quote disclaimer text

No edits to `index.html`, `style.css`, `app.js`, or `planner.js` should be
necessary for ordinary rebranding.
