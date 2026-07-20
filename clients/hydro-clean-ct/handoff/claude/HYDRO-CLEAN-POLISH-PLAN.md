# Hydro Clean CT — Claude Polish Plan & Report

Branch: `agent/claude-polish` (worktree: `clients/hydro-clean-ct-claude`, based
on `agent/codex-build`). Scope: final design polish, copy clarity, mobile/
accessibility, and conversion polish on the existing Codex build — not a
rebuild from scratch.

## What was inspected first

- `handoff/codex/CODEX-QA-REPORT.md`, `HYDRO-CLEAN-CODEX-AUDIT.md`,
  `LISTING-MANAGER-BLOCKER.md`
- `seller-pack/` (release report, Etsy listing content, buyer files) — not
  touched, per scope (no Etsy work in this branch)
- No `handoff/grok/` exists for this client — Grok's work in this repo was
  on a different client (precision-laser), not Hydro Clean.
- Full read of `index.html`, `app.js`, `planner.js`, `site-config.js`,
  `style.css`, `tests/planner.test.js`, `README.md`, legal pages.

## Critical finding: the interactive planner didn't fit the business

Codex's build (`AUDIT.md`, commit `b4cb3d6`) is a genuinely strong premium
site for most sections — but the flagship interactive tool and several
supporting sections were carried over from a **tile-installation**
template with an incomplete find/replace, not adapted for an exterior/
pressure-cleaning business:

- The planner calculated **tile count** and **box count**, with a
  **Layout step** offering herringbone/chevron/brick-bond patterns —
  none of which apply to pressure washing, roof/gutter/window cleaning.
- **Mount ID bug**: `index.html` had `id="tile-planner-app"` while
  `planner.js` looked for `#surface-planner-app` — the interactive tool
  never rendered on the page at all.
- **Config/code drift**: `site-config.js` defined `wastagePresets` and
  `wastageDisclaimer`; `planner.js` read `allowancePresets` and
  `allowanceDisclaimer` — the allowance step rendered with no options.
- Leftover tile copy: team role "Lead Tiler," process steps describing
  "existing tile removal... grouting, sealing," a Substrate/Adhesive/
  Tile+Grout cross-section diagram in the "Surface Preparation" section,
  a "Layout Reference" gallery mislabelled "Proof Section Placeholder,"
  and FAQ entries about tile ownership/tilers.
- A grammar typo ("a exterior cleaning project") and a field-name typo
  ("dimensionss").

I flagged this to the user before proceeding, since fixing it properly
meant rewriting the planner's calculation engine — more than surface-level
copy polish. The user chose a full functional rework rather than a
copy-only relabel or disabling the tool.

## What changed

### Planner rebuilt end-to-end (`planner.js`, `tests/planner.test.js`)
- Removed the tile/box/grout calculation engine (`calcSurfaceCount`,
  `calcBoxCount`, `calcMaterialCost`, `calcMaterialGuidance`) and the
  Layout wizard step entirely.
- New calc engine: `calcComplexityPercent` (soiling condition % + access
  difficulty %), `calcTimeEstimateHours` (adjusted area ÷ configurable
  m²/hour coverage rate, rounded to the nearest half hour), and
  `calcCostEstimate` (optional hourly or per-m² rate, buyer-configured,
  never invented).
- Wizard reduced from 8 steps to 6: **Project Type → Measurements →
  Surface & Access → Site Conditions → Estimate → Send**. Area/unit
  math (m/cm/ft/in, single/multiple/vertical/combined modes) was kept
  unchanged — it's generic and was already correct.
- Fixed the mount ID (`#surface-planner-app` now matches on both sides),
  renamed the `localStorage` key from the tile-template leftover
  `ttc-planner-state-v1` to `hydroclean-planner-state-v1`.
- Rewrote all 27 tests against the new calc API (was 26 tile/box tests);
  all pass (`node tests/planner.test.js`).

### Config (`site-config.js`)
- Replaced `wastagePresets`/`materialGuidance` with `surfaceTypes`
  (concrete/paving, siding, roof, decking, glass, solar, masonry, other —
  each with an editable, clearly-indicative m²/hour rate),
  `conditionLevels`, and `accessLevels`.
- Replaced the tile `layoutGallery` with `surfaceGallery` (six cleaning
  surface types, still CSS-pattern swatches, not fabricated photos).
- Rewrote `process`, `surfacePreparation`, `team` (role), and `faqs` to
  remove tile-specific claims and fix the typo/grammar bugs.

### Markup & styles (`index.html`, `app.js`, `style.css`)
- Fixed the planner mount ID; renamed `CFG.layoutGallery` reference to
  `CFG.surfaceGallery` in `app.js`.
- Replaced the tile cross-section diagram ("Substrate / Tile + Grout")
  with a cleaning-process diagram ("Site Assessment → Method Selection →
  Protect Plants & Fixtures → Cleaning → Rinse & Inspect").
- Fixed the mismatched gallery heading ("Layout Reference" / "Proof
  Section Placeholder" → "Surfaces We Clean" / "Surface Types") and
  added matching swatch CSS for the new surface-type ids.
- Added a missing `.planner-panel h4` style (the new Surface & Access
  step introduces sub-headings that had no CSS rule — also fixes the
  same gap for the pre-existing "Send" step headings).

### Docs & legal (`README.md`, `disclaimer.html`, `terms.html`)
- Rewrote the planner description, feature list, and config-field list
  in `README.md` to match the new 6-step flow.
- Rewrote the measurement/estimate disclaimer to describe time/cost
  estimation instead of tile/adhesive/grout quantities.
- Removed a stray "substrate defects" reference in the terms page.

## Verification

- `node tests/planner.test.js` — 27/27 pass.
- `node --check` on `app.js`, `planner.js`, `site-config.js` — no syntax
  errors.
- Grepped the full site (excluding `seller-pack/`, `handoff/`) for
  leftover tile/grout/herringbone/chevron/substrate/wastage terms —
  none remain outside legitimate "roof tiles/shingles" references.
- **Not done**: live browser interaction testing. The shared Chrome
  DevTools MCP session was already attached to another profile/session
  during this work, so the planner wizard should still get a manual
  click-through (all 6 steps, WhatsApp/email/print/download actions,
  mobile viewport) before this is considered fully sign-off ready.

## Out of scope (left untouched, per instructions)

- `seller-pack/`, `handoff/codex/`, Etsy listing content, and Etsy
  connection/publishing — not touched.
- No new business claims were introduced; all pricing/coverage-rate
  fields remain clearly labelled as editable, indicative placeholders.
- Did not merge to `main`.
