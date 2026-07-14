/**
 * PRECISION LASER WORKS — SITE CONFIGURATION
 * ============================================================
 * Edit the values below to rebrand this template for a real business.
 * You should NOT need to touch index.html, style.css, app.js or
 * planner.js for ordinary business changes (name, contact details,
 * services, materials, rates, FAQs, colours, planner assumptions).
 *
 * IMPORTANT: All contact details, statistics, and claims below are
 * FICTIONAL SAMPLE CONTENT for demonstration purposes only. Replace
 * every field with your real, verifiable business information before
 * publishing this site. Do not add customer ratings, completed-project
 * counts, machine wattage specs, or safety/compliance certifications
 * (ISO, CE, SABS, etc.) unless you can verify them for your business.
 *
 * The Laser Cut & Engraving Quote Planner's rates, multipliers and
 * assumptions live in the `planner` section below. Every number there is
 * an editable, clearly-labelled example — not a real pricing guarantee.
 * ============================================================
 */
window.SITE_CONFIG = {

  // ---- ACTIVE THEME --------------------------------------------------
  // Choose one of: "graphite-laser", "cyan-blueprint", "amber-workshop"
  activeTheme: "graphite-laser",

  themes: {
    "graphite-laser": {
      label: "Graphite Laser",
      bg: "#161616",
      bgAlt: "#1c1c1c",
      surface: "#232323",
      border: "rgba(230,230,225,0.10)",
      textPrimary: "#f2f2f0",
      textSecondary: "#a8a8a4",
      accent: "#00e5ff",
      accent2: "#ff3b30",
      accentContrast: "#0b0b0b",
      safety: "#ff3b30",
      blueprintLine: "rgba(0,229,255,0.14)"
    },
    "cyan-blueprint": {
      label: "Cyan Blueprint",
      bg: "#0d1721",
      bgAlt: "#101d29",
      surface: "#142433",
      border: "rgba(180,220,255,0.12)",
      textPrimary: "#eaf3fb",
      textSecondary: "#9fb8cc",
      accent: "#22d3ee",
      accent2: "#f2b544",
      accentContrast: "#08131c",
      safety: "#ff5252",
      blueprintLine: "rgba(34,211,238,0.20)"
    },
    "amber-workshop": {
      label: "Amber Workshop",
      bg: "#1b1712",
      bgAlt: "#211c16",
      surface: "#2a231b",
      border: "rgba(240,220,180,0.10)",
      textPrimary: "#f5efe4",
      textSecondary: "#bfae95",
      accent: "#ffb020",
      accent2: "#b0713a",
      accentContrast: "#1b1712",
      safety: "#e3452c",
      blueprintLine: "rgba(255,176,32,0.16)"
    }
  },

  // ---- BUSINESS IDENTITY (SAMPLE / DEMO DATA) ------------------------
  business: {
    name: "Precision Laser Works",
    logoText: "Precision Laser Works",
    logoMark: "[PLW]",
    tagline: "Precision laser cutting, engraving and small fabrication for makers, signage and gift businesses in Cape Town.",
    foundedYear: "[Year] (sample placeholder)",
    description: "Precision Laser Works is a fictional demonstration business created to showcase this website template for laser cutting, engraving, signage and small fabrication businesses. Replace this description with your real company profile, equipment list and areas of expertise."
  },

  // ---- CONTACT (SAMPLE / DEMO DATA — REPLACE BEFORE USE) -------------
  contact: {
    phoneDisplay: "(021) 555 0187",
    phoneDial: "+27215550187",
    whatsappDisplay: "083 555 0164",
    whatsappNumber: "27835550164",
    email: "hello@example.com",
    addressLine1: "8 Example Industrial Way, Paarden Eiland",
    addressLine2: "Cape Town, 7405",
    mapEmbedUrl: "https://www.google.com/maps?q=Paarden+Eiland,Cape+Town&output=embed",
    quoteUrl: "#quote"
  },

  announcement: {
    enabled: true,
    label: "Try our free Laser Cut & Engraving Quote Planner — get a preliminary estimate in minutes",
    ctaText: "Open the Planner",
    ctaHref: "#planner"
  },

  hours: [
    { day: "Monday – Friday", time: "8:00 AM – 5:00 PM" },
    { day: "Saturday", time: "9:00 AM – 1:00 PM (collections by appointment)" },
    { day: "Sunday", time: "Closed" }
  ],

  social: {
    facebook: "#",
    instagram: "#",
    x: "#",
    linkedin: "#",
    youtube: "#"
  },

  serviceAreas: [
    "Paarden Eiland", "Woodstock", "Salt River", "Observatory", "Epping",
    "Maitland", "Milnerton", "Montague Gardens", "Ndabeni",
    "Airport Industria", "Bellville", "Parow"
  ],

  // ---- TRUST INDICATORS (editable — process statements only, no
  //      ratings, certifications or compliance claims) ------------------
  trustIndicators: [
    { icon: "📐", label: "File review before every job (sample)" },
    { icon: "🔬", label: "Test cut on scrap material for new jobs (sample)" },
    { icon: "🧾", label: "Itemised quotes before production (sample)" },
    { icon: "📦", label: "Careful packaging for delivery or collection (sample)" }
  ],

  // ---- SERVICES (Laser Cutting / Engraving / Signage / Acrylic
  //      Fabrication / Wood Engraving / Metal Marking / Corporate Gifts) --
  services: [
    {
      id: "laser-cutting",
      icon: "✂️",
      name: "Laser Cutting",
      summary: "Precision cutting of acrylic, wood, paper and more from your vector files.",
      details: "Clean, repeatable cutting for flat-pack parts, panels, stencils and shapes from supplied vector artwork. Replace with your real material range, maximum sheet size and typical turnaround for cutting jobs.",
      startingPrice: "Sample placeholder — see the Quote Planner tool for an editable estimate range"
    },
    {
      id: "laser-engraving",
      icon: "🖊️",
      name: "Laser Engraving",
      summary: "Surface engraving and marking on wood, acrylic, leather, glass and anodised aluminium.",
      details: "Photo, text and logo engraving with adjustable depth and contrast. Replace with your real engraving resolution, supported artwork formats and material-specific notes.",
      startingPrice: "Sample placeholder — see the Quote Planner tool for an editable estimate range"
    },
    {
      id: "signage",
      icon: "🪧",
      name: "Signage",
      summary: "Cut and engraved signage for offices, retail and events.",
      details: "Interior and exterior signage panels, directional signs and nameplates, cut or engraved to your specification. Replace with your real mounting options, material recommendations and outdoor-durability notes.",
      startingPrice: "Sample placeholder — see the Quote Planner tool for an editable estimate range"
    },
    {
      id: "acrylic-fabrication",
      icon: "🔷",
      name: "Acrylic Fabrication",
      summary: "Cut, engraved and assembled acrylic displays, stands and enclosures.",
      details: "Multi-part acrylic assemblies including display stands, risers and enclosures, cut and optionally assembled in-house. Replace with your real assembly methods (solvent weld, mechanical fixings) and finishing options.",
      startingPrice: "Sample placeholder — see the Quote Planner tool for an editable estimate range"
    },
    {
      id: "wood-engraving",
      icon: "🪵",
      name: "Wood Engraving",
      summary: "Detailed engraving and cutting on plywood, MDF and hardwood.",
      details: "Engraving and cutting for plywood, MDF and hardwood pieces, from decorative panels to functional parts. Replace with your real wood species range and finishing options (sanding, oiling, sealing).",
      startingPrice: "Sample placeholder — see the Quote Planner tool for an editable estimate range"
    },
    {
      id: "metal-marking",
      icon: "⚙️",
      name: "Metal Marking",
      summary: "Surface marking on anodised aluminium and stainless steel.",
      details: "Permanent surface marking for asset tags, control panels and branded metal items. Replace with your real machine capability and confirm which metals and coatings you can actually process before publishing.",
      startingPrice: "Sample placeholder — see the Quote Planner tool for an editable estimate range"
    },
    {
      id: "corporate-gifts",
      icon: "🎁",
      name: "Corporate Gifts & Branded Products",
      summary: "Branded gifts, awards and promotional items cut and engraved to order.",
      details: "Bulk and small-batch branded items — keyrings, awards, desk pieces and promotional products — engraved or cut to a supplied logo. Replace with your real minimum order quantities and bulk turnaround times.",
      startingPrice: "Sample placeholder — custom quote"
    }
  ],

  // ---- FILE PREPARATION GUIDANCE (static content section) -------------
  filePrepGuidance: [
    { title: "Vector files for cutting", text: "Cut lines need to be true vector paths (SVG, DXF, AI or PDF) — not a raster image. Separate cut lines and engrave lines onto different layers or colours so they're easy to identify." },
    { title: "Resolution for engraving", text: "Photo or logo engraving from a raster image (PNG/JPG) works best at 300dpi or higher at the final print size. Low-resolution images will lose fine detail when engraved." },
    { title: "Confirm your units", text: "Make sure your file's units match the physical dimensions you enter in the Quote Planner (mm, cm, m or inches) — a mismatch is one of the most common causes of an inaccurate estimate." },
    { title: "No file yet?", text: "You don't need a finished file to get a preliminary estimate — the Quote Planner flags when design help is needed and gives you a next-step recommendation." }
  ],

  // ---- PROJECT GALLERY (replaceable demo media placeholders) ---------
  // No stock or fictional project photography is included — each entry
  // renders as a clearly-labelled placeholder card. Replace `image` with
  // a real photo path once you have real project photos.
  gallery: [
    { category: "Laser Cutting", title: "Acrylic Panel Set — sample project title", image: null },
    { category: "Laser Engraving", title: "Engraved Wood Sign — sample project title", image: null },
    { category: "Signage", title: "Office Directional Signage — sample project title", image: null },
    { category: "Acrylic Fabrication", title: "Retail Display Stand — sample project title", image: null },
    { category: "Metal Marking", title: "Anodised Aluminium Panel — sample project title", image: null },
    { category: "Corporate Gifts", title: "Branded Keyring Batch — sample project title", image: null }
  ],

  process: [
    { step: 1, title: "Quote Planner or Quote Form", text: "Use the Laser Cut & Engraving Quote Planner or the quote form to describe your project. You'll get a preliminary scope and budget range instantly." },
    { step: 2, title: "File Check", text: "We review your file (or help you prepare one) to confirm it's cut/engrave-ready before production." },
    { step: 3, title: "Written Quotation", text: "You receive a written quotation covering material, quantity, finish and price before any work begins." },
    { step: 4, title: "Test Cut / Engrave", text: "For new materials or artwork, a test piece on scrap material confirms settings before the full run." },
    { step: 5, title: "Production", text: "Your job is cut, engraved and finished according to the confirmed specification." },
    { step: 6, title: "Collection or Delivery", text: "Finished items are packaged for collection or delivery, based on your preference." }
  ],

  faqs: [
    { q: "Is Precision Laser Works a real company?", a: "No. \"Precision Laser Works\" is a fictional demonstration business used to showcase this website template. Replace all business details with your own before publishing." },
    { q: "How do I get a quote?", a: "Use the Laser Cut & Engraving Quote Planner for an instant preliminary estimate, fill out the quote form, call the listed phone number, or message us on WhatsApp. All contact details shown are placeholders until you configure your own." },
    { q: "Is the Planner's budget range a binding quote?", a: "No. The Planner produces a preliminary, non-binding estimate based on the rate bands configured in site-config.js. Final pricing depends on file quality, machine setup, material availability, job complexity, finishing, quantity, labour, delivery and final review — see the Quote Disclaimer page." },
    { q: "What file types can I upload?", a: "This demo site does not accept file uploads — it's a static template. Once configured for a real business, connect the quote form to your own email, CRM or file-sharing workflow. The Planner asks which file types you have (SVG, DXF, AI, PDF, PNG, JPG, or none yet) so the quote request includes that information." },
    { q: "I don't have a vector file — can you still help?", a: "Yes, conceptually — the Planner flags when design help is likely needed based on your file-readiness answer and recommends a next step. Replace the design-support copy in site-config.js with your real design-assistance process and any associated fees." },
    { q: "Can I turn off the budget estimate feature?", a: "Yes. Set planner.budgetEnabled to false in site-config.js and the tool will still produce a scope, service checklist, file-preparation checklist and next-step recommendation, but without a numeric budget range." },
    { q: "What materials do you work with?", a: "See the Materials section on this page. Edit the planner.materials object in site-config.js to add, remove or reprice materials." },
    { q: "Do you offer same-day turnaround?", a: "This template does not claim same-day or guaranteed turnaround by default. Only advertise turnaround times you can reliably deliver." },
    { q: "Are you a certified or safety-compliant laser workshop?", a: "This is a placeholder question. Do not publish safety-certification or compliance claims (e.g. ISO, CE, SABS) unless you can verify them for your business, and check your local regulatory requirements." },
    { q: "How much does laser cutting or engraving cost?", a: "Sample rate bands are used by the Planner tool to generate an editable estimate range based on material, area, thickness, complexity and finish. Replace the rates in the planner.materials section of site-config.js with your real, current pricing." },
    { q: "What areas do you service?", a: "See the Service Areas section on this page. Edit the serviceAreas list in site-config.js to reflect your real coverage." },
    { q: "How do I customise this template?", a: "Open site-config.js and edit the business, contact, services, materials, planner rates, FAQ and theme values. See the buyer guide included with this template for full instructions." }
  ],

  legal: {
    businessLegalName: "Precision Laser Works (fictional demo business)",
    workshopSafetyStatement: "Sample placeholder — insert your real workshop safety practices, ventilation/fire-safety measures and any applicable certifications here only if verified and accurate, or remove this line.",
    disclaimerSummary: "All business information, contact details, statistics, and material/finish claims on this demonstration site are fictional sample content and must be replaced with accurate, verifiable information before this site is used for a real business.",
    quoteDisclaimer: "The planner provides preliminary guidance only. Final pricing depends on file quality, machine setup, material availability, job complexity, finishing, quantity, labour, delivery and final review."
  },

  // ---- LASER CUT & ENGRAVING QUOTE PLANNER CONFIGURATION ---------------
  // Every rate, multiplier and threshold below is an illustrative sample
  // assumption, not a real pricing guarantee. Replace with your own
  // researched rate bands before publishing this site for a real business.
  planner: {
    // Set to false to hide all budget figures — the tool still produces
    // a scope, checklists, assumptions and a next-step recommendation.
    budgetEnabled: true,

    currency: { code: "ZAR", symbol: "R", locale: "en-ZA" },

    // Added to the top of the estimated range as a buffer for the
    // unknowns a preliminary, no-file-review estimate can't capture.
    contingencyPercent: 10,

    // Final min/max figures are rounded to the nearest multiple of this.
    roundTo: 50,

    // rateMin / rateMax are illustrative sample rates per square centimetre
    // of material processed, in the currency above. engraveRate is an
    // additional per-square-centimetre surcharge applied when the service
    // type or engraving area indicates engraving/marking is involved.
    materialOrder: [
      "acrylic", "plywood", "mdf", "paper-card", "leather", "glass",
      "anodised-aluminium", "stainless-steel", "other"
    ],
    materials: {
      "acrylic": { label: "Acrylic", icon: "🔷", description: "Cast and extruded acrylic sheet, clear and coloured.", rateMinPerCm2: 0.90, rateMaxPerCm2: 1.80, engraveRatePerCm2: 0.35 },
      "plywood": { label: "Plywood", icon: "🪵", description: "Birch and standard plywood sheet, various thicknesses.", rateMinPerCm2: 0.50, rateMaxPerCm2: 1.00, engraveRatePerCm2: 0.30 },
      "mdf": { label: "MDF", icon: "🟫", description: "Medium-density fibreboard, smooth-surfaced for engraving.", rateMinPerCm2: 0.40, rateMaxPerCm2: 0.85, engraveRatePerCm2: 0.28 },
      "paper-card": { label: "Paper / Card", icon: "📄", description: "Card stock and paper for invitations, stencils and packaging.", rateMinPerCm2: 0.12, rateMaxPerCm2: 0.30, engraveRatePerCm2: 0.10 },
      "leather": { label: "Leather", icon: "🧵", description: "Vegetable-tanned and finished leather for engraving and cutting.", rateMinPerCm2: 1.10, rateMaxPerCm2: 2.20, engraveRatePerCm2: 0.45 },
      "glass": { label: "Glass (engraving only)", icon: "🥃", description: "Surface engraving on glassware and panels — not a cutting service.", rateMinPerCm2: 0.60, rateMaxPerCm2: 1.30, engraveRatePerCm2: 0.55 },
      "anodised-aluminium": { label: "Anodised Aluminium (marking)", icon: "⚙️", description: "Surface marking on anodised aluminium sheet and panels.", rateMinPerCm2: 0.70, rateMaxPerCm2: 1.50, engraveRatePerCm2: 0.60 },
      "stainless-steel": { label: "Stainless Steel (marking)", icon: "🔩", description: "Surface marking on stainless steel sheet and fittings.", rateMinPerCm2: 0.90, rateMaxPerCm2: 1.90, engraveRatePerCm2: 0.70 },
      "other": { label: "Other / Not Listed", icon: "❓", description: "Any material not listed — confirm compatibility with us directly.", rateMinPerCm2: 0.50, rateMaxPerCm2: 1.50, engraveRatePerCm2: 0.35 }
    },

    serviceTypeOrder: [
      "cutting", "engraving", "cutting-engraving", "signage",
      "acrylic-fabrication", "trophy-award", "branded-gift", "prototype", "other"
    ],
    serviceTypes: {
      "cutting": {
        label: "Laser Cutting", involvesCutting: true, involvesEngraving: false,
        defaultChecklist: ["Confirm cut-line layer/colour separation", "Kerf compensation check for tight-tolerance parts", "Nest parts to minimise material waste"]
      },
      "engraving": {
        label: "Laser Engraving", involvesCutting: false, involvesEngraving: true,
        defaultChecklist: ["Confirm engrave-line layer/colour separation", "Test engrave on scrap material for new artwork", "Confirm engraving depth/contrast expectations"]
      },
      "cutting-engraving": {
        label: "Cutting & Engraving", involvesCutting: true, involvesEngraving: true,
        defaultChecklist: ["Confirm cut vs. engrave layer/colour separation", "Kerf compensation check for tight-tolerance parts", "Test engrave on scrap material for new artwork"]
      },
      "signage": {
        label: "Signage", involvesCutting: true, involvesEngraving: true,
        defaultChecklist: ["Confirm mounting method (standoffs, adhesive, bracket)", "Check text legibility at final viewing distance", "Confirm indoor vs. outdoor material suitability"]
      },
      "acrylic-fabrication": {
        label: "Acrylic Fabrication", involvesCutting: true, involvesEngraving: false,
        defaultChecklist: ["Confirm assembly method (solvent weld, mechanical fixings)", "Check panel tolerances for slot-fit assemblies", "Confirm edge finish for visible edges"]
      },
      "trophy-award": {
        label: "Trophy / Award", involvesCutting: true, involvesEngraving: true,
        defaultChecklist: ["Confirm engraving text and spelling with customer sign-off", "Confirm base/stand material if applicable", "Check turnaround against event date"]
      },
      "branded-gift": {
        label: "Branded Gift", involvesCutting: true, involvesEngraving: true,
        defaultChecklist: ["Confirm logo file is vector artwork", "Confirm quantity and per-unit packaging", "Check brand colour/material matches supplied guidelines"]
      },
      "prototype": {
        label: "Prototype", involvesCutting: true, involvesEngraving: false,
        defaultChecklist: ["Confirm this is a single test piece before a production run", "Flag any dimensional tolerances that matter", "Confirm material substitution is acceptable for testing"]
      },
      "other": {
        label: "Other / Not Listed", involvesCutting: true, involvesEngraving: false,
        defaultChecklist: []
      }
    },

    cutComplexityOrder: ["simple-outline", "moderate-detail", "intricate-detail", "nested-parts"],
    cutComplexityMultiplier: {
      "simple-outline": 1.0,
      "moderate-detail": 1.15,
      "intricate-detail": 1.35,
      "nested-parts": 1.5
    },
    cutComplexityLabels: {
      "simple-outline": "Simple outline",
      "moderate-detail": "Moderate detail",
      "intricate-detail": "Intricate detail",
      "nested-parts": "Nested parts"
    },

    finishOrder: ["raw-edge", "polished-edge", "painted", "assembled", "packaged"],
    finishMultiplier: {
      "raw-edge": 1.0,
      "polished-edge": 1.2,
      "painted": 1.3,
      "assembled": 1.4,
      "packaged": 1.15
    },
    finishLabels: {
      "raw-edge": "Raw edge",
      "polished-edge": "Polished edge",
      "painted": "Painted",
      "assembled": "Assembled",
      "packaged": "Packaged"
    },

    // Thickness affects cut speed/passes — banded multiplier applied to
    // the cutting portion of the estimate. maxMm is inclusive.
    thicknessBands: [
      { maxMm: 3, multiplier: 1.0, label: "Up to 3mm" },
      { maxMm: 6, multiplier: 1.15, label: "3–6mm" },
      { maxMm: 12, multiplier: 1.35, label: "6–12mm" },
      { maxMm: Infinity, multiplier: 1.6, label: "Over 12mm" }
    ],

    fileReadinessOrder: ["vector-ready", "image-only", "design-help-needed", "no-file-yet"],
    fileReadinessLabels: {
      "vector-ready": "Vector file ready (SVG/DXF/AI/PDF)",
      "image-only": "Image file only (PNG/JPG)",
      "design-help-needed": "Design help needed",
      "no-file-yet": "No file yet"
    },
    filePrepChecklists: {
      "vector-ready": ["Confirm file units match the physical dimensions entered above", "Separate cut lines and engrave lines onto different layers or colours", "Remove duplicate or overlapping paths before sending"],
      "image-only": ["Vector conversion is required before cutting is possible from this file", "A high-resolution source image (300dpi+) is needed for detailed engraving", "Confirm the engraving area matches the proportions of the supplied artwork"],
      "design-help-needed": ["Our design team can help convert your concept into a cut-ready file", "Provide reference images, text and rough dimensions to speed this up", "Expect an additional design turnaround before production begins"],
      "no-file-yet": ["A cut-ready vector file (SVG/DXF/AI/PDF) is required before production can begin", "Design assistance is available if you don't have design software", "Describe the desired shape, size and any text as clearly as possible in your notes"]
    },

    fileTypesList: [
      { key: "svg", label: "SVG" },
      { key: "dxf", label: "DXF" },
      { key: "ai", label: "AI" },
      { key: "pdf", label: "PDF" },
      { key: "png", label: "PNG" },
      { key: "jpg", label: "JPG" },
      { key: "none", label: "None yet" }
    ],

    deliveryOrder: ["collection", "delivery"],
    deliveryLabels: {
      "collection": "Workshop collection",
      "delivery": "Delivery (quoted separately)"
    },

    designSupportMessage: "No cut-ready vector file was supplied. Our design team can help prepare or convert your artwork — expect an additional design step before production can begin.",

    assumptionsBase: [
      "Rates assume standard, readily available material stock at the thickness and finish selected.",
      "Pricing excludes VAT / applicable taxes unless your local pricing convention includes it — check before publishing.",
      "Metal and glass rates model marking/engraving service only — confirm your actual machine's material compatibility and cutting capability before publishing.",
      "Figures are based on the sample rate bands in site-config.js and must be replaced with your own researched rates."
    ]
  }
};
