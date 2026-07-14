# Complete Buyer Guide — Draft  
## Southern Suburbs Builders Website Template

> Draft for packaging into `COMPLETE-BUYER-GUIDE.html` after final build.  
> Replace every `VERIFY_AFTER_BUILD` note with confirmed facts from Claude’s final build summary.

---

## 1. Welcome

Thank you for purchasing the **Southern Suburbs Builders Website Template** — a construction-focused website package built around an interactive **Renovation Scope & Budget Planner**.

This guide covers setup, customisation, the planner, deployment, licensing, disclaimers, and support.

**Start with:** `START-HERE.html` (if present — `VERIFY_AFTER_BUILD`) for the shortest path to a first preview.

---

## 2. What you received

Typical package contents (`VERIFY_AFTER_BUILD` exact list):

| Item | Purpose |
|---|---|
| `index.html` | Main website page(s) |
| `style.css` | Styles |
| `app.js` / similar | Planner + interactivity |
| `site-config.js` | Buyer rebranding surface (expected) |
| Legal starter pages | Privacy / Terms / disclaimer / 404 |
| SEO helpers | robots.txt, sitemap.xml, meta/OG |
| `START-HERE.html` | Quick start |
| `COMPLETE-BUYER-GUIDE.html` | This guide (HTML form) |
| `LICENSE.txt` | Usage licence |
| `AI-DISCLOSURE.txt` | AI assistance disclosure |

Etsy allows a **maximum of 5 digital buyer files** — packaging may consolidate guides/policies into fewer files (`VERIFY_AFTER_BUILD`).

---

## 3. System requirements

- Modern browser (Chrome, Firefox, Safari, or Edge)  
- Text editor  
- Ability to upload static files to a host (or local preview only)  
- No Node/npm build step required for ordinary use (`VERIFY_AFTER_BUILD`)

---

## 4. Quick start (15 minutes)

1. Unzip the download.  
2. Open `index.html` in a browser (double-click or “Open with”).  
3. Open `site-config.js` (`VERIFY_AFTER_BUILD`) in a text editor.  
4. Replace **business name**, **phone**, **WhatsApp**, **email**, and **address** with your real details.  
5. Save and refresh the browser.  
6. Walk through the **Renovation Scope & Budget Planner** as a test visitor.  
7. Confirm the structured quote request / WhatsApp message looks right for your team.  
8. Only then deploy publicly.

---

## 5. Understanding the demo content

The demo business identity (name, ratings, stats, testimonials, project examples, insurance language, etc.) is **fictional sample content**.

Before going live:
- Remove or replace every unverifiable claim  
- Use only photos you own or are licensed to use  
- Do not keep sample star ratings or job counts unless they are true for your business  

---

## 6. Customising with the configuration file

**Intended model:** ordinary business edits live in one config file so you rarely touch layout code (`VERIFY_AFTER_BUILD`).

### Typical fields

- Business identity (name, tagline, description)  
- Contact (phone dial/display, WhatsApp number, email, address)  
- Hours  
- Services list  
- Gallery / project placeholders  
- FAQ items  
- Theme selection  
- Planner labels / unit assumptions if exposed (`VERIFY_AFTER_BUILD`)  

### Tips

- Keep JSON/JS syntax valid — a missing comma can blank the site.  
- Edit in small batches; refresh after each save.  
- Keep a backup copy of a working config.

---

## 7. Renovation Scope & Budget Planner

### What it does

Helps a visitor produce **preliminary** guidance on:

1. **Area** — what part of the property / project footprint  
2. **Scope** — nature of work  
3. **Complexity** — signals that affect difficulty  
4. **Budget guidance** — illustrative range or guidance only  
5. **Structured quote request** — organised summary for the builder  

(`VERIFY_AFTER_BUILD` for exact steps, fields, scoring, and output format.)

### What it does **not** do

- Issue a binding quotation  
- Replace a site visit or professional estimating process  
- Guarantee materials pricing, timelines, or approvals  
- Provide legal, structural engineering, or financial advice  

### On-site messaging you should keep

Always retain clear visitor-facing language that outputs are **preliminary and non-binding**. Diluting this increases support risk and client disputes.

### Tuning the planner for your market

If the config exposes rates, multipliers, or category labels (`VERIFY_AFTER_BUILD`):
- Align them with your region and service mix  
- Prefer conservative, wide guidance bands over false precision  
- Document your assumptions in the disclaimer area  

