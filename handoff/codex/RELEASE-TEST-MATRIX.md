# Release Test Matrix

Product: Precision Laser Website Template
Feature under test: Laser Cut & Engraving Quote Planner

Use this matrix after the product UI branch is merged. Current baseline does not contain the expected planner.

| Area | Test | Expected Result | Status |
| --- | --- | --- | --- |
| Homepage | Load first viewport on desktop and mobile | Laser business template is visible, not unrelated wellness content | Pending merge |
| Homepage | Primary CTA | Leads to quote planner or contact section | Pending merge |
| Services | Laser cutting section | Describes service with demo wording and no unsupported claims | Pending merge |
| Services | Engraving section | Describes engraving use cases without guaranteed results | Pending merge |
| Materials | Material cards/list | Materials are selectable or clearly informational | Pending merge |
| Materials | Compatibility wording | Uses preliminary/demo wording where compatibility is not verified | Pending merge |
| Gallery | Project gallery | Images have alt text and do not imply fake completed work | Pending merge |
| Navigation | Mobile navigation | Menu can open, close, and reach all key sections | Pending merge |
| Quote form | Required fields | Missing required fields show clear messages | Pending merge |
| Quote planner | Project type | User can select cutting, engraving, signage, or fabrication as implemented | Pending merge |
| Quote planner | Material selection | Selection appears in structured summary | Pending merge |
| Quote planner | Thickness | Valid thickness accepted; invalid values rejected | Pending merge |
| Quote planner | Dimensions | Width/height/depth or relevant dimensions accepted | Pending merge |
| Quote planner | Unit conversion | mm/cm/m/in conversions are correct and consistent | Pending merge |
| Quote planner | Quantity | Quantity affects summary and estimate only when estimates are enabled | Pending merge |
| Quote planner | Engraving area | Engraving area captured separately from cut size | Pending merge |
| Quote planner | Cut complexity | Complexity appears in summary and affects missing-info prompts | Pending merge |
| Quote planner | File readiness | Ready/not-ready state changes checklist guidance | Pending merge |
| Quote planner | File checklist | Required file items are visible and selectable | Pending merge |
| Quote planner | Finish | Finish preference appears in summary | Pending merge |
| Quote planner | Deadline | Deadline preference captured without guaranteed turnaround | Pending merge |
| Quote planner | Delivery preference | Pickup/courier/local delivery appears in summary if implemented | Pending merge |
| Quote planner | Structured quote summary | Summary is readable, complete, and clearly non-binding | Pending merge |
| Quote planner | Missing info logic | Missing critical values are flagged before handoff | Pending merge |
| Handoff | WhatsApp encoding | Message uses `encodeURIComponent` or equivalent; no malformed URL | Pending merge |
| Handoff | Email encoding | Subject/body are encoded; mailto remains valid | Pending merge |
| Handoff | Copy summary | Copies plain text summary without HTML injection | Pending merge |
| Handoff | Print summary | Opens print-friendly summary without layout overlap | Pending merge |
| Handoff | Download summary | Downloads safe text/PDF file without local path exposure | Pending merge |
| Handoff | Reset | Restores default planner state and clears errors | Pending merge |
| Budget | Budget enabled | Preliminary estimate appears only when explicitly enabled | Pending merge |
| Budget | Budget disabled | No estimate, price promise, or binding quote appears | Pending merge |
| Validation | Invalid input | Non-numeric and unsupported inputs are rejected | Pending merge |
| Validation | Zero input | Zero dimensions/quantity are rejected or explained | Pending merge |
| Validation | Negative input | Negative dimensions/quantity cannot reach handoff | Pending merge |
| Validation | Very large input | Large values do not break layout, overflow URLs, or imply feasibility | Pending merge |
| Accessibility | Keyboard-only use | All controls, summary actions, nav, and handoff links work by keyboard | Pending merge |
| Accessibility | Screen reader labels | Inputs have labels, groups, and error relationships | Pending merge |
| Accessibility | Visible focus | Focus indicators are visible on interactive controls | Pending merge |
| Accessibility | Reduced motion | Animations respect `prefers-reduced-motion` | Pending merge |
| Metadata | Title/meta | Product-specific title and description exist | Pending merge |
| Metadata | Open Graph | OG title, description, image, and URL are product-specific | Pending merge |
| Metadata | Structured data | Schema is valid and uses demo/product-safe wording | Pending merge |
| SEO files | Sitemap | `sitemap.xml` includes live demo URL routes | Pending merge |
| SEO files | Robots | `robots.txt` points to sitemap and does not block intended pages | Pending merge |
| Error page | 404 page | Branded 404 exists and links back to main page | Pending merge |
| Performance | Lighthouse smoke | No blocking product-pack media or oversized assets | Pending merge |
| Security | Script injection | Planner text is rendered via text nodes, not unsanitized HTML | Pending merge |
| Security | External links | External links use `rel="noopener"` where needed | Pending merge |
