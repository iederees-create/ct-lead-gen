$dashboard = "c:\Users\afrancis\Desktop\qm\CT-Lead-Gen\index.html"
$content = Get-Content $dashboard -Raw

# Replace descriptions with more inviting language
$content = $content -replace "Premium executive intelligence & strategy site. Sleek high-security terminal aesthetic for consultancy firms.", "High-end website for consultants. Modern, clean, and professional design to build client trust."
$content = $content -replace "Advanced compliance & risk management site for law firms and legal tech startups.", "Professional legal website for law firms. Secure, polished, and built for client onboarding."
$content = $content -replace "Elite digital defense & physical security site. Projects authority for corporate protection services.", "Modern security services website. Clean layout designed to project authority and reliability."
$content = $content -replace "Biometric optimization & athlete management site with a futuristic Human_OS interface.", "Fitness & Performance coaching site. Dynamic interface for modern health and wellness businesses."
$content = $content -replace "Regenerative science & longevity lab site for bloodwork, genomics, and supplement stacking.", "Wellness & Health lab website. Perfect for clinics focusing on longevity and premium care."
$content = $content -replace "Autonomous property management & resident intelligence system for landlords and real estate agents.", "Professional Real Estate & Property site. Streamlined design for management and sales."
$content = $content -replace "Strategic intelligence collective multi-site hub. The ultimate command-center for conglomerates.", "Strategic Business Hub. A clean, high-performance portal for managing multiple business nodes."

# Neutralize "Institutional" and "Asset" jargon globally in index.html
$content = $content -replace "Institutional", "Professional"
$content = $content -replace "Digital Asset", "Professional Website"
$content = $content -replace "Asset Exchange", "Website Collection"
$content = $content -replace "Node", "Site"

Set-Content $dashboard $content
Write-Host "Jargon Neutralized."
