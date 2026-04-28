/**
 * Cape Town Ecosystem Generator
 * Generates all 50 premium websites locally
 * Run: node generate_sites.js
 */

const fs = require("fs");
const path = require("path");

const BASE = "/home/iedrees/Workspace/ct-lead-gen";
const CLIENTS = path.join(BASE, "clients");
const TEMPLATES = path.join(BASE, "templates");

const leads = [
  // ===== SOLAR (10) =====
  { slug:"glen-ellios-solar",           name:"Glen Ellios Pty LTD",              phone:"27691039281", location:"Goodwood",       industry:"Solar",       rating:5.0 },
  { slug:"sunlec-energy-solutions",     name:"Sunlec Energy Solutions",           phone:"27678799789", location:"Parow",           industry:"Solar",       rating:4.9 },
  { slug:"eco-direct-solar",            name:"Eco Direct Solar",                  phone:"27812136586", location:"Mitchells Plain",  industry:"Solar",       rating:5.0 },
  { slug:"solar-way-ct",                name:"Solar Way Cape Town",               phone:"27846664381", location:"Mitchells Plain",  industry:"Solar",       rating:4.1 },
  { slug:"green-star-solar",            name:"Green Star Solar",                  phone:"27765588679", location:"Mitchells Plain",  industry:"Solar",       rating:5.0 },
  { slug:"solar-dot-com-ct",            name:"Solar Dot Com",                     phone:"27213916620", location:"Mitchells Plain",  industry:"Solar",       rating:4.9 },
  { slug:"dhs-solar",                   name:"D.H.S Solar",                       phone:"27817277511", location:"Bishop Lavis",    industry:"Solar",       rating:5.0 },
  { slug:"rs-solar-installations",      name:"R and S Solar Installations",       phone:"27736612470", location:"Belhar",           industry:"Solar",       rating:5.0 },
  { slug:"ac-solar-solutions",          name:"A.C Solar Solutions",               phone:"27828565642", location:"Parow",            industry:"Solar",       rating:4.9 },
  { slug:"thomas-electrical-solar",     name:"Thomas Electrical",                 phone:"27847222456", location:"Wynberg",          industry:"Solar",       rating:5.0 },
  // ===== WELLNESS (20) =====
  { slug:"seapoint-skin-clinic",        name:"Sea Point Skin Clinic",             phone:"27721112200", location:"Sea Point",       industry:"Wellness",    rating:4.8 },
  { slug:"azalea-aesthetics-ct",        name:"Azalea Aesthetics",                 phone:"27832345678", location:"Claremont",       industry:"Wellness",    rating:4.9 },
  { slug:"vitality-wellness-claremont", name:"Vitality Wellness Claremont",       phone:"27718765432", location:"Claremont",       industry:"Wellness",    rating:4.7 },
  { slug:"camps-bay-aesthetics",        name:"Camps Bay Aesthetics",              phone:"27794567890", location:"Camps Bay",       industry:"Wellness",    rating:5.0 },
  { slug:"lumina-skin-studio",          name:"Lumina Skin Studio",                phone:"27612349876", location:"Kenilworth",      industry:"Wellness",    rating:4.8 },
  { slug:"renewal-med-spa",             name:"Renewal Medi-Spa",                  phone:"27825678901", location:"Bellville",       industry:"Wellness",    rating:4.6 },
  { slug:"glow-republic-ct",            name:"Glow Republic CT",                  phone:"27748901234", location:"Sea Point",       industry:"Wellness",    rating:4.9 },
  { slug:"serenity-body-lab",           name:"Serenity Body Lab",                 phone:"27660123456", location:"Wynberg",         industry:"Wellness",    rating:4.7 },
  { slug:"precision-laser-ct",          name:"Precision Laser Cape Town",         phone:"27839012345", location:"Durbanville",     industry:"Wellness",    rating:4.8 },
  { slug:"pure-aesthetics-tygervalley", name:"Pure Aesthetics Tygervalley",       phone:"27783456789", location:"Tygervalley",     industry:"Wellness",    rating:4.9 },
  { slug:"form-wellness-studio",        name:"Form Wellness Studio",              phone:"27618901234", location:"Observatory",     industry:"Wellness",    rating:4.7 },
  { slug:"aqua-beauty-studios",         name:"Aqua Beauty Studios",               phone:"27681234567", location:"Tableview",       industry:"Wellness",    rating:4.8 },
  { slug:"meridian-clinic-ct",          name:"Meridian Clinic CT",                phone:"27722345678", location:"Parow",           industry:"Wellness",    rating:4.6 },
  { slug:"bodysculpt-cape-town",        name:"BodySculpt Cape Town",              phone:"27845678901", location:"Century City",    industry:"Wellness",    rating:5.0 },
  { slug:"arc-wellness-seapoint",       name:"Arc Wellness Sea Point",            phone:"27766789012", location:"Sea Point",       industry:"Wellness",    rating:4.8 },
  { slug:"revive-medispa-claremont",    name:"Revive Medi-Spa Claremont",         phone:"27617890123", location:"Claremont",       industry:"Wellness",    rating:4.9 },
  { slug:"alpine-aesthetics-ct",        name:"Alpine Aesthetics CT",              phone:"27838901234", location:"Hout Bay",        industry:"Wellness",    rating:4.7 },
  { slug:"zen-skin-studio-bv",          name:"Zen Skin Studio Bellville",         phone:"27749012345", location:"Bellville",       industry:"Wellness",    rating:4.8 },
  { slug:"nova-cosmetic-clinic",        name:"Nova Cosmetic Clinic",              phone:"27680123456", location:"Durbanville",     industry:"Wellness",    rating:4.9 },
  { slug:"elite-wellness-ct",           name:"Elite Wellness CT",                 phone:"27721234567", location:"Milnerton",       industry:"Wellness",    rating:4.7 },
  // ===== MAINTENANCE (20) =====
  { slug:"cape-clean-pro",              name:"Cape Clean Pro",                    phone:"27832345678", location:"Goodwood",        industry:"Maintenance", rating:4.8, svc:"clean"    },
  { slug:"northern-subs-plumbing",      name:"Northern Suburbs Plumbing",         phone:"27763456789", location:"Durbanville",     industry:"Maintenance", rating:4.9, svc:"plumbing" },
  { slug:"westlake-pest-control",       name:"Westlake Pest Control",             phone:"27824567890", location:"Westlake",        industry:"Maintenance", rating:4.7, svc:"pest"     },
  { slug:"paarden-eiland-electric",     name:"Paarden Eiland Electrical",         phone:"27615678901", location:"Paarden Eiland",  industry:"Maintenance", rating:5.0, svc:"electrical"},
  { slug:"ct-roofing-specialists",      name:"CT Roofing Specialists",            phone:"27746789012", location:"Kuils River",     industry:"Maintenance", rating:4.8, svc:"roofing"  },
  { slug:"metro-aircon-ct",             name:"Metro Aircon Cape Town",            phone:"27687890123", location:"Bellville",       industry:"Maintenance", rating:4.6, svc:"aircon"   },
  { slug:"southern-suburbs-builders",   name:"Southern Suburbs Builders",         phone:"27728901234", location:"Kenilworth",      industry:"Maintenance", rating:4.9, svc:"construction"},
  { slug:"hydro-clean-ct",              name:"Hydro Clean CT",                    phone:"27839012345", location:"Brackenfell",     industry:"Maintenance", rating:4.7, svc:"clean"    },
  { slug:"cape-handyman-services",      name:"Cape Handyman Services",            phone:"27760123456", location:"Parow",           industry:"Maintenance", rating:4.8, svc:"handyman" },
  { slug:"greenpest-ct",                name:"GreenPest CT",                      phone:"27821234567", location:"Durbanville",     industry:"Maintenance", rating:4.9, svc:"pest"     },
  { slug:"acme-plumbing-claremont",     name:"Acme Plumbing Claremont",           phone:"27612345678", location:"Claremont",       industry:"Maintenance", rating:4.7, svc:"plumbing" },
  { slug:"all-seasons-aircon",          name:"All Seasons Aircon CT",             phone:"27743456789", location:"Tygervalley",     industry:"Maintenance", rating:4.8, svc:"aircon"   },
  { slug:"cape-waterproofing-co",       name:"Cape Waterproofing Co",             phone:"27684567890", location:"Wetton",          industry:"Maintenance", rating:4.6, svc:"roofing"  },
  { slug:"rapid-response-electric",     name:"Rapid Response Electrical",         phone:"27725678901", location:"Durbanville",     industry:"Maintenance", rating:5.0, svc:"electrical"},
  { slug:"tableview-tiling-ct",         name:"Tableview Tiling CT",               phone:"27836789012", location:"Tableview",       industry:"Maintenance", rating:4.7, svc:"tiling"   },
  { slug:"eco-clean-northern-subs",     name:"Eco Clean Northern Suburbs",        phone:"27767890123", location:"Kuilsriver",      industry:"Maintenance", rating:4.8, svc:"clean"    },
  { slug:"ct-pool-care",                name:"CT Pool Care",                      phone:"27828901234", location:"Constantia",      industry:"Maintenance", rating:4.9, svc:"pool"     },
  { slug:"summit-painting-ct",          name:"Summit Painting CT",                phone:"27619012345", location:"Pinelands",       industry:"Maintenance", rating:4.7, svc:"painting" },
  { slug:"window-wizards-ct",           name:"Window Wizards CT",                 phone:"27740123456", location:"Blouberg",        industry:"Maintenance", rating:4.8, svc:"window"   },
  { slug:"first-choice-construction",   name:"First Choice Construction",         phone:"27681234567", location:"Bellville",       industry:"Maintenance", rating:4.9, svc:"construction"}
];

