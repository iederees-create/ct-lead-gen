# Missing Videos — Actual Inventory Gap List

**Scanned:** 2026-07-14  
**Sources:** `/home/iedrees/Workspace/nextgenwebs-audio` · `/home/iedrees/Workspace/nextgenwebs-video`  
**Rule:** Do not invent file existence. Empty folders are empty.

---

## Summary

| Category | Present | Missing / blocked |
|---|---|---|
| Finished YouTube talking-head MP4s | 4 (Construction correct folder; Tiling/InsightForge wrong folder; Wellness needs rename) | 6 products + brand intro |
| Finished Etsy listing MP4s | 1 (Construction only) | 9 products |
| YouTube Shorts MP4s | 0 | All products |
| Social reels MP4s | 0 | All products |
| Homepage brand MP4 | 0 | Intro + segments (audio exists) |
| Portfolio walkthrough MP4s | 0 | All products |

---

## Empty production folders (no files)

### nextgenwebs-audio
- `cold-outreach/`
- `portfolio-walkthroughs/`
- `youtube-shorts/`
- `social-reels/`
- `_unsorted-audio/`
- `nextgenwebs-video/` (empty nested dir)

### nextgenwebs-video
- `homepage-brand/`
- `portfolio-walkthroughs/`
- `youtube-shorts/`
- `social-reels/`
- `_unsorted-video/`

---

## Missing by product (official order)

### 1. NextGenWebs
| Asset | Status |
|---|---|
| Homepage / brand talking-head or film MP4 | **MISSING** (audio ready: `nextgenwebs-homepage-intro-v1.mp3` + 3 segment MP3s) |
| Shorts / reels | **MISSING** |
| Portfolio walkthrough | N/A brand |

### 2. Construction Website Template
| Asset | Status |
|---|---|
| Talking-head YouTube | **HAVE** `construction-talking-head-youtube-v1.mp4` |
| Etsy listing video | **HAVE** `construction-etsy-listing-video-v1.mp4` |
| Shorts / reels vertical | **MISSING** |
| Portfolio walkthrough MP4 | **MISSING** (Etsy VO audio exists) |

### 3. Tiling Contractor Website Template
| Asset | Status |
|---|---|
| Talking-head YouTube | **HAVE** but **WRONG_FOLDER** under audio root |
| Etsy listing MP4 | **MISSING** (VO audio exists) |
| Shorts / reels | **MISSING** |
| Portfolio walkthrough | **MISSING** |

### 4. InsightForge Business Analytics Dashboard
| Asset | Status |
|---|---|
| Talking-head YouTube | **HAVE** but **WRONG_FOLDER** under audio root |
| Etsy listing MP4 | **MISSING** (VO audio exists) |
| Shorts / reels | **MISSING** |
| Portfolio walkthrough | **MISSING** |

### 5. Precision Laser Website Template
| Asset | Status |
|---|---|
| All video / audio deliverables | **MISSING** (no files found) |
| Etsy listing video | **MISSING** (draft listing exists — do not claim public URL) |

**Known draft only (not a video):** Etsy draft ID `4537642227` · Francis product ID `14` · state **draft**.

### 6. Bank Desert Analysis Project
| Asset | Status |
|---|---|
| Etsy VO audio | **HAVE** `bank-desert-etsy-video-voiceover-v1.mp3` |
| Etsy listing MP4 | **MISSING** |
| Talking-head / Shorts / reels | **MISSING** |

### 7. Wellness Website Template
| Asset | Status |
|---|---|
| Talking-head | **HAVE** as `wellnes_talkinghead.mp4` — **NEEDS_RENAME** (+ wrong folder) |
| Etsy VO audio | **HAVE** as `wellness-etsy-video-voiceover-v1..mp3` — **NEEDS_RENAME** |
| Etsy listing MP4 | **MISSING** |
| Shorts / reels | **MISSING** |

### 8. Pest Control Website Template
| Asset | Status |
|---|---|
| All media | **MISSING** |

### 9. Zen Skin Studio Website Template
| Asset | Status |
|---|---|
| All media | **MISSING** |

### 10. Solar Website Template
| Asset | Status |
|---|---|
| All media | **MISSING** |

---

## Rename / hygiene queue (files exist)

| Current path | Action |
|---|---|
| `nextgenwebs-audio/wellness-etsy-video-voiceover-v1..mp3` | Rename → `wellness-etsy-video-voiceover-v1.mp3` (remove double dot) |
| `nextgenwebs-audio/wellnes_talkinghead.mp4` | Rename → `wellness-talking-head-youtube-v1.mp4` |
| `nextgenwebs-audio/tiling-talking-head-youtube-v1.mp4` | Move → `nextgenwebs-video/youtube-talking-heads/` |
| `nextgenwebs-audio/insightforge-talking-head-youtube-v1.mp4` | Move → `nextgenwebs-video/youtube-talking-heads/` |
| `nextgenwebs-audio/wellnes_talkinghead.mp4` (after rename) | Move → `nextgenwebs-video/youtube-talking-heads/` |
| Root-level Etsy VOs (tiling, insightforge, bank-desert, wellness) | Optional: move under `nextgenwebs-audio/etsy-listing-videos/` |

---

## Production priorities to unblock uploads

1. **Mux Etsy listing MP4s** for Tiling, InsightForge, Wellness, Bank Desert (VO audio already exists).  
2. **Rename + relocate** Wellness talking-head so upload pack filenames match.  
3. **Move** Tiling + InsightForge talking-heads into `youtube-talking-heads/`.  
4. **Render vertical Shorts/Reels** if social-first distribution is required (none exist today).  
5. **Generate** Precision Laser, Pest Control, Zen Skin, Solar, homepage brand videos.  

Do not mark any missing row as READY.