---

## 8. Quote handoff (WhatsApp / forms)

Expected behaviour (`VERIFY_AFTER_BUILD`):

- Visitor completes planner  
- Site builds a structured message (area, scope, complexity, budget band, contact notes)  
- Message opens WhatsApp or another contact path with prefilled text  
- Optional print-friendly summary  

### Buyer checklist

- [ ] WhatsApp number in international format without `+` if required by `wa.me` links  
- [ ] Test from a real phone  
- [ ] Confirm message length is usable  
- [ ] Decide who on your team monitors incoming quote requests  

---

## 9. Sections of the website

Expected sections (`VERIFY_AFTER_BUILD`):

- Header / navigation  
- Hero with primary CTA  
- Services  
- Planner  
- Process / how we work  
- Gallery / projects (placeholders)  
- About / why choose us (sample claims → replace)  
- FAQ  
- Contact / quote  
- Footer + legal links  

---

## 10. Themes and branding

If multiple themes ship (`VERIFY_AFTER_BUILD`):
1. Set the active theme key in config  
2. Refresh  
3. Optionally adjust accent colours only if documented  

Logo: replace text logo or image path as documented in final package.

---

## 11. Deployment

Works on static hosts such as:

- GitHub Pages  
- Netlify  
- Vercel  
- Shared hosting via FTP/SFTP  
- Any CDN/static bucket that serves HTML  

### General steps

1. Upload all site files preserving folder structure  
2. Ensure `index.html` is at the site root (or set host index document)  
3. Test HTTPS contact links  
4. Submit your real sitemap to Search Console when ready  

---

## 12. SEO basics for buyers

- Write a unique meta title/description for your real business (`VERIFY_AFTER_BUILD` where edited)  
- Use real service-area names you actually cover  
- Add real project photos with descriptive filenames/alt text  
- Do not copy fictional demo reviews  

---

## 13. Accessibility & quality checks

Before launch:

- [ ] Keyboard through nav and planner  
- [ ] Forms show clear errors  
- [ ] Contrast is readable in your chosen theme  
- [ ] `prefers-reduced-motion` respected if implemented (`VERIFY_AFTER_BUILD`)  
- [ ] No console errors on a clean refresh (`VERIFY_AFTER_BUILD`)  

---

## 14. Licence (summary)

See `LICENSE.txt` for full terms (`VERIFY_AFTER_BUILD`). Typical intent for this product line:

- One licence → one end-business website  
- Client work for a single business is OK if the licence allows  
- Do **not** resell or redistribute the template as a template  
- Do **not** claim the demo business identity as your own without replacement  

---

## 15. AI disclosure

Development and commerce materials used AI assistance. See `AI-DISCLOSURE.txt` (`VERIFY_AFTER_BUILD`). You remain responsible for the accuracy of content you publish.

---

## 16. Support policy

**We help with**
- Configuration questions  
- Clarifying included features  
- Genuine file defects  

**We do not provide**
- Custom development  
- Hosting/DNS full-service setup  
- Legal review  
- Construction estimating methodology consulting  
- Marketing management  

Contact the seller via **Etsy Messages** with your order number.

---

## 17. Refunds (subject to applicable law)

Digital instant-delivery product. Refunds follow Etsy’s digital policies and applicable consumer law. Generally considered for genuine defects in the files, not change-of-mind or dislike of sample content.

---

## 18. Estimate disclaimer (copy for your site)

You may reuse/adapt:

> Our online Renovation Scope & Budget Planner provides preliminary guidance only. It is not a fixed price, binding quotation, or formal estimate. Final pricing depends on inspection, specifications, materials, labour, permits, and site conditions.

---

## 19. Pre-launch checklist

- [ ] All sample contact details replaced  
- [ ] Planner disclaimer visible  
- [ ] Quote handoff tested on mobile  
- [ ] Services match what you actually offer  
- [ ] Gallery uses owned/licensed images  
- [ ] Legal pages reviewed for your jurisdiction  
- [ ] Privacy contact email is monitored  
- [ ] Favicon/share image acceptable  
- [ ] Backup of configured files stored safely  

---

## 20. Changelog placeholder

| Version | Date | Notes |
|---|---|---|
| 1.0 | `VERIFY_AFTER_BUILD` | Initial commercial release |

---

*End of buyer guide draft.*