const vectorBlueprints = [
  { id: 1, industry: "Vector", category: "Service", name: "FitnessPro", location: "Fitness & Biometrics", rating: "VETTED", liveUrl: "https://iederees-create.github.io/vector-fitness-pro/", description: "Elite athlete management & biometric tracking ecosystem." },
  { id: 2, industry: "Vector", category: "Service", name: "PropMaster", location: "Real Estate & Logistics", rating: "VETTED", liveUrl: "https://iederees-create.github.io/vector-prop-master/", description: "Autonomous building logistics & premium property management." },
  { id: 3, industry: "Vector", category: "SaaS", name: "ConsultFlow", location: "Business & Strategy", rating: "VETTED", liveUrl: "https://iederees-create.github.io/vector-consult-flow/", description: "High-level strategic mission control for consultancy firms." },
  { id: 4, industry: "Vector", category: "SaaS", name: "OmniShield", location: "Cybersecurity & IT", rating: "VETTED", liveUrl: "https://iederees-create.github.io/vector-omni-shield/", description: "Enterprise-grade perimeter security & infrastructure management." },
  { id: 5, industry: "Vector", category: "Service", name: "LifeScale", location: "Longevity & Wellness", rating: "VETTED", liveUrl: "https://iederees-create.github.io/vector-lifescale/", description: "Longevity research and laboratory optimization dashboard." },
  { id: 6, industry: "Vector", category: "SaaS", name: "LegalVault", location: "Legal & Compliance", rating: "VETTED", liveUrl: "https://iederees-create.github.io/vector-legal-vault/", description: "Global discovery governance and legal asset archival." },
  { id: 7, industry: "Vector", category: "SaaS", name: "AssetAnchor", location: "Wealth & Finance", rating: "VETTED", liveUrl: "https://iederees-create.github.io/vector-asset-anchor/", description: "Capital strategy & stealth wealth management platform." },
  { id: 8, industry: "Vector", category: "SaaS", name: "SignalGrid", location: "Telecom & Comms", rating: "VETTED", liveUrl: "https://iederees-create.github.io/vector-signal-grid/", description: "Encrypted network hardening and secure communication grid." },
  { id: 9, industry: "Vector", category: "Service", name: "JetStream", location: "Aviation & Logistics", rating: "VETTED", liveUrl: "https://iederees-create.github.io/vector-jet-stream/", description: "Tactical aviation logistics and flight plan coordination." },
  { id: 10, industry: "Vector", category: "Service", name: "TerraForm", location: "Property Development", rating: "VETTED", liveUrl: "https://iederees-create.github.io/vector-terra-form/", description: "Strategic land acquisition and property development OS." },
  { id: 11, industry: "Vector", category: "SaaS", name: "DeepState", location: "Data & Archival", rating: "VETTED", liveUrl: "https://iederees-create.github.io/vector-deep-state/", description: "Sovereignty ledger and secure DNA/Data archival system." },
  { id: 12, industry: "Vector", category: "SaaS", name: "CognitiveOps", location: "HR Tech & Psychology", rating: "VETTED", liveUrl: "https://iederees-create.github.io/vector-cognitive-ops/", description: "Cognitive alpha tracking and social-drift analytics." }
];

