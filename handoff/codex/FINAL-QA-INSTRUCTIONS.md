# Final QA Instructions

Date: 2026-07-13
Product: Southern Suburbs Builders commercial template

## Stop Conditions

- Do not publish anything.
- Do not automate `etsy.com`.
- Do not add portfolio `etsyUrl` values until exact active listing URLs are verified after manual publication.
- Do not proceed if validators report errors.

## Required Local QA Sequence

1. Build the final product pack directory.
2. Run secret scan:

```bash
node scripts/release/scan-secrets.js <final-pack-dir>
```

3. Run media validation:

```bash
node scripts/release/validate-media.js <final-pack-dir>
```

4. Run product pack validation:

```bash
node scripts/release/validate-product-pack.js <final-pack-dir>
```

5. Create the complete product pack ZIP from the validated directory.
6. Run ZIP validation:

```bash
node scripts/release/validate-zip-content.js <final-product-pack.zip>
```

7. Run validator smoke tests:

```bash
node tests/release/test-release-validators.js
```

8. Manually inspect listing content for digital-download, no-physical-item, AI disclosure, refund terms, fictional/sample content, and buyer-editable claims.
9. Manually inspect screenshots/images to confirm they show the final product only.
10. Import into Francis Listing Manager only through the approved workflow and verify fields inside the tool.
11. Stop before Etsy publication.

## Required Evidence To Record In Release Report

- Source commit SHA.
- Demo URL.
- Product pack directory path.
- Product pack ZIP path.
- Validator command outputs.
- Listing Manager import/read-back status.
- Known blockers and human actions.
- Portfolio update status.
