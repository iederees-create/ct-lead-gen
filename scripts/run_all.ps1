# ============================================================
#  CT-Lead-Gen: Generate ALL 50 Sites + Deploy to GitHub Pages
#  Pure PowerShell — no Node, no Python, no emoji, no heredocs
# ============================================================

$BASE     = "C:\Users\afrancis\Desktop\qm\CT-Lead-Gen"
$CLIENTS  = "$BASE\clients"
$TMPL     = "$BASE\templates"
$GH_USER  = "iederees-create"

# ---- Auth ----
$tokenFile = "$BASE\GITHUB_TOKEN.txt"
if (Test-Path $tokenFile) {
    $PAT = (Get-Content $tokenFile -Raw).Trim()
} else {
    Write-Host "Paste your GitHub PAT (classic, repo+pages scope):" -ForegroundColor Yellow
    $PAT = Read-Host
    $PAT | Out-File $tokenFile -Encoding ASCII
}
$HDRS = @{ Authorization = "token $PAT"; Accept = "application/vnd.github+json" }

try {
    $me = Invoke-RestMethod "https://api.github.com/user" -Headers $HDRS
    $GH_USER = $me.login
    Write-Host "Authenticated as: $GH_USER" -ForegroundColor Cyan
} catch {
    Write-Host "Auth failed. Check token." -ForegroundColor Red; exit 1
}

# ============================================================
#  HTML TEMPLATES  (single-quoted = no $ expansion, safe)
# ============================================================
$SOLAR_TMPL = '<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>BNAME | Solar Solutions BLOCATION Cape Town</title>
<meta name="description" content="BNAME - Premium solar installations in BLOCATION, Cape Town. BRATING-star rated. Free quote today.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head>
<body>
<div class="glow-bg"></div>
<header class="glass-nav">
  <div class="container">
    <div class="logo"><span class="logo-accent">//</span> BNAME</div>
    <nav>
      <a href="#services">Services</a>
      <a href="#about">About</a>
      <a href="BWALINK" class="btn-primary">Get Quote</a>
    </nav>
  </div>
</header>
<main>
  <section class="hero">
    <div class="container">
      <div class="badge">Cape Town Solar Ecosystem &middot; BLOCATION &middot; BRATING Stars</div>
      <h1>Renewable Energy <span class="text-gradient">Redefined.</span></h1>
      <p class="subtitle">Premium solar installations for BLOCATION and greater Cape Town. Always-on power &mdash; even during loadshedding.</p>
      <div class="hero-actions">
        <a href="BWALINK" class="btn-hero">Contact via WhatsApp</a>
        <a href="#services" class="btn-secondary">Explore Solutions</a>
      </div>
    </div>
  </section>
  <section id="services" class="features">
    <div class="container">
      <div class="features-header">
        <h2>Our <span class="text-gradient">Solar Services</span></h2>
        <p>End-to-end renewable energy solutions tailored for BLOCATION.</p>
      </div>
      <div class="grid-3">
        <div class="glass-card"><h3>Grid Independence</h3><p>Custom lithium battery storage for 24/7 reliability during loadshedding.</p></div>
        <div class="glass-card"><h3>High-Yield Solar PV</h3><p>Tier-1 panels optimized for the Western Cape irradiation profile.</p></div>
        <div class="glass-card"><h3>COC-Certified Installs</h3><p>Fully compliant installations with ongoing ecosystem maintenance.</p></div>
        <div class="glass-card"><h3>Battery Backup Systems</h3><p>Keep your family or business powered through any outage.</p></div>
        <div class="glass-card"><h3>Energy Monitoring</h3><p>Real-time dashboards so you know your system performance anytime.</p></div>
        <div class="glass-card"><h3>ROI Guarantee</h3><p>Most installs pay back within 4-6 years. We show you the numbers upfront.</p></div>
      </div>
    </div>
  </section>
