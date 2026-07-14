# Etsy Video Upload Checklist

**Do not publish listings from this pack.**  
**Do not change prices.**  
**Do not claim public product URLs for drafts.**  
**Manual video attach only unless an explicit safe API path is approved later.**

Inventory scanned: 2026-07-14.

Placeholders:

- `EXACT_ETSY_PRODUCT_URL_PENDING_PUBLICATION` — use when listing is not public or URL unknown  
- Never substitute a generic shop homepage as the exact product URL  

---

## Global rules

| Rule | Detail |
|---|---|
| Manual upload | Yes — attach video in Etsy seller UI per listing |
| API upload later | May be possible later via Francis Listing Manager / Etsy API; not enabled in this pack |
| Accidental publish | **Warning:** attaching media must not flip draft listings to active |
| Price | Do not edit listing prices during video work |
| Audio-only | MP3 voiceovers are **not** Etsy listing videos until muxed to MP4 |

---

## Product checklist

### 1. Construction Website Template

| Field | Value |
|---|---|
| Listing name | Construction Website Template (renovation quote planner) |
| Listing status | Unknown public/draft — treat URL as pending unless operator confirms |
| Exact listing URL | `EXACT_ETSY_PRODUCT_URL_PENDING_PUBLICATION` |
| Video filename | `construction-etsy-listing-video-v1.mp4` |
| Video path | `/home/iedrees/Workspace/nextgenwebs-video/etsy-listing-videos/construction-etsy-listing-video-v1.mp4` |
| Video exists | **Yes** (11.8s, ~2.8M) |
| Related VO audio | `construction-etsy-video-voiceover-v1.mp3` (exists; already used or alternate bed) |
| Upload manually | **Yes** |
| API upload later | Possible later — not now |
| Publish warning | Attach video only; do not publish if listing is draft; do not change price |
| Ready | **READY** for manual video attach |

---

### 2. Tiling Contractor Website Template

| Field | Value |
|---|---|
| Listing name | Tiling Contractor Website Template |
| Listing status | Unknown |
| Exact listing URL | `EXACT_ETSY_PRODUCT_URL_PENDING_PUBLICATION` |
| Video filename | `tiling-etsy-listing-video-v1.mp4` (expected; not found) |
| Video exists | **No** |
| Related VO audio | **Yes** — `tiling-etsy-video-voiceover-v1.mp3` (33.8s) |
| Upload manually | Not until listing MP4 is rendered |
| API upload later | Possible later — not now |
| Publish warning | Do not publish incomplete media changes |
| Ready | **WAITING_FOR_MUX** (audio ready) |

---

### 3. InsightForge Business Analytics Dashboard

| Field | Value |
|---|---|
| Listing name | InsightForge / Small Business Analytics Dashboard |
| Listing status | Unknown |
| Exact listing URL | `EXACT_ETSY_PRODUCT_URL_PENDING_PUBLICATION` |
| Video filename | `insightforge-etsy-listing-video-v1.mp4` (expected; not found) |
| Video exists | **No** |
| Related VO audio | **Yes** — `insightforge-etsy-video-voiceover-v1.mp3` (30.5s) |
| Upload manually | Not until listing MP4 is rendered |
| API upload later | Possible later — not now |
| Publish warning | Do not publish incomplete media changes |
| Ready | **WAITING_FOR_MUX** |

---

### 4. Precision Laser Website Template

| Field | Value |
|---|---|
| Listing name | Precision Laser Website Template |
| Listing status | **Draft** |
| Etsy draft ID | `4537642227` |
| Francis Listing Manager product ID | `14` |
| Exact listing URL | **No public product URL** — use `EXACT_ETSY_PRODUCT_URL_PENDING_PUBLICATION` only after human publication |
| Video filename | `precision-laser-etsy-listing-video-v1.mp4` (expected; not found) |
| Video exists | **No** |
| Related VO audio | **No** files found in media folders |
| Upload manually | When video exists — still do not auto-publish draft |
| API upload later | Possible later — not now |
| Publish warning | **Critical:** draft only. Do not publish accidentally. Do not claim active/public URL. Do not change price. |
| Ready | **NOT READY** |

---

### 5. Bank Desert Analysis Project

