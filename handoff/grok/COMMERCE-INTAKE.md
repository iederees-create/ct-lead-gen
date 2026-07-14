# Commerce Intake — Precision Laser Website Template

**Agent:** Grok commerce (`agent/grok-commerce`)  
**Product:** Precision Laser Website Template  
**Core feature (positioning):** Laser Cut & Engraving Quote Planner  
**Sales platform:** Etsy only  
**Intake date:** 2026-07-14  
**Status:** Pre-build commerce draft — many claims pending Claude build verification  

---

## 1. Product direction

Sell a **static, buyer-configurable website template** for **laser cutting, laser engraving, signage, acrylic fabrication, wood engraving, trophies/awards, and branded-gift workshops**.

The commercial differentiator is **not** “pretty homepage.” It is an interactive **Laser Cut & Engraving Quote Planner** that helps visitors submit **production-ready quote briefs** (material, thickness, size, quantity, process type, file readiness, notes) instead of vague “how much for a laser job?” messages.

**Demo brand intent:** Fictional sample laser fabrication business for layout showcase only.  
**Not in scope:** Medical, cosmetic, dermatology, hair-removal, surgical, eye, or treatment lasers. The legacy `clients/precision-laser-ct` source currently contains aesthetic-clinic content and must **not** be used as product truth for this listing.

---

## 2. Target buyer

### Primary

| Segment | Why they buy |
|---|---|
| Laser cutting businesses | Need cleaner first enquiries before material nesting / quoting |
| Laser engraving studios | Tired of incomplete art files and missing quantities |
| Signage shops | Mix of cut, engrave, and install-adjacent jobs needs structured intake |
| Trophy & awards shops | Repeat SKU + custom plate jobs benefit from checklist-style briefs |
| Acrylic fabricators | Material + thickness + edge finish questions dominate quotes |
| Wood engraving / branded gift makers | Personalisation jobs arrive as vague WhatsApp photos |
| Small manufacturing workshops with a laser cell | Need a public front door that filters hobby noise from real jobs |
| Freelance web designers serving maker businesses | Want a ready niche template with a planner clients actually use |

### Secondary

- Agencies white-labelling one end-business site under a single licence (`VERIFY_AFTER_BUILD` licence wording)
- Existing shops with a brochure site who want a **quote-quality upgrade**, not a full ERP

### Not the buyer

- Medical/cosmetic laser clinics
- Buyers seeking a full ERP, CRM, payments, inventory, or nesting software
- Anyone expecting guaranteed leads, exact automated pricing, or a physical product

---

## 3. Likely customer search intent

### Transactional / commercial investigation

- laser cutting website template  
- laser engraving website template  
- signage website template  
- fabrication business website  
- laser cutting quote form  
- engraving quote request  
- maker business website template  

### Problem-aware

- how to get better laser quote requests  
- what to ask customers before laser cutting quote  
- laser cutting website design for small shop  
- convert WhatsApp laser enquiries  

### Designer-aware

- HTML CSS website template laser business  
- static website template with quote planner  
- site-config rebrand website template  

Do **not** invent search volumes. Ranking is never promised.

---

## 4. Claims to avoid

| Avoid | Why |
|---|---|
| Guaranteed leads / sales / ranking | Unprovable; Etsy and ethics risk |
| “Exact prices,” “final quotes,” “automatic accurate quoting” | Planner is preliminary guidance only |
| “Fully insured,” real star ratings, real client counts | Demo is fictional |
| Medical laser claims | Wrong niche |
| “Bestseller,” “#1,” fake urgency | Unsupported |
| Hosting / domain included | Not included |
| WordPress / CMS unless built that way | Expected stack is static HTML/CSS/JS (`VERIFY_AFTER_BUILD`) |
| Unlimited support / free custom development | Support is bounded |
| Trademark stuffing (Glowforge, Epilog, Trotec as if affiliated) | No affiliation claims |
| Resell-as-template rights | Default licence is single end-business use (`VERIFY_AFTER_BUILD`) |

---

## 5. Product facts requiring Claude verification

Mark all public claims as `VERIFY_AFTER_BUILD` until evidence exists.

