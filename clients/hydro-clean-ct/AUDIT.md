# Audit — Hydro Clean CT (pre-rebuild)

Snapshot at commit `0dda759` ("Launch: Hydro Clean CT - Cape Town Ecosystem"), 2 files, 193 lines total.

## Compliance / trust issues
- Hardcoded WhatsApp number (`27836789012`) baked into 3 separate links instead of a config file.
- The WhatsApp pre-filled message is a **web-developer sales pitch** ("I noticed you do not have a website yet... I also stay on as your dedicated web manager") — not a exterior cleaning quote request. Completely wrong for a buyer who will use this as an actual contractor site.
- Unsupported "4.7 Stars" rating claim in the nav badge and a trust card.
- Unsupported stats bar: "200+ Jobs Completed", "4.7 Average Rating", "24hr Response Time", "100% Satisfaction Rate" — no source, presented as fact.
- "Fully Insured" claim with no basis.
- "Guaranteed workmanship" claim in the hero subtitle.
- No "certified professionals" backing, yet the services header claims "certified professionals".

## Structural / functional issues
- `<a href="#about">` in nav — there is no `#about` section on the page. Dead link.
- No mobile hamburger menu — nav items just overflow/disappear below the breakpoint (there isn't one).
- No quote form of any kind.
- No calculator or interactive tool.
- No project gallery, process section, service-area section, or FAQ.
- No buyer configuration file — every string is hardcoded inline in HTML.
- No legal pages (privacy, terms, disclaimer), no 404 page.
- No documentation package (README, buyer guide, licence, AI disclosure).

## Technical issues
- `style.css` has a mojibake encoding error on line 2 (`â€”` instead of an em dash — the file was saved/re-saved without consistent UTF-8 handling).
- External dependency on Google Fonts (`fonts.googleapis.com`) — no self-hosted fallback.
- External dependency on a Wikimedia-hosted WhatsApp SVG icon for the floating action button — third-party asset the buyer doesn't control and could disappear or change.
- No `robots.txt`, `sitemap.xml`, favicon, Open Graph tags, or structured data.
- No accessibility attributes (no landmarks beyond `header`/`main`/`footer`, no ARIA on interactive elements, no visible focus states beyond browser defaults).

## Design issues
- Generic "glass card" layout with a `.glow-bg` gradient wash — same template pattern reused across unrelated client verticals, no visual differentiation for a exterior cleaning/construction business.
- Six identical service card bodies ("Professional X for residential and commercial clients in Your Service Area") — templated filler text, not real differentiation.
- No construction/architectural visual language (no grid or blueprint motifs, no material-inspired palette) — currently a generic dark-glass SaaS look bolted onto a trade business.

## Conclusion
The existing 2-file site is a bare skeleton reused from an unrelated template pattern. It is being fully rebuilt rather than patched: new information architecture (38 sections per the release brief), new premium architectural design system (limestone/charcoal/clay/brass), a buyer-facing `site-config.js`, an original Surface Cleaning Estimate Planner + Quote Builder, legal pages, accessibility and SEO baseline, and full commercial packaging.
