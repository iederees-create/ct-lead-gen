# Video Readiness Checklist

Run through this checklist for **one product at a time** before requesting
approval to upload. Do not batch-approve multiple products at once — each
row in `VIDEO-LISTING-MAP.csv` is an independent decision.

## A. File checks (local, no network calls)

- [ ] File extension is `.mp4` or `.mov` (Francis Listing Manager rejects
      anything else — `constants.uploads.video.allowedExtensions`).
- [ ] File size is under 100MB (Etsy's real limit,
      `constants.etsy.video.maxSizeBytes`). The tool itself will accept up
      to 120MB locally and only warn, so do not rely on the tool to catch
      an oversized file at Etsy's actual limit.
- [ ] `ffprobe` confirms the file has a valid video stream (codec, width,
      height) and a valid audio stream if narrated. Example:
      ```
      ffprobe -v error -show_entries format=duration,size -show_entries stream=width,height,codec_name -of default=noprint_wrappers=1 <file>
      ```
- [ ] Duration is checked manually against Etsy's current published
      guidance for listing videos — this is **not enforced by Francis
      Listing Manager's code** (confirmed in
      `ETSY-VIDEO-ATTACHMENT-WORKFLOW.md` §3).
- [ ] Video plays correctly end-to-end when opened locally (not just a
      valid container — actually watch it).
- [ ] Audio (if present) is synced, at a reasonable volume, and free of
      obvious ElevenLabs generation artefacts (clipped words, awkward
      pauses, mispronounced product names).
- [ ] No fabricated claims are spoken in the video (ratings, guarantees,
      "certified," "same-day," completed-project counts) — the same
      claims discipline that applies to written listing copy applies to
      narrated video.

## B. Product/listing state checks (read-only API calls)

- [ ] `GET /api/products/:id/manual-upload` returns the expected product
      name and confirms whether `video.etsy_video_id` is already set.
- [ ] If `video.etsy_video_id` is already set: this upload will be a
      **replace**, not a first attach. Flag this explicitly when
      requesting approval — see `VIDEO-API-RISK-REVIEW.md` for why a
      replace carries more uncertainty than a first attach.
- [ ] `product.etsy_listing_id` is present and matches
      `VIDEO-LISTING-MAP.csv` for this product. If it is `LISTING_ID_REQUIRED`
      (currently only the Solar Website Template row), **stop** — the
      Etsy draft does not exist yet in Francis Listing Manager, so there
      is nothing to attach a video to.
- [ ] `listing_state` is `draft` (never proceed if it has somehow become
      `published` — re-verify via `GET /api/etsy/products/:id/deploy-status`
      if in doubt).

## C. Approval checks (human, not automatable)

- [ ] The exact product name, Etsy listing ID, and exact video file path
      have been stated to the human owner.
- [ ] Whether this is a first attach or a replace has been stated
      explicitly.
- [ ] The human owner has given explicit, product-specific approval — a
      general "yes, go ahead with videos" is not sufficient once more than
      one product is involved.
- [ ] No approval has been given to publish anything. Approval to attach a
      video is not approval to publish — these are always separate
      decisions.

## D. After upload (verification, still read-only)

- [ ] `GET /api/products/:id/manual-upload` shows a new `video.etsy_video_id`
      value (a different number from before, if this was a replace).
- [ ] `GET /api/etsy/products/:id/deploy-status` still shows
      `etsyListingState: "draft"` and no `publishing`/`complete` step was
      reached.
- [ ] Update `VIDEO-LISTING-MAP.csv` for this product:
      `video_exists` → `true`, `ready_for_upload` → `false` (already done),
      and a note recording the new `etsy_video_id` and upload date.