const SVC_MAP = {
  clean:        { icon:"Cleaning",   label:"Specialized Cleaning",   services:["Deep Cleaning","Post-construction Cleaning","Carpet Cleaning","Industrial Cleaning","Office Cleaning","Commercial Cleaning"] },
  plumbing:     { icon:"Plumbing",   label:"Plumbing Services",      services:["Emergency Plumbing","Leak Detection","Drain Clearing","Geyser Installs","Pipe Repair","Bathroom Renovations"] },
  pest:         { icon:"Pest",       label:"Pest Control",           services:["Termite Treatment","Rodent Control","Fumigation","Prevention Plans","Bed Bug Treatment","Cockroach Control"] },
  electrical:   { icon:"Electrical", label:"Electrical Services",    services:["DB Upgrades","Fault Finding","New Installations","COC Certificates","Outdoor Lighting","Pre-sale Inspections"] },
  roofing:      { icon:"Roofing",    label:"Roofing Specialists",    services:["Roof Repairs","Leak Sealing","Gutter Installation","Full Re-roofing","Flat Roofing","IBR and Corrugated"] },
  aircon:       { icon:"Aircon",     label:"Air Conditioning",       services:["Supply and Install","Annual Servicing","Gas Refills","Emergency Repairs","Ducted Systems","Cassette Units"] },
  construction: { icon:"Building",   label:"Construction",           services:["Home Renovations","Room Extensions","New Builds","Project Management","Driveway Paving","Boundary Walls"] },
  handyman:     { icon:"Handyman",   label:"Handyman Services",      services:["Odd Jobs","Furniture Assembly","Minor Repairs","Home Maintenance","Door and Gate Repairs","Painting Touch-ups"] },
  tiling:       { icon:"Tiling",     label:"Tiling Specialists",     services:["Floor Tiling","Wall Tiling","Waterproofing","Grouting","Pool Surrounds","Feature Walls"] },
  pool:         { icon:"Pool",       label:"Pool Care",              services:["Weekly Maintenance","Chemical Balancing","Equipment Repair","Pool Renovations","Green Pool Recovery","Filter Service"] },
  painting:     { icon:"Painting",   label:"Painting Services",      services:["Interior Painting","Exterior Coating","Waterproofing","Texture Finishes","Damp Treatment","Garage Floors"] },
  window:       { icon:"Windows",    label:"Window Services",        services:["Window Cleaning","Frame Repairs","Seal Replacements","New Installations","Sliding Doors","Security Burglar Bars"] }
};

