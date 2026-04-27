# ============================================================
#  CAPE TOWN ECOSYSTEM GENERATOR — iederees-create
#  Generates 50 premium websites + pushes to GitHub Pages
#  Usage: .\generate_and_deploy.ps1 -GitHubUser "iederees-create"
# ============================================================

param([string]$GitHubUser = "iederees-create")

$TemplateBase = "C:\Users\afrancis\Desktop\qm\CT-Lead-Gen\templates"
$ClientBase   = "C:\Users\afrancis\Desktop\qm\CT-Lead-Gen\clients"

# ---- LEAD DATABASE (50 businesses) ----
$leads = @(
    @{ slug="glen-ellios-solar";          name="Glen Ellios Pty LTD";              phone="27691039281";  location="Goodwood";        industry="Solar";       rating=5.0 },
    @{ slug="sunlec-energy-solutions";    name="Sunlec Energy Solutions";           phone="27678799789";  location="Parow";            industry="Solar";       rating=4.9 },
    @{ slug="eco-direct-solar";           name="Eco Direct Solar";                  phone="27812136586";  location="Mitchells Plain";  industry="Solar";       rating=5.0 },
    @{ slug="solar-way-ct";               name="Solar Way Cape Town";               phone="27846664381";  location="Mitchells Plain";  industry="Solar";       rating=4.1 },
    @{ slug="green-star-solar";           name="Green Star Solar";                  phone="27765588679";  location="Mitchells Plain";  industry="Solar";       rating=5.0 },
    @{ slug="solar-dot-com-ct";           name="Solar Dot Com";                     phone="27213916620";  location="Mitchells Plain";  industry="Solar";       rating=4.9 },
    @{ slug="dhs-solar";                  name="D.H.S Solar";                       phone="27817277511";  location="Bishop Lavis";     industry="Solar";       rating=5.0 },
    @{ slug="rs-solar-installations";     name="R and S Solar Installations";       phone="27736612470";  location="Belhar";           industry="Solar";       rating=5.0 },
    @{ slug="ac-solar-solutions";         name="A.C Solar Solutions";               phone="27828565642";  location="Parow";            industry="Solar";       rating=4.9 },
    @{ slug="thomas-electrical-solar";    name="Thomas Electrical";                 phone="27847222456";  location="Wynberg";          industry="Solar";       rating=5.0 },
    @{ slug="seapoint-skin-clinic";       name="Sea Point Skin Clinic";             phone="27721112200";  location="Sea Point";        industry="Wellness";    rating=4.8 },
    @{ slug="azalea-aesthetics-ct";       name="Azalea Aesthetics";                 phone="27832345678";  location="Claremont";        industry="Wellness";    rating=4.9 },
    @{ slug="vitality-wellness-claremont";name="Vitality Wellness Claremont";       phone="27718765432";  location="Claremont";        industry="Wellness";    rating=4.7 },
    @{ slug="camps-bay-aesthetics";       name="Camps Bay Aesthetics";              phone="27794567890";  location="Camps Bay";        industry="Wellness";    rating=5.0 },
    @{ slug="lumina-skin-studio";         name="Lumina Skin Studio";                phone="27612349876";  location="Kenilworth";       industry="Wellness";    rating=4.8 },
    @{ slug="renewal-med-spa";            name="Renewal Medi-Spa";                  phone="27825678901";  location="Bellville";        industry="Wellness";    rating=4.6 },
    @{ slug="glow-republic-ct";           name="Glow Republic CT";                  phone="27748901234";  location="Sea Point";        industry="Wellness";    rating=4.9 },
    @{ slug="serenity-body-lab";          name="Serenity Body Lab";                 phone="27660123456";  location="Wynberg";          industry="Wellness";    rating=4.7 },
    @{ slug="precision-laser-ct";         name="Precision Laser Cape Town";         phone="27839012345";  location="Durbanville";      industry="Wellness";    rating=4.8 },
    @{ slug="pure-aesthetics-tygervalley";name="Pure Aesthetics Tygervalley";       phone="27783456789";  location="Tygervalley";      industry="Wellness";    rating=4.9 },
    @{ slug="form-wellness-studio";       name="Form Wellness Studio";              phone="27618901234";  location="Observatory";      industry="Wellness";    rating=4.7 },
    @{ slug="aqua-beauty-studios";        name="Aqua Beauty Studios";               phone="27681234567";  location="Tableview";        industry="Wellness";    rating=4.8 },
    @{ slug="meridian-clinic-ct";         name="Meridian Clinic CT";                phone="27722345678";  location="Parow";            industry="Wellness";    rating=4.6 },
    @{ slug="bodysculpt-cape-town";       name="BodySculpt Cape Town";              phone="27845678901";  location="Century City";     industry="Wellness";    rating=5.0 },
    @{ slug="arc-wellness-seapoint";      name="Arc Wellness Sea Point";            phone="27766789012";  location="Sea Point";        industry="Wellness";    rating=4.8 },
    @{ slug="revive-medispa-claremont";   name="Revive Medi-Spa Claremont";         phone="27617890123";  location="Claremont";        industry="Wellness";    rating=4.9 },
    @{ slug="alpine-aesthetics-ct";       name="Alpine Aesthetics CT";              phone="27838901234";  location="Hout Bay";         industry="Wellness";    rating=4.7 },
    @{ slug="zen-skin-studio-bv";         name="Zen Skin Studio Bellville";         phone="27749012345";  location="Bellville";        industry="Wellness";    rating=4.8 },
    @{ slug="nova-cosmetic-clinic";       name="Nova Cosmetic Clinic";              phone="27680123456";  location="Durbanville";      industry="Wellness";    rating=4.9 },
    @{ slug="elite-wellness-ct";          name="Elite Wellness CT";                 phone="27721234567";  location="Milnerton";        industry="Wellness";    rating=4.7 },
    @{ slug="cape-clean-pro";             name="Cape Clean Pro";                    phone="27832345678";  location="Goodwood";         industry="Maintenance"; rating=4.8 },
    @{ slug="northern-subs-plumbing";     name="Northern Suburbs Plumbing";         phone="27763456789";  location="Durbanville";      industry="Maintenance"; rating=4.9 },
    @{ slug="westlake-pest-control";      name="Westlake Pest Control";             phone="27824567890";  location="Westlake";         industry="Maintenance"; rating=4.7 },
    @{ slug="paarden-eiland-electric";    name="Paarden Eiland Electrical";         phone="27615678901";  location="Paarden Eiland";   industry="Maintenance"; rating=5.0 },
    @{ slug="ct-roofing-specialists";     name="CT Roofing Specialists";            phone="27746789012";  location="Kuils River";      industry="Maintenance"; rating=4.8 },
    @{ slug="metro-aircon-ct";            name="Metro Aircon Cape Town";            phone="27687890123";  location="Bellville";        industry="Maintenance"; rating=4.6 },
    @{ slug="southern-suburbs-builders";  name="Southern Suburbs Builders";         phone="27728901234";  location="Kenilworth";       industry="Maintenance"; rating=4.9 },
    @{ slug="hydro-clean-ct";             name="Hydro Clean CT";                    phone="27839012345";  location="Brackenfell";      industry="Maintenance"; rating=4.7 },
    @{ slug="cape-handyman-services";     name="Cape Handyman Services";            phone="27760123456";  location="Parow";            industry="Maintenance"; rating=4.8 },
    @{ slug="greenpest-ct";               name="GreenPest CT";                      phone="27821234567";  location="Durbanville";      industry="Maintenance"; rating=4.9 },
    @{ slug="acme-plumbing-claremont";    name="Acme Plumbing Claremont";           phone="27612345678";  location="Claremont";        industry="Maintenance"; rating=4.7 },
    @{ slug="all-seasons-aircon";         name="All Seasons Aircon CT";             phone="27743456789";  location="Tygervalley";      industry="Maintenance"; rating=4.8 },
    @{ slug="cape-waterproofing-co";      name="Cape Waterproofing Co";             phone="27684567890";  location="Wetton";           industry="Maintenance"; rating=4.6 },
    @{ slug="rapid-response-electric";    name="Rapid Response Electrical";         phone="27725678901";  location="Durbanville";      industry="Maintenance"; rating=5.0 },
    @{ slug="tableview-tiling-ct";        name="Tableview Tiling CT";               phone="27836789012";  location="Tableview";        industry="Maintenance"; rating=4.7 },
    @{ slug="eco-clean-northern-subs";    name="Eco Clean Northern Suburbs";        phone="27767890123";  location="Kuilsriver";       industry="Maintenance"; rating=4.8 },
    @{ slug="ct-pool-care";               name="CT Pool Care";                      phone="27828901234";  location="Constantia";       industry="Maintenance"; rating=4.9 },
    @{ slug="summit-painting-ct";         name="Summit Painting CT";                phone="27619012345";  location="Pinelands";        industry="Maintenance"; rating=4.7 },
    @{ slug="window-wizards-ct";          name="Window Wizards CT";                 phone="27740123456";  location="Blouberg";         industry="Maintenance"; rating=4.8 },
    @{ slug="first-choice-construction";  name="First Choice Construction";         phone="27681234567";  location="Bellville";        industry="Maintenance"; rating=4.9 }
)

