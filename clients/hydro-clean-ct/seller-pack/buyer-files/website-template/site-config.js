/**
 * HYDRO CLEAN — SITE CONFIGURATION
 * ============================================================
 * Edit the values below to rebrand this template for a real exterior
 * cleaning business. You should NOT need to touch index.html,
 * style.css, app.js or planner.js for ordinary business changes
 * (name, contact details, services, prices, testimonials, FAQs,
 * colours, surface/condition/access presets, etc).
 *
 * IMPORTANT: All example values are explicitly labelled for editing.
 * No ratings, testimonials, project proof, staff identities, licence or
 * insurance claims ship with this template. Replace every example value
 * with accurate business information before deployment. See the
 * measurement disclaimer at the bottom of this file
 * before configuring the Surface Cleaning Estimate Planner's pricing
 * fields.
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
    name: "Your Exterior Cleaning Company",
    logoText: "Your Exterior Cleaning Company",
    tagline: "Editable example tagline — replace this with your verified customer promise.",
    foundedYear: "",
    description: "Editable example company description — replace this with accurate information about your business, services and approach."
  },

  // ---- CONTACT (SAMPLE / DEMO DATA — REPLACE BEFORE USE) -------------
  contact: {
    phoneDisplay: "+27 00 000 0000",
    phoneDial: "+27000000000",
    whatsappDisplay: "+27 00 000 0000",
    whatsappNumber: "27000000000",
    email: "quotes@example.com",
    addressLine1: "EDIT: YOUR BUSINESS ADDRESS",
    addressLine2: "EDIT: YOUR SERVICE AREA",
    mapEmbedUrl: "https://www.google.com/maps?q=Your+Service+Area&output=embed",
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

  // No proof/statistic placeholders are shipped. Add only verified values.
  trustIndicators: [],

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

  // ---- SAMPLE SURFACE GALLERY (CSS-drawn pattern previews, not photos) --
  // No fabricated "before and after" job photography is used in this
  // template. The gallery below renders illustrative pattern swatches
  // for each surface type this business cleans — replace with your own
  // permission-cleared project photography when you have it.
  surfaceGallery: [
    { id: "concrete-paving", name: "Concrete & Paving", note: "Driveways, patios and walkways — pressure-washed to remove grime and staining." },
    { id: "siding", name: "Siding & Exterior Walls", note: "Vinyl, aluminium and rendered walls — soft-washed to protect the finish." },
    { id: "roof", name: "Roofs", note: "Tile and shingle roofs — cleaned with method and pressure matched to the material." },
    { id: "decking", name: "Wood Decking", note: "Timber decks and boardwalks — cleaned to lift grime without damaging the surface." },
    { id: "gutters", name: "Gutters & Downpipes", note: "Debris removal and a downpipe flow check." },
    { id: "solar", name: "Solar Panels", note: "Cleaned using methods compatible with manufacturer guidance." }
  ],

  process: [
    { step: 1, title: "Plan Your Project", text: "Use the Surface Cleaning Estimate Planner to estimate area and cleaning time, or submit the quote form directly." },
    { step: 2, title: "Site Assessment", text: "Our team reviews the space (in person or via your photos) to confirm measurements, surface condition, and access requirements." },
    { step: 3, title: "Written Quote", text: "You receive a written quote covering method, access, labour, and estimated timeline before any work begins." },
    { step: 4, title: "Preparation", text: "Plants, fixtures, and fragile surfaces near the work area are protected, and the chosen method is tested on an inconspicuous area first." },
    { step: 5, title: "Cleaning & Walkthrough", text: "The surface is cleaned using the agreed method, followed by a rinse, debris removal, and a final walkthrough." }
  ],

  surfacePreparation: {
    heading: "Why Surface Assessment Matters",
    text: "Cleaning results and surface safety depend heavily on matching the method to the material: pressure level, chemical use, and technique all vary by surface type and condition. Replace this section with your own surface-assessment process, equipment, and standards."
  },

  team: [],

  whyChooseUs: [
    { title: "Transparent, Written Quotes (sample)", text: "Sample copy — describe your real quoting process." },
    { title: "Planner-Backed Estimates (sample)", text: "Sample copy — describe how you turn planner submissions into firm quotes." },
    { title: "Defined Service Area (sample)", text: "Sample copy — describe the locations you actually serve." },
    { title: "Clear Site Communication (sample)", text: "Sample copy — describe how you actually communicate with clients during a project." }
  ],

  // No fictional reviews are included. Add permission-cleared reviews only.
  testimonials: [],

  faqs: [
    { q: "Is this page a real cleaning company?", a: "No. This is an editable website-template demonstration. Replace all clearly labelled example content with accurate business information before deployment." },
    { q: "How do I request a quote?", a: "Use the quote form, the Surface Cleaning Estimate Planner's \"Request Site Visit\" action, call the listed phone number, or message on WhatsApp. All contact details shown are placeholders until you configure your own." },
    { q: "How accurate is the Surface Cleaning Estimate Planner?", a: "The planner gives a preliminary planning estimate based on the measurements and settings you enter. Actual time and cost vary by surface condition, access, equipment, and site conditions — it is not a binding quote. See the measurement disclaimer for details." },
    { q: "Do I need to know exact area dimensions to use the planner?", a: "No — you can enter approximate dimensions and adjust later. The planner clearly lists what additional information is still needed for a firm quote." },
    { q: "Are your technicians licensed and insured?", a: "This is a placeholder question. Do not publish claims about licensing, certification, or insurance unless you can verify them for your business, and check your local regulatory requirements." },
    { q: "What exterior cleaning services do you offer?", a: "See the Services section on this page. Edit the services list in site-config.js to match what you actually offer." },
    { q: "Do you clean gutters and downpipes?", a: "The demo lists gutter cleaning as a sample service. Replace the details with your real scope, exclusions, and equipment, if any." },
    { q: "What areas do you service?", a: "See the Service Areas section. Edit the serviceAreas list in site-config.js to reflect your real coverage." },
    { q: "How much does exterior cleaning cost?", a: "Sample starting prices are shown next to each service as placeholders. Replace them with your real, current pricing, and configure your real hourly or per-m² rate in the planner if you want cost estimates shown." },
    { q: "Do I need to be home during the cleaning?", a: "This is a placeholder question. Describe your real access, entry, and communication requirements for occupied vs. unoccupied properties here." },
    { q: "How do I customise this template?", a: "Open site-config.js and edit the business, contact, services, pricing, testimonials, FAQ, theme, and planner values. See the buyer guide included with this template for full instructions." }
  ],

  // ---- SURFACE CLEANING ESTIMATE PLANNER CONFIGURATION ------------------------------
  planner: {
    unitDefault: "m", // one of: m, cm, ft, in
    currencySymbol: "$",

    // Surface type drives the estimated cleaning time via an indicative
    // m²-per-hour coverage rate. These rates vary enormously by
    // equipment, technician experience, and site conditions — treat
    // them as a starting point and adjust to match your real business.
    surfaceTypes: [
      { id: "concrete-paving", label: "Concrete / Paving", coverageRatePerHourM2: 40 },
      { id: "siding", label: "Vinyl / Aluminium Siding", coverageRatePerHourM2: 30 },
      { id: "roof", label: "Roof Tiles / Shingles", coverageRatePerHourM2: 20 },
      { id: "decking", label: "Wood Decking", coverageRatePerHourM2: 25 },
      { id: "glass", label: "Glass / Windows", coverageRatePerHourM2: 15 },
      { id: "solar", label: "Solar Panels", coverageRatePerHourM2: 20 },
      { id: "masonry", label: "Brick / Masonry", coverageRatePerHourM2: 20 },
      { id: "other", label: "Other / Not Listed", coverageRatePerHourM2: null }
    ],

    conditionLevels: [
      { id: "light", label: "Light — routine maintenance clean", timeMultiplier: 0 },
      { id: "moderate", label: "Moderate — visible dirt or grime", timeMultiplier: 10 },
      { id: "heavy", label: "Heavy — algae, mould or heavy buildup", timeMultiplier: 25 },
      { id: "severe", label: "Severe — neglected for years / heavy staining", timeMultiplier: 45 }
    ],

    accessLevels: [
      { id: "ground", label: "Ground level — easy access", timeMultiplier: 0 },
      { id: "ladder", label: "Requires a ladder", timeMultiplier: 15 },
      { id: "multi-storey", label: "Multi-storey or scaffold/rope access needed", timeMultiplier: 30 },
      { id: "restricted", label: "Restricted or hard-to-reach area", timeMultiplier: 15 }
    ],

    features: {
      enablePricing: true,
      enableSaveProgress: true,
      enablePhotoPreview: true
    },

    whatsappMessageIntro: "Hello, I'd like a quote for an exterior cleaning project. Here is my Surface Cleaning Estimate Planner summary:",

    photoChecklist: [
      "Full area to be cleaned (wide shot)",
      "Close-up of soiling, staining or algae",
      "Access points (gates, ladders, restricted areas)",
      "Any fragile or delicate surfaces nearby",
      "Gutters or drainage (if relevant to your request)",
      "Plants, pets, or fixtures near the work area"
    ],

    privacyNote: "Measurements and project details you enter stay in your browser and are not sent anywhere unless you explicitly choose a contact action (WhatsApp, email, or Request Site Visit). Contact details are not saved automatically — saving your progress is optional and only happens if you turn it on."
  },

  legal: {
    businessLegalName: "EDIT: YOUR REGISTERED BUSINESS NAME",
    licenceStatement: "",
    insuranceStatement: "",
    disclaimerSummary: "Template demonstration only. Replace all clearly labelled editable examples with accurate, verifiable business information before deployment.",
    measurementDisclaimer: "Surface Cleaning Estimate Planner results are preliminary planning estimates only. Actual time and cost vary by surface condition, access, equipment, weather, and site conditions. This tool does not provide a binding quote, and a professional site assessment is typically required before a firm price can be given. Business owners must configure accurate local pricing and only publish business claims (licensing, insurance, certification, guarantees) that they can verify."
  }
};
