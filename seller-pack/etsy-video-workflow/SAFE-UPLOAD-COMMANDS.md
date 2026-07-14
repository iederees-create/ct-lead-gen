# Safe Upload Commands

Every command in this file that actually writes data or calls Etsy is
labelled `DO_NOT_RUN_UNTIL_USER_APPROVES`. Read-only commands are not
labelled and may be run freely at any time — they never change state.

All authenticated calls assume a browser session already logged into
`https://product-listing-server.onrender.com` (session-cookie + CSRF-token
auth — see `ETSY-VIDEO-ATTACHMENT-WORKFLOW.md` for why this cannot be
scripted with a bare `curl` call without first establishing that session).

## Read-only (safe to run any time)

Check a product's current video/listing state:
```
GET /api/products/{francis_product_id}/manual-upload
```

Check the deploy/draft status (confirms `draft`, never `publishing`/`complete`):
```
GET /api/etsy/products/{francis_product_id}/deploy-status
```

Check the full product record:
```
GET /api/products/{francis_product_id}
```

Inspect a local candidate video file before it ever touches Francis Listing
Manager:
```
ffprobe -v error -show_entries format=duration,size -show_entries stream=width,height,codec_name -of default=noprint_wrappers=1 <path-to-file>.mp4
```

List what's actually on disk right now (re-run any time to refresh the
picture — do not trust a stale mental model):
```
find /home/iedrees/Workspace/nextgenwebs-video -type f
find /home/iedrees/Workspace/nextgenwebs-audio -type f
```

## Real actions — DO NOT RUN UNTIL EXPLICITLY APPROVED, PER PRODUCT

Each command below must only be run after:
1. The relevant row in `VIDEO-LISTING-MAP.csv` has been updated to reflect
   a real, verified local video file (not a placeholder path).
2. `VIDEO-READINESS-CHECKLIST.md` has been fully worked through for that
   specific product.
3. The human owner has given explicit, product-named approval.

### Step 1 — upload the local video file into Francis Listing Manager

`DO_NOT_RUN_UNTIL_USER_APPROVES`
```
POST /api/products/{francis_product_id}/manual-upload/video
Content-Type: multipart/form-data
field name: video
file: <the approved .mp4/.mov file>
```
Effect: stores the file locally and clears any existing `etsy_video_id` for
this product (see §6 of `ETSY-VIDEO-ATTACHMENT-WORKFLOW.md` — this is the
point at which a "replace" decision becomes irreversible without re-running
step 2 below).

### Step 2 — push the video to the real Etsy listing

`DO_NOT_RUN_UNTIL_USER_APPROVES`
```
POST /api/etsy/products/{francis_product_id}/video/upload-missing
```
Effect: calls Etsy's real `POST /shops/{shop_id}/listings/{listing_id}/videos`
endpoint through Francis Listing Manager's own OAuth-authenticated client.
This is the step that actually reaches Etsy's servers.

### Never run, under any circumstances, as part of this workflow

`FORBIDDEN — NOT PART OF THIS TASK`
```
POST /api/etsy/products/{francis_product_id}/publish
POST /api/etsy/products/{francis_product_id}/publish-listing
```
Both require `confirmed: true` (and the legacy route additionally checks a
`confirmationPhrase`) before they do anything — this workflow never
constructs or sends either payload, and no command in this file approximates
one. Publishing is exclusively a manual, human action taken directly by the
account owner, outside of any command run by an agent.

## Verification command (run after any real action above)

```
GET /api/products/{francis_product_id}/manual-upload
```
Confirm `video.etsy_video_id` changed to a new value, then update
`VIDEO-LISTING-MAP.csv` accordingly (see §D of `VIDEO-READINESS-CHECKLIST.md`).