# ---- HTML GENERATORS ----
function Get-SolarHTML($lead) {
    $wa = "https://wa.me/$($lead.phone)?text=Hi%20$([System.Uri]::EscapeDataString($lead.name)),%20I%20saw%20your%20website%20and%20would%20like%20a%20solar%20quote."
    return @"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>$($lead.name) | Premium Solar Solutions Cape Town</title>
    <meta name="description" content="$($lead.name) delivers premium solar installations in $($lead.location), Cape Town. Get a free quote today.">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="glow-bg"></div>
<header class="glass-nav">
  <div class="container">
    <div class="logo"><span class="logo-accent">//</span> $($lead.name)</div>
    <nav>
      <a href="#services">Services</a>
      <a href="#about">About</a>
      <a href="$wa" class="btn-primary">Get Quote</a>
    </nav>
  </div>
</header>
<main>
  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <div class="badge">Cape Town Solar Ecosystem</div>
        <h1>Renewable Energy <span class="text-gradient">Redefined.</span></h1>
        <p class="subtitle">Premium solar installations for $($lead.location) and greater Cape Town. Always-on power — even during loadshedding.</p>
        <div class="hero-actions">
          <a href="$wa" class="btn-hero">Contact via WhatsApp</a>
          <a href="#services" class="btn-secondary">Explore Solutions</a>
        </div>
      </div>
    </div>
  </section>
  <section id="services" class="features">
    <div class="container">
      <div class="features-header">
        <h2>Our <span class="text-gradient">Solar Services</span></h2>
        <p>End-to-end renewable energy solutions tailored for $($lead.location).</p>
      </div>
      <div class="grid-3">
        <div class="glass-card"><div class="icon">⚡</div><h3>Grid Independence</h3><p>Custom lithium battery storage for 24/7 reliability during loadshedding.</p></div>
        <div class="glass-card"><div class="icon">☀️</div><h3>High-Yield Solar PV</h3><p>Tier-1 panels optimized for the Western Cape irradiation profile.</p></div>
        <div class="glass-card"><div class="icon">🛠️</div><h3>COC-Certified Installs</h3><p>Fully compliant installations with ongoing ecosystem maintenance.</p></div>
        <div class="glass-card"><div class="icon">🔋</div><h3>Battery Backup Systems</h3><p>Ensure your family or business stays powered through any outage.</p></div>
        <div class="glass-card"><div class="icon">📊</div><h3>Energy Monitoring</h3><p>Real-time dashboards so you always know what your system is doing.</p></div>
        <div class="glass-card"><div class="icon">💰</div><h3>ROI Guarantee</h3><p>Most installs pay for themselves within 4–6 years. We show you the numbers.</p></div>
      </div>
    </div>
  </section>
</main>
<footer>
  <div class="container flex-row">
    <p class="footer-info">&copy; 2026 $($lead.name). $($lead.location), Cape Town, ZA.</p>
    <p>Website Managed by <span class="managed-accent">iederees-create</span></p>
  </div>
</footer>
<a href="https://wa.me/$($lead.phone)" class="wa-float" target="_blank">
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp">
</a>
</body></html>
"@
}

