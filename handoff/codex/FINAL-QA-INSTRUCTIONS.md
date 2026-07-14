# Final QA Instructions

## Merge Sequence

1. Confirm `agent/codex-release` contains only release docs/scripts/tests.
2. Merge product UI branch into the integration branch.
3. Merge commerce/listing branch only after product files are stable.
4. Do not merge to `main` until release checks and manual blockers are documented.

## App Tests

- Run the app's normal install/build/test commands after the final stack is known.
- Run browser smoke tests for desktop and mobile.
- Manually verify quote planner behavior against `RELEASE-TEST-MATRIX.md`.

## Release Scripts

```bash
node scripts/release/validate-tags.mjs tests/release/product-pack-fixture.json
node scripts/release/validate-product-pack.mjs path/to/product-pack
node scripts/release/scan-secrets.mjs path/to/product-pack
node scripts/release/validate-media.mjs path/to/product-pack
node scripts/release/validate-links.mjs path/to/product-pack
node scripts/release/validate-build-output.mjs path/to/build-output
```

## Product Pack Validation

- Confirm manifest matches current Francis Listing Manager schema.
- Confirm all referenced files exist.
- Confirm buyer files contain no local-only paths.
- Confirm no symlinks, `.git`, `.env`, `node_modules`, or credentials are included.

## Media Validation

- Validate image/video/PDF signatures.
- Use ffprobe checks when available.
- Confirm all product screenshots match the final UI.
- Confirm no oversized media ships.

## Listing Copy Validation

- Remove fake ratings, reviews, project counts, certifications, and machine claims.
- Keep quote language non-binding.
- Use demo wording where implementation-specific evidence is missing.
- Confirm Etsy tags are exactly 13 and <=20 characters.

## Portfolio Update Validation

- Do not edit portfolio until the integration phase.
- Use `PORTFOLIO-INTEGRATION-PLAN.md`.
- Keep Etsy CTA hidden while URL equals `EXACT_ETSY_PRODUCT_URL_PENDING_PUBLICATION`.
- Add project/blog sitemap and RSS entries only after final URLs are known.

## Etsy Draft Validation

- Create draft only.
- Do not publish.
- Confirm digital product settings and no physical shipping.
- Confirm no duplicate draft.
- Confirm no generic shop URL is used as product URL.

## Manual Blockers

Document any blocker in `CODEX-HANDOFF.md`, including missing quote planner behavior, missing product pack files, failed scripts, unknown Francis schema fields, or missing live demo URL.