function wa(phone, name, location, type) {
  const msg = `Hi ${name}, I'm a local Cape Town web developer. I noticed you don't have a website — I've already built a premium one for you. Take a look! I also stay on as your dedicated web manager, included in the cost. Interested?`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}

function solarHTML(l) {
  const waLink = wa(l.phone, l.name, l.location, "solar");
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${l.name} | Solar Solutions ${l.location} Cape Town</title>
<meta name="description" content="${l.name} — Premium solar installations in ${l.location}, Cape Town. ${l.rating}-star rated. Get a free quote today.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head>
<body>
<div class="glow-bg"></div>
<header class="glass-nav">
  <div class="container">
    <div class="logo"><span class="logo-accent">//</span> ${l.name}</div>
    <nav>
      <a href="#services">Services</a>
      <a href="#about">About</a>
      <a href="${waLink}" class="btn-primary">Get Quote</a>
    </nav>
  </div>
</header>
<main>
  <section class="hero">
    <div class="container">
      <div class="badge">Cape Town Solar Ecosystem &middot; ${l.location} &middot; ${l.rating} Stars</div>
      <h1>Renewable Energy <span class="text-gradient">Redefined.</span></h1>
      <p class="subtitle">Premium solar installations for ${l.location} and greater Cape Town. Always-on power &mdash; even during loadshedding.</p>
      <div class="hero-actions">
        <a href="${waLink}" class="btn-hero">Contact via WhatsApp</a>
        <a href="#services" class="btn-secondary">Explore Solutions</a>
      </div>
    </div>
  </section>
  <section id="services" class="features">
    <div class="container">
      <div class="features-header">
        <h2>Our <span class="text-gradient">Solar Services</span></h2>
        <p>End-to-end renewable energy solutions tailored for ${l.location}.</p>
      </div>
      <div class="grid-3">
        <div class="glass-card"><div class="icon-label">Grid Independence</div><h3>Grid Independence</h3><p>Custom lithium battery storage for 24/7 reliability during loadshedding.</p></div>
        <div class="glass-card"><div class="icon-label">High-Yield Solar</div><h3>High-Yield Solar PV</h3><p>Tier-1 panels optimized for the Western Cape solar irradiation profile.</p></div>
        <div class="glass-card"><div class="icon-label">COC Certified</div><h3>COC-Certified Installs</h3><p>Fully compliant installations with ongoing ecosystem maintenance.</p></div>
        <div class="glass-card"><div class="icon-label">Battery Systems</div><h3>Battery Backup Systems</h3><p>Keep your family or business powered through any outage.</p></div>
        <div class="glass-card"><div class="icon-label">Energy Monitor</div><h3>Energy Monitoring</h3><p>Real-time dashboards so you always know your system performance.</p></div>
        <div class="glass-card"><div class="icon-label">ROI Guarantee</div><h3>ROI Guarantee</h3><p>Most installs pay for themselves within 4-6 years. We show you the numbers.</p></div>
      </div>
    </div>
  </section>
</main>
<footer>
  <div class="container flex-row">
    <p>&copy; 2026 ${l.name}. ${l.location}, Cape Town, ZA.</p>
    <p>Website Managed by <span class="managed-accent">iederees-create</span></p>
  </div>
</footer>
<a href="https://wa.me/${l.phone}" class="wa-float" target="_blank">
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp">
</a>
</body></html>`;
}

function wellnessHTML(l) {
  const waLink = wa(l.phone, l.name, l.location, "wellness");
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${l.name} | Aesthetic Clinic ${l.location} Cape Town</title>
<meta name="description" content="${l.name} — Premium aesthetic and wellness treatments in ${l.location}, Cape Town. ${l.rating}-star rated. Book your consultation today.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head>
<body>
<div class="glow-bg"></div>
<div class="glow-bg-2"></div>
<header class="glass-nav">
  <div class="container">
    <div class="logo"><span class="logo-accent">&#10022;</span> ${l.name}</div>
    <nav>
      <a href="#services">Treatments</a>
      <a href="#about">About</a>
      <a href="${waLink}" class="btn-primary">Book Now</a>
    </nav>
  </div>
</header>
<main>
  <section class="hero">
    <div class="container">
      <div class="badge">Premium Wellness &middot; ${l.location} &middot; ${l.rating} Stars</div>
      <h1>Where Science Meets <span class="text-gradient">Beauty.</span></h1>
      <p class="subtitle">Advanced aesthetic and wellness treatments delivered by certified professionals in the heart of ${l.location}.</p>
      <div class="hero-actions">
        <a href="${waLink}" class="btn-hero">Book a Consultation</a>
        <a href="#services" class="btn-secondary">View Treatments</a>
      </div>
    </div>
  </section>
  <div class="stats-bar">
    <div class="container">
      <div class="stats-grid">
        <div class="stat-item"><h3>500+</h3><p>Satisfied Clients</p></div>
        <div class="stat-item"><h3>${l.rating}</h3><p>Google Rating</p></div>
        <div class="stat-item"><h3>5+</h3><p>Years in Practice</p></div>
        <div class="stat-item"><h3>100%</h3><p>Certified Treatments</p></div>
      </div>
    </div>
  </div>
  <section id="services" class="features">
    <div class="container">
      <div class="features-header">
        <h2>Our <span class="text-gradient">Treatments</span></h2>
        <p>Science-backed aesthetic solutions tailored to your unique needs.</p>
      </div>
      <div class="grid-3">
        <div class="glass-card"><h3>Dermal Fillers</h3><p>Restore volume and sculpt facial contours with precision.</p></div>
        <div class="glass-card"><h3>Skin Rejuvenation</h3><p>IPL, chemical peels, and microneedling for radiant skin.</p></div>
        <div class="glass-card"><h3>Bio-Remodelling</h3><p>Next-generation collagen stimulation for lasting results.</p></div>
        <div class="glass-card"><h3>Holistic Wellness</h3><p>IV drips, nutritional coaching, and full-body wellness plans.</p></div>
        <div class="glass-card"><h3>Laser Therapy</h3><p>Medical-grade laser for hair removal, pigmentation, and more.</p></div>
        <div class="glass-card"><h3>Bespoke Facials</h3><p>Customized facials targeting your specific skin concerns.</p></div>
      </div>
    </div>
  </section>
  <section class="testimonials">
    <div class="container">
      <div class="testimonials-header"><h2>Client <span class="text-gradient">Stories</span></h2></div>
      <div class="grid-2">
        <div class="testimonial-card"><div class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div><p>"Absolutely transformed my skin. The team at ${l.name} are world class."</p><span class="reviewer">&mdash; S. van der Berg, ${l.location}</span></div>
        <div class="testimonial-card"><div class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div><p>"Professional, warm, and results-driven. My go-to clinic in Cape Town."</p><span class="reviewer">&mdash; M. Peters, Cape Town</span></div>
      </div>
    </div>
  </section>
</main>
<footer>
  <div class="container flex-row">
    <p>&copy; 2026 ${l.name}. ${l.location}, Cape Town, ZA.</p>
    <p>Website Managed by <span class="managed-accent">iederees-create</span></p>
  </div>
</footer>
<a href="https://wa.me/${l.phone}" class="wa-float" target="_blank">
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp">
</a>
</body></html>`;
}

