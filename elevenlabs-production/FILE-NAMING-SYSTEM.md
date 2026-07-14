# File Naming System — ElevenLabs Outputs

## Pattern

```
{product-slug}-{use-case}-{variant}-v{n}.{ext}
```

| Segment | Rules |
|---|---|
| `product-slug` | lowercase kebab; stable product key |
| `use-case` | `etsy-video`, `short`, `reel`, `portfolio-walkthrough`, `cta`, `hook`, `demo-line`, `brand`, `outreach`, `blog-summary`, `dub` |
| `variant` | short concept slug (quote-planner, material-price, etc.) |
| `v{n}` | version integer starting at `v1` |
| `ext` | `mp3` for delivery; optional `wav` masters as `...-v1-master.wav` |

## Product slugs

| Product | Slug |
|---|---|
| Construction Website Template | `construction` |
| Bank Desert Analysis Project | `bank-desert` |
| Small Business Analytics Dashboard | `insightforge` |
| Tiling Contractor Website Template | `tiling` |
| Wellness Website Template | `wellness` |
| Pest Control Website Template | `pest-control` |
| Zen Skin Studio Website Template | `zen-skin` |
| Solar Website Template | `solar` |
| Precision Laser Website Template | `precision-laser` |
| Brand / multi-product | `nextgenwebs` |

## Examples

```
construction-etsy-video-voiceover-v1.mp3
construction-short-quote-planner-v1.mp3
tiling-portfolio-walkthrough-v1.mp3
insightforge-dashboard-short-v1.mp3
pest-control-reel-services-quote-v1.mp3
precision-laser-hook-not-a-quote-v1.mp3
nextgenwebs-brand-homepage-v1.mp3
```

## Status folder layout (local production, not necessarily git)

```
elevenlabs-production/audio/
  raw/
  approved/
  used-in-etsy/
  used-in-shorts/
  used-in-portfolio/
  archive/
```

Git tracks **scripts and queue**, not large binary MP3s unless the human explicitly adds them later.

## Versioning

- `v1` = first approved script generation  
- Bump version when **script wording** changes, not when only loudness is normalized  
- Keep rejected takes out of `approved/`  

## CSV linkage

Every row in `ELEVENLABS-GENERATION-QUEUE.csv` uses the same `filename` field as the deliverable name.
