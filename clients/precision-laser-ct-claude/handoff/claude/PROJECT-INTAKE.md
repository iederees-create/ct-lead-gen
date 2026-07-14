# Project Intake — Precision Laser Website Template

Branch: `agent/claude-site` · Location: `clients/precision-laser-ct-claude/`

## Current Stack (before this build)

The `clients/precision-laser-ct/` folder (the un-suffixed source stub, sibling
to this one) contains only a 3-file placeholder: `index.html`, `style.css`,
`test.txt`. Critically, its `index.html` content is **not actually a laser
business** — it's a mismatched/stale skin-clinic template ("Aura Skin
Sanctuary") with an embedded `agent-chat-floating` script pulled from this
repo's GitHub Pages host and a hardcoded real-looking WhatsApp number with a
web-developer sales message baked into the link text. None of this is usable
or relevant source material for a laser cutting/engraving business, and it
directly triggers this task's "do not assume medical/cosmetic" restriction —
it is discarded outright rather than adapted.

This repo's established pattern (confirmed via the sibling
`clients/southern-suburbs-builders-claude/` build on this same branch) is:
static HTML/CSS/JS, no build step, no framework, no bundler. A central
`site-config.js` (`window.SITE_CONFIG`) drives all editable business content
and theme colors; a pure, DOM-free `planner.js` (UMD module) holds the
interactive tool's calculation logic so it can be unit-tested under Node's
built-in test runner; `app.js` is the only file that touches `document`/
`window` beyond reading config. This build follows that same split.

## Business Niche (confirmed from task brief, not from source — see above)

Laser cutting, engraving, signage, acrylic fabrication, wood engraving, metal
marking, branded gifts/corporate gifts, and small fabrication/prototyping.
Target buyers: laser cutting shops, engraving studios, signage businesses,
trophy/awards shops, acrylic fabricators, wood engraving businesses, metal
marking businesses, branded gift suppliers, makerspaces, small manufacturing
workshops, and web designers serving fabrication clients.

Explicitly **not** medical, cosmetic, skin, eye, surgical, or treatment laser
services — no health/beauty-treatment/medical-device/cosmetic claims anywhere
in this build.

## Claims to Avoid (Phase 6 of the brief)

No certified laser safety claims, no industrial safety-compliance claims, no
same-day turnaround claims, no "lowest prices"/"best in Cape Town"/"number
one" claims, no guaranteed-quote language, no customer ratings, no completed-
project counts, no machine wattage specs, no material-compatibility claims
beyond demo assumptions, no FDA/CE/SABS/ISO compliance claims, no fake client
logos, no fake reviews/testimonials, no fake safety certifications, no fake
machine specs.

**Design decision**: because the brief's Phase 3 "Required Site Structure"
list (28 items) does not include testimonials, team profiles, or statistics
sections — unlike the sibling construction-site build, which did include
clearly-labeled-fictional testimonials/stats/team — and Phase 6 explicitly
lists "customer ratings" and "completed project counts" among claims to
avoid, this build omits testimonials, team, and stats sections entirely
rather than including fictional-but-labeled versions. Trust indicators are
limited to neutral process statements (e.g. "file review before production")
with no ratings/certification language.

## Product Direction

Premium, technical, precision-engineering aesthetic: deep graphite/matte
black backgrounds, brushed-metal surfaces, electric cyan + laser red +
warm amber accents, blueprint gridline overlays, sharp geometric display
type (Space Grotesk) over Inter body text, JetBrains Mono for numeric/
measurement values in the planner. Three swappable themes: Graphite Laser,
Cyan Blueprint, Amber Workshop — same runtime CSS-custom-property theme
switcher pattern as the reference build.

## Interactive Feature: Laser Cut & Engraving Quote Planner

A pure-calculation planner (`planner.js`, zero DOM access) wired to the UI by
`app.js`, following the exact architecture proven in the Renovation Scope &
Budget Planner reference build:

- Inputs: contact details, project name, service type (9 options), material
  (9 options), material thickness (mm), width/height with a unit selector
  (mm/cm/m/inches), quantity, optional engraving area, cut complexity (4
  levels), file readiness (4 levels), file types available (multi-select
  checkboxes), finish (5 options), deadline, delivery preference, notes.
- Outputs: project summary, approximate material area (unit-converted,
  quantity-multiplied), quantity summary, service checklist (per service
  type), file-preparation checklist (per file-readiness level), missing-
  information list, complexity indicator, a design-support warning when no
  cut-ready vector file exists, a preliminary budget range gated behind a
  `budgetEnabled` config flag, assumptions, a next-step recommendation, and
  a full text summary for copy/print/download/WhatsApp/email.
- All rates, multipliers and thresholds live in `site-config.js` under
  `planner` — nothing is hardcoded in `planner.js`. Numeric parsing rejects
  NaN/Infinity/zero/negative input the same way the reference planner does
  (`parsePositiveNumber`), and WhatsApp/email links are built with the same
  tested `buildWhatsAppUrl`/`buildEmailUrl` encoding helpers.
- No message is ever sent without an explicit confirm step (shared modal
  pattern, `role="dialog"` + `aria-modal="true"`), matching the brief's
  binding-quote and explicit-confirmation requirements.

## Implementation Plan

1. `site-config.js` — themes, business identity, contact, services (7 laser
   service types), materials (9, with rate bands), planner config, FAQs,
   legal/disclaimer text.
2. `planner.js` — pure functions: unit conversion → mm, area calculation,
   complexity scoring, budget range, service/file-prep checklists, missing-
   info, summary text, WhatsApp/email URL builders, orchestration.
3. `index.html` — all 28 required sections as a single page plus anchors for
   the 7 individually-addressable service sections.
4. `style.css` — full design system + 3 theme variants, mobile-first,
   accessible focus states, reduced-motion support, print rules for the
   planner summary.
5. `app.js` — config-driven rendering, nav/FAQ accordions, theme switching,
   quote-form validation, planner UI wiring, explicit-confirm modal.
6. Legal + misc pages: `privacy.html`, `terms.html`, `disclaimer.html` (Quote
   Disclaimer), `404.html`, `favicon.svg`, `og-image.svg`, `robots.txt`,
   `sitemap.xml`, `package.json`.
7. `tests/planner.test.js` — Node test-runner coverage per the brief's
   required test list.
8. Run `npm test`, JS syntax checks, and live browser verification
   (local static server + Chrome DevTools) before commit.