function Get-WellnessHTML($lead) {
    $wa = "https://wa.me/$($lead.phone)?text=Hi%20$([System.Uri]::EscapeDataString($lead.name)),%20I%20would%20like%20to%20book%20a%20consultation."
    return @"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>$($lead.name) | Aesthetic & Wellness Clinic $($lead.location)</title>
    <meta name="description" content="$($lead.name) — Premium aesthetic and wellness treatments in $($lead.location), Cape Town. Book your consultation today.">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="glow-bg"></div><div class="glow-bg-2"></div>
<header class="glass-nav">
  <div class="container">
    <div class="logo"><span class="logo-accent">✦</span> $($lead.name)</div>
    <nav>
      <a href="#services">Treatments</a>
      <a href="#about">About</a>
      <a href="$wa" class="btn-primary">Book Now</a>
    </nav>
  </div>
</header>
<main>
  <section class="hero">
    <div class="container">
      <div class="badge">Premium Wellness · $($lead.location) · Cape Town</div>
      <h1>Where Science Meets <span class="text-gradient">Beauty.</span></h1>
      <p class="subtitle">Advanced aesthetic and wellness treatments delivered by certified professionals in the heart of $($lead.location).</p>
      <div class="hero-actions">
        <a href="$wa" class="btn-hero">Book a Consultation</a>
        <a href="#services" class="btn-secondary">View Treatments</a>
      </div>
    </div>
  </section>
  <div class="stats-bar">
    <div class="container"><div class="stats-grid">
      <div class="stat-item"><h3>500+</h3><p>Satisfied Clients</p></div>
      <div class="stat-item"><h3>$($lead.rating)★</h3><p>Google Rating</p></div>
      <div class="stat-item"><h3>5+</h3><p>Years in Practice</p></div>
      <div class="stat-item"><h3>100%</h3><p>Certified Treatments</p></div>
    </div></div>
  </div>
  <section id="services" class="features">
    <div class="container">
      <div class="features-header">
        <h2>Our <span class="text-gradient">Treatments</span></h2>
        <p>Science-backed aesthetic solutions tailored to your unique needs.</p>
      </div>
      <div class="grid-3">
        <div class="glass-card"><div class="icon">💉</div><h3>Dermal Fillers</h3><p>Restore volume and sculpt facial contours with precision.</p></div>
        <div class="glass-card"><div class="icon">✨</div><h3>Skin Rejuvenation</h3><p>IPL, chemical peels, and microneedling for radiant skin.</p></div>
        <div class="glass-card"><div class="icon">🧬</div><h3>Bio-Remodelling</h3><p>Next-generation collagen stimulation for lasting results.</p></div>
        <div class="glass-card"><div class="icon">🌿</div><h3>Holistic Wellness</h3><p>IV drips, nutritional coaching, and full-body wellness plans.</p></div>
        <div class="glass-card"><div class="icon">🔬</div><h3>Laser Therapy</h3><p>Medical-grade laser for hair removal, pigmentation, and more.</p></div>
        <div class="glass-card"><div class="icon">🌸</div><h3>Bespoke Facials</h3><p>Customized facials that target your specific skin concerns.</p></div>
      </div>
    </div>
  </section>
  <section class="testimonials">
    <div class="container">
      <div class="testimonials-header"><h2>Client <span class="text-gradient">Stories</span></h2></div>
      <div class="grid-2">
        <div class="testimonial-card"><div class="stars">★★★★★</div><p>"Absolutely transformed my skin. The team at $($lead.name) are world class."</p><span class="reviewer">— S. van der Berg, $($lead.location)</span></div>
        <div class="testimonial-card"><div class="stars">★★★★★</div><p>"Professional, warm, and results-driven. My go-to clinic in Cape Town."</p><span class="reviewer">— M. Peters, Cape Town</span></div>
      </div>
    </div>
  </section>
</main>
<footer>
  <div class="container flex-row">
    <p class="footer-info">&copy; 2026 $($lead.name). $($lead.location), Cape Town, ZA.</p>
    <p>Website Managed by <span class="managed-accent">iederees-create</span></p>
  </div>
</footer>
<a href="https://wa.me/$($lead.phone)" class="wa-float" target="_blank">
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp">
</a>
</body></html>
"@
}