</main>
<footer><div class="container flex-row">
  <p>&copy; 2026 BNAME. BLOCATION, Cape Town, ZA.</p>
  <p>Website Managed by <span class="managed-accent">iederees-create</span></p>
</div></footer>
<a href="https://wa.me/BPHONE" class="wa-float" target="_blank">
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp">
</a>
</body></html>'

$WELLNESS_TMPL = '<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>BNAME | Aesthetic Clinic BLOCATION Cape Town</title>
<meta name="description" content="BNAME - Premium aesthetic and wellness treatments in BLOCATION, Cape Town. BRATING-star rated. Book today.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head>
<body>
<div class="glow-bg"></div><div class="glow-bg-2"></div>
<header class="glass-nav">
  <div class="container">
    <div class="logo"><span class="logo-accent">&#10022;</span> BNAME</div>
    <nav>
      <a href="#services">Treatments</a>
      <a href="#about">About</a>
      <a href="BWALINK" class="btn-primary">Book Now</a>
    </nav>
  </div>
</header>
<main>
  <section class="hero">
    <div class="container">
      <div class="badge">Premium Wellness &middot; BLOCATION &middot; BRATING Stars</div>
      <h1>Where Science Meets <span class="text-gradient">Beauty.</span></h1>
      <p class="subtitle">Advanced aesthetic and wellness treatments by certified professionals in the heart of BLOCATION.</p>
      <div class="hero-actions">
        <a href="BWALINK" class="btn-hero">Book a Consultation</a>
        <a href="#services" class="btn-secondary">View Treatments</a>
      </div>
    </div>
  </section>
  <div class="stats-bar"><div class="container"><div class="stats-grid">
    <div class="stat-item"><h3>500+</h3><p>Satisfied Clients</p></div>
    <div class="stat-item"><h3>BRATING</h3><p>Google Rating</p></div>
    <div class="stat-item"><h3>5+</h3><p>Years in Practice</p></div>
    <div class="stat-item"><h3>100%</h3><p>Certified Treatments</p></div>
  </div></div></div>
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
        <div class="glass-card"><h3>Laser Therapy</h3><p>Medical-grade laser for hair removal and pigmentation.</p></div>
        <div class="glass-card"><h3>Bespoke Facials</h3><p>Customized facials targeting your specific skin concerns.</p></div>
      </div>
    </div>
  </section>
  <section class="testimonials"><div class="container">
    <div class="testimonials-header"><h2>Client <span class="text-gradient">Stories</span></h2></div>
    <div class="grid-2">
      <div class="testimonial-card"><div class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div><p>"Absolutely transformed my skin. The team at BNAME are world class."</p><span class="reviewer">&mdash; S. van der Berg, BLOCATION</span></div>
      <div class="testimonial-card"><div class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div><p>"Professional, warm, and results-driven. My go-to clinic in Cape Town."</p><span class="reviewer">&mdash; M. Peters, Cape Town</span></div>
    </div>
  </div></section>
</main>
<footer><div class="container flex-row">
  <p>&copy; 2026 BNAME. BLOCATION, Cape Town, ZA.</p>
  <p>Website Managed by <span class="managed-accent">iederees-create</span></p>
</div></footer>
<a href="https://wa.me/BPHONE" class="wa-float" target="_blank">
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp">
</a>
</body></html>'

$MAINT_TMPL = '<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>BNAME | BSVC_LABEL BLOCATION Cape Town</title>
<meta name="description" content="BNAME - Reliable BSVC_LABEL in BLOCATION, Cape Town. BRATING-star rated. Free quotes available.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head>
<body>
<div class="glow-bg"></div>
<header class="glass-nav">
  <div class="container">
    <div class="logo"><span class="logo-accent">[BSVC_ICON]</span> BNAME</div>
    <nav>
      <a href="#services">Services</a>
      <a href="#about">About</a>
      <a href="BWALINK" class="btn-primary">Free Quote</a>
    </nav>
  </div>
