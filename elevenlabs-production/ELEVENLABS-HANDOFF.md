# ElevenLabs Handoff — NextGenWebs Audio Production

**Date:** 2026-07-14  
**Branch intent:** `agent/grok-commerce`  
**Status:** Scripts + queue only — **do not publish** audio or ads until human review  

---

## Files in `elevenlabs-production/`

| File | Purpose |
|---|---|
| `AUDIO-CONTENT-STRATEGY.md` | Goals, funnel, credit allocation |
| `VOICE-DIRECTION.md` | House voice profile + QA |
| `FILE-NAMING-SYSTEM.md` | Filename rules + slugs |
| `ETSY-LISTING-VOICEOVERS.md` | 15s Etsy VO × 9 products |
| `YOUTUBE-SHORTS-SCRIPTS.md` | 20s Shorts × 3 × 9 products |
| `SOCIAL-REELS-SCRIPTS.md` | 15s Reels × 3 + CTA/hook/demo lines |
| `PORTFOLIO-WALKTHROUGH-SCRIPTS.md` | 45s portfolio VO × 9 |
| `HOMEPAGE-BRAND-VIDEO-SCRIPT.md` | Brand film + 15s cutdown |
| `COLD-OUTREACH-VOICE-NOTES.md` | Permissioned personal notes |
| `BLOG-AUDIO-SUMMARIES.md` | Longer educational summaries |
| `DUBBING-PLAN.md` | Deferred multi-language plan |
| `ELEVENLABS-GENERATION-QUEUE.csv` | Generation order (40 priority rows) |
| `ELEVENLABS-HANDOFF.md` | This file |

---

## Which scripts to generate first

Follow **priority 0** in `ELEVENLABS-GENERATION-QUEUE.csv`:

1. **Etsy 15s VO:** pest-control → tiling → construction → solar  
2. **Portfolio 45s VO:** same four products  
3. **Hook + CTA stings:** same four (cheap, high reuse)  

Then **priority 1:**

4. Best Shorts for those four + Precision Laser “not a quote” short  
5. Brand homepage VO  

Then **priority 2:** wellness, zen-skin, insightforge, precision-laser Etsy/portfolio, bank-desert  

Defer **priority 3–4:** bulk reels, outreach, blog summaries until English winners exist.

---

## Which voice to use

| Setting | Value |
|---|---|
| Label | `nextgenwebs-house-male-v1` |
| Character | Warm, clear, confident male |
| Accent | South African–friendly, globally understandable |
| Avoid | Celebrity, clones without permission, trailer voice, robotic hype |

Full direction: `VOICE-DIRECTION.md`. Store the real ElevenLabs voice ID in a **private** ops note—not required in git.

---

## Where files belong

### Etsy listing videos

Use `*-etsy-video-voiceover-v1.mp3` under listing media:

- `pest-control-etsy-video-voiceover-v1.mp3`  
- `tiling-etsy-video-voiceover-v1.mp3`  
- `construction-etsy-video-voiceover-v1.mp3`  
- `solar-etsy-video-voiceover-v1.mp3`  
- plus secondary SKUs when those listings are SEO-ready  

Pair with real UI screenshots/footage. Keep “digital download” and preliminary/disclaimer lines.

### Portfolio videos

Use `*-portfolio-walkthrough-v1.mp3` as narration beds for project showcase videos in the 3D Portfolio.

### YouTube Shorts

Use `*-short-*.mp3` from `YOUTUBE-SHORTS-SCRIPTS.md` / queue priority 1+.  
Description links: demo / portfolio / **exact** Etsy URL only when known.

### Instagram / Facebook Reels

Use `*-reel-*.mp3` plus hook/CTA stings for openers and end cards.

### Brand site

`nextgenwebs-brand-homepage-v1.mp3` (+ optional 15s cutdown).

### Outreach

Only `nextgenwebs-outreach-*.mp3` / product outreach notes — **manual send**, never robocall.

---

## What should be dubbed later

See `DUBBING-PLAN.md`. After English performance data:

- Top 3 Etsy VOs  
- Top Shorts hooks  
- One brand film  

Do **not** dub the full catalogue first.

---

## What not to waste credits on

| Waste | Why |
|---|---|
| 10 takes of the same 5s CTA | One good take is enough |
| Full dubs of every short | Prove English traffic first |
| Blog 2-minute summaries before articles are live | Low leverage early |
| Hype variants with guaranteed income claims | Policy + brand risk |
| Celebrity-style or cloned voices | Forbidden |
| Generating audio for SKUs without screenshots | VO with no footage sits unused |
| Auto-publishing experimental takes | Human gate required |

---

## Placeholders still in scripts

```
EXACT_ETSY_PRODUCT_URL_PENDING_PUBLICATION
LIVE_DEMO_URL_PENDING
PORTFOLIO_PROJECT_URL_PENDING
```

Do not speak fake URLs. Prefer “link in description” / “open the demo on the project page.”

---

## Compliance reminder

- No guaranteed sales, rankings, or income  
- No medical/clinical treatment claims  
- No exact final quote claims for planners  
- No spam/robocall use  
- No publishing from this agent run  

---

## Operator checklist

1. [ ] Pick/confirm ElevenLabs house voice  
2. [ ] Generate priority 0 queue rows  
3. [ ] Loudness-normalize; QA on phone speaker  
4. [ ] Drop approved MP3s into video editors with real UI footage  
5. [ ] Attach to Etsy/portfolio/Shorts only after human approval  
6. [ ] Log which filename shipped where (optional sheet)  

---

## Related work

- Etsy SEO recovery: `etsy-growth/`  
- Safe listing API workflow: `scripts/etsy/` (no relation to audio publish)  
