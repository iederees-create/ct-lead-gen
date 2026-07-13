# Portfolio Etsy Link Audit

Date: 2026-07-13
Portfolio inspected: `/home/iedrees/Workspace/3D-Portfolio`
Files inspected: `src/pages/WorkPage.tsx`, `src/components/ProjectShowcase.tsx`, `src/components/ProjectMedia.tsx`, `src/lib/site.ts`, `public/projects/`, existing `PORTFOLIO-ETSY-LINK-AUDIT.md`.

## Rules Applied

- Do not guess active listing URLs.
- Do not automate `etsy.com`.
- A project-level `etsyUrl` must be an exact active product listing URL, not the generic shop root.
- Draft, content-ready, archived, missing, or unverified products must not be linked as purchasable project CTAs.

## Project Etsy URL Status

| Project | Current project `etsyUrl` | Exact active Etsy product URL? | Classification | Verification Needed |
|---|---:|---:|---|---|
| InsightForge Business Analytics Studio | none | no | Requires Francis Listing Manager verification | Confirm if draft has since been manually published |
| Bank Desert Analysis Student Lab | none | no | Requires Francis Listing Manager verification | Confirm Listing Manager product and publication state |
| RAVERSUS Clinical Portal | none | no | No Etsy URL; likely not a sellable template | None unless business decides to sell it |
| Tiling Contractor Website Template | none | no | Requires Francis Listing Manager verification | Confirm if draft has since been manually published |
| Claude Code Solar Lead Generation Template | none | no | No Etsy URL | Create/verify Listing Manager product before linking |
| Pest Control Website Template | none | no | Requires Francis Listing Manager verification | Confirm if product has since been manually published |
| Vitality Wellness Website Template | none | no | Requires Francis Listing Manager verification | Confirm if product has since been manually published |
| Summit Painting CT | none | no | No Etsy URL; previous audit says generic shop link removed | None unless converted to a product |
| Amore Nails CT | none | no | No Etsy URL; previous audit says generic shop link removed | None unless converted to a product |
| Pixel Perfect Hair | none | no | No Etsy URL; previous audit says generic shop link removed | None unless converted to a product |
| Zen Skin Studio Website Template | none | no | Requires Francis Listing Manager verification | Confirm if product has since been manually published |
| Acme Plumbing Claremont | none | no | No Etsy URL; previous audit says generic shop link removed | None unless converted to a product |
| Window Wizards CT | none | no | No Etsy URL; previous audit says generic shop link removed | None unless converted to a product |
| First Choice Construction | none | no | No Etsy URL; previous audit says generic shop link removed | None unless converted to a product |
| Creator Hub Pro Template | none | no | No Etsy URL; previous audit says generic shop link removed | Create/verify product before linking |
| Aura Signs | none | no | No Etsy URL; previous audit says generic shop link removed | None unless converted to a product |
| Fluent Path Tutoring | none | no | No Etsy URL; previous audit says generic shop link removed | None unless converted to a product |

## Generic Shop Links

Project-level purchase CTAs in `WorkPage.tsx` currently do not use `https://nextgenwebs.etsy.com`.

Generic shop links still exist outside project-specific purchase CTAs:

- `src/components/SiteHeader.tsx`
- `src/components/SiteFooter.tsx`
- `src/pages/ContactPage.tsx`
- `src/App.tsx`
- `src/content/blog/why-educational-businesses-need-custom-learning-hubs.tsx`

These are global shop/navigation/content links, not project listing URLs. If the policy becomes "no generic Etsy links anywhere," those files need a separate portfolio edit.

## Media Reference Audit

Referenced project media under `public/projects/` exists for the current `WorkPage.tsx` media fields:

- `projects/insightforge/*`
- `projects/bank-desert-analysis/*`
- `projects/tableview-tiling/*`
- `projects/vitality-wellness/*`

No symlinks were found under `public/projects/`.

## Projects Listed Before Publication

Projects with no active exact Etsy URL but presented as templates or sellable product candidates:

- InsightForge Business Analytics Studio
- Bank Desert Analysis Student Lab
- Tiling Contractor Website Template
- Claude Code Solar Lead Generation Template
- Pest Control Website Template
- Vitality Wellness Website Template
- Zen Skin Studio Website Template
- Creator Hub Pro Template

These can remain as portfolio/live demo projects, but should not show project-level Buy on Etsy CTAs until an exact active listing URL is verified through Francis Listing Manager after manual publication.
