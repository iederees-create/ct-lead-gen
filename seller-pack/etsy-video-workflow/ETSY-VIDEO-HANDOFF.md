# Etsy Video Handoff

**This is preparation only. Nothing has been uploaded. No listing state has
changed. Nothing has been published.**

## What exists right now (verified today)

- **1 finished Etsy-listing-format video:** Construction Website Template
  (`nextgenwebs-video/etsy-listing-videos/construction-etsy-listing-video-v1.mp4`,
  11.8s, 832×1088, H.264/AAC, 2.86MB — verified with `ffprobe`).
- **Partial ElevenLabs assets** for Tiling and InsightForge (voiceover mp3
  + a talking-head YouTube-format video each, but not yet the dedicated
  Etsy listing video format).
- **Voiceover only, no video yet** for Bank Desert Analysis.
- **No assets at all yet** for Wellness, Pest Control, Zen Skin Studio, or
  Precision Laser.
- **6 of 9 products already have SOME video attached to their Etsy draft** —
  Construction, Tiling, InsightForge, Bank Desert, Wellness, and Precision
  Laser. These are earlier auto-generated videos (mostly screenshot
  slideshows), not the new ElevenLabs-narrated videos. Attaching a new
  video to any of these 6 would be a **replace**, not a first attach.
- **2 products currently have no video attached at all** — Pest Control and
  Zen Skin Studio. A new video here is a first attach.
- **1 product has no matching Francis Listing Manager record at all** — the
  Solar Website Template. Its listing ID is `LISTING_ID_REQUIRED` in
  `VIDEO-LISTING-MAP.csv` until a human confirms/creates the correct
  product.

Full detail, per product, is in `VIDEO-LISTING-MAP.csv`.

## What to do once an MP4 is generated for a product

1. Drop the finished `.mp4` (or `.mov`) into
   `/home/iedrees/Workspace/nextgenwebs-video/etsy-listing-videos/`, named
   consistently with the existing convention
   (`<product-slug>-etsy-listing-video-v1.mp4` — see
   `VIDEO-LISTING-MAP.csv`'s `expected_video_filename` column for the exact
   name expected per product).
2. Work through `VIDEO-READINESS-CHECKLIST.md` for that one product only.
3. Tell the human owner, by product name, exactly what you found:
   - the file path and its `ffprobe` output,
   - whether this is a first attach or a replace (check
     `VIDEO-LISTING-MAP.csv`'s notes — 6 of 9 products are currently
     replace cases),
   - the current Etsy draft state (must be `draft`).
4. **Wait for explicit, product-named approval.** Do not proceed on an
   assumption that earlier approval for one product extends to another.
5. Only after approval, run the two real commands in
   `SAFE-UPLOAD-COMMANDS.md` (upload to Francis Listing Manager, then push
   to Etsy) for that one product.
6. Verify via `GET /api/products/:id/manual-upload` that a new
   `etsy_video_id` is set.
7. Update `VIDEO-LISTING-MAP.csv` for that product: `video_exists` and
   `ready_for_upload` reflect the new state, and the notes column records
   the new `etsy_video_id` and the date.
8. **Stop there.** Do not touch the publish endpoints. Publishing a listing
   is exclusively a manual action taken by the human account owner directly
   — no command in this workflow, and no future run of it, should ever send
   a publish confirmation on the user's behalf.

## Special note: the Solar Website Template

Before any video work can happen for "Solar Website Template," its Francis
Listing Manager product (and, if needed, its Etsy draft) needs to exist.
This review found no matching product among all 15 records currently in
Francis Listing Manager. Confirm with the human owner whether this product:
- already exists under a different name in Francis Listing Manager (and
  update `VIDEO-LISTING-MAP.csv` with the real IDs), or
- has not been imported/drafted yet, in which case video work is blocked
  until that happens (separately, and outside the scope of this video
  workflow).

## Files in this handoff package

| File | Purpose |
|---|---|
| `ETSY-VIDEO-ATTACHMENT-WORKFLOW.md` | The 10 code-verified facts about how video upload actually works, plus the full safe end-to-end procedure |
| `VIDEO-LISTING-MAP.csv` | Current, verified state for all 9 products: listing IDs, product IDs, whether a video file exists, whether it's ready, and whether the target would be a replace or first attach |
| `VIDEO-READINESS-CHECKLIST.md` | Per-product checklist to work through before requesting approval |
| `SAFE-UPLOAD-COMMANDS.md` | The exact API calls, with every real (state-changing) command marked `DO_NOT_RUN_UNTIL_USER_APPROVES` |
| `VIDEO-API-RISK-REVIEW.md` | Six specific, code-grounded risks (not generic Etsy-platform speculation) and how this workflow mitigates each |
| `ETSY-VIDEO-HANDOFF.md` | This file |
