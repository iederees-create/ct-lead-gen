/**
 * SOUTHERN SUBURBS BUILDERS — SITE CONFIGURATION
 * ============================================================
 * Edit the values below to rebrand this template for a real business.
 * You should NOT need to touch index.html, style.css, app.js or
 * planner.js for ordinary business changes (name, contact details,
 * services, rates, testimonials, FAQs, colours, planner assumptions).
 *
 * IMPORTANT: All contact details, ratings, stats, testimonials, team
 * profiles, and licence/insurance statements below are FICTIONAL SAMPLE
 * CONTENT for demonstration purposes only. Replace every field with your
 * real, verifiable business information before publishing this site.
 *
 * The Renovation Scope & Budget Planner's rates, multipliers and
 * assumptions live in the `planner` section below. Every number there is
 * an editable, clearly-labelled example — not a real pricing guarantee.
 * ============================================================
 */
window.SITE_CONFIG = {

  // ---- ACTIVE THEME --------------------------------------------------
  // Choose one of: "concrete-brass", "cape-clay", "blueprint-navy"
  activeTheme: "concrete-brass",

  themes: {
    "concrete-brass": {
      label: "Concrete & Brass",
      bg: "#1a1917",
      bgAlt: "#211f1c",
      surface: "#28251f",
      border: "rgba(230,220,200,0.10)",
      textPrimary: "#f2ede4",
      textSecondary: "#b3a99a",
      accent: "#c6a05c",
      accent2: "#8c6b3a",
      accentContrast: "#1a1917",
      safety: "#c1592f",
      blueprintLine: "rgba(198,160,92,0.16)"
    },
    "cape-clay": {
      label: "Cape Clay",
      bg: "#211a15",
      bgAlt: "#28201a",
      surface: "#332720",
      border: "rgba(240,220,200,0.10)",
      textPrimary: "#f5ece2",
      textSecondary: "#c2a996",
      accent: "#c1592f",
      accent2: "#caa14a",
      accentContrast: "#211a15",
      safety: "#e0432c",
      blueprintLine: "rgba(193,89,47,0.16)"
    },
    "blueprint-navy": {
      label: "Blueprint Navy",
      bg: "#10161f",
      bgAlt: "#141c27",
      surface: "#182231",
      border: "rgba(210,225,245,0.10)",
      textPrimary: "#eef2f8",
      textSecondary: "#9fb0c4",
      accent: "#5b93d1",
      accent2: "#d8c9a3",
      accentContrast: "#10161f",
      safety: "#e0432c",
      blueprintLine: "rgba(91,147,209,0.20)"
    }
  },

  // ---- BUSINESS IDENTITY (SAMPLE / DEMO DATA) ------------------------
  business: {
    name: "Southern Suburbs Builders",
    logoText: "Southern Suburbs Builders",
    logoMark: "[SSB]",
    tagline: "Renovations, extensions and new builds for Cape Town's Southern Suburbs.",
    foundedYear: "[Year] (sample placeholder)",
    description: "Southern Suburbs Builders is a fictional demonstration business created to showcase this website template for building contractors and renovation specialists. Replace this description with your real company profile, registration details and areas of expertise."
  },

  // ---- CONTACT (SAMPLE / DEMO DATA — REPLACE BEFORE USE) -------------
  contact: {
    phoneDisplay: "(021) 555 0142",
    phoneDial: "+27215550142",
    whatsappDisplay: "082 555 0199",
    whatsappNumber: "27825550199",
    email: "hello@example.com",
    addressLine1: "12 Example Road, Kenilworth",
    addressLine2: "Cape Town, 7708",
    mapEmbedUrl: "https://www.google.com/maps?q=Kenilworth,Cape+Town&output=embed",
    quoteUrl: "#quote"
  },

  announcement: {
    enabled: true,
    label: "Try our free Renovation Scope & Budget Planner — get a preliminary estimate in minutes",
    ctaText: "Open the Planner",
    ctaHref: "#planner"
  },

  hours: [
    { day: "Monday – Friday", time: "7:00 AM – 5:00 PM" },
    { day: "Saturday", time: "8:00 AM – 1:00 PM (site visits by appointment)" },
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
    "Claremont", "Kenilworth", "Wynberg", "Plumstead", "Diep River",
    "Tokai", "Constantia", "Bishopscourt", "Newlands", "Rondebosch",
    "Wetton", "Bergvliet"
  ],

  // ---- TRUST INDICATORS (editable — do not publish unless verified) --
  trustIndicators: [
    { icon: "📝", label: "Written quotes before any work begins (sample)" },
    { icon: "👷", label: "Dedicated site manager per project (sample)" },
    { icon: "📅", label: "Agreed, scheduled milestones (sample)" },
    { icon: "🧾", label: "Itemised invoicing (sample)" }
  ],

  // ---- STATISTICS (CLEARLY LABELLED SAMPLE PLACEHOLDERS) -------------
  // These figures are fictional examples only. Do not publish unverifiable
  // statistics — replace with your real, evidence-backed figures or remove.
  stats: [
    { value: "[X]+", label: "Sample stat — years building in the Southern Suburbs (edit or remove)" },
    { value: "[X]+", label: "Sample stat — projects completed (edit or remove)" },
    { value: "[X]", label: "Sample stat — average project handover time (edit or remove)" },
    { value: "[X]", label: "Sample stat — tradespeople on the team (edit or remove)" }
  ],

  // ---- SERVICES (Renovations / Extensions / New Builds / Paving /
  //      Boundary Walls / Project Management) -------------------------
  services: [
    {
      id: "renovations",
      icon: "🛠️",
      name: "Renovations",
      summary: "Room, kitchen and bathroom renovations for existing homes.",
      details: "Full-service renovation work covering single rooms, kitchens and bathrooms, from strip-out through to final finishes. Replace with your actual renovation scope, typical timelines and the trades you manage in-house versus subcontract.",
      startingPrice: "Sample placeholder — see the Planner tool for an editable estimate range"
    },
    {
      id: "extensions",
      icon: "📐",
      name: "Extensions",
      summary: "Room additions and double-storey extensions.",
      details: "Home extension projects including foundations, structural work, roofing and finishes, coordinated with your architect and local authority approvals. Replace with your real process for plans, approvals and structural sign-off.",
      startingPrice: "Sample placeholder — see the Planner tool for an editable estimate range"
    },
    {
      id: "new-builds",
      icon: "🏗️",
      name: "New Builds",
      summary: "Ground-up new home construction.",
      details: "New build construction from foundation to handover, including project management of all trades. Replace with your real build methodology, warranty terms and NHBRC / local regulatory registration details if applicable.",
      startingPrice: "Sample placeholder — see the Planner tool for an editable estimate range"
    },
    {
      id: "paving",
      icon: "🧱",
      name: "Paving",
      summary: "Driveway, patio and pathway paving.",
      details: "Paving for driveways, patios and garden pathways, including base preparation and drainage. Replace with your real paving materials, guarantee terms and typical turnaround times.",
      startingPrice: "Sample placeholder — see the Planner tool for an editable estimate range"
    },
    {
      id: "boundary-walls",
      icon: "🧱",
      name: "Boundary Walls",
      summary: "New boundary walls, retaining walls and repairs.",
      details: "Boundary and retaining wall construction and repair, priced per linear metre. Replace with your real wall specifications (height, foundation depth, materials) and any local council approval requirements.",
      startingPrice: "Sample placeholder — see the Planner tool for an editable estimate range"
    },
    {
      id: "project-management",
      icon: "📋",
      name: "Project Management",
      summary: "End-to-end coordination of trades, timelines and budgets.",
      details: "Dedicated project management for renovation and build projects, coordinating subcontractors, scheduling and budget tracking. Replace with your real project-management process, reporting cadence and communication tools.",
      startingPrice: "Sample placeholder — custom quote"
    }
  ],

  projectTypesList: [
    "Room Renovation", "Bathroom Renovation", "Kitchen Renovation", "Home Extension",
    "New Build", "Paving", "Boundary Wall", "Commercial Renovation", "Other"
  ],

  process: [
    { step: 1, title: "Enquiry & Scope Planner", text: "Use the Renovation Scope & Budget Planner or the quote form to tell us about your project. You'll get a preliminary scope and budget range instantly." },
    { step: 2, title: "Site Visit", text: "For most projects we schedule a free site visit to confirm measurements, access and structural conditions before quoting." },
    { step: 3, title: "Written Quotation", text: "You receive a detailed written quotation covering scope, materials, timeline and price before any work begins." },
    { step: 4, title: "Contract & Scheduling", text: "Once you approve the quotation, we agree a start date and confirm the project schedule and payment milestones." },
    { step: 5, title: "Construction & Site Management", text: "Our team manages the build, keeping you updated at agreed intervals and coordinating all trades on site." },
    { step: 6, title: "Handover & Sign-Off", text: "A final walkthrough confirms the completed work against the agreed scope before handover." }
  ],

  team: [
    { name: "Sample Site Manager Name", role: "Site Manager (sample placeholder)", bio: "Replace with your real site manager's name, qualifications and years of experience." },
    { name: "Sample Foreman Name", role: "Foreman (sample placeholder)", bio: "Replace with your real foreman's name, trade background and experience summary." },
    { name: "Sample Office Contact", role: "Client Liaison (sample placeholder)", bio: "Replace with your real staff information and point of contact for clients." }
  ],

  whyChooseUs: [
    { title: "Written, Itemised Quotes (sample)", text: "Sample copy — describe your real quoting process and what's included in each quote." },
    { title: "Dedicated Site Management (sample)", text: "Sample copy — describe how you actually manage projects and communicate progress." },
    { title: "Local Southern Suburbs Knowledge (sample)", text: "Sample copy — describe your real experience and familiarity with the local area, soil conditions and council processes." },
    { title: "Transparent Scheduling (sample)", text: "Sample copy — describe how you communicate timelines and handle delays." }
  ],

  // ---- PROJECT GALLERY (replaceable demo media placeholders) ---------
  // No stock or fictional "before/after" photography is included — each
  // entry renders as a clearly-labelled placeholder card. Replace
  // `image` with a real photo path once you have real project photos.
  gallery: [
    { category: "Renovations", title: "Kitchen Renovation — sample project title", image: null },
    { category: "Extensions", title: "Double-Storey Extension — sample project title", image: null },
    { category: "New Builds", title: "New Build Handover — sample project title", image: null },
    { category: "Paving", title: "Driveway Paving — sample project title", image: null },
    { category: "Boundary Walls", title: "Boundary Wall Rebuild — sample project title", image: null },
    { category: "Renovations", title: "Bathroom Renovation — sample project title", image: null }
  ],

  // ---- TESTIMONIALS (FICTIONAL DEMO CONTENT) --------------------------
  testimonials: [
    { quote: "This is a sample fictional testimonial included for template demonstration purposes only. Replace with a real, permission-cleared customer review.", name: "Sample Customer A", location: "Claremont (fictional)" },
    { quote: "This is a sample fictional testimonial included for template demonstration purposes only. Replace with a real, permission-cleared customer review.", name: "Sample Customer B", location: "Constantia (fictional)" },
    { quote: "This is a sample fictional testimonial included for template demonstration purposes only. Replace with a real, permission-cleared customer review.", name: "Sample Customer C", location: "Tokai (fictional)" }
  ],

  faqs: [
    { q: "Is Southern Suburbs Builders a real company?", a: "No. \"Southern Suburbs Builders\" is a fictional demonstration business used to showcase this website template. Replace all business details with your own before publishing." },
    { q: "How do I get a quote?", a: "Use the Renovation Scope & Budget Planner for an instant preliminary estimate, fill out the quote form, call the listed phone number, or message us on WhatsApp. All contact details shown are placeholders until you configure your own." },
    { q: "Is the Planner's budget range a binding quote?", a: "No. The Planner produces a preliminary, non-binding estimate based on the rate bands configured in site-config.js. Actual costs depend on final drawings, materials, labour, approvals and site conditions — see the Estimate Disclaimer page." },
    { q: "What project types does the Planner support?", a: "Room, bathroom and kitchen renovations, home extensions, new builds, paving, boundary walls, commercial renovations, and an 'Other' catch-all category. Edit the planner.projectTypes object in site-config.js to add or change categories." },
    { q: "Can I turn off the budget estimate feature?", a: "Yes. Set planner.budgetEnabled to false in site-config.js and the tool will still produce a scope, trade checklist and photo checklist, but without a numeric budget range." },
    { q: "Are you licensed and insured?", a: "This is a placeholder question. Do not publish claims about licensing, registration (e.g. NHBRC) or insurance unless you can verify them for your business, and check your local regulatory requirements." },
    { q: "Do you offer same-day or guaranteed response times?", a: "This template does not claim guaranteed response times by default. Only advertise response times you can reliably deliver." },
    { q: "How much does a renovation or extension cost?", a: "Sample rate bands are used by the Planner tool to generate an editable estimate range. Replace the rates in the planner.projectTypes section of site-config.js with your real, current pricing." },
    { q: "Do I need to move out during construction?", a: "This depends on the scope of work and is assessed during the site visit. Provide accurate, project-specific guidance for your real services here." },
    { q: "What areas do you service?", a: "See the Service Areas section on this page. Edit the serviceAreas list in site-config.js to reflect your real coverage." },
    { q: "How do I customise this template?", a: "Open site-config.js and edit the business, contact, services, planner rates, testimonials, FAQ and theme values. See the buyer guide included with this template for full instructions." }
  ],

  legal: {
    businessLegalName: "Southern Suburbs Builders (fictional demo business)",
    licenceStatement: "Sample placeholder — insert your real building/contractor registration or licence number(s) here if applicable in your jurisdiction, or remove this line if not applicable.",
    insuranceStatement: "Sample placeholder — insert your real insurance and public liability cover details here only if verified and accurate, or remove this line.",
    disclaimerSummary: "All business information, contact details, statistics, ratings, testimonials, team profiles and licensing statements on this demonstration site are fictional sample content and must be replaced with accurate, verifiable information before this site is used for a real business.",
    estimateDisclaimer: "All figures produced by the Renovation Scope & Budget Planner are preliminary, non-binding estimates only. Actual costs depend on final drawings, material selections, labour availability, regulatory approvals and site conditions discovered during inspection. A site visit may be required before a firm, written quotation can be issued. Nothing produced by this tool constitutes a binding quotation or contractual offer."
  },

  // ---- RENOVATION SCOPE & BUDGET PLANNER CONFIGURATION ----------------
  // Every rate, multiplier and percentage below is an illustrative sample
  // assumption, not a real pricing guarantee. Replace with your own
  // researched rate bands before publishing this site for a real business.
  planner: {
    // Set to false to hide all budget figures — the tool still produces
    // scope, trade checklist, assumptions and photo checklist.
    budgetEnabled: true,

    currency: { code: "ZAR", symbol: "R", locale: "en-ZA" },

    // Added to the top of the estimated range as a buffer for the
    // unknowns a preliminary, no-site-visit estimate can't capture.
    contingencyPercent: 12,

    // Final min/max figures are rounded to the nearest multiple of this.
    roundTo: 500,

    // rateMin / rateMax are illustrative sample rates per square metre
    // (or per linear metre for boundary walls) in the currency above.
    projectTypes: {
      "room-renovation": {
        label: "Room Renovation", unit: "sqm", rateMin: 4500, rateMax: 8500,
        defaultTrades: ["painting", "flooring"]
      },
      "bathroom-renovation": {
        label: "Bathroom Renovation", unit: "sqm", rateMin: 9500, rateMax: 18500,
        defaultTrades: ["plumbing", "electrical", "waterproofing", "flooring", "painting"]
      },
      "kitchen-renovation": {
        label: "Kitchen Renovation", unit: "sqm", rateMin: 11000, rateMax: 22000,
        defaultTrades: ["plumbing", "electrical", "flooring", "painting"]
      },
      "home-extension": {
        label: "Home Extension", unit: "sqm", rateMin: 16000, rateMax: 28000,
        defaultTrades: ["structuralAlterations", "electrical", "plumbing", "roofing", "flooring", "painting"]
      },
      "new-build": {
        label: "New Build", unit: "sqm", rateMin: 14000, rateMax: 24000,
        defaultTrades: ["structuralAlterations", "electrical", "plumbing", "roofing", "waterproofing", "flooring", "painting"]
      },
      "paving": {
        label: "Paving", unit: "sqm", rateMin: 550, rateMax: 1250,
        defaultTrades: []
      },
      "boundary-wall": {
        label: "Boundary Wall", unit: "linear-meter", rateMin: 1800, rateMax: 3600,
        defaultTrades: ["structuralAlterations"]
      },
      "commercial-renovation": {
        label: "Commercial Renovation", unit: "sqm", rateMin: 8000, rateMax: 16000,
        defaultTrades: ["electrical", "flooring", "painting"]
      },
      "other": {
        label: "Other / Not Listed", unit: "sqm", rateMin: 5000, rateMax: 15000,
        defaultTrades: []
      }
    },

    finishMultipliers: {
      Essential: 0.85,
      Standard: 1.0,
      Premium: 1.35,
      Custom: 1.5
    },

    // Percentage uplift applied to the base range for each selected trade.
    tradeAddOnPercent: {
      demolition: 8,
      structuralAlterations: 15,
      plumbing: 10,
      electrical: 8,
      waterproofing: 6,
      roofing: 12,
      painting: 5,
      flooring: 7
    },

    complexity: {
      siteAccessMultiplier: { easy: 1.0, moderate: 1.08, difficult: 1.18 },
      storeyMultiplier: { 1: 1.0, 2: 1.1, 3: 1.22 },
      occupiedMultiplier: 1.05,
      vacantMultiplier: 1.0
    },

    assumptionsBase: [
      "Rates assume standard, readily-available materials at the selected finish level.",
      "Estimate excludes professional fees (architect, engineer, council submission) unless otherwise noted.",
      "Estimate excludes VAT / applicable taxes unless your local pricing convention includes it — check before publishing.",
      "Figures are based on the sample rate bands in site-config.js and must be replaced with your own researched rates."
    ],

    photoChecklists: {
      "room-renovation": ["Each wall of the room from a straight-on angle", "Ceiling and any existing light fittings", "Flooring condition", "Nearest electrical points"],
      "bathroom-renovation": ["Full room from the doorway", "Existing plumbing points (basin, toilet, shower/bath)", "Tiling and waterproofing condition", "Extractor fan / window location"],
      "kitchen-renovation": ["Full room from two opposite corners", "Existing plumbing and gas points", "Existing cabinetry and countertops", "Electrical distribution board"],
      "home-extension": ["Exterior wall(s) where the extension will connect", "Roofline and eaves", "Boundary/property line near the extension", "Existing foundation area if visible"],
      "new-build": ["Full site from each boundary corner", "Existing structures to be demolished, if any", "Access route for machinery and deliveries", "Nearest municipal service connection points"],
      "paving": ["Full area to be paved", "Existing surface condition and any drainage", "Access route for machinery", "Any existing edging or retaining features"],
      "boundary-wall": ["Full wall length from both ends", "Existing wall condition, if replacing", "Neighbouring boundary points", "Gate/entrance locations"],
      "commercial-renovation": ["Full space from entrance", "Existing services (electrical, plumbing, HVAC)", "Fire exits and accessibility features", "Ceiling and flooring condition"]
    }
  }
};
