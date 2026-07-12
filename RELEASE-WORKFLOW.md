# Release Workflow — Website Templates for Sale

This document records the standing, repeatable process for turning a
client-site project under `clients/` into a sellable Etsy digital-product
template. It was first established during the Westlake Pest Control release.

## Default Workflow (every template release)

For every website template intended for sale, complete the whole workflow:

0. Discover installed Claude Code skills relevant to the work (design,
   accessibility, security, testing, video/image generation, packaging) and
   use the ones that materially improve the result. Check for additional
   trusted skills (e.g. via find-skills) before building from scratch. Do
   not invoke skills merely to inflate a count, and only install skills from
   trusted sources.
1. Improve and test the website (fix branding conflicts, remove external
   dependencies, remove unsupported claims, add missing sections, add a
   buyer-facing `site-config.js`, test responsive breakpoints/console
   errors/broken links). Where the product category supports it, build an
   original interactive value-added tool (a calculator, planner, or similar)
   rather than a static page — verify it live in a real browser (not just
   unit tests), since UI-wiring bugs (e.g. a handler that re-renders a panel
   without re-attaching its own navigation buttons) will not show up in
   calculation-only unit tests.
2. Create or update its public demo repository and deploy the GitHub Pages
   demo (`https://<owner>.github.io/<repo>/`).
3. Build the buyer package: a clean ZIP of the site source (no `.git`, no
   secrets) plus START-HERE.html, COMPLETE-BUYER-GUIDE.html, LICENSE.txt,
   AI-DISCLOSURE.txt (Etsy allows a maximum of 5 digital buyer files —
   consolidate SUPPORT-POLICY and ASSET-LICENSES content into the buyer
   guide if needed to stay within that limit).
4. Generate accurate Etsy listing content: 3 title options + a recommended
   one (≤140 chars), full description (must state digital-download/no
   physical item/fictional demo content/AI disclosure/refund terms), exactly
   13 unique tags (≤20 characters each), FAQ (10+), and social copy.
5. Generate 8–10 original listing images (2000×2000 PNG preferred) using
   real screenshots of the finished site only — no competitor or stock
   imagery. `01-cover.png` is always the cover image.
5b. Generate an original Etsy listing video (silent, ≤15s, MP4/H.264,
   square or vertical, under 100MB — verify current Etsy video
   requirements before encoding; if Etsy's own help pages are unreachable,
   cross-check multiple independent published guides rather than a single
   source) built from real screenshots/footage of the finished site only.
   Produce a portfolio-ready copy (MP4 + WebM + poster image) alongside it.
6. Create a Francis Listing Manager Complete Product Pack ZIP: a manifest
   (`francis-listing-manager-import.json`) at the ZIP root (or at most one
   folder deep) plus `images/` (≤10, one cover) and `buyer-files/` (≤5).
   Validate the ZIP locally (valid JSON, exact tag/image/file counts, no
   path traversal, no secrets) before it is ever uploaded anywhere.
7. Add the live demo to the 3D Portfolio (`src/App.tsx` in the
   `3D-Portfolio` repo): title, category, description, tags, `featured:
   true`, and `liveUrl` — but no `etsyUrl` yet, since the listing starts as
   an unpublished draft. Use ALL of the listing images and the preview
   video in the portfolio showcase, not just a single thumbnail — check
   whether a gallery/showcase component already exists (a `galleryImages`
   field may already be declared on the `Project` type without being wired
   to any UI) before building a new one. Build and smoke-test the portfolio
   (including opening the showcase and testing keyboard navigation) before
   committing; rebase (never force-push) if the remote has moved on.
8. Import the Complete Product Pack into the production Francis Listing
   Manager, verify every imported field (price/currency, category,
   taxonomy, tags, images, buyer files), confirm the Etsy connection, and
   create the complete Etsy draft.
9. Verify price, category, tags, images and buyer files inside the actual
   Etsy draft (not just what the import tool reports).
10. Stop before publishing. Never click Publish, never send a publish
    confirmation payload, never guess or fabricate a numeric Etsy taxonomy
    ID.
11. Add the public Etsy URL to the 3D Portfolio entry only after the human
    owner manually publishes the listing in a later session.
12. Write a release report recording commit SHAs, demo URL, package paths,
    import/validation results, and any remaining human action (which is
    always, at minimum: "review the Etsy draft and publish it manually when
    satisfied").

## When Browser Automation / Production Access Is Unavailable

If browser automation or an authenticated Francis Listing Manager session
is not available in the current environment:

- Finish every local deliverable (steps 1–7 above).
- Do NOT claim that the production import or Etsy draft succeeded.
- Report the exact blocker (e.g. "no authenticated session for
  product-listing-server.onrender.com in this environment") and the precise
  remaining action for the human owner to complete manually.

## Hard Rules (apply to every release)

- Never publish an Etsy listing automatically. Publishing is always a
  manual, human-approved action.
- Never automate etsy.com directly or call undocumented Etsy endpoints.
  All Etsy draft creation goes through Francis Listing Manager's own UI/API
  (which uses its own server-side OAuth token). Before using any Francis
  Listing Manager action that talks to Etsy's API (e.g. video upload),
  confirm the underlying capability is part of Etsy's officially documented
  Open API — do not assume, and do not invent an endpoint yourself.
- If no authenticated Francis Listing Manager session exists, do not
  request or enter credentials — pause and ask the human owner to log in,
  then continue.
- After a Complete Product Pack import, verify the actual field values via
  the tool's own read-back (edit page, deploy-status/deploy-preview APIs),
  not just the import success message — check listing content, image alt
  text, and price/currency, since target prices are entered in a nominal
  currency (e.g. USD) that may not match the shop's actual default currency
  (e.g. ZAR). Flag any mismatch prominently as a required human action
  rather than silently leaving an incorrect price live.
- Never fabricate a successful import, validation, or draft-creation result.
- Never include `.git`, `.env`, API keys, credentials, `node_modules`,
  screenshots from other projects, or unrelated files in a buyer ZIP or
  Complete Product Pack.
- All demo business names, contact details, ratings, statistics, and
  testimonials must be clearly labelled as fictional/sample and
  buyer-editable.
- Do not publish unsupported claims (guaranteed results, "fully insured",
  "certified", "same-day response", specific ratings/job counts, etc.)
  in demo content or listing copy unless clearly marked as an editable
  placeholder.