| Field | Value |
|---|---|
| Listing name | Bank Desert Analysis Project (student lab) |
| Listing status | Unknown |
| Exact listing URL | `EXACT_ETSY_PRODUCT_URL_PENDING_PUBLICATION` |
| Video filename | `bank-desert-etsy-listing-video-v1.mp4` (expected; not found) |
| Video exists | **No** |
| Related VO audio | **Yes** — `bank-desert-etsy-video-voiceover-v1.mp3` (27.4s) |
| Upload manually | Not until listing MP4 is rendered |
| API upload later | Possible later — not now |
| Publish warning | Education product — no banking advice claims in listing copy |
| Ready | **WAITING_FOR_MUX** |

---

### 6. Wellness Website Template

| Field | Value |
|---|---|
| Listing name | Wellness Website Template |
| Listing status | Unknown |
| Exact listing URL | `EXACT_ETSY_PRODUCT_URL_PENDING_PUBLICATION` |
| Video filename | `wellness-etsy-listing-video-v1.mp4` (expected; not found) |
| Video exists | **No** |
| Related VO audio | **Yes** — `wellness-etsy-video-voiceover-v1..mp3` (**NEEDS_RENAME** → remove double dot) |
| Upload manually | Not until listing MP4 is rendered |
| API upload later | Possible later — not now |
| Publish warning | Marketing site only — not medical claims |
| Ready | **WAITING_FOR_MUX** (+ rename audio first) |

---

### 7. Pest Control Website Template

| Field | Value |
|---|---|
| Listing name | Pest Control Website Template |
| Listing status | Unknown |
| Exact listing URL | `EXACT_ETSY_PRODUCT_URL_PENDING_PUBLICATION` |
| Video filename | `pest-control-etsy-listing-video-v1.mp4` |
| Video exists | **No** |
| Related VO audio | **No** |
| Upload manually | No media |
| API upload later | Possible later — not now |
| Publish warning | Replace fictional demo claims before any public listing |
| Ready | **MISSING** |

---

### 8. Zen Skin Studio Website Template

| Field | Value |
|---|---|
| Listing name | Zen Skin Studio Website Template |
| Listing status | Unknown |
| Exact listing URL | `EXACT_ETSY_PRODUCT_URL_PENDING_PUBLICATION` |
| Video filename | `zen-skin-etsy-listing-video-v1.mp4` |
| Video exists | **No** |
| Related VO audio | **No** |
| Upload manually | No media |
| API upload later | Possible later — not now |
| Publish warning | Not an EMR; no treatment claims |
| Ready | **MISSING** |

---

### 9. Solar Website Template

| Field | Value |
|---|---|
| Listing name | Solar Website Template |
| Listing status | Unknown |
| Exact listing URL | `EXACT_ETSY_PRODUCT_URL_PENDING_PUBLICATION` |
| Video filename | `solar-etsy-listing-video-v1.mp4` |
| Video exists | **No** |
| Related VO audio | **No** |
| Upload manually | No media |
| API upload later | Possible later — not now |
| Publish warning | Savings-style figures educational only |
| Ready | **MISSING** |

---

### 10. NextGenWebs (brand)

| Field | Value |
|---|---|
| Listing name | Brand / multi-product (not a single Etsy SKU by default) |
| Video for brand shop | No brand listing video required by this pack |
| Brand audio | Homepage MP3s exist — not Etsy listing videos |
| Ready | N/A for Etsy listing video attach |

---

## Operator sequence (Etsy only)

1. Confirm listing is the correct draft or active listing (human check).  
2. For Construction only: attach `construction-etsy-listing-video-v1.mp4` manually.  
3. Save as draft / update media **without** unintended publish.  
4. Do not change price, title, or tags unless human-approved.  
5. Only after listing is public, replace `EXACT_ETSY_PRODUCT_URL_PENDING_PUBLICATION` in social packs.  
6. Mux remaining VO MP3s before any other Etsy video attaches.

---

## Scoreboard

| Ready listing video MP4 | Waiting on mux (audio exists) | Missing entirely |
|---|---|---|
| Construction | Tiling, InsightForge, Wellness, Bank Desert | Precision Laser, Pest Control, Zen Skin, Solar |
