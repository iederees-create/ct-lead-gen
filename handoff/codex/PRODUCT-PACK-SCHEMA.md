# Product Pack Schema

The final integration agent must inspect the current Francis Listing Manager schema directly before packaging. This document defines release validation expectations, not a substitute for the live Francis schema.

## Required Manifest Expectations

Recommended manifest filename for release checks:

`francis-listing-manager-import.json`

Expected fields:

- `sku`: stable product SKU.
- `title`: Etsy-safe listing title.
- `description`: listing description with no unsupported claims.
- `price`: numeric draft price if supported by Francis schema.
- `currency`: ISO-style currency code if supported by Francis schema.
- `taxonomy` or `category`: Etsy taxonomy/category mapping if supported.
- `tags`: exactly 13 unique Etsy tags, each 20 characters or fewer.
- `images`: at most 10 listing images, safe relative paths only.
- `buyerFiles` or `buyer_files`: buyer-download files, safe relative paths only.
- `productUrl`: must not be a generic Etsy shop URL.
- `demoUrl`: final live demo URL, not a local file path.

## File Safety Requirements

- No `.git`.
- No `.env` or `.env.*`.
- No `node_modules`.
- No cookies, API keys, private keys, OAuth tokens, or credentials.
- No absolute local file paths.
- No path traversal such as `../`.
- No symlinks.
- No missing referenced manifest files.
- No malformed media.
- No oversized media.

## Buyer File Expectations

Final file names depend on Francis and Etsy requirements, but the pack should include:

- Start-here guide.
- Buyer implementation guide.
- License.
- AI disclosure if AI-generated media/copy is used.
- Template ZIP or final buyer package.

## Listing Image Expectations

- Maximum 10 images.
- One clear cover image.
- Product UI screenshots must match the final shipped template.
- No fake customer reviews, fake ratings, or unsupported claims in images.

## Validation Commands

```bash
node scripts/release/validate-product-pack.mjs path/to/product-pack
node scripts/release/scan-secrets.mjs path/to/product-pack
node scripts/release/validate-media.mjs path/to/product-pack
node scripts/release/validate-tags.mjs path/to/francis-listing-manager-import.json
node scripts/release/validate-links.mjs path/to/product-pack
node scripts/release/validate-build-output.mjs path/to/build-output
```
