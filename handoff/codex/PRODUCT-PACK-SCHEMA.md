# Product Pack Schema

Date: 2026-07-13
Target: Francis Listing Manager complete product pack ZIP.

## Required Layout

The ZIP root may contain the product pack directly, or one top-level folder containing it:

```text
francis-listing-manager-import.json
images/
  01-cover.png
  02-desktop.png
  ... up to 10 total listing images
buyer-files/
  START-HERE.html
  COMPLETE-BUYER-GUIDE.html
  LICENSE.txt
  AI-DISCLOSURE.txt
  southern-suburbs-builders-template.zip
```

Maximum buyer files: 5.
Maximum listing images: 10.
Exactly one cover image is required.

## Manifest Requirements

`francis-listing-manager-import.json` must be valid JSON and include, at minimum:

```json
{
  "sku": "southern-suburbs-builders-template",
  "title": "Southern Suburbs Builders Website Template",
  "description": "...",
  "price": 0,
  "currency": "USD",
  "tags": ["tag one", "tag two"],
  "images": [
    { "path": "images/01-cover.png", "role": "cover", "alt": "Cover image alt text" }
  ],
  "buyerFiles": [
    { "path": "buyer-files/START-HERE.html", "label": "Start Here" }
  ]
}
```

Field aliases accepted by the validator:

- SKU: `sku`, `productSku`, `product_sku`
- Images: `images`, `listingImages`, `listing_images`
- Buyer files: `buyerFiles`, `buyer_files`, `files`
- File path on each item: `path`, `file`, `src`, `url`, `filename`

## Validation Rules

- `tags` must contain exactly 13 values.
- Tags must be unique case-insensitively.
- Every tag must be <=20 characters.
- `images` must contain <=10 entries.
- Exactly one image must be marked as cover, or string-based images must use `01-cover.*` as the first image.
- `buyerFiles` must contain <=5 entries.
- Every referenced path must be relative to the manifest directory.
- No absolute paths, path traversal, null bytes, symlinks, `.env`, `.git`, `node_modules`, oversized files, or unsupported executable content.
- Text files are scanned for common secret patterns.
- Media files are checked separately with `validate-media.js`.

## Commands

```bash
node scripts/release/validate-product-pack.js <pack-directory>
node scripts/release/validate-zip-content.js <complete-product-pack.zip>
```
