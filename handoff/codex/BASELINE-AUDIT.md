# Baseline Audit

Date: 2026-07-13
Branch: `agent/codex-release`
Scope: release engineering, QA, security, and portfolio audit support for the Southern Suburbs Builders commercial template.

## Repository State

- Template source exists at `clients/southern-suburbs-builders/index.html` and `clients/southern-suburbs-builders/style.css`.
- Existing sellable ZIP exists at `etsy-ready-packages/southern-suburbs-builders-Website-Template.zip`.
- Current ZIP contains only `index.html` and `style.css`.
- No Francis Listing Manager complete product pack was found for this template in the inspected repository state.
- No `seller-pack/`, `francis-listing-manager-import.json`, listing images, buyer files, buyer guide, license, AI disclosure, support policy, release report, or listing content file exists for this template.

## Template Content Findings

- The HTML still uses placeholder/generated branding: `Apex Structural (Node--40)` and WhatsApp text referencing `Civic Core Construction (Southern Suburbs)`.
- The template includes external Google Fonts, external WhatsApp SVG, and remote agent-chat CSS/JS from GitHub Pages.
- The page includes unsupported or unverified trust claims: `4.9 Stars`, `Guaranteed workmanship`, `Fully Insured`, `200+ Jobs Completed`, `24hr Response Time`, and `100% Satisfaction Rate`.
- The CSS begins with a UTF-8 BOM and contains mojibake in the header comment (`â€”`).
- The ZIP is a legacy source-only package, not the final Etsy/Francis product pack described in `RELEASE-WORKFLOW.md`.

## Release Readiness

Current status: not ready for commercial release.

Blocking gaps:

- Build a complete buyer package with docs and buyer files.
- Build a Francis Listing Manager complete product pack with a valid manifest, images, and buyer files.
- Replace or clearly label fictional claims and generated placeholder names.
- Remove or bundle external runtime dependencies where the release standard requires a self-contained product.
- Generate and validate Etsy listing content, exactly 13 tags, listing images, and media.
- Run the release validators added under `scripts/release/`.

## Local Audit Commands Used

- `git status --short --branch`
- `rg --files`
- `find clients/southern-suburbs-builders -maxdepth 3 -type f -print`
- `unzip -l etsy-ready-packages/southern-suburbs-builders-Website-Template.zip`
- read-only inspection of `/home/iedrees/Workspace/3D-Portfolio/src/pages/WorkPage.tsx` and related portfolio files

## Non-Actions

- Website UI was not edited.
- Grok and Claude handoff folders were not edited.
- Etsy was not contacted or automated.
- Nothing was published.