</header>
<main>
  <section class="hero">
    <div class="container">
      <div class="hero-inner">
        <div>
          <div class="badge">BLOCATION &middot; Cape Town &middot; BRATING Stars</div>
          <h1>BLOCATION&apos;s Trusted <span class="text-gradient">BSVC_LABEL Experts.</span></h1>
          <p class="subtitle">Professional BSVC_LABEL in BLOCATION and surrounding areas. Fast response. Guaranteed workmanship.</p>
          <div class="hero-actions">
            <a href="BWALINK" class="btn-hero">WhatsApp for Quote</a>
            <a href="#services" class="btn-secondary">Our Services</a>
          </div>
        </div>
        <div class="hero-trust">
          <div class="trust-card"><div class="trust-icon">[Stars]</div><div><h4>BRATING / 5 Rating</h4><p>Consistently rated by Cape Town customers</p></div></div>
          <div class="trust-card"><div class="trust-icon">[Fast]</div><div><h4>Fast Response</h4><p>Same-day service available in BLOCATION</p></div></div>
          <div class="trust-card"><div class="trust-icon">[Shield]</div><div><h4>Fully Insured</h4><p>All work guaranteed and fully covered</p></div></div>
        </div>
      </div>
    </div>
  </section>
  <section id="services" class="features">
    <div class="container">
      <div class="features-header">
        <h2><span class="text-gradient">BSVC_LABEL</span> in BLOCATION</h2>
        <p>Everything you need, handled by certified professionals.</p>
      </div>
      <div class="grid-3">BSERVICE_CARDS</div>
    </div>
  </section>
  <div class="stats-bar"><div class="container"><div class="stats-grid">
    <div class="stat-item"><h3>200+</h3><p>Jobs Completed</p></div>
    <div class="stat-item"><h3>BRATING</h3><p>Average Rating</p></div>
    <div class="stat-item"><h3>24hr</h3><p>Response Time</p></div>
    <div class="stat-item"><h3>100%</h3><p>Satisfaction Rate</p></div>
  </div></div></div>
</main>
<footer><div class="container flex-row">
  <p>&copy; 2026 BNAME. BLOCATION, Cape Town, ZA.</p>
  <p>Website Managed by <span class="managed-accent">iederees-create</span></p>
</div></footer>
<a href="https://wa.me/BPHONE" class="wa-float" target="_blank">
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp">
</a>
</body></html>'

# ============================================================
#  SERVICE LOOKUP TABLE
# ============================================================
$SVCS = @{
    clean        = @{ icon="Clean";   label="Specialized Cleaning";   services=@("Deep Cleaning","Post-construction Cleaning","Carpet Cleaning","Industrial Cleaning","Office Cleaning","Commercial Cleaning") }
    plumbing     = @{ icon="Plumb";   label="Plumbing Services";      services=@("Emergency Plumbing","Leak Detection","Drain Clearing","Geyser Installs","Pipe Repair","Bathroom Renovations") }
    pest         = @{ icon="Pest";    label="Pest Control";           services=@("Termite Treatment","Rodent Control","Fumigation","Prevention Plans","Bed Bug Treatment","Cockroach Control") }
    electrical   = @{ icon="Elec";   label="Electrical Services";    services=@("DB Upgrades","Fault Finding","New Installations","COC Certificates","Outdoor Lighting","Pre-sale Inspections") }
    roofing      = @{ icon="Roof";   label="Roofing Specialists";    services=@("Roof Repairs","Leak Sealing","Gutter Installation","Full Re-roofing","Flat Roofing","IBR and Corrugated") }
    aircon       = @{ icon="Air";    label="Air Conditioning";       services=@("Supply and Install","Annual Servicing","Gas Refills","Emergency Repairs","Ducted Systems","Cassette Units") }
    construction = @{ icon="Build";  label="Construction";           services=@("Home Renovations","Room Extensions","New Builds","Project Management","Driveway Paving","Boundary Walls") }
    handyman     = @{ icon="Hand";   label="Handyman Services";      services=@("Odd Jobs","Furniture Assembly","Minor Repairs","Home Maintenance","Door and Gate Repairs","Painting Touch-ups") }
    tiling       = @{ icon="Tile";   label="Tiling Specialists";     services=@("Floor Tiling","Wall Tiling","Waterproofing","Grouting","Pool Surrounds","Feature Walls") }
    pool         = @{ icon="Pool";   label="Pool Care";              services=@("Weekly Maintenance","Chemical Balancing","Equipment Repair","Pool Renovations","Green Pool Recovery","Filter Service") }
    painting     = @{ icon="Paint";  label="Painting Services";      services=@("Interior Painting","Exterior Coating","Waterproofing","Texture Finishes","Damp Treatment","Garage Floors") }
    window       = @{ icon="Window"; label="Window Services";        services=@("Window Cleaning","Frame Repairs","Seal Replacements","New Installations","Sliding Doors","Security Burglar Bars") }
}