| ID | Fact to verify |
|---|---|
| F1 | Interactive Laser Cut & Engraving Quote Planner exists as a real UI |
| F2 | Inputs include material, thickness, dimensions/size, quantity |
| F3 | Process types: cut / engrave / mark / other fabrication options as claimed |
| F4 | File-preparation checklist (vector formats, DPI, bleed, etc.) |
| F5 | Quote summary / structured brief output |
| F6 | Visible disclaimer: preliminary estimate ≠ final price |
| F7 | WhatsApp handoff with structured message text |
| F8 | Email / mailto or form handoff |
| F9 | Buyer-facing `site-config.js` (or documented equivalent) |
| F10 | Materials list, rates, and assumptions are configurable |
| F11 | Theme system (count + names) |
| F12 | Pages included (home, services, gallery, privacy, terms, 404, etc.) |
| F13 | Mobile-responsive behaviour and nav |
| F14 | Accessibility baseline (labels, contrast, keyboard) |
| F15 | Privacy posture (client-side only? no server store of customer data?) |
| F16 | Buyer package files: START-HERE, buyer guide, licence, AI disclosure |
| F17 | Demo brand fully fictional; no real client PII |
| F18 | Live demo URL and public repo path |
| F19 | Exact included file list for “What’s included” |
| F20 | Whether rates can be hidden / pricing UI optional |

---

## 6. Copy assumptions (explicit)

Until Claude’s build summary lands, commerce copy assumes a **Westlake / Tableview-style** sellable template pattern:

1. Static HTML/CSS/JS site, no build step required for ordinary use.  
2. Central `site-config.js` for business identity, contact, services, materials, planner rates/assumptions, themes.  
3. Core tool: multi-step **Laser Cut & Engraving Quote Planner**.  
4. Handoff via WhatsApp deep link + email/mailto with summary text.  
5. Fictional demo business (“Precision Laser” or equivalent sample name).  
6. Digital download only; no physical goods.  
7. Etsy-only commerce; portfolio + blog + social drive traffic to the **exact product URL** after publication.  
8. Planner output is **educational / preliminary**, never a binding quotation.  

Anything beyond this pattern is **VERIFY_AFTER_BUILD**.

---

## 7. Channel plan (permitted)

| Channel | Role |
|---|---|
| Etsy | Sole sales platform |
| 3D Portfolio project page | Case study + demo CTA; Etsy CTA hidden until exact URL |
| Portfolio SEO blog | Demand capture → project → demo → Etsy |
| Facebook, Instagram, LinkedIn, X | Launch narrative + evergreen clips |
| Pinterest | Long-tail template discovery |
| YouTube | Walkthrough + Shorts |
| Email | Warm sequence for existing list / buyers |
| Permitted communities | Helpful, non-spam niche posts |
| Udemy | Future course planning only if relevant — not a launch dependency |

**Do not create content for:** Creem, Gumroad, Payhip, Shopify, WooCommerce, Lemon Squeezy, Creative Market, Envato, Ko-fi, or any non-Etsy marketplace.

---

## 8. Placeholders in all commerce files

```
FINAL_SCREENSHOTS_PENDING
FINAL_VIDEO_PENDING
CONFIRMED_PRICE_PENDING
CONFIRMED_CURRENCY_PENDING
EXACT_ETSY_PRODUCT_URL_PENDING_PUBLICATION
LIVE_DEMO_URL_PENDING_VERIFICATION
PORTFOLIO_PROJECT_URL_PENDING
VERIFY_AFTER_BUILD
REQUIRES_FINAL_SCREENSHOT
```

Never use a general Etsy shop homepage as the exact product link.

---

## 9. Source inspection notes

| Path | Observation |
|---|---|
| `clients/precision-laser-ct/index.html` (current monorepo seed) | **Mismatch:** aesthetic clinic / medical laser therapy copy (“Aura Skin Sanctuary”). **Do not market this as the product.** |
| Product brief (this campaign) | Laser cutting, engraving, signage, fabrication + Quote Planner |
| Prior template pattern | Tableview Tiling / Westlake-style config + planner + seller pack |

**Commerce decision:** Write all buyer-facing materials for **industrial / maker laser cutting & engraving**, not medical aesthetics. Flag every implementation detail for Claude confirmation.

---

## 10. Success criteria for this commerce workstream

- Complete flat handoff package under `handoff/grok/`  
- Etsy-ready title, description, 13 tags, FAQs, media storyboards  
- Portfolio + blog + funnel + 7-day launch + support banks  
- Seller draft copy under `seller-pack/drafts/`  
- Committed and pushed on `agent/grok-commerce` only  
- **No** Etsy publish, **no** main merge, **no** website source edits by this agent  
