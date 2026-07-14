# Etsy Video Attachment Workflow

**Status: preparation only. No video has been uploaded. No listing state has
been changed. No draft has been published.**

This document is the authoritative reference for attaching a finished
ElevenLabs-produced Etsy listing video to an existing Francis Listing
Manager product / Etsy draft. It is based on reading the actual current
Francis Listing Manager server code on this date, not assumptions or old
docs.

## 1–10: Answers, verified directly from source

### 1. Exact service/function used for Etsy video upload

- **Local pipeline entry point:** `etsyDeploymentService.uploadMissingVideo(productId)`
  (`server/services/etsyDeploymentService.js`), which wraps
  `uploadMissingVideoInner(productId)` under a per-product lock.
- **Real Etsy API call:** `etsyService.uploadListingVideo(listingId, videoBuffer, { filename })`
  (`server/services/etsyService.js`, line ~271), which does:
  ```js
  const client = getClient({});
  const form = new FormData();
  form.append('video', new Blob([videoBuffer]), filename || 'video.mp4');
  form.append('name', filename || 'video.mp4');
  return trackRequest(client.post(`/shops/${connection.shop_id}/listings/${listingId}/videos`, { formData: form }));
  ```
  This is a real call to Etsy's documented Open API endpoint
  `POST /v3/application/shops/{shop_id}/listings/{listing_id}/videos`, made
  through `etsyApiClient.js` using the shop's own stored OAuth token
  (`etsyTokenStore.js`). It is **not** a mock — mock behaviour only applies
  when `ETSY_API_ENABLED` is not `"true"` (see §8, dry-run).
- **HTTP route that triggers it:** `POST /api/etsy/products/:id/video/upload-missing`
  (`server/routes/etsy.js`), and it is also one step inside the one-click
  `runFullDraftDeployment()` / "Create Complete Etsy Draft" flow.

### 2. Required video file format

- Extensions: **`.mp4` or `.mov` only** (`constants.etsy.video.allowedExtensions`
  and `constants.uploads.video.allowedExtensions`, both in
  `server/config/constants.js`).
- MIME types accepted on local upload: `video/mp4`, `video/quicktime`
  (`constants.uploads.video.allowedMimeTypes`, enforced by the `videoUpload`
  multer middleware in `server/middleware/upload.js`).
- A lightweight magic-byte sniff, `videoService.looksLikeValidVideoFile()`,
  reads the first 8 bytes of the file and checks the MP4/MOV "ftyp" atom
  signature against a known-atom set — this rejects files that merely have
  a `.mp4` extension but aren't actually a valid container, but does
  **not** validate codec, resolution, or duration.

### 3. Size and duration limits enforced in code

- **Size — enforced in code, two related limits:**
  - `constants.uploads.video.maxSizeBytes` = **120 MB** — the local-upload
    acceptance cap (multer `limits.fileSize`), deliberately set slightly
    above Etsy's real limit so an oversized file is accepted locally and
    then flagged with a warning, rather than being silently hard-rejected.
  - `constants.etsy.video.maxSizeBytes` = **100 MB** — the limit checked
    during Complete Product Pack manifest validation
    (`productPackImportService.validateProductPack`), which is Etsy's
    actual documented video size limit.
- **Duration — NOT enforced anywhere in code.** No file in this codebase
  reads or checks video duration. Etsy's own platform guidance for listing
  videos (commonly cited as ≤15 seconds) must be checked and respected
  manually before upload; this tool will not stop you from uploading a
  longer file.
