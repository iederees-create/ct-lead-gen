/**
 * WESTLAKE PEST CONTROL — SITE CONFIGURATION
 * ============================================================
 * Edit the values below to rebrand this template for a real business.
 * You should NOT need to touch index.html, style.css or app.js for
 * ordinary business changes (name, contact details, services, prices,
 * testimonials, FAQs, colours, etc).
 *
 * IMPORTANT: All contact details, ratings, stats, testimonials, and
 * licence/insurance statements below are FICTIONAL SAMPLE CONTENT for
 * demonstration purposes only. Replace every field with your real,
 * verifiable business information before publishing this site.
 * ============================================================
 */
window.SITE_CONFIG = {

  // ---- ACTIVE THEME -------------------------------------------------
  // Choose one of: "amber-shield", "green-guard", "red-response"
  activeTheme: "amber-shield",

  themes: {
    "amber-shield": {
      label: "Amber Shield",
      bg: "#12161c",
      bgAlt: "#181d25",
      surface: "#1d232c",
      border: "rgba(255,255,255,0.08)",
      textPrimary: "#f3f1ec",
      textSecondary: "#a9b0ba",
      accent: "#f5a623",
      accent2: "#ff7a1a",
      accentContrast: "#12161c",
      safety: "#ff5a1f"
    },
    "green-guard": {
      label: "Green Guard",
      bg: "#101613",
      bgAlt: "#161d19",
      surface: "#1b241f",
      border: "rgba(255,255,255,0.08)",
      textPrimary: "#f1f3ef",
      textSecondary: "#a7b3ac",
      accent: "#3fae5c",
      accent2: "#8bc34a",
      accentContrast: "#0c1210",
      safety: "#ff8a3d"
    },
    "red-response": {
      label: "Red Response",
      bg: "#15100f",
      bgAlt: "#1c1513",
      surface: "#231a17",
      border: "rgba(255,255,255,0.08)",
      textPrimary: "#f5efec",
      textSecondary: "#b6a9a2",
      accent: "#e0432c",
      accent2: "#ff7043",
      accentContrast: "#15100f",
      safety: "#f5a623"
    }
  },

  // ---- BUSINESS IDENTITY (SAMPLE / DEMO DATA) ------------------------
  business: {
    name: "Westlake Pest Control",
    logoText: "Westlake Pest Control",
    tagline: "Straightforward pest control for homes and businesses.",
    foundedYear: "2015 (sample)",
    description: "Westlake Pest Control is a fictional demonstration business created to showcase this website template. Replace this description with your real company profile."
  },

  // ---- CONTACT (SAMPLE / DEMO DATA — REPLACE BEFORE USE) -------------
  contact: {
    phoneDisplay: "(555) 010-0142",
    phoneDial: "+15550100142",
    whatsappDisplay: "(555) 010-0199",
    whatsappNumber: "15550100199",
    email: "hello@example.com",
    addressLine1: "123 Example Avenue",
    addressLine2: "Westlake, ST 00000",
    mapEmbedUrl: "https://www.google.com/maps?q=Westlake&output=embed",
    quoteUrl: "#quote"
  },

  emergency: {
    enabled: true,
    label: "24/7 Emergency Callout Line (sample placeholder)",
    note: "Demo placeholder — configure real emergency availability and hours before publishing."
  },

  hours: [
    { day: "Monday – Friday", time: "7:00 AM – 6:00 PM" },
    { day: "Saturday", time: "8:00 AM – 2:00 PM" },
    { day: "Sunday", time: "Closed (emergency line only)" }
  ],

  social: {
    facebook: "#",
    instagram: "#",
    x: "#",
    linkedin: "#",
    youtube: "#"
  },

  serviceAreas: [
    "Westlake", "Riverside District", "Oak Hill", "Maple Grove",
    "Harbor Point", "Cedar Ridge", "North Fairview", "Downtown Metro"
  ],

  // ---- STATISTICS (CLEARLY LABELLED SAMPLE PLACEHOLDERS) -------------
  // These numbers are fictional examples only. Do not publish unverifiable
  // statistics — replace with your real, evidence-backed figures or remove.
  stats: [
    { value: "[X]+", label: "Sample stat — years serving the area (edit or remove)" },
    { value: "[X]+", label: "Sample stat — properties treated (edit or remove)" },
    { value: "[X]", label: "Sample stat — average response time (edit or remove)" },
    { value: "[X]", label: "Sample stat — technicians on staff (edit or remove)" }
  ],

  // ---- SERVICES -------------------------------------------------------
  services: [
    {
      id: "residential",
      icon: "🏠",
      name: "Residential Pest Control",
      summary: "Ongoing pest protection plans built around your home.",
      details: "General pest management for houses and apartments, covering common household pests with scheduled or one-time visits. Replace with your actual residential service scope, methods and treatment frequency.",
      startingPrice: "From $99 (sample placeholder price)"
    },
    {
      id: "commercial",
      icon: "🏢",
      name: "Commercial Pest Control",
      summary: "Pest management programs for offices, retail and warehouses.",
      details: "Scheduled commercial pest programs designed to support food-safety and facility-hygiene requirements. Replace with your real compliance documentation and service-level details.",
      startingPrice: "Custom quote (sample placeholder)"
    },
    {
      id: "termite",
      icon: "🐛",
      name: "Termite Treatment",
      summary: "Inspection and treatment programs for termite activity.",
      details: "Termite inspection and treatment services. Replace with your real inspection process, treatment products used, and any warranty terms you actually offer.",
      startingPrice: "From $249 (sample placeholder price)"
    },
    {
      id: "rodent",
      icon: "🐭",
      name: "Rodent Control",
      summary: "Trapping, exclusion and prevention for rats and mice.",
      details: "Rodent inspection, trapping and exclusion work. Replace with details of the specific methods, bait station types, and follow-up visits you provide.",
      startingPrice: "From $129 (sample placeholder price)"
    },
    {
      id: "cockroach-ant",
      icon: "🐜",
      name: "Cockroach & Ant Control",
      summary: "Targeted treatment for cockroach and ant infestations.",
      details: "Treatment programs for cockroach and ant activity in homes and commercial kitchens. Replace with your real product and treatment information.",
      startingPrice: "From $89 (sample placeholder price)"
    },
    {
      id: "bed-bug",
      icon: "🛏️",
      name: "Bed Bug Treatment",
      summary: "Inspection and treatment for bed bug infestations.",
      details: "Bed bug inspection and treatment services. Replace with your real treatment method (heat, chemical, or combined) and preparation instructions.",
      startingPrice: "From $199 (sample placeholder price)"
    },
    {
      id: "fumigation",
      icon: "☁️",
      name: "Fumigation",
      summary: "Whole-structure fumigation for severe infestations.",
      details: "Fumigation services for severe or widespread infestations. Replace with your licensing details, chemicals used, and safety/evacuation procedures.",
      startingPrice: "Custom quote (sample placeholder)"
    },
    {
      id: "prevention",
      icon: "🛡️",
      name: "Prevention & Maintenance Plans",
      summary: "Recurring visits to help prevent future pest problems.",
      details: "Scheduled maintenance plans (quarterly, bi-monthly, or monthly) intended to reduce the likelihood of future infestations. Replace with your actual plan tiers and terms.",
      startingPrice: "From $39/month (sample placeholder price)"
    }
  ],

  pestsTreated: [
    "Ants", "Cockroaches", "Termites", "Rodents (rats & mice)", "Bed Bugs",
    "Spiders", "Wasps & Hornets", "Fleas & Ticks", "Silverfish", "Stored Product Pests"
  ],

  process: [
    { step: 1, title: "Request a Quote", text: "Submit the quote form, call, or message us on WhatsApp with details about your pest issue." },
    { step: 2, title: "Inspection", text: "A technician reviews the property (in person or by phone, depending on the issue) to identify the pest and scope of treatment." },
    { step: 3, title: "Treatment Plan", text: "You receive a written quote outlining the recommended treatment, products, and price before any work begins." },
    { step: 4, title: "Service Visit", text: "Treatment is carried out at the scheduled appointment time, with any necessary preparation instructions provided in advance." },
    { step: 5, title: "Follow-Up", text: "Follow-up visits are scheduled where needed, based on the treatment plan agreed with you." }
  ],

  team: [
    { name: "Sample Technician Name", role: "Lead Technician (sample placeholder)", bio: "Replace with your real technician's name, licence/certification numbers (if applicable), and experience summary." },
    { name: "Sample Technician Name", role: "Field Technician (sample placeholder)", bio: "Replace with your real technician's name, licence/certification numbers (if applicable), and experience summary." },
    { name: "Sample Office Contact", role: "Customer Service (sample placeholder)", bio: "Replace with your real staff information." }
  ],

  whyChooseUs: [
    { title: "Clear, Written Quotes (sample)", text: "Sample copy — describe your real quoting process." },
    { title: "Scheduled Follow-Ups (sample)", text: "Sample copy — describe your real follow-up policy." },
    { title: "Local Service Area Knowledge (sample)", text: "Sample copy — describe your real coverage area experience." },
    { title: "Straightforward Communication (sample)", text: "Sample copy — describe how you actually communicate with customers." }
  ],

  // ---- TESTIMONIALS (FICTIONAL DEMO CONTENT) --------------------------
  testimonials: [
    { quote: "This is a sample fictional testimonial included for template demonstration purposes only. Replace with a real, permission-cleared customer review.", name: "Sample Customer A", location: "Westlake (fictional)" },
    { quote: "This is a sample fictional testimonial included for template demonstration purposes only. Replace with a real, permission-cleared customer review.", name: "Sample Customer B", location: "Oak Hill (fictional)" },
    { quote: "This is a sample fictional testimonial included for template demonstration purposes only. Replace with a real, permission-cleared customer review.", name: "Sample Customer C", location: "Harbor Point (fictional)" }
  ],

  faqs: [
    { q: "Is Westlake Pest Control a real company?", a: "No. \"Westlake Pest Control\" is a fictional demonstration business used to showcase this website template. Replace all business details with your own before publishing." },
    { q: "How do I request a quote?", a: "Use the quote form on this page, call the listed phone number, or send a WhatsApp message using the WhatsApp button. All contact details shown are placeholders until you configure your own." },
    { q: "What pests do you treat?", a: "The demo lists common residential and commercial pests (ants, cockroaches, termites, rodents, bed bugs and more). Edit the pestsTreated and services lists in site-config.js to match what you actually treat." },
    { q: "Are your technicians licensed and insured?", a: "This is a placeholder question. Do not publish claims about licensing, certification or insurance unless you can verify them for your business, and check your local regulatory requirements." },
    { q: "Do you offer same-day service?", a: "This template does not claim same-day or emergency response by default beyond the sample emergency line placeholder. Only advertise response times you can reliably deliver." },
    { q: "How much does treatment cost?", a: "Sample starting prices are shown next to each service as placeholders. Replace them with your real, current pricing." },
    { q: "Do I need to leave my home during treatment?", a: "This depends on the treatment method and product used. Provide accurate, product-specific safety guidance for your real services here." },
    { q: "Are your treatments safe for children and pets?", a: "Do not claim treatments are child-safe, pet-safe, or environmentally safe unless you can support that claim with verified product documentation. Replace this answer with accurate safety information." },
    { q: "What areas do you service?", a: "See the Service Areas section on this page. Edit the serviceAreas list in site-config.js to reflect your real coverage." },
    { q: "How do I customise this template?", a: "Open site-config.js and edit the business, contact, services, pricing, testimonials, FAQ and theme values. See the buyer guide included with this template for full instructions." }
  ],

  legal: {
    businessLegalName: "Westlake Pest Control (fictional demo business)",
    licenceStatement: "Sample placeholder — insert your real pest control licence/registration number(s) here if applicable in your jurisdiction, or remove this line if not applicable.",
    insuranceStatement: "Sample placeholder — insert your real insurance details here only if verified and accurate, or remove this line.",
    disclaimerSummary: "All business information, contact details, statistics, ratings, testimonials and licensing statements on this demonstration site are fictional sample content and must be replaced with accurate, verifiable information before this site is used for a real business."
  }
};
