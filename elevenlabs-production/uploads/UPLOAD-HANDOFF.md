# Upload Handoff — NextGenWebs / ElevenLabs Video Pack

**Agent role:** create upload-ready copy packs only.  
**This agent did not:** publish, upload, edit Etsy listings, change prices, invent URLs, or claim missing videos exist.

**Inventory date:** 2026-07-14  
**Media roots:**

- `/home/iedrees/Workspace/nextgenwebs-audio`
- `/home/iedrees/Workspace/nextgenwebs-video`

**Copy pack root:**

- `elevenlabs-production/uploads/`

---

## Operator summary

| Metric | Count |
|---|---|
| Media files inventoried | 14 |
| Finished MP4 videos | 5 |
| MP3 audio files | 9 |
| YouTube standard READY | 3 (+1 after rename) |
| Etsy listing MP4 READY | 1 (Construction) |
| YouTube Shorts READY | 0 |
| Social Reels READY | 0 |

### Finished videos found

1. `construction-talking-head-youtube-v1.mp4` — READY (correct video folder)  
2. `construction-etsy-listing-video-v1.mp4` — READY (Etsy manual)  
3. `tiling-talking-head-youtube-v1.mp4` — READY (wrong folder: audio root)  
4. `insightforge-talking-head-youtube-v1.mp4` — READY (wrong folder: audio root)  
5. `wellnes_talkinghead.mp4` — NEEDS_RENAME then READY  

### Top 5 to upload first

1. YouTube — Construction talking-head  
2. Etsy — Construction listing video (manual; do not publish draft/active by accident)  
3. YouTube — Tiling talking-head  
4. YouTube — InsightForge talking-head  
5. YouTube — Wellness talking-head after rename  

---

## Pack files (created/updated)

| File | Purpose |
|---|---|
| `ACTUAL-MEDIA-INVENTORY.csv` | Every found file with path, size, duration, status |
| `READY-TO-UPLOAD-NOW.md` | Grouped ready list by platform |
| `MISSING-VIDEOS.md` | Gaps, empty folders, rename queue |
| `YOUTUBE-UPLOADS.csv` | Standard YouTube metadata |
| `YOUTUBE-SHORTS-UPLOADS.csv` | Shorts metadata (all waiting) |
| `ETSY-VIDEO-UPLOAD-CHECKLIST.md` | Per-product Etsy video checklist |
| `FACEBOOK-REELS-CAPTIONS.md` | FB captions (reels missing) |
| `INSTAGRAM-REELS-CAPTIONS.md` | IG captions (reels missing) |
| `LINKEDIN-VIDEO-POSTS.md` | LinkedIn short/long posts |
| `X-VIDEO-POSTS.md` | X short/long posts |
| `PINTEREST-VIDEO-PINS.csv` | Pin titles and destinations |
| `THUMBNAIL-TEXT-PACK.md` | Cover text |
| `PINNED-COMMENTS.md` | YouTube pinned comments |
| `HASHTAG-BANK.md` | Shared hashtags |
| `POSTING-SEQUENCE.md` | Day-by-day order |
| `UPLOAD-HANDOFF.md` | This file |

Prior “FINAL-*” copy packs remain in the same folder for reference; **use this inventory-based set as current truth**.

---

## Hygiene before public uploads

1. Rename `wellness-etsy-video-voiceover-v1..mp3` → `wellness-etsy-video-voiceover-v1.mp3`  
2. Rename `wellnes_talkinghead.mp4` → `wellness-talking-head-youtube-v1.mp4`  
3. Move talking-heads from `nextgenwebs-audio/` → `nextgenwebs-video/youtube-talking-heads/`  
4. Mux Etsy listing MP4s for Tiling, InsightForge, Wellness, Bank Desert (VO ready)  
5. Do not invent demo, portfolio, YouTube, or Etsy product URLs  

---

## Precision Laser Etsy (known draft)

| Field | Value |
|---|---|
| Etsy draft ID | `4537642227` |
| Francis Listing Manager product ID | `14` |
| State | **draft** |
| Public product URL | **None claimed** |
| Listing video file | **Missing** |
| Action | Hold video attach until file exists; never auto-publish |

---

## Placeholders (required until real URLs exist)

- `EXACT_ETSY_PRODUCT_URL_PENDING_PUBLICATION`  
- `LIVE_DEMO_URL_PENDING`  
- `PORTFOLIO_PROJECT_URL_PENDING`  
- `YOUTUBE_URL_PENDING`  

Do not substitute a generic Etsy shop URL as an exact product URL.

---

## Next human actions

1. Review `READY-TO-UPLOAD-NOW.md`  
2. Upload Construction YouTube first  
3. Manually attach Construction Etsy video without publishing side effects  
4. Continue Tiling → InsightForge → Wellness  
5. Generate missing media listed in `MISSING-VIDEOS.md`  
6. Only then fill Shorts/Reels folders and re-run inventory  

**Nothing in this pack authorises publishing.**
