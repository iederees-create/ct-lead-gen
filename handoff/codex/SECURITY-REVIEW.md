# Security Review

Scope: release packaging, quote planner handoff, and current baseline audit.

| Risk | Status | Review Notes | Required Action |
| --- | --- | --- | --- |
| Script injection from form inputs | needs verification | Quote planner is absent from baseline. Future summary rendering must not use raw `innerHTML` with user input. | Verify after UI merge. Prefer `textContent` and safe templates. |
| Unsafe URL construction | needs verification | WhatsApp and email handoff must encode planner fields. | Validate with `validate-links.mjs` and manual handoff tests. |
| Path traversal in product pack | allowed | Allowed only as a validation target. Product pack must reject `../`, absolute paths, and null bytes. | Run `validate-product-pack.mjs`. |
| Exposed credentials | needs verification | No credentials observed in current client files. Full pack still needs scanning. | Run `scan-secrets.mjs` on pack root before distribution. |
| Unsafe external links | needs verification | Current WhatsApp floating link uses `target="_blank"` without `rel="noopener"`. | Fix in product UI branch before release. |
| File-upload wording | needs verification | No upload exists. Copy must not imply backend upload or secure storage unless implemented. | Use "file readiness checklist" wording. |
| Malformed WhatsApp links | needs verification | Current baseline uses static WhatsApp links. Planner links must be generated safely. | Test encoded output with special characters. |
| Malformed email links | needs verification | Email handoff absent. | Test encoded `mailto:` subject/body. |
| Local paths in public assets | needs verification | Current client has no local media assets. Product pack scripts reject absolute local paths. | Run product pack and build-output validators. |
| Remote script dependency | needs verification | Baseline loads remote chat script from GitHub Pages. | Decide whether the final product pack allows remote agency chat code. |
| Symlink inclusion | allowed | Only allowed as a validator check. | Product pack must reject symlinks. |
| `.git`, `.env`, `node_modules` inclusion | allowed | Only allowed as a validator check. | Product pack must reject these paths. |
