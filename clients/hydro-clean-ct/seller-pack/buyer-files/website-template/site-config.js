/**
 * HYDRO CLEAN — SITE CONFIGURATION
 * ============================================================
 * Edit the values below to rebrand this template for a real exterior cleaning,
 * flooring, or renovation business. You should NOT need to touch
 * index.html, style.css, app.js or planner.js for ordinary business
 * changes (name, contact details, services, prices, testimonials,
 * FAQs, colours, wastage presets, etc).
 *
 * IMPORTANT: All contact details, ratings, stats, testimonials, project
 * photos, and licence/insurance statements below are FICTIONAL SAMPLE
 * CONTENT for demonstration purposes only. Replace every field with
 * your real, verifiable business information before publishing this
 * site. See the measurement disclaimer at the bottom of this file
 * before configuring the Surface Cleaning Estimate Planner's pricing/material
 * guidance fields.
 * ============================================================
 */
window.SITE_CONFIG = {

  // ---- ACTIVE THEME -------------------------------------------------
  // Choose one of: "limestone-studio", "charcoal-brass", "coastal-clay"
  activeTheme: "limestone-studio",

  themes: {
    "limestone-studio": {
      label: "Limestone Studio",
      bg: "#f3eee4",
      bgAlt: "#ebe3d3",
      surface: "#fffdf9",
      border: "rgba(36,31,26,0.12)",
      textPrimary: "#241f1a",
      textSecondary: "#6b6154",
      accent: "#8a6a3f",
      accent2: "#b3552b",
      accentContrast: "#f3eee4",
      isLight: true
    },
    "charcoal-brass": {
      label: "Charcoal Brass",
      bg: "#17171a",
      bgAlt: "#1e1e22",
      surface: "#232327",
      border: "rgba(255,255,255,0.09)",
      textPrimary: "#f1efe9",
      textSecondary: "#a9a49b",
      accent: "#c9a15a",
      accent2: "#8a6a3f",
      accentContrast: "#17171a",
      isLight: false
    },
    "coastal-clay": {
      label: "Coastal Clay",
      bg: "#f4e8da",
      bgAlt: "#ecd9c4",
      surface: "#fffaf3",
      border: "rgba(70,40,20,0.14)",
      textPrimary: "#2c211a",
      textSecondary: "#7a6552",
      accent: "#b3552b",
      accent2: "#4f7f78",
      accentContrast: "#f4e8da",
      isLight: true
    }
  },

  // ---- BUSINESS IDENTITY (SAMPLE / DEMO DATA) ------------------------
  business: {
    name: "Hydro Clean",
    logoText: "Hydro Clean",
    tagline: "Thoughtful exterior cleaning, planned around your property.",
    foundedYear: "[Year] (sample placeholder)",
    description: "Hydro Clean is a fictional demonstration business created to showcase this exterior cleaning website template. Replace this description with your real company profile and verified services."
  },

  // ---- CONTACT (SAMPLE / DEMO DATA — REPLACE BEFORE USE) -------------
  contact: {
    phoneDisplay: "+27 00 000 0000",
    phoneDial: "+27000000000",
    whatsappDisplay: "+27 00 000 0000",
    whatsappNumber: "27000000000",
    email: "quotes@example.com",
    addressLine1: "YOUR STREET ADDRESS",
    addressLine2: "YOUR SERVICE AREA",
    mapEmbedUrl: "https://www.google.com/maps?q=Cape+Town&output=embed",
    quoteUrl: "#quote"
  },

  hours: [
    { day: "Monday – Friday", time: "7:00 AM – 5:00 PM" },
    { day: "Saturday", time: "8:00 AM – 1:00 PM" },
    { day: "Sunday", time: "Closed" }
  ],

  social: {
    facebook: "#",
    instagram: "#",
    x: "#",
    linkedin: "#",
    youtube: "#"
  },

  serviceAreas: ["Your primary area", "Neighbouring area", "Nearby suburb", "Extended service area"],

  // ---- TRUST INDICATORS (CLEARLY LABELLED SAMPLE PLACEHOLDERS) -------
  // These are fictional examples only. Do not publish unverifiable
  // claims (ratings, job counts, "fully insured", "certified",
  // "guaranteed") — replace with your real, evidence-backed figures,
  // or remove the item entirely.
  trustIndicators: [
    { value: "[X]+", label: "Sample stat — years in business (edit or remove)" },
    { value: "[X]+", label: "Sample stat — projects completed (edit or remove)" },
    { value: "[X]", label: "Sample stat — average quote turnaround (edit or remove)" },
    { value: "[Licence / Insurance #]", label: "Sample placeholder — insert your real, verifiable licence or insurance reference, or remove" }
  ],

  // ---- SERVICES -------------------------------------------------------
  services: [
    { id: "pressure-washing", icon: "↗", name: "Pressure Washing", summary: "Cleaning enquiries for suitable hard exterior surfaces.", details: "Configure this service to match your equipment, surface assessment process and real service area. Avoid promising a specific outcome before inspection.", startingPrice: "Custom quote — configure your real pricing" },
    { id: "soft-washing", icon: "≈", name: "Exterior Soft Washing", summary: "Lower-pressure cleaning enquiries for compatible surfaces.", details: "Surface material, condition and access should be reviewed before a method is recommended.", startingPrice: "Custom quote — configure your real pricing" },
    { id: "roof-cleaning", icon: "⌂", name: "Roof Cleaning", summary: "Roof cleaning requests planned around material, pitch and access.", details: "Configure this section only if your business offers roof cleaning and can meet the relevant access and safety requirements.", startingPrice: "Site assessment recommended" },
    { id: "gutter-cleaning", icon: "⌁", name: "Gutter Cleaning", summary: "Gutter debris-removal enquiries with access details collected upfront.", details: "Describe your real scope, exclusions and downpipe-check process here.", startingPrice: "Custom quote — configure your real pricing" },
    { id: "window-cleaning", icon: "▦", name: "Exterior Window Cleaning", summary: "Exterior glass cleaning requests for homes or workplaces.", details: "Set the building types, height limits and service inclusions your business actually supports.", startingPrice: "Custom quote — configure your real pricing" },
    { id: "solar-panel-cleaning", icon: "◇", name: "Solar Panel Cleaning", summary: "Cleaning enquiries based on panel location and access.", details: "Only offer methods compatible with the equipment manufacturer guidance and your real capabilities.", startingPrice: "Site assessment recommended" },
    { id: "driveway-cleaning", icon: "▤", name: "Driveway & Paving Cleaning", summary: "Project requests for suitable driveways, paths and paving.", details: "Final approach and expectations depend on the surface, condition and source of marking.", startingPrice: "Custom quote — configure your real pricing" },
    { id: "commercial-exteriors", icon: "▣", name: "Commercial Exterior Cleaning", summary: "Configurable enquiry flow for suitable small commercial properties.", details: "Replace with your verified scope, scheduling options and site requirements.", startingPrice: "Custom quote" }
  ],

  // ---- PROJECT TYPES (used by both the Services grid and the Planner) --
  projectTypes: ["Driveway or paving", "Exterior wall", "Roof", "Gutters", "Windows", "Solar panels", "Commercial exterior", "Other"],

  // ---- SAMPLE LAYOUT GALLERY (CSS-drawn pattern previews, not photos) --
  // No fabricated "before and after" job photography is used in this
  // template. The gallery below renders illustrative layout-pattern
  // previews (straight lay, brick bond, herringbone, etc.) that double
  // as a visual reference for the Surface Cleaning Estimate Planner's Layout step.
  layoutGallery: [
    { id: "straight-lay", name: "Straight Lay", note: "Classic grid layout — lowest cutting waste, fastest install." },
    { id: "brick-bond", name: "Brick Bond", note: "Offset joints for a running-bond look — moderate cutting waste." },
    { id: "diagonal", name: "Diagonal", note: "45° lay that visually widens a room — higher cutting waste." },
    { id: "herringbone", name: "Herringbone", note: "Interlocking zig-zag pattern — higher labour and cutting waste." },
    { id: "chevron", name: "Chevron", note: "Angle-cut V pattern — highest precision and material waste." },
    { id: "large-format", name: "Large Format", note: "Fewer, bigger tiles — fewer grout lines, careful substrate flatness required." }
  ],

  process: [
    { step: 1, title: "Plan Your Project", text: "Use the Surface Cleaning Estimate Planner to estimate area, surface area, and boxes, or submit the quote form directly." },
    { step: 2, title: "Site Visit", text: "A tiler reviews the space in person to confirm measurements, substrate condition, and any preparation work needed." },
    { step: 3, title: "Written Quote", text: "You receive a written quote covering materials, preparation, labour, and estimated timeline before any work begins." },
    { step: 4, title: "Preparation", text: "Existing tile removal, levelling, and waterproofing (where required) are completed ahead of exterior cleaning." },
    { step: 5, title: "exterior cleaning & Finishing", text: "Tiles are laid to the agreed pattern, followed by grouting, sealing, and a final walkthrough." }
  ],

  surfacePreparation: {
    heading: "Why Surface Preparation Matters",
    text: "Tile life and finish quality depend heavily on what happens before the first tile goes down: removing failed existing tile, levelling an uneven substrate, and waterproofing wet areas. Replace this section with your own surface-preparation process, products, and standards."
  },

  team: [
    { name: "Sample Contractor Name", role: "Lead Tiler (sample placeholder)", bio: "Replace with your real name, trade licence/certification numbers (if applicable in your jurisdiction), and years of experience." },
    { name: "Sample Contractor Name", role: "Site Supervisor (sample placeholder)", bio: "Replace with your real staff information." },
    { name: "Sample Office Contact", role: "Client Coordinator (sample placeholder)", bio: "Replace with your real staff information." }
  ],

  whyChooseUs: [
    { title: "Transparent, Written Quotes (sample)", text: "Sample copy — describe your real quoting process." },
    { title: "Planner-Backed Estimates (sample)", text: "Sample copy — describe how you turn planner submissions into firm quotes." },
    { title: "Local Project Experience (sample)", text: "Sample copy — describe your real service-area experience." },
    { title: "Clear Site Communication (sample)", text: "Sample copy — describe how you actually communicate with clients during a project." }
  ],

  // ---- TESTIMONIALS (FICTIONAL DEMO CONTENT) --------------------------
  testimonials: [
    { quote: "This is a sample fictional testimonial included for template demonstration purposes only. Replace with a real, permission-cleared customer review.", name: "Sample Customer A", location: "Your Service Area (fictional)" },
    { quote: "This is a sample fictional testimonial included for template demonstration purposes only. Replace with a real, permission-cleared customer review.", name: "Sample Customer B", location: "North Ridge (fictional)" },
    { quote: "This is a sample fictional testimonial included for template demonstration purposes only. Replace with a real, permission-cleared customer review.", name: "Sample Customer C", location: "Millbrook (fictional)" }
  ],

  faqs: [
    { q: "Is Hydro Clean a real company?", a: "No. \"Hydro Clean\" is a fictional demonstration business used to showcase this website template. Replace all business details with your own before publishing." },
    { q: "How do I request a quote?", a: "Use the quote form, the Surface Cleaning Estimate Planner's \"Request Site Visit\" action, call the listed phone number, or message on WhatsApp. All contact details shown are placeholders until you configure your own." },
    { q: "How accurate is the Surface Cleaning Estimate Planner?", a: "The planner gives a preliminary planning estimate based on the measurements and settings you enter. Actual material needs vary by tile type, layout, cuts, breakage, and site conditions — it is not a binding quote. See the measurement disclaimer for details." },
    { q: "Do I need to know exact area dimensionss to use the planner?", a: "No — you can enter approximate dimensions and adjust later. The planner clearly lists what additional information is still needed for a firm quote." },
    { q: "Are your tilers licensed and insured?", a: "This is a placeholder question. Do not publish claims about licensing, certification, or insurance unless you can verify them for your business, and check your local regulatory requirements." },
    { q: "What exterior cleaning services do you offer?", a: "See the Services section on this page. Edit the services list in site-config.js to match what you actually offer." },
    { q: "Do you handle waterproofing?", a: "The demo lists waterproofing as a sample service. Replace the details with your real waterproofing systems, certifications, and warranty terms, if any." },
    { q: "What areas do you service?", a: "See the Service Areas section. Edit the serviceAreas list in site-config.js to reflect your real coverage." },
    { q: "How much does exterior cleaning cost?", a: "Sample starting prices are shown next to each service as placeholders. Replace them with your real, current pricing, and configure real per-tile or per-box pricing in the planner if you want cost estimates shown." },
    { q: "Can I use my own tiles that I already purchased?", a: "Yes — select \"material already purchased\" in the planner's project-conditions step so your quote request reflects that." },
    { q: "How do I customise this template?", a: "Open site-config.js and edit the business, contact, services, pricing, testimonials, FAQ, theme, and planner values. See the buyer guide included with this template for full instructions." }
  ],

  // ---- SURFACE CLEANING ESTIMATE PLANNER CONFIGURATION ------------------------------
  planner: {
    unitDefault: "m", // one of: m, cm, ft, in
    currencySymbol: "$",

    wastagePresets: [
      { id: "standard", label: "10% — Standard", value: 10, note: "Typical starting point for straight-lay rectangular rooms." },
      { id: "larger-cuts", label: "12% — Larger tiles or more cuts", value: 12, note: "Rooms with more corners, niches, or larger-format tile." },
      { id: "complex", label: "15% — Diagonal or complex layout", value: 15, note: "Diagonal, herringbone, chevron, or heavily cut layouts." },
      { id: "custom", label: "Custom percentage", value: null, note: "Enter your own wastage allowance." }
    ],
    wastageDisclaimer: "These wastage percentages are general planning starting points, not universally exact figures. Actual breakage and cutting waste vary by tile type, layout, installer skill, and room geometry.",

    // Material guidance is OPTIONAL, INDICATIVE ONLY, and fully
    // configurable/disableable by the buyer. Coverage rates for
    // adhesive, grout, levelling compound, and waterproofing vary
    // enormously by brand, trowel notch size, area dimensions, and substrate —
    // do not present these as universally correct.
    materialGuidance: {
      enabled: true,
      disclaimer: "Adhesive, grout, levelling, and waterproofing guidance below is indicative planning guidance only, not a purchasing specification. Always confirm actual coverage rates from your chosen product's technical data sheet.",
      adhesiveCoveragePerBagM2: 4.5,
      groutCoveragePerKgM2: 3.5,
      levellingCompoundCoveragePerBagM2: 2.5,
      waterproofingCoveragePerLM2: 1.8
    },

    features: {
      enablePricing: true,
      enableMaterialGuidance: true,
      enableSaveProgress: true,
      enablePhotoPreview: true
    },

    whatsappMessageIntro: "Hi Hydro Clean, I'd like a quote for a exterior cleaning project. Here is my Surface Cleaning Estimate Planner summary:",

    photoChecklist: [
      "Full room / area (wide shot)",
      "Floor or wall surface close-up",
      "Corners and edges",
      "Doorways and thresholds",
      "Any damaged or uneven areas",
      "Existing tiles (if being replaced)",
      "Plumbing fixtures or shower area (if applicable)"
    ],

    privacyNote: "Measurements and project details you enter stay in your browser and are not sent anywhere unless you explicitly choose a contact action (WhatsApp, email, or Request Site Visit). Contact details are not saved automatically — saving your progress is optional and only happens if you turn it on."
  },

  legal: {
    businessLegalName: "Hydro Clean (fictional demo business)",
    licenceStatement: "Sample placeholder — insert your real trade licence/registration number(s) here if applicable in your jurisdiction, or remove this line if not applicable.",
    insuranceStatement: "Sample placeholder — insert your real insurance details here only if verified and accurate, or remove this line.",
    disclaimerSummary: "All business information, contact details, statistics, ratings, testimonials, and licensing statements on this demonstration site are fictional sample content and must be replaced with accurate, verifiable information before this site is used for a real business.",
    measurementDisclaimer: "Surface Cleaning Estimate Planner results are preliminary planning estimates only. Actual tile, adhesive, grout, and material quantities vary by tile type, layout, cuts, breakage, and site conditions. This tool does not provide a binding quote, and a professional site inspection is typically required before a firm price can be given. Business owners must configure accurate local pricing and only publish business claims (licensing, insurance, certification, guarantees) that they can verify."
  }
};