function maintenanceHTML(l) {
  const svc = SVC_MAP[l.svc] || SVC_MAP["handyman"];
  const waLink = wa(l.phone, l.name, l.location, "maintenance");
  const cards = svc.services.map(s => `<div class="glass-card"><h3>${s}</h3><p>Professional ${s.toLowerCase()} for residential and commercial clients in ${l.location}.</p></div>`).join("\n        ");
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${l.name} | ${svc.label} ${l.location} Cape Town</title>
<meta name="description" content="${l.name} — Reliable ${svc.label.toLowerCase()} in ${l.location}, Cape Town. ${l.rating}-star rated. Free quotes available.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head>
<body>
<div class="glow-bg"></div>
<header class="glass-nav">
  <div class="container">
    <div class="logo"><span class="logo-accent">[${svc.icon}]</span> ${l.name}</div>
    <nav>
      <a href="#services">Services</a>
      <a href="#about">About</a>
      <a href="${waLink}" class="btn-primary">Free Quote</a>
    </nav>
  </div>
</header>
<main>
  <section class="hero">
    <div class="container">
      <div class="hero-inner">
        <div>
          <div class="badge">${l.location} &middot; Cape Town &middot; ${l.rating} Stars</div>
          <h1>${l.location}&apos;s Trusted <span class="text-gradient">${svc.label} Experts.</span></h1>
          <p class="subtitle">Professional, reliable ${svc.label.toLowerCase()} in ${l.location} and surrounding areas. Fast response. Guaranteed workmanship.</p>
          <div class="hero-actions">
            <a href="${waLink}" class="btn-hero">WhatsApp for Quote</a>
            <a href="#services" class="btn-secondary">Our Services</a>
          </div>
        </div>
        <div class="hero-trust">
          <div class="trust-card"><div class="trust-icon">[Trophy]</div><div><h4>${l.rating}/5 Rating</h4><p>Consistently rated by Cape Town customers</p></div></div>
          <div class="trust-card"><div class="trust-icon">[Fast]</div><div><h4>Fast Response</h4><p>Same-day service available in ${l.location}</p></div></div>
          <div class="trust-card"><div class="trust-icon">[Shield]</div><div><h4>Fully Insured</h4><p>All work guaranteed and fully covered</p></div></div>
        </div>
      </div>
    </div>
  </section>
  <section id="services" class="features">
    <div class="container">
      <div class="features-header">
        <h2><span class="text-gradient">${svc.label}</span> in ${l.location}</h2>
        <p>Everything you need, handled by certified professionals.</p>
      </div>
      <div class="grid-3">
        ${cards}
      </div>
    </div>
  </section>
  <div class="stats-bar">
    <div class="container">
      <div class="stats-grid">
        <div class="stat-item"><h3>200+</h3><p>Jobs Completed</p></div>
        <div class="stat-item"><h3>${l.rating}</h3><p>Average Rating</p></div>
        <div class="stat-item"><h3>24hr</h3><p>Response Time</p></div>
        <div class="stat-item"><h3>100%</h3><p>Satisfaction Rate</p></div>
      </div>
    </div>
  </div>
</main>
<footer>
  <div class="container flex-row">
    <p>&copy; 2026 ${l.name}. ${l.location}, Cape Town, ZA.</p>
    <p>Website Managed by <span class="managed-accent">iederees-create</span></p>
  </div>
</footer>
<a href="https://wa.me/${l.phone}" class="wa-float" target="_blank">
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp">
</a>
</body></html>`;
}

const templateCSS = {
  Solar:       fs.readFileSync(path.join(TEMPLATES,"solar-premium-v1","style.css"),"utf8"),
  Wellness:    fs.readFileSync(path.join(TEMPLATES,"wellness-premium-v1","style.css"),"utf8"),
  Maintenance: fs.readFileSync(path.join(TEMPLATES,"maintenance-premium-v1","style.css"),"utf8")
};

const rows = ["Number,Industry,Business Name,Location,Rating,Repo Name,Website URL,WhatsApp Pitch Link,Email Subject,Email Body"];
const commandCenterLeads = [];

const GROK_KEY = (fs.existsSync("GROK_TOKEN.txt") ? fs.readFileSync("GROK_TOKEN.txt", "utf8").trim() : "");

async function getUniqueCSS(clientName, industry, baseCSS) {
  try {
    const prompt = `You are following the Dynamic Brand Adaptation blueprint. The client is "${clientName}" in the "${industry}" sector.
Rewrite the following base CSS to make it unique to their brand vibe. Change the CSS variables in the :root (colors, accents), modify the font-family strings (use modern Google Fonts like Inter, Outfit, Space Grotesk, Playfair, etc.), and adjust border-radiuses or backgrounds slightly. Do NOT change class names or structural CSS logic.
IMPORTANT: Return ONLY the raw CSS code. No markdown formatting, no backticks, no explanations. Just the raw CSS string.

BASE CSS:
${baseCSS}`;

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROK_KEY}`
      },
      body: JSON.stringify({
        model: "grok-4.20-reasoning",
        messages: [{ role: "user", content: prompt }]
      })
    });
    const data = await res.json();
    if (data.choices && data.choices[0].message) {
      let finalCSS = data.choices[0].message.content.trim();
      finalCSS = finalCSS.replace(/^```css/i, "").replace(/```$/i, "").trim();
      return finalCSS;
    }
  } catch(e) {
    console.error("Grok API failed for " + clientName + ", falling back to template.");
  }
  return baseCSS;
}

