# Hydro Clean — Exterior Cleaning Business Website Template

A premium, responsive website template for exterior cleaning businesss, flooring
installers, bathroom renovators, and waterproofing businesses — built
around an original **Surface Cleaning Estimate Planner & Quote Builder** interactive
tool.

**Live demo:** https://iederees-create.github.io/hydro-clean-ct-ct/

> "Hydro Clean" is a **fictional demonstration business**. All
> contact details, statistics, ratings, and testimonials shown in the
> demo are sample placeholders — see `site-config.js` to rebrand.

## Features

- Responsive, mobile-first layout with an accessible hamburger nav
- Premium architectural design system (limestone/charcoal/clay/brass) with
  three switchable colour themes: Limestone Studio, Charcoal Brass, Coastal Clay
- Interactive **Surface Cleaning Estimate Planner & Quote Builder** — see below
- Service sections: floor, wall, bathroom, kitchen, waterproofing, pool
  surrounds, feature walls, grouting & repairs, residential & commercial
- Project gallery of illustrative layout patterns (straight lay, brick
  bond, diagonal, herringbone, chevron, large format)
- exterior cleaning process timeline, surface-preparation explainer, service-area
  coverage list with map embed
- About/team, why-choose-us, fictional sample testimonials
- Accessible FAQ accordion, quote-request form with WhatsApp handoff
- Privacy Policy, Terms of Service, and Measurement & Estimate Disclaimer
  pages, plus a custom 404 page
- Local SEO metadata, Open Graph tags, `ProfessionalService` structured
  data, `sitemap.xml`, `robots.txt`, favicon
- No external CSS/JS/image/font dependencies — everything is self-hosted
- Central `site-config.js` for rebranding without touching HTML/CSS/JS
- Visible keyboard focus states and `prefers-reduced-motion` support

## The Surface Cleaning Estimate Planner

An 8-step accessible wizard (Project Type → Measurements → Tile Details →
Layout → Site Conditions → Wastage → Estimate → Send) that:

- Converts between m / cm / ft / in and supports single, multiple, wall,
  or floor-plus-wall measurement modes
- Calculates total area, wastage-adjusted coverage, tile count, and box
  count (rounded up, never fractional)
- Optionally estimates material cost and indicative adhesive/grout/
  levelling/waterproofing quantities (clearly labelled as non-binding
  guidance)
- Flags what information is still missing for a firm quote
- Produces a structured project summary that can be copied, printed,
  downloaded, sent via WhatsApp or email, or handed off to the quote form
- Never uploads anything automatically — photo previews stay local, and
  contact details are only sent when you explicitly choose a send action
- Supports full keyboard navigation, screen readers, step indicators,
  inline validation, and an opt-in "save progress" toggle (off by default)

This tool provides **preliminary planning estimates only** — see
`disclaimer.html` for the full measurement disclaimer. It does not
calculate a binding labour quote.

## Technical Stack

Plain HTML5, CSS3, and vanilla JavaScript (ES5-compatible, no build
step, no framework, no external runtime dependencies). This keeps the
template easy to host anywhere and easy for a buyer to customise without
a toolchain.

## File Structure

```
index.html              Main page (all sections)
style.css                Design system + component styles
site-config.js           Buyer-facing configuration (business, contact,
                          services, testimonials, FAQs, themes, planner
                          settings)
planner.js                Surface Cleaning Estimate Planner (calculation engine + UI)
app.js                    Nav, FAQ, quote form, config-driven rendering
privacy.html / terms.html / disclaimer.html / 404.html   Legal + error pages
favicon.svg / og-image.svg / robots.txt / sitemap.xml     SEO/meta assets
tests/planner.test.js     Zero-dependency Node test suite for the planner
```

## Configuration

Open `site-config.js` and edit:

- `business` — name, tagline, description
- `contact` — phone, WhatsApp number, email, address, map URL
- `hours`, `serviceAreas`, `social`
- `services`, `projectTypes`, `layoutGallery`, `process`
- `team`, `whyChooseUs`, `testimonials` (replace fictional sample content)
- `faqs`
- `trustIndicators` — replace or remove unverifiable placeholder stats
- `themes` / `activeTheme` — pick or customise a colour theme
- `planner` — unit default, currency symbol, wastage presets, material
  guidance coverage rates (indicative only), WhatsApp message intro,
  photo checklist, feature toggles
- `legal` — licence/insurance statements, measurement disclaimer

You should not need to edit `index.html`, `style.css`, `planner.js`, or
`app.js` for a standard rebrand.

## Local Development

No build step required. Open `index.html` directly in a browser, or run
a simple static server from this directory, e.g.:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000/`.

## Running Tests

The planner's calculation engine has a zero-dependency Node test suite:

```
node tests/planner.test.js
```

## Deployment

Any static host works (GitHub Pages, Netlify, Vercel, S3, etc.). For
GitHub Pages: push to the repository and enable Pages for the `main`
branch, root directory, in repository settings.

## Licence & Support

See the buyer package (`LICENSE.txt`, `AI-DISCLOSURE.txt`,
`COMPLETE-BUYER-GUIDE.html`) included with the purchased template ZIP for
licence terms, AI-assistance disclosure, and support limits.

## Demo Content & Calculator Disclaimer

All business names, contact details, statistics, ratings, and
testimonials in this demo are fictional sample content and must be
replaced with accurate, verifiable information before use by a real
business. The Surface Cleaning Estimate Planner produces preliminary planning
estimates only, not a binding quote — see `disclaimer.html`.
