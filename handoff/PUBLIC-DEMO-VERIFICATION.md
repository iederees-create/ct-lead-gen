# Public Demo Verification — Precision Laser Website Template

## Public Demo URL

**https://iederees-create.github.io/precision-laser-works-template/**

Public source repo: `https://github.com/iederees-create/precision-laser-works-template`
(newly created, public, GitHub Pages enabled from `main` branch root — matches
this project's standing release pattern of one standalone public demo repo
per template, documented in `RELEASE-WORKFLOW.md`).

## Deployment

- Deployment commit (public demo repo): first commit on `main`, "Precision
  Laser Works — laser cutting & engraving website template with Quote
  Planner" — exported from `release/precision-laser-template` at merge
  commit `4076b62` (the fully-merged release branch), excluding the internal
  `handoff/` directory.
- GitHub Pages build status: `built` (confirmed via the Pages Builds API
  immediately after enabling Pages).
- Deployed content: `index.html`, `style.css`, `site-config.js`,
  `planner.js`, `app.js`, `privacy.html`, `terms.html`, `disclaimer.html`,
  `404.html`, `favicon.svg`, `og-image.svg`, `robots.txt`, `sitemap.xml`,
  `package.json`, `tests/planner.test.js`.

## Local Checks (release branch, post-merge)

- `npm install` — up to date, 0 vulnerabilities.
- `npm test` — 38/38 passing (`node --test tests/planner.test.js`), matches
  pre-merge results exactly.
- `npm run lint` / `npm run build` — **scripts do not exist** in
  `package.json` (this is a static HTML/CSS/JS template with no build step
  by design; reported per the brief's "if a script does not exist, report
  and continue" instruction).
- `node scripts/release/scan-secrets.mjs clients/precision-laser-ct-claude`
  — **passed**. (Running unscoped against the whole monorepo root flags two
  false positives in an unrelated, pre-existing `index.html` at the
  repository root — a Supabase-auth login page from `main`, not part of this
  release — on a `password` form-field variable name. Scoped to the actual
  product directory, the scan is clean.)
- `node scripts/release/validate-build-output.mjs clients/precision-laser-ct-claude`
  — **passed**.
- `node scripts/release/validate-links.mjs clients/precision-laser-ct-claude`
  — **false-positive failure**: it flags `package.json`'s `test` script
  value (`node --test tests/planner.test.js`) as if the whole command string
  were a single file path and reports it "missing." The real referenced
  file, `tests/planner.test.js`, exists and is verified present. This is a
  limitation of the validator script, not a real broken link — no HTML page
  in the site links to a missing internal path.

## Pages Checked (live, on the deployed URL)

| Check | Result |
|---|---|
| Homepage loads, correct `<title>` | Pass — HTTP 200 |
| Console errors on load | None |
| Mobile navigation (390×844 viewport) | Pass — no horizontal overflow |
| Laser services section | Present, all 7 services render |
| Materials section | Present, all 9 materials render |
| Quote Planner — calculate | Pass, verified live with a second, independent input set (15cm × 15cm plywood, cutting, qty 2 → R250–R500, matching a hand-computed check) |
| Unit conversion | Verified in a prior local pass (mm/cm/m/inches) and consistent with this deploy's shared `planner.js` |
| Budget estimate | Pass (see above) |
| Disabled-budget mode | Not re-tested live on this deploy (config default is `budgetEnabled: true`); covered by unit tests |
| WhatsApp / email handoff, copy/print/download | Verified in a prior local pass against the identical, unmodified `app.js`/`planner.js`; not re-driven click-by-click on this specific deploy to conserve time, since the deployed JS is byte-identical to the locally-verified version |
| Privacy / Terms / Disclaimer pages | HTTP 200 |
| 404 page | Unknown route correctly serves the custom 404 page (HTTP 404 status, as expected for GitHub Pages) |
| `sitemap.xml` / `robots.txt` | HTTP 200 |
| Mobile viewport, no console errors | Confirmed on live deploy |

## Warnings

- `validate-links.mjs` produces a false-positive failure on `package.json`'s
  test script string — flagged above, not a real defect.
- `scan-secrets.mjs` only passes cleanly when scoped to the product
  directory; running it against the whole monorepo picks up an unrelated
  pre-existing false positive at the repo root. Future release runs of this
  script should be scoped the same way.
- The full click-by-click WhatsApp/email/copy/print/download flow was
  re-verified locally in the pre-merge build pass, not re-clicked on this
  specific live deployment, since the deployed `app.js`/`planner.js` are
  byte-for-byte the same files already verified — re-running the exact same
  DOM-level test against identical code would not surface new information.
