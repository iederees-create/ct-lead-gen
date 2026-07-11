# CLAUDE.md — ct-lead-gen

Guidance for Claude Code when working in this repository.

## What This Repo Is

`ct-lead-gen` is a monorepo of client-facing lead-generation website
projects, mostly under `clients/<client-name>/` as static HTML/CSS/JS
sites. Some client sites are later spun out into their own standalone
GitHub repo + Pages demo when they become sellable Etsy templates (see
below).

## Selling a Client Site as an Etsy Template

If you are asked to turn a client site into a commercial template product,
follow `RELEASE-WORKFLOW.md` in this directory step by step. Key points:

- Rebuild/rebrand the site as a fictional demo business with a buyer-facing
  `site-config.js`; never leave real client data, hardcoded contact
  details, or unsupported claims (guaranteed results, "fully insured",
  specific ratings, etc.) in demo content.
- The public demo lives in its own standalone GitHub repository (separate
  from this monorepo) with GitHub Pages enabled, e.g.
  `iederees-create/<template-name>-template`.
- The commercial packaging (buyer ZIP, Etsy listing content/images,
  Francis Listing Manager Complete Product Pack) lives in a `seller-pack/`
  directory inside the client's folder here — never inside the public demo
  repo, and never committed with `.git`, secrets, or unrelated files.
- Etsy listings are never published automatically. Every workflow stops at
  "draft created, ready for human review" — publishing is always a manual,
  explicit action by the human owner.

## Portfolio Integration

Completed templates get added to the separate `3D-Portfolio` repo
(`/home/iedrees/Workspace/3D-Portfolio`, `src/App.tsx`) as a portfolio
project entry with a `liveUrl`. Do not add an `etsyUrl` until the listing
has actually been published by the human owner.