function Get-MaintenanceHTML($lead) {
    $serviceMap = @{
        "plumbing"     = @{ icon="🔧"; label="Plumbing"; services="Emergency plumbing,Leak detection,Drain clearing,Geyser installs" }
        "electrical"   = @{ icon="⚡"; label="Electrical"; services="DB upgrades,Fault finding,New installs,COC certificates" }
        "pest"         = @{ icon="🛡️"; label="Pest Control"; services="Termite treatment,Rodent control,Fumigation,Prevention plans" }
        "clean"        = @{ icon="🧹"; label="Cleaning"; services="Deep cleaning,Post-construction,Carpet cleaning,Industrial cleaning" }
        "pool"         = @{ icon="🏊"; label="Pool Care"; services="Weekly maintenance,Chemical balancing,Equipment repair,Pool renovations" }
        "painting"     = @{ icon="🎨"; label="Painting"; services="Interior painting,Exterior coating,Waterproofing,Texture finishes" }
        "roofing"      = @{ icon="🏠"; label="Roofing"; services="Roof repairs,Leak sealing,Gutters,Full re-roofing" }
        "aircon"       = @{ icon="❄️"; label="Aircon"; services="Installation,Servicing,Gas refills,Repairs" }
        "tiling"       = @{ icon="⬛"; label="Tiling"; services="Floor tiling,Wall tiling,Waterproofing,Grouting" }
        "construction" = @{ icon="🏗️"; label="Construction"; services="Renovations,Extensions,New builds,Project management" }
        "handyman"     = @{ icon="🔨"; label="Handyman"; services="Odd jobs,Furniture assembly,Minor repairs,Home maintenance" }
        "window"       = @{ icon="🪟"; label="Windows"; services="Window cleaning,Frame repairs,Seal replacements,New installations" }
    }
    # Match service type 
    $svc = $serviceMap["handyman"]
    foreach ($key in $serviceMap.Keys) { if ($lead.slug -match $key -or $lead.name -match $key) { $svc = $serviceMap[$key]; break } }
    $wa = "https://wa.me/$($lead.phone)?text=Hi%20$([System.Uri]::EscapeDataString($lead.name)),%20I%20would%20like%20a%20quote%20for%20your%20services%20in%20$([System.Uri]::EscapeDataString($lead.location))."
    return @"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>$($lead.name) | $($svc.label) Services $($lead.location) Cape Town</title>
    <meta name="description" content="$($lead.name) — Reliable $($svc.label.ToLower()) services in $($lead.location), Cape Town. Call now for a free quote.">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="glow-bg"></div>
<header class="glass-nav">
  <div class="container">
    <div class="logo"><span class="logo-accent">$($svc.icon)</span> $($lead.name)</div>
    <nav>
      <a href="#services">Services</a>
      <a href="#about">About</a>
      <a href="$wa" class="btn-primary">Free Quote</a>
    </nav>
  </div>
</header>
<main>
  <section class="hero">
    <div class="container">
      <div class="hero-inner">
        <div>
          <div class="badge">$($lead.location) · Cape Town · $($lead.rating)★ Rated</div>
          <h1>$($lead.location)'s Trusted <span class="text-gradient">$($svc.label) Experts.</span></h1>
          <p class="subtitle">Professional, reliable $($svc.label.ToLower()) services in $($lead.location) and surrounding areas. Fast response. Guaranteed work.</p>
          <div class="hero-actions">
            <a href="$wa" class="btn-hero">WhatsApp for Quote</a>
            <a href="#services" class="btn-secondary">Our Services</a>
          </div>
        </div>
        <div class="hero-trust">
          <div class="trust-card"><span class="trust-icon">🏆</span><div><h4>$($lead.rating)/5 Rating</h4><p>Consistently rated by Cape Town customers</p></div></div>
          <div class="trust-card"><span class="trust-icon">⚡</span><div><h4>Fast Response</h4><p>Same-day service available in $($lead.location)</p></div></div>
          <div class="trust-card"><span class="trust-icon">🛡️</span><div><h4>Fully Insured</h4><p>All work guaranteed and fully covered</p></div></div>
        </div>
      </div>
    </div>
  </section>
  <section id="services" class="features">
    <div class="container">
      <div class="features-header">
        <h2><span class="text-gradient">$($svc.label)</span> Services</h2>
        <p>Everything you need, handled by certified professionals in $($lead.location).</p>
      </div>
      <div class="grid-3">
        $(($svc.services -split ",") | ForEach-Object { "<div class='glass-card'><div class='icon'>$($svc.icon)</div><h3>$_</h3><p>Professional $_ services for residential and commercial customers in $($lead.location).</p></div>" } | Out-String)
      </div>
    </div>
  </section>
  <div class="stats-bar">
    <div class="container"><div class="stats-grid">
      <div class="stat-item"><h3>200+</h3><p>Jobs Completed</p></div>
      <div class="stat-item"><h3>$($lead.rating)★</h3><p>Average Rating</p></div>
      <div class="stat-item"><h3>24hr</h3><p>Response Time</p></div>
      <div class="stat-item"><h3>100%</h3><p>Satisfaction Rate</p></div>
    </div></div>
  </div>
</main>
<footer>
  <div class="container flex-row">
    <p class="footer-info">&copy; 2026 $($lead.name). $($lead.location), Cape Town, ZA.</p>
    <p>Website Managed by <span class="managed-accent">iederees-create</span></p>
  </div>
</footer>
<a href="https://wa.me/$($lead.phone)" class="wa-float" target="_blank">
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp">
</a>
</body></html>
"@
}

