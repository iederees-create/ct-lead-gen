# Build Summary — Southern Suburbs Builders Website Template

Branch: `agent/claude-site` · Location: `clients/southern-suburbs-builders-claude/`

## Architecture

Static HTML/CSS/JS, no build step, matching the established pattern in this
monorepo (see `clients/westlake-pest-control/` as the reference implementation).

```
index.html          Single-page site: all 26 on-page sections
style.css            Full design system + 3 theme variants (CSS custom properties)
site-config.js        Central editable config (window.SITE_CONFIG) — business
                       identity, contact, services, planner rates/multipliers,
                       themes, legal/disclaimer text. Buyers edit only this file.
planner.js           Pure calculation engine for the Renovation Scope & Budget
                       Planner (UMD: works in-browser and under Node for tests).
                       Zero DOM access — every function takes plain data in,
                       returns plain data out.
app.js               DOM rendering + all interactivity: config-driven section
                       rendering, nav/FAQ/service accordions, theme switching,
                       quote form, and the Planner's UI wiring (reads/writes
                       the form, calls into planner.js, renders results).
privacy.html / terms.html / disclaimer.html / 404.html
                       Legal pages + custom 404, following the westlake pattern.
robots.txt / sitemap.xml / favicon.svg / og-image.svg
                       SEO/social assets.
package.json          `npm test` → node --test tests/planner.test.js
tests/planner.test.js  25 unit tests against planner.js.
handoff/claude/        This document + SKILL-EXECUTION-PLAN.md.
```

**Why this split**: `planner.js` is deliberately free of DOM/browser globals so
its budget math can be unit-tested in Node without a browser or mocking
framework — `app.js` is the only file that touches `document`/`window` beyond
reading `SITE_CONFIG`.

## Implemented Features (mapped to the 30 required sections)

1. Announcement bar (config-driven, links to the Planner)
2. Responsive navigation
3. Mobile hamburger menu (fixed off-canvas panel)
4. Hero (with blueprint-grid decorative overlay)
5. Quote CTA
6. Telephone CTA
7. WhatsApp CTA
8. Editable trust indicators (`trustIndicators` in config)
9–15. Services section: Renovations, Extensions, New Builds, Paving, Boundary
   Walls, Project Management — each is independently anchorable
   (`#renovations`, `#extensions`, etc.) with jump-chips and expandable detail
16. Project process (6 steps)
17. Project gallery — clearly labelled **replaceable placeholder cards**, not
    fake photography (explicit requirement)
18. About section
19. Team / contractor profiles
20. Service areas (12 Cape Town Southern Suburbs suburbs, editable)
21. Why choose us
22. Testimonials — each one explicitly tagged "(fictional)"
23. **Renovation Scope & Budget Planner** — see below
24. Quote form (validated, explicit-confirm send)
25. FAQ (11 entries, accordion)
26. Contact & business hours
27. Privacy Policy (`privacy.html`)
28. Terms (`terms.html`)
29. Estimate Disclaimer (`disclaimer.html`)
30. 404 page

### Removed / fixed from the original flawed site
- Removed the real, hardcoded WhatsApp number and its embedded
  "interested in the website" web-developer sales message.
- Removed unsupported "4.9 stars", "Fully Insured", "24hr Response Time",
  "200+ Jobs Completed" style claims — replaced with clearly labelled
  `(sample placeholder)` stats and a licence/insurance section that
  explicitly says not to publish unverified claims.
- Removed the external `agent-chat-floating` script/stylesheet dependency
  pulled from the monorepo's GitHub Pages host.
- Added the missing About, mobile nav, quote form, legal pages, and
  interactive tool that the original one-page card layout lacked entirely.

## The Renovation Scope & Budget Planner

Inputs: project name/type, dimensions or total floor area, rooms, storeys,
finish level (Essential/Standard/Premium/Custom), 8 trade checkboxes
(demolition, structural, plumbing, electrical, waterproofing, roofing,
painting, flooring), site access, occupancy, preferred start date, target
budget, suburb, contact details, notes.

Outputs: measured area, preliminary scope, configurable budget range,
complexity indicator (Low/Medium/High with reasons), trade checklist
(project-type defaults merged with explicit selections), assumptions,
missing-information list, photo checklist (varies by project type),
site-inspection recommendation, and a full text project summary.

Actions: Copy / Print / Download Summary, WhatsApp Quote Request, Email Quote
Request, Request Site Visit, Reset. **WhatsApp/Email/Site Visit all route
through a shared explicit-confirmation modal** (`role="dialog"`,
`aria-modal="true"`) that shows the exact outgoing message — `window.open`/
`mailto:` navigation only fires from the "Confirm & Send" handler, verified
live (see Test Results).

All rates, multipliers, currency, and the budget-disable flag live in
`site-config.js` under `planner` — nothing is hardcoded in `planner.js` or
`app.js`.

## Skill Usage

See `handoff/claude/SKILL-EXECUTION-PLAN.md` for the full breakdown
(accessibility, security, SEO, design, and testing skills applied, plus the
`find-skills` evaluation of external skills.sh options).

## Test Results

