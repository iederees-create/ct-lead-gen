# Release Test Matrix

Date: 2026-07-13
Product: Southern Suburbs Builders commercial website template

| Area | Test | Tool / Method | Required Result | Status |
|---|---|---|---|---|
| Source ZIP | ZIP opens and contains expected files | `unzip -l` | No corrupt ZIP, no unrelated files | Legacy ZIP passes open check only |
| Product pack manifest | Valid JSON | `node scripts/release/validate-product-pack.js <pack-dir>` | Exactly one manifest, valid JSON | Pending final pack |
| Tags | Etsy tags | product-pack validator | Exactly 13 unique tags, each <=20 chars | Pending final pack |
| Listing images | Count and cover | product-pack validator | <=10 images, exactly one cover | Pending final pack |
| Buyer files | Count | product-pack validator | <=5 buyer files | Pending final pack |
| Referenced files | Manifest references | product-pack validator | Every referenced file exists | Pending final pack |
| Paths | Path safety | product-pack and ZIP validators | Relative only, no traversal | Pending final pack |
| Secrets | Credential scan | `scan-secrets.js` and product-pack validator | No possible secrets | Pending final pack |
| Media | Image/video validity | `validate-media.js` | Supported signatures; videos pass ffprobe when available | Pending final pack |
| Executables | Unsupported content | product-pack validator | No unsupported executable content | Pending final pack |
| ZIP safety | ZIP entries | `validate-zip-content.js` | No unsafe entries, no forbidden dirs/files | Pending final pack |
| Browser smoke | Desktop | local static server or file open | No console errors, layout usable | Pending UI QA |
| Browser smoke | Mobile | responsive viewport | No overlap, nav/CTA usable | Pending UI QA |
| Claims review | Trust/stat claims | manual content review | Unsupported claims removed or labelled sample | Pending UI/content update |
| Listing copy | Etsy compliance | manual listing review | Digital/no physical item/AI/refund/sample content included | Pending listing copy |
| Portfolio | Etsy URLs | local portfolio source audit | Project CTAs use exact active listing URLs only | Audited; no project exact URL found |
| Publication safety | Release stop point | manual workflow check | Stop before Etsy publish | Required |

## Minimum Release Command Set

```bash
node scripts/release/scan-secrets.js <final-pack-dir>
node scripts/release/validate-media.js <final-pack-dir>
node scripts/release/validate-product-pack.js <final-pack-dir>
node scripts/release/validate-zip-content.js <final-pack.zip>
node tests/release/test-release-validators.js
```