- **Count:** `constants.etsy.video.maxCount = 1` — Etsy allows exactly one
  video per listing (also true generally of Etsy's platform).

### 4. Required Etsy listing ID

Yes — `uploadMissingVideoInner()` throws
`'Create the Etsy draft before uploading a listing video.'` if
`product.etsy_listing_id` is not already set. The Etsy draft must exist
first; video upload cannot create a listing on its own.

### 5. Required product ID

Yes — every step (`uploadMissingVideo(productId)`, the local video-file
lookup via `listingVideoRepo.findByProductId(productId)`, and the HTTP route
`POST /api/etsy/products/:id/video/upload-missing`) is keyed by the local
Francis Listing Manager product ID, not the Etsy listing ID directly. The
product ID is used to look up both the local video file row and the
associated `etsy_listing_id`.

### 6. Whether existing videos are replaced or appended

- **On Etsy's side:** Etsy allows exactly one video per listing
  (`constants.etsy.video.maxCount = 1`, and confirmed by a code comment in
  `listingVideoRepo.js`: *"Etsy allows only one video per listing —
  uploading a new one replaces any existing row rather than adding a
  second."*).
- **Locally:** uploading a new video file via
  `POST /api/products/:id/manual-upload/video` calls `listingVideoRepo.upsert()`,
  which — if a video row already exists for that product — **overwrites
  the stored file reference and explicitly clears `etsy_video_id` to
  `NULL`**. This is deliberate: it means the *next* deployment run will
  treat the video as "not yet uploaded" and call `uploadListingVideo()`
  again with the new file.
- **Important gap identified in this review:** unlike the digital-file
  removal flow (`removeUploadedFile`, which explicitly deletes the file
  from the *real* Etsy listing first before freeing the local slot), there
  is **no equivalent explicit "delete video from Etsy" API call anywhere in
  this codebase** before a replacement upload. The code relies entirely on
  Etsy's own API to handle the one-video-per-listing constraint when a
  second `POST .../videos` call is made for the same listing. This behaviour
  is not verified in this codebase and should be treated as an open risk —
  see `VIDEO-API-RISK-REVIEW.md`.
- **Net effect:** replacing an existing video is possible but is **not a
  safe, automatic no-op** — it depends on unverified Etsy-side behaviour,
  which is exactly why this task treats every replace as requiring explicit
  human approval before running.

### 7. Whether the API response includes `etsy_video_id`

Yes, functionally. Etsy's response to the video upload call is captured as
`result`, and `result.video_id` is stored locally as `etsy_video_id`:
```js
const result = await etsyService.uploadListingVideo(product.etsy_listing_id, buffer, { filename: video.original_filename });
listingVideoRepo.setEtsyVideoId(productId, result.video_id);
```
This locally-stored `etsy_video_id` is what makes the upload step
idempotent (a second run sees `video.etsy_video_id` already set and skips
re-uploading — see §6).

### 8. Whether upload can be dry-run

**No true dry-run exists for the video upload step itself.** Once
`uploadListingVideo()` is called while `ETSY_API_ENABLED=true` (confirmed
live for this shop), it makes a real network request to Etsy. There is no
`dryRun`/`preview`/`validateOnly` flag anywhere in
`etsyDeploymentService.js`, `etsyService.js`, or `routes/etsy.js` for this
specific step (searched directly, zero matches).

The closest available safety nets, all **read-only**, are:
- `GET /api/products/:id/manual-upload` — read back the current local video
  row (filename, size, whether `etsy_video_id` is already set) before
  triggering any upload.
- `GET /api/etsy/products/:id/deploy-preview` (`etsyDeploymentService.verifyDraft`)
  — a read-only report of the current draft's completeness.
- Manually confirming `constants.etsy.video` limits and running
  `videoService.looksLikeValidVideoFile()`-equivalent checks (format,
  size, and — since duration isn't checked in code — a manual `ffprobe`
  check) **before** calling any upload endpoint.

There is no way to simulate the Etsy-side call without actually making it.

### 9. Whether upload logs secrets

**Confirmed: no secret logging in this path.**
- `etsyService.js` and `etsyApiClient.js` contain **zero `console.log` /
  `console.error` calls of any kind** (searched directly).
- The `Authorization: Bearer <token>` header is constructed in
  `etsyApiClient.js` purely for the outgoing `fetch` call and is never
  included in a thrown error, a log line, or an activity-log entry.
- `trackRequest()` (the wrapper every Etsy call goes through) only records
  `'success'` or `` `error: ${err.message}` `` via
  `etsyConnectionRepo.recordRequestResult()` — `err.message` here comes
  from `EtsyApiError`, which only ever wraps the underlying network error
  text (`Network error contacting Etsy API: ${err.message}`), not request
  headers or token values.
- The dashboard/status endpoint uses `tokenStore.getMaskedStatus()`, whose
  own naming and a code comment ("never returns raw tokens") confirm tokens
  are masked before being surfaced anywhere, including to the UI.

### 10. Whether the workflow prevents publish actions

**Yes, structurally, not just by convention.** Two independent facts confirm
this:
1. The full-draft / video-upload pipeline (`runFullDraftDeployment()`)
   never calls `publish()` — publish is a **separate, standalone function**
   that is not part of the `STEPS` array executed by that pipeline. The
   pipeline's own step list ends at `ready_for_review`; `publishing` and
   `complete` are listed as steps but are only reached by the wholly
   separate publish path.
2. `publish(productId, { confirmed, confirmationPhrase })`
   (`etsyDeploymentService.js`) itself refuses to proceed unless **both**
   `confirmed === true` **and** `confirmationPhrase === 'PUBLISH'`. The
   legacy `POST /api/etsy/products/:id/publish` route likewise only forwards
   `confirmed: Boolean(req.body.confirmed)`, and is documented in its own
   code comment as gated behind an explicit user "Yes, publish" dialog.

Nothing in this document, and no command in `SAFE-UPLOAD-COMMANDS.md`,
triggers, references, or approximates either of those two conditions.

## The safe end-to-end workflow (once a video is approved for upload)

1. **Confirm the ElevenLabs video is finished** and lives in
   `/home/iedrees/Workspace/nextgenwebs-video/etsy-listing-videos/`.
2. **Check format/size/duration manually** (`ffprobe`) against §2–3 above —
   `.mp4`/`.mov`, ≤100MB (Etsy's real cap; the tool itself accepts up to
   120MB before warning), and a sensible duration (Etsy's own current
   guidance, not enforced by this tool).
3. **Read the product's current state** via
   `GET /api/products/:id/manual-upload` — note whether `video.etsy_video_id`
   is already set (i.e. this would be a **replace**, not a first attach).
   See `VIDEO-LISTING-MAP.csv` for the current known state of every product
   covered by this review.
4. **Get explicit human approval** naming the exact product, the exact
   video file, and whether this is a first attach or a replace. Do not
   proceed without it.
5. Only after approval: upload the local video file via the Francis Listing
   Manager UI ("Video" tab on the product's edit page) or
   `POST /api/products/:id/manual-upload/video`, which stores the file
   locally and clears any stale `etsy_video_id`.
6. Trigger the actual Etsy upload via the UI's "Upload Video" button
   (individual step) or "Create Complete Etsy Draft" (full pipeline) —
   both call the same `uploadMissingVideo()` function documented in §1.
7. **Verify**, via `GET /api/products/:id/manual-upload`, that
   `video.etsy_video_id` is now set to a new, real Etsy-assigned ID.
8. **Stop.** Do not click Publish. Do not send `confirmed: true` to any
   publish endpoint. Publishing remains a separate, manual, human decision.