**Unit tests** — `npm test` (Node's built-in test runner):
```
tests 25
pass  25
fail  0
```
Covers: area calculation (dimensions vs. explicit floor area, linear-metre
unit for boundary walls), budget ranges, finish multipliers, invalid/zero/
negative inputs (never produce NaN/Infinity/negative output — asserted
directly), summary generation, WhatsApp/email URL encoding, reset, and
disabled-budget mode.

**Static checks**: `node -c` syntax check on all three JS files (pass);
`htmlhint` against all 5 HTML pages — 0 errors.

**Live browser verification** (local static server + Chrome DevTools MCP,
not just unit tests — per the project's standing release workflow, since
UI-wiring bugs don't show up in calculation-only tests):
- Full planner flow driven end-to-end (fill form → calculate → verify every
  result field against hand-computed expected values → confirm-and-send →
  verify the exact `wa.me` URL and encoded message via a patched
  `window.open`).
- Reset verified to clear all fields and hide results.
- Confirm-panel Cancel verified to close with zero side effects.
- All 4 secondary pages (privacy/terms/disclaimer/404) loaded and checked
  for console errors.
- Mobile viewport (390×844 requested) checked for horizontal overflow and
  hamburger-menu behaviour.
- **Lighthouse audit** (desktop, navigation mode): Accessibility 100,
  Best Practices 100, SEO 100, Agentic Browsing 100, 56/57 audits passed
  (Cumulative Layout Shift scored 0.99/1, displayValue 0.042 — well within
  the "good" <0.1 threshold).

### Bugs found and fixed during live browser testing (not caught by unit tests)

1. **Confirm modal visible on page load.** `.planner-confirm-panel` set
   `display: flex` directly, which (being an author-stylesheet rule) beat
   the browser's UA-stylesheet `[hidden] { display: none }` default,
   so the `hidden` attribute was silently ignored. Fixed by adding an
   explicit `.planner-confirm-panel[hidden] { display: none; }` override.
2. **Horizontal scroll on mobile.** The closed off-canvas nav menu
   (`position: fixed; transform: translateX(100%)`) still contributed to
   `document.documentElement.scrollWidth` in Chrome. Fixed with
   `overflow-x: hidden` on `html`/`body` (the standard, safe mitigation for
   this well-known off-canvas-menu CSS interaction).
3. **Mobile hamburger menu collapsed to ~48px tall instead of full height.**
   `backdrop-filter` on the sticky `.site-nav` ancestor created a new CSS
   containing block for its `position: fixed` descendant (`#nav-menu`),
   so the menu's `top`/`bottom` offsets resolved against the short header
   bar instead of the viewport. Fixed by moving the blur onto a
   `.site-nav::before` pseudo-element instead (pseudo-elements have no
   fixed-position descendants of their own, so the containing-block
   side-effect is contained). Confirmed via `getBoundingClientRect()`
   before/after (48px → 780px) and a screenshot of the open menu.
4. **Uncaught `TypeError` on every non-planner page.** `initPlanner()`
   assumed `#planner-form` always exists and called
   `form.addEventListener(...)` unconditionally. On `privacy.html`,
   `terms.html`, and `disclaimer.html` (which load the same `app.js` for
   shared nav/footer bindings but have no planner form) this threw
   synchronously inside the `DOMContentLoaded` handler, silently aborting
   every init call queued after it — including `setYear()`, so the footer
   copyright year never rendered on those pages. Fixed by adding the same
   `if (!form) return;` guard already used in `initQuoteForm()`.

## Remaining Work / Known Limitations

- **Gallery media**: the project gallery intentionally ships with labelled
  placeholder cards, not photography (per the "avoid fake project
  photography" instruction). A buyer/human owner should capture real
  project photos and set the `image` field on each `gallery` entry in
  `site-config.js`.
- **Real contact details, licence/insurance numbers, and statistics** are
  all placeholders that must be replaced before any real business uses this
  template — every such field is labelled `(sample)`/`(placeholder)` in the
  UI and flagged in the footer disclaimer.
- **Legal pages are starting points only** — both `terms.html` and
  `disclaimer.html` explicitly tell the buyer to have them reviewed by a
  qualified professional for their jurisdiction before publishing.
- This build stops at "site + tool complete, tested, documented." Per the
  task's explicit scope boundary: no seller-pack, no Etsy draft, no
  portfolio update, and `main` was not touched.

## Expected Media Capture Pages

For a future packaging/release pass (out of scope here), screenshots should
be captured from: the hero + trust bar, the Services grid (desktop and one
expanded card), the Renovation Scope & Budget Planner form, a completed
Planner results panel, the confirm-before-send modal, mobile hamburger menu
open, and the theme picker showing at least two of the three themes.

## Configuration Instructions

Everything a buyer needs to rebrand this template lives in `site-config.js`:

- `business` / `contact` / `hours` / `social` — identity and contact details
- `serviceAreas` — coverage list
- `services` — the 6 service cards (Renovations/Extensions/New Builds/
  Paving/Boundary Walls/Project Management)
- `team`, `testimonials`, `faqs`, `whyChooseUs`, `stats`, `gallery` — content
- `themes` + `activeTheme` — pick one of `concrete-brass` / `cape-clay` /
  `blueprint-navy`, or edit the colour values directly
- `planner` — all Renovation Scope & Budget Planner rates, finish
  multipliers, trade add-on percentages, complexity multipliers, currency,
  contingency percentage, and the `budgetEnabled` on/off switch
- `legal` — licence/insurance statements and the estimate disclaimer text

No edits to `index.html`, `style.css`, `app.js`, or `planner.js` should be
necessary for ordinary rebranding.