(async function main() {
  for (let i = 0; i < leads.length; i++) {
    const l = leads[i];
    
    // Synthesize an email if not explicitly provided
    const synthesizedEmail = l.email || `info@${l.slug}.co.za`;
  const dir = path.join(CLIENTS, l.slug);
  fs.mkdirSync(dir, { recursive: true });

  const html = l.industry === "Solar" ? solarHTML(l)
             : l.industry === "Wellness" ? wellnessHTML(l)
             : maintenanceHTML(l);

    const repoName = `${l.slug}-ct`;
    const liveUrl  = `https://iederees-create.github.io/${repoName}/`;
    const waMsg    = encodeURIComponent(`Hi ${l.name}, I'm a local Cape Town web developer. I've built a premium website for you: ${liveUrl} — I also stay on as your dedicated web manager. Interested?`);
    const waPitch  = `https://wa.me/${l.phone}?text=${waMsg}`;
    const emailSubj = `Premium Website Ready for ${l.name}`;
    const emailBody = `Hi there,\n\nI'm a web developer based in Cape Town. I built a premium, mobile-first demo for ${l.name}:\n\n${liveUrl}\n\nFeatures:\n- Mobile-optimised design\n- WhatsApp integration\n- SEO optimised for ${l.location}\n- Hosted on GitHub global infrastructure\n\nI offer ongoing management included in the package.\n\nWould you like to take it live?\n\nBest,\n[Your Name] - iederees-create`;

    // Process AI styling for uniqueness
    const baseCSS = templateCSS[l.industry];
    const uniqueCSS = await getUniqueCSS(l.name, l.industry, baseCSS);

    fs.writeFileSync(path.join(dir, "index.html"), html, "utf8");
    fs.writeFileSync(path.join(dir, "style.css"), uniqueCSS, "utf8");

    const csvLine = [i+1, l.industry, `"${l.name}"`, l.location, l.rating, repoName, liveUrl, `"${waPitch}"`, `"${emailSubj}"`, `"${emailBody.replace(/\n/g," | ")}"`].join(",");
    rows.push(csvLine);

    commandCenterLeads.push({
      id: i + 1,
      industry: l.industry,
      name: l.name,
      location: l.location,
      rating: l.rating.toFixed(1),
      liveUrl: liveUrl,
      waLink: waPitch,
      email: synthesizedEmail,
      emailSubj,
      emailBody
    });

    console.log(`[${String(i+1).padStart(2,"0")}/50] Built uniqueness for: ${l.name} (${l.industry})`);
  }

  const csvPath = path.join(BASE, "leads", "CT_50_Outreach_Command_Center.csv");
  fs.writeFileSync(csvPath, rows.join("\n"), "utf8");
  console.log(`\n✅ All 50 sites generated locally with AI styles.`);
  console.log(`📊 Outreach sheet: ${csvPath}`);

  // Sync Agency OS dashboard
  const ccPath = path.join(BASE, "index.html");
  if (fs.existsSync(ccPath)) {
    let ccContent = fs.readFileSync(ccPath, "utf8");
    
    const leadsJson = JSON.stringify(commandCenterLeads, null, 4);
    const vectorJson = JSON.stringify(vectorBlueprints, null, 4);
    
    ccContent = ccContent.replace(
      /\/\/ DATA_INJECTION_START[\s\S]*?\/\/ DATA_INJECTION_END/,
      `// DATA_INJECTION_START\n        const leadsData = ${leadsJson};\n        // DATA_INJECTION_END`
    );
    
    ccContent = ccContent.replace(
      /\/\/ VECTOR_INJECTION_START[\s\S]*?\/\/ VECTOR_INJECTION_END/,
      `// VECTOR_INJECTION_START\n        const vectorData = ${vectorJson};\n        // VECTOR_INJECTION_END`
    );
    
    fs.writeFileSync(ccPath, ccContent, "utf8");
    console.log(`✅ Command Center synced with latest data.`);
  }

  console.log(`\nNext: run deploy.ps1 to push all repos to GitHub Pages.`);
})();