# ============================================================
#  50-LEAD DATASET
# ============================================================
$LEADS = @(
    @{slug="glen-ellios-solar";           name="Glen Ellios Pty LTD";              phone="27691039281"; loc="Goodwood";       ind="Solar";       rating=5.0; svc=""},
    @{slug="sunlec-energy-solutions";     name="Sunlec Energy Solutions";           phone="27678799789"; loc="Parow";           ind="Solar";       rating=4.9; svc=""},
    @{slug="eco-direct-solar";            name="Eco Direct Solar";                  phone="27812136586"; loc="Mitchells Plain";  ind="Solar";       rating=5.0; svc=""},
    @{slug="solar-way-ct";                name="Solar Way Cape Town";               phone="27846664381"; loc="Mitchells Plain";  ind="Solar";       rating=4.1; svc=""},
    @{slug="green-star-solar";            name="Green Star Solar";                  phone="27765588679"; loc="Mitchells Plain";  ind="Solar";       rating=5.0; svc=""},
    @{slug="solar-dot-com-ct";            name="Solar Dot Com";                     phone="27213916620"; loc="Mitchells Plain";  ind="Solar";       rating=4.9; svc=""},
    @{slug="dhs-solar";                   name="D.H.S Solar";                       phone="27817277511"; loc="Bishop Lavis";    ind="Solar";       rating=5.0; svc=""},
    @{slug="rs-solar-installations";      name="R and S Solar Installations";       phone="27736612470"; loc="Belhar";           ind="Solar";       rating=5.0; svc=""},
    @{slug="ac-solar-solutions";          name="A.C Solar Solutions";               phone="27828565642"; loc="Parow";            ind="Solar";       rating=4.9; svc=""},
    @{slug="thomas-electrical-solar";     name="Thomas Electrical";                 phone="27847222456"; loc="Wynberg";          ind="Solar";       rating=5.0; svc=""},
    @{slug="seapoint-skin-clinic";        name="Sea Point Skin Clinic";             phone="27721112200"; loc="Sea Point";       ind="Wellness";    rating=4.8; svc=""},
    @{slug="azalea-aesthetics-ct";        name="Azalea Aesthetics";                 phone="27832345678"; loc="Claremont";       ind="Wellness";    rating=4.9; svc=""},
    @{slug="vitality-wellness-claremont"; name="Vitality Wellness Claremont";       phone="27718765432"; loc="Claremont";       ind="Wellness";    rating=4.7; svc=""},
    @{slug="camps-bay-aesthetics";        name="Camps Bay Aesthetics";              phone="27794567890"; loc="Camps Bay";       ind="Wellness";    rating=5.0; svc=""},
    @{slug="lumina-skin-studio";          name="Lumina Skin Studio";                phone="27612349876"; loc="Kenilworth";      ind="Wellness";    rating=4.8; svc=""},
    @{slug="renewal-med-spa";             name="Renewal Medi-Spa";                  phone="27825678901"; loc="Bellville";       ind="Wellness";    rating=4.6; svc=""},
    @{slug="glow-republic-ct";            name="Glow Republic CT";                  phone="27748901234"; loc="Sea Point";       ind="Wellness";    rating=4.9; svc=""},
    @{slug="serenity-body-lab";           name="Serenity Body Lab";                 phone="27660123456"; loc="Wynberg";         ind="Wellness";    rating=4.7; svc=""},
    @{slug="precision-laser-ct";          name="Precision Laser Cape Town";         phone="27839012345"; loc="Durbanville";     ind="Wellness";    rating=4.8; svc=""},
    @{slug="pure-aesthetics-tygervalley"; name="Pure Aesthetics Tygervalley";       phone="27783456789"; loc="Tygervalley";     ind="Wellness";    rating=4.9; svc=""},
    @{slug="form-wellness-studio";        name="Form Wellness Studio";              phone="27618901234"; loc="Observatory";     ind="Wellness";    rating=4.7; svc=""},
    @{slug="aqua-beauty-studios";         name="Aqua Beauty Studios";               phone="27681234567"; loc="Tableview";       ind="Wellness";    rating=4.8; svc=""},
    @{slug="meridian-clinic-ct";          name="Meridian Clinic CT";                phone="27722345678"; loc="Parow";           ind="Wellness";    rating=4.6; svc=""},
    @{slug="bodysculpt-cape-town";        name="BodySculpt Cape Town";              phone="27845678901"; loc="Century City";    ind="Wellness";    rating=5.0; svc=""},
    @{slug="arc-wellness-seapoint";       name="Arc Wellness Sea Point";            phone="27766789012"; loc="Sea Point";       ind="Wellness";    rating=4.8; svc=""},
    @{slug="revive-medispa-claremont";    name="Revive Medi-Spa Claremont";         phone="27617890123"; loc="Claremont";       ind="Wellness";    rating=4.9; svc=""},
    @{slug="alpine-aesthetics-ct";        name="Alpine Aesthetics CT";              phone="27838901234"; loc="Hout Bay";        ind="Wellness";    rating=4.7; svc=""},
    @{slug="zen-skin-studio-bv";          name="Zen Skin Studio Bellville";         phone="27749012345"; loc="Bellville";       ind="Wellness";    rating=4.8; svc=""},
    @{slug="nova-cosmetic-clinic";        name="Nova Cosmetic Clinic";              phone="27680123456"; loc="Durbanville";     ind="Wellness";    rating=4.9; svc=""},
    @{slug="elite-wellness-ct";           name="Elite Wellness CT";                 phone="27721234567"; loc="Milnerton";       ind="Wellness";    rating=4.7; svc=""},
    @{slug="cape-clean-pro";              name="Cape Clean Pro";                    phone="27832345678"; loc="Goodwood";        ind="Maintenance"; rating=4.8; svc="clean"},
    @{slug="northern-subs-plumbing";      name="Northern Suburbs Plumbing";         phone="27763456789"; loc="Durbanville";     ind="Maintenance"; rating=4.9; svc="plumbing"},
    @{slug="westlake-pest-control";       name="Westlake Pest Control";             phone="27824567890"; loc="Westlake";        ind="Maintenance"; rating=4.7; svc="pest"},
    @{slug="paarden-eiland-electric";     name="Paarden Eiland Electrical";         phone="27615678901"; loc="Paarden Eiland";  ind="Maintenance"; rating=5.0; svc="electrical"},
    @{slug="ct-roofing-specialists";      name="CT Roofing Specialists";            phone="27746789012"; loc="Kuils River";     ind="Maintenance"; rating=4.8; svc="roofing"},
    @{slug="metro-aircon-ct";             name="Metro Aircon Cape Town";            phone="27687890123"; loc="Bellville";       ind="Maintenance"; rating=4.6; svc="aircon"},
    @{slug="southern-suburbs-builders";   name="Southern Suburbs Builders";         phone="27728901234"; loc="Kenilworth";      ind="Maintenance"; rating=4.9; svc="construction"},
    @{slug="hydro-clean-ct";              name="Hydro Clean CT";                    phone="27839012345"; loc="Brackenfell";     ind="Maintenance"; rating=4.7; svc="clean"},
    @{slug="cape-handyman-services";      name="Cape Handyman Services";            phone="27760123456"; loc="Parow";           ind="Maintenance"; rating=4.8; svc="handyman"},
    @{slug="greenpest-ct";                name="GreenPest CT";                      phone="27821234567"; loc="Durbanville";     ind="Maintenance"; rating=4.9; svc="pest"},
    @{slug="acme-plumbing-claremont";     name="Acme Plumbing Claremont";           phone="27612345678"; loc="Claremont";       ind="Maintenance"; rating=4.7; svc="plumbing"},
    @{slug="all-seasons-aircon";          name="All Seasons Aircon CT";             phone="27743456789"; loc="Tygervalley";     ind="Maintenance"; rating=4.8; svc="aircon"},
    @{slug="cape-waterproofing-co";       name="Cape Waterproofing Co";             phone="27684567890"; loc="Wetton";          ind="Maintenance"; rating=4.6; svc="roofing"},
    @{slug="rapid-response-electric";     name="Rapid Response Electrical";         phone="27725678901"; loc="Durbanville";     ind="Maintenance"; rating=5.0; svc="electrical"},
    @{slug="tableview-tiling-ct";         name="Tableview Tiling CT";               phone="27836789012"; loc="Tableview";       ind="Maintenance"; rating=4.7; svc="tiling"},
    @{slug="eco-clean-northern-subs";     name="Eco Clean Northern Suburbs";        phone="27767890123"; loc="Kuilsriver";      ind="Maintenance"; rating=4.8; svc="clean"},
    @{slug="ct-pool-care";                name="CT Pool Care";                      phone="27828901234"; loc="Constantia";      ind="Maintenance"; rating=4.9; svc="pool"},
    @{slug="summit-painting-ct";          name="Summit Painting CT";                phone="27619012345"; loc="Pinelands";       ind="Maintenance"; rating=4.7; svc="painting"},
    @{slug="window-wizards-ct";           name="Window Wizards CT";                 phone="27740123456"; loc="Blouberg";        ind="Maintenance"; rating=4.8; svc="window"},
    @{slug="first-choice-construction";   name="First Choice Construction";         phone="27681234567"; loc="Bellville";       ind="Maintenance"; rating=4.9; svc="construction"}
)

