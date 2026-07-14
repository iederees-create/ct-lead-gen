# Portfolio Update Plan

Date: 2026-07-13
Constraint: do not edit the portfolio yet.

## Objective

Keep the 3D Portfolio accurate by showing project purchase CTAs only after a product has an exact active public Etsy listing URL.

## Planned Updates After Publication

1. Verify publication state in Francis Listing Manager.
2. Record the exact active Etsy listing URL from the verified product record or the human owner.
3. Update only the matching project in `/home/iedrees/Workspace/3D-Portfolio/src/pages/WorkPage.tsx` with `etsyUrl: '<exact listing URL>'`.
4. Do not use `https://nextgenwebs.etsy.com` as a project URL.
5. Confirm all referenced media still exists under `public/projects/`.
6. Build and smoke-test the portfolio.
7. Commit the portfolio update in the portfolio repo only after verification.

## Southern Suburbs Builders Specific Plan

- Do not add Southern Suburbs Builders to the portfolio until the product pack, demo, listing content, listing images, and Francis Listing Manager product are complete.
- Add it as a portfolio project first with `liveUrl`, media, and no `etsyUrl` while the listing is draft/content-ready.
- Add the exact `etsyUrl` only after the human owner manually publishes the Etsy listing.

## Acceptance Criteria

- No project-level generic shop URL.
- No draft URL.
- No guessed listing URL.
- No broken project media references.
- No project Buy on Etsy CTA for unpublished products.
