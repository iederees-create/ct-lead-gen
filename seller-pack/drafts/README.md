# Seller Pack Drafts — Southern Suburbs Builders

Working drafts for packaging. **Source of truth for commerce strategy lives in** `../../handoff/grok/`.

Do not publish to Etsy from this folder automatically. Human review required.

## Canonical handoff files

| File | Purpose |
|---|---|
| `handoff/grok/market-positioning.md` | Positioning |
| `handoff/grok/etsy-listing-copy.md` | Full Etsy copy |
| `handoff/grok/etsy-tags.json` | Exactly 13 tags |
| `handoff/grok/listing-image-storyboard.md` | 10 listing images |
| `handoff/grok/video-storyboard.md` | 15s + 30–45s video |
| `handoff/grok/buyer-guide-draft.md` | Buyer guide draft |
| `handoff/grok/faq.md` | FAQ set |
| `handoff/grok/seo-social-pack.md` | SEO + social |
| `handoff/grok/portfolio-case-study.md` | Portfolio narrative |
| `handoff/grok/BUILD-FACTS-TO-VERIFY.md` | Verification gate |

## Local draft mirrors

- `listing-copy-ready.txt` — paste-friendly condensed listing body  
- `tags-13.txt` — one tag per line  

## SEO blog package

Canonical files: `handoff/grok/blog/`

- Article: `construction-website-quote-planner.md`  
- Metadata / JSON-LD: `construction-website-quote-planner-metadata.json`  
- Media plan: `blog-media-plan.md`  
- Promotion: `blog-promotion-pack.md`  
- Integration instructions: `BLOG-HANDOFF.md`  

Etsy purchase links in the blog stay `ETSY_PRODUCT_URL_PENDING_PUBLICATION` until the exact product URL is public.

## After Claude build

1. Run `BUILD-FACTS-TO-VERIFY.md`  
2. Refresh listing claims  
3. Capture images/video from real UI  
4. Build buyer ZIP + Francis Complete Product Pack (release agent)  
5. Human creates Etsy draft; human publishes later  
6. Portfolio agent integrates blog per `BLOG-HANDOFF.md`  
7. Only after Etsy publication: replace purchase CTA with exact product URL  