# ============================================================
#  MAIN LOOP
# ============================================================
$csvRows = @("Num,Industry,Business Name,Location,Rating,Repo,Live URL,WhatsApp Pitch,Email Subject")
$built  = 0; $pushed = 0; $errors = 0

foreach ($L in $LEADS) {
    $num    = $built + 1
    $dir    = "$CLIENTS\$($L.slug)"
    New-Item -ItemType Directory -Path $dir -Force | Out-Null

    # Build WhatsApp link
    $pitchMsg  = "Hi $($L.name), I am a local Cape Town web developer. I noticed you do not have a website yet. I have already built a premium one for you. Take a look at the demo link - I also stay on as your dedicated web manager, included in the cost. Interested?"
    $waEnc     = [System.Uri]::EscapeDataString($pitchMsg)
    $waLink    = "https://wa.me/$($L.phone)?text=$waEnc"
    $repoName  = "$($L.slug)-ct"
    $liveUrl   = "https://$GH_USER.github.io/$repoName/"

    # Build HTML
    switch ($L.ind) {
        "Solar" {
            $html = $SOLAR_TMPL
        }
        "Wellness" {
            $html = $WELLNESS_TMPL
        }
        "Maintenance" {
            $svcKey  = if ($L.svc) { $L.svc } else { "handyman" }
            $svcData = $SVCS[$svcKey]
            $cards   = ($svcData.services | ForEach-Object { "<div class=`"glass-card`"><h3>$_</h3><p>Professional $($_.ToLower()) for residential and commercial clients in $($L.loc).</p></div>" }) -join "`n        "
            $html = $MAINT_TMPL
            $html = $html.Replace("BSVC_LABEL",  $svcData.label)
            $html = $html.Replace("BSVC_ICON",   $svcData.icon)
            $html = $html.Replace("BSERVICE_CARDS", $cards)
        }
    }
    # Common replacements
    $html = $html.Replace("BNAME",    $L.name)
    $html = $html.Replace("BLOCATION",$L.loc)
    $html = $html.Replace("BRATING",  "$($L.rating)")
    $html = $html.Replace("BPHONE",   $L.phone)
    $html = $html.Replace("BWALINK",  $waLink)

    # Write files
    [System.IO.File]::WriteAllText("$dir\index.html", $html, [System.Text.Encoding]::UTF8)

    $cssSource = switch ($L.ind) {
        "Solar"       { "$TMPL\solar-premium-v1\style.css" }
        "Wellness"    { "$TMPL\wellness-premium-v1\style.css" }
        "Maintenance" { "$TMPL\maintenance-premium-v1\style.css" }
    }
    Copy-Item $cssSource "$dir\style.css" -Force

    $built++
    Write-Host "[$num/50] Built: $($L.name)" -ForegroundColor Cyan

    # ---- GitHub Deploy ----
    $repoBody = @{ name=$repoName; description="Cape Town Ecosystem - $($L.name)"; private=$false; auto_init=$false } | ConvertTo-Json
    try {
        Invoke-RestMethod -Method Post -Uri "https://api.github.com/user/repos" -Headers $HDRS -Body $repoBody -ContentType "application/json" | Out-Null
    } catch { }

    Set-Location $dir
    git init -b main 2>&1 | Out-Null
    git config user.name  $GH_USER  2>&1 | Out-Null
    git config user.email "$GH_USER@users.noreply.github.com" 2>&1 | Out-Null
    git add . 2>&1 | Out-Null
    git commit -m "Launch: $($L.name) - Cape Town Ecosystem" 2>&1 | Out-Null
    git remote remove origin 2>&1 | Out-Null
    git remote add origin "https://$($PAT)@github.com/$GH_USER/$repoName.git"
    $push = git push -u origin main --force 2>&1

    if (($push -join " ") -match "main|HEAD|Branch") {
        $pushed++
        Write-Host "     Pushed -> $liveUrl" -ForegroundColor Green
        # Enable Pages
        Start-Sleep -Milliseconds 600
        $pBody = @{ source = @{ branch = "main"; path = "/" } } | ConvertTo-Json
        try {
            Invoke-RestMethod -Method Post -Uri "https://api.github.com/repos/$GH_USER/$repoName/pages" `
                -Headers ($HDRS + @{Accept="application/vnd.github.switcheroo-preview+json"}) `
                -Body $pBody -ContentType "application/json" | Out-Null
        } catch {}
    } else {
        $errors++
        Write-Host "     Push issue: $($push -join ' ')" -ForegroundColor Yellow
    }

    # Build CSV row
    $emailSubj = "I Built a Premium Website for $($L.name)"
    $csvRows  += "$num,$($L.ind),`"$($L.name)`",$($L.loc),$($L.rating),$repoName,$liveUrl,`"$waLink`",`"$emailSubj`""
}

# Write outreach CSV
$csvPath = "$BASE\leads\CT_50_Outreach_Command_Center.csv"
$csvRows | Out-File -FilePath $csvPath -Encoding UTF8 -Force

Set-Location $BASE
Write-Host ""
Write-Host ("=" * 60) -ForegroundColor Cyan
Write-Host "COMPLETE: Built $built | Pushed $pushed | Errors $errors" -ForegroundColor Cyan
Write-Host "Outreach CSV: $csvPath" -ForegroundColor Cyan
Write-Host "All sites will be live at: https://$GH_USER.github.io/[slug]-ct/" -ForegroundColor Cyan
