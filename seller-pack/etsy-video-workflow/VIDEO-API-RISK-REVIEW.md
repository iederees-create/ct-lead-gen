# Video API Risk Review

Risks identified from directly reading the current Francis Listing Manager
source (`server/services/etsyDeploymentService.js`, `etsyService.js`,
`etsyApiClient.js`, `listingVideoRepo.js`, `constants.js`). No risk below is
theoretical guesswork about Etsy's platform in general — each one is tied to
a specific line of code or a specific gap in this codebase.

## Risk 1 — Replacing a video is not a verified-safe operation

**What the code does:** uploading a new local video clears the stored
`etsy_video_id` (`listingVideoRepo.upsert`), so the next deployment run
calls `uploadListingVideo()` again for a listing that may already have a
video attached on Etsy's side.

**What the code does NOT do:** there is no explicit "delete the existing
video from Etsy" call before the new upload — unlike the digital-file
removal path, which does call Etsy first. This codebase relies entirely on
Etsy's own API to enforce "one video per listing" by silently replacing on a
second `POST`.

**Why this matters:** if Etsy's API instead *rejects* a second video upload
for a listing that already has one (returning an error rather than
replacing), the local code would surface that as a failed `uploading_video`
step (caught and reported via `markStep(..., 'failed', ...)`), not silently
corrupt anything — but the *listing itself* could be left in an inconsistent
state (old video still attached, new file uploaded locally with no
`etsy_video_id`) until manually resolved. This has not been tested against
the real Etsy API in this review.

**Mitigation applied in this workflow:** every replace case in
`VIDEO-LISTING-MAP.csv` is explicitly flagged in its `notes` column and
`manual_review_required` is `true` for every row without exception. No
upload command in `SAFE-UPLOAD-COMMANDS.md` is run without this being
called out by product name first.

## Risk 2 — No dry-run means the first real test IS the real upload

Confirmed in `ETSY-VIDEO-ATTACHMENT-WORKFLOW.md` §8: there is no simulate
mode for this specific step while the shop is in live mode (which it is —
`Mode: Live`, `Connected: Yes`, shop "NextGenWebs"). The only way to know
for certain how Etsy's API responds to a given file is to actually send it.

**Mitigation:** front-load every check that *can* happen without a network
call (file format, magic bytes, size, manual duration check, manual video
playback review) via `VIDEO-READINESS-CHECKLIST.md` §A, so the number of
genuinely unknown variables at upload time is as small as possible —
essentially, only "does Etsy's API replace-or-reject a second video" (Risk
1) remains untested until a real approved upload happens.

## Risk 3 — Duration is not enforced by this tool

Etsy's own platform guidance on listing-video length is not encoded
anywhere in Francis Listing Manager. A video that is "valid" by this tool's
standards (right extension, right size, passes the magic-byte check) could
still be rejected by Etsy itself, or simply violate Etsy's current published
video guidelines, without Francis Listing Manager warning about it.

**Mitigation:** `VIDEO-READINESS-CHECKLIST.md` §A requires an explicit
manual duration check via `ffprobe` before any upload is approved, and
requires checking Etsy's own current published requirements rather than
trusting this tool's silence on the subject.

## Risk 4 — Idempotency depends on `etsy_video_id` staying accurate

The whole "never re-upload / never accidentally duplicate" safety property
of `uploadMissingVideoInner()` depends entirely on the local
`listing_video.etsy_video_id` column staying in sync with what's actually on
Etsy. If that value were ever cleared, edited, or lost outside of this
tool's own upload/replace flow (e.g. a direct database edit, a restored
backup from before an upload, or someone deleting the video directly in
Etsy's own seller dashboard without going through Francis Listing Manager),
the next run would treat the product as having no video and attempt another
upload — potentially creating a genuine duplicate if Etsy's API does allow
more than one video per listing in some edge case not covered by the
`maxCount: 1` assumption baked into this tool.

**Mitigation:** `VIDEO-READINESS-CHECKLIST.md` §B requires checking the
*live* `etsy_video_id` value via `GET /api/products/:id/manual-upload`
immediately before every upload decision, rather than trusting
`VIDEO-LISTING-MAP.csv`'s snapshot (which will go stale the moment any
upload happens).

## Risk 5 — Secrets: reviewed, low risk

No secret-logging path was found (`ETSY-VIDEO-ATTACHMENT-WORKFLOW.md` §9).
This is the one area of this review where the code's existing safeguards
(masked token status, no console logging, error messages that only wrap
network-error text) appear sufficient as-is. No mitigation beyond "continue
using the existing masked-status endpoints, never read the `.env` file's
raw values, and never paste a raw token into any command or document" is
needed.

## Risk 6 — Publish-adjacent confusion

Because the full-draft pipeline's step list literally includes the words
`publishing` and `complete` (even though they're never reached by the
video-upload path — see §10 of the workflow doc), it would be easy for a
future reader to mistakenly believe running the video-upload steps moves a
listing meaningfully closer to being published. It does not — `publishing`
and `complete` are only reachable through the entirely separate,
double-confirmed `publish()` function.

**Mitigation:** `SAFE-UPLOAD-COMMANDS.md` explicitly lists the publish
routes under a "Never run" heading, separate from and after the real upload
commands, so the distinction is visually unambiguous.
