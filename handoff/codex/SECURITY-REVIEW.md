# Security Review

Date: 2026-07-13
Scope: final product package controls for the Southern Suburbs Builders commercial template.

## Required Security Gates

- No `.env` or `.env.*` files.
- No `.git` directory or Git metadata.
- No `node_modules` directory.
- No private credentials, API keys, tokens, private keys, or password assignments.
- No absolute paths, path traversal, or unsafe ZIP entries.
- No symlinks.
- No unsupported executable content (`.exe`, `.dll`, `.bat`, `.cmd`, `.com`, `.scr`, `.ps1`, `.sh`, `.app`, `.jar`, `.msi`).
- No oversized files. Default validator cap: 100 MB per file, override with `PRODUCT_PACK_MAX_FILE_BYTES` or `MEDIA_MAX_BYTES` if the policy changes.
- No malformed image/video/PDF/SVG media.
- No missing referenced manifest files.
- No duplicate SKU.

## Current Template Risks

- The existing source references external runtime assets: Google Fonts, GitHub Pages agent chat files, and a remote WhatsApp SVG.
- The page includes claims that are risky unless clearly marked as fictional placeholders or backed by evidence.
- The existing ZIP is too minimal to prove buyer documentation, licensing, support, AI disclosure, and release metadata.

## Validation Scripts

Run these before any product pack import or upload:

```bash
node scripts/release/scan-secrets.js <pack-directory>
node scripts/release/validate-media.js <pack-directory>
node scripts/release/validate-product-pack.js <pack-directory>
node scripts/release/validate-zip-content.js <complete-product-pack.zip>
```

`validate-media.js` uses `ffprobe` when available. Without `ffprobe`, it still checks file signatures for supported media types.

## Human Review Checklist

- Confirm all demo business names, contact details, testimonials, stats, and certifications are fictional/sample or buyer-editable.
- Confirm listing copy states digital download, no physical item, AI disclosure, refund terms, and buyer customization responsibility.
- Confirm no live credentials or private contact data are included in screenshots, buyer docs, or ZIP content.
- Confirm any BYOK/API-key instructions tell buyers not to share or commit credentials.
- Confirm the final ZIP is generated from a clean release folder, not directly from a development repo.