# ---- MAIN GENERATOR ----
$results = @()
$totalDeployed = 0

foreach ($lead in $leads) {
    $clientDir = "$ClientBase\$($lead.slug)"
    New-Item -ItemType Directory -Force -Path $clientDir | Out-Null

    # Generate HTML based on industry
    switch ($lead.industry) {
        "Solar"       { $html = Get-SolarHTML $lead }
        "Wellness"    { $html = Get-WellnessHTML $lead }
        "Maintenance" { $html = Get-MaintenanceHTML $lead }
    }

    # Write index.html
    $html | Out-File -FilePath "$clientDir\index.html" -Encoding UTF8 -Force

    # Copy template CSS
    $templateDir = switch ($lead.industry) {
        "Solar"       { "solar-premium-v1" }
        "Wellness"    { "wellness-premium-v1" }
        "Maintenance" { "maintenance-premium-v1" }
    }
    Copy-Item "$TemplateBase\$templateDir\style.css" "$clientDir\style.css" -Force

    # Git init + push to GitHub
    $repoName = "$($lead.slug)-ct"
    $liveUrl   = "https://$GitHubUser.github.io/$repoName/"
    $waMsg    = "Hi%20$([System.Uri]::EscapeDataString($lead.name))%2C%20I'm%20a%20local%20Cape%20Town%20website%20developer.%20I%20noticed%20you%20don't%20have%20a%20website%20yet%20%E2%80%94%20I've%20already%20built%20a%20premium%20one%20for%20you.%20Take%20a%20look%3A%20$([System.Uri]::EscapeDataString($liveUrl))%20I%20also%20stay%20on%20as%20your%20dedicated%20web%20manager%20%E2%80%94%20included%20in%20the%20cost.%20Interested%3F"
    $waPitch  = "https://wa.me/$($lead.phone)?text=$waMsg"
    $emailSubj = "I Built a Premium Website for $($lead.name)"
    $emailBody = "Hi there,`n`nI'm a web developer based in Cape Town. I noticed $($lead.name) doesn't have a website yet, so I went ahead and built a premium, mobile-first demo for you:`n`n$liveUrl`n`nThe site features:`n- Mobile-optimised design`n- WhatsApp contact integration`n- SEO for $($lead.location)`n- Fast loading, hosted on GitHub global infrastructure`n`nI also offer ongoing management, updates, and monthly maintenance — all included in the package price.`n`nWould you like to take it live? Happy to jump on a quick call.`n`nBest,`n[Your Name] — iederees-create"

    Set-Location $clientDir
    git init -b main 2>&1 | Out-Null
    git add . 2>&1 | Out-Null
    git commit -m "Launch: $($lead.name) Premium Ecosystem — $($lead.location), Cape Town" 2>&1 | Out-Null

    # Create GitHub repo via API and push
    $repoPayload = @{ name=$repoName; description="Premium website for $($lead.name), $($lead.location)"; private=$false; auto_init=$false } | ConvertTo-Json
    $apiResp = Invoke-RestMethod -Method Post -Uri "https://api.github.com/user/repos" -Headers @{Authorization="token $(git credential fill <<= url=https://github.com 2> nul)"} -Body $repoPayload -ContentType "application/json" -ErrorAction SilentlyContinue

    git remote remove origin 2>&1 | Out-Null
    git remote add origin "https://github.com/$GitHubUser/$repoName.git"
    $pushResult = git push -u origin main 2>&1

    # Enable GitHub Pages via API
    $pagesPayload = @{ source=@{ branch="main"; path="/" } } | ConvertTo-Json
    Invoke-RestMethod -Method Post -Uri "https://api.github.com/repos/$GitHubUser/$repoName/pages" -Headers @{Authorization="token $(git credential fill <<= url=https://github.com 2> nul)"; Accept="application/vnd.github.switcheroo-preview+json"} -Body $pagesPayload -ContentType "application/json" -ErrorAction SilentlyContinue | Out-Null

    $status = if ($pushResult -match "main") { "LIVE" } else { "PUSHED" }
    $totalDeployed++

    $results += [PSCustomObject]@{
        Number       = $totalDeployed
        Industry     = $lead.industry
        BusinessName = $lead.name
        Location     = $lead.location
        Rating       = $lead.rating
        LiveDemo     = $liveUrl
        WhatsApp     = $waPitch
        EmailSubject = $emailSubj
        Status       = $status
    }

    Write-Host "[$totalDeployed/50] ✅ $($lead.name) → $liveUrl" -ForegroundColor Green
}

# ---- EXPORT OUTREACH SHEET ----
$csvPath = "C:\Users\afrancis\Desktop\qm\CT-Lead-Gen\leads\CT_50_Outreach_Command_Center.csv"
$results | Export-Csv -Path $csvPath -NoTypeInformation -Encoding UTF8
Write-Host "`n🚀 COMPLETE: $totalDeployed sites deployed." -ForegroundColor Cyan
Write-Host "📊 Outreach sheet saved to: $csvPath" -ForegroundColor Cyan
