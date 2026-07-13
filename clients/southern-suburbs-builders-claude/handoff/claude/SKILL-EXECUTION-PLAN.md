# Skill Execution Plan — Southern Suburbs Builders Template

This document records which Claude Code skills and tools were evaluated and
used while building this template, per the task instruction to discover and
apply relevant installed skills before building from scratch.

## Skills Discovered and Applied

| Skill / Tool | How it was used |
|---|---|
| **frontend-design** / **ui-ux-pro-max** (design guidance) | Informed the "premium architectural and construction" direction: warm concrete/charcoal/stone/brass/terracotta/ivory palette, blueprint-grid hero overlay, restrained motion, editorial section rhythm — applied directly in `style.css` and the three theme presets in `site-config.js`. |
| **ecc:accessibility** / built-in a11y practices | Semantic landmarks (`header`/`main`/`footer`/`nav`/`section` with `aria-labelledby`), skip link, visible focus ring (`:focus-visible`), `prefers-reduced-motion` support, accessible form labelling (`aria-describedby`, `aria-invalid`, live regions on all status messages), keyboard-operable FAQ/service accordions and confirm-panel (`role="dialog"`, `aria-modal`, focus management on open/close). Verified with a live Lighthouse Accessibility audit (see BUILD-SUMMARY.md) — scored 100/100. |
| **owasp-security** / security-review practice | Reviewed all dynamic rendering paths: user-entered planner/quote-form data is only ever written via `textContent` or `.value` (never `innerHTML`), while `innerHTML` is used only for static, config-sourced strings that are still passed through an `escapeHtml()` helper. WhatsApp/email links are built with `encodeURIComponent`, verified by unit tests. No secrets, no `eval`, no unvalidated redirects. |
| **ecc:seo** (SEO practice) | Structured data (`GeneralContractor` schema), Open Graph tags, canonical URL, `robots.txt`, `sitemap.xml`, descriptive `<title>`/meta description, semantic heading hierarchy. Verified with Lighthouse SEO audit — 100/100. |
| **verify** (skill definition, applied as a practice) | Bootstrapped a local static server and drove the live site with the `chrome-devtools` MCP tools rather than trusting unit tests alone — this caught three real UI-wiring bugs that no unit test could have caught (see BUILD-SUMMARY.md "Bugs Found in Browser Testing"). |
| **find-skills** | Searched skills.sh for `accessibility` and `responsive design` (see below). |

## External Skills Evaluated via `find-skills` (skills.sh)

Searched `npx skills find accessibility` and `npx skills find "responsive design"`.
Reputable results were found (e.g. `addyosmani/web-quality-skills@accessibility`,
36K installs; `wshobson/agents@responsive-design`, 14.7K installs). None were
installed: the ECC plugin's own `accessibility`, `frontend-a11y`, `seo`, and
`ui-ux-pro-max` skills, already available in this session, cover the same
ground for a static HTML/CSS/JS site, and the task instructs against
installing skills merely to inflate a count. This decision is recorded here
per the "do not install untrusted or irrelevant skills" instruction.

## Not Applicable / Not Used

- Framework-specific skills (React/Vue/etc.) — this is a vanilla static
  HTML/CSS/JS site by design (matches every other template in this
  monorepo), so no build tooling or component framework was introduced.
- `code-review` / `security-review` slash commands were not separately
  invoked as commands; their checks were applied manually and via the live
  browser + Lighthouse audit described above, since this is a static site
  with no server-side surface.

## Testing Approach

- **Unit tests**: Node's built-in test runner (`node --test`) against the
  pure calculation engine in `planner.js` — 25 tests covering area/budget
  math, finish multipliers, invalid/zero/negative inputs, summary
  generation, WhatsApp/email encoding, reset, and disabled-budget mode.
- **Live browser verification**: local static server + `chrome-devtools`
  MCP tools (snapshot, click, fill, evaluate_script, screenshot,
  lighthouse_audit) to drive the actual Renovation Scope & Budget Planner
  end-to-end, confirm the explicit-confirmation send flow never calls
  `window.open`/navigates until the visitor clicks "Confirm & Send", and
  check mobile viewport behaviour.
