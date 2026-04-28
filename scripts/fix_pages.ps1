# ============================================================
#  Ensure all 50 repos are pushed and Pages are turned ON!
# ============================================================
$BASE = "C:\Users\afrancis\Desktop\qm\CT-Lead-Gen"
$PAT = (Get-Content "$BASE\GITHUB_TOKEN.txt" -Raw).Trim()
$HDRS = @{ Authorization = "token $PAT"; Accept = "application/vnd.github+json" }
$GH_USER = "iederees-create"

$LEADS = @(
    "glen-ellios-solar", "sunlec-energy-solutions", "eco-direct-solar", "solar-way-ct", "green-star-solar", "solar-dot-com-ct", "dhs-solar", "rs-solar-installations", "ac-solar-solutions", "thomas-electrical-solar",
    "seapoint-skin-clinic", "azalea-aesthetics-ct", "vitality-wellness-claremont", "camps-bay-aesthetics", "lumina-skin-studio", "renewal-med-spa", "glow-republic-ct", "serenity-body-lab", "precision-laser-ct", "pure-aesthetics-tygervalley", "form-wellness-studio", "aqua-beauty-studios", "meridian-clinic-ct", "bodysculpt-cape-town", "arc-wellness-seapoint", "revive-medispa-claremont", "alpine-aesthetics-ct", "zen-skin-studio-bv", "nova-cosmetic-clinic", "elite-wellness-ct",
    "cape-clean-pro", "northern-subs-plumbing", "westlake-pest-control", "paarden-eiland-electric", "ct-roofing-specialists", "metro-aircon-ct", "southern-suburbs-builders", "hydro-clean-ct", "cape-handyman-services", "greenpest-ct", "acme-plumbing-claremont", "all-seasons-aircon", "cape-waterproofing-co", "rapid-response-electric", "tableview-tiling-ct", "eco-clean-northern-subs", "ct-pool-care", "summit-painting-ct", "window-wizards-ct", "first-choice-construction"
)

$pBody = @{ source = @{ branch = "main"; path = "/" } } | ConvertTo-Json

foreach ($slug in $LEADS) {
    $repoName = "$slug-ct"
    $dir = "$BASE\clients\$slug"
    
    Write-Host "Checking $repoName..." -NoNewline
    
    # 1. Ensure it is actually pushed
    if (Test-Path $dir) {
        Set-Location $dir
        $push = git push -u origin main --force 2>&1
        if (($push -join " ") -match "main|Everything up-to-date") {
            # 2. Try to enable pages, with a backoff loop
            $success = $false
            for ($i=1; $i -le 3; $i++) {
                try {
                    Invoke-RestMethod -Method Post -Uri "https://api.github.com/repos/$GH_USER/$repoName/pages" -Headers $HDRS -Body $pBody -ContentType "application/json" | Out-Null
                    $success = $true
                    break
                } catch {
                    $err = $_.ErrorDetails.Message
                    if ($err -match "already exists") {
                        $success = $true
                        break
                    }
                    Start-Sleep -Seconds 1
                }
            }
            if ($success) { Write-Host " [PAGES ON]" -ForegroundColor Green }
            else { Write-Host " [PAGES FAIL]" -ForegroundColor Red }
        } else {
            Write-Host " [PUSH FAIL]" -ForegroundColor Red
        }
    } else {
        Write-Host " [NO FOLDER LOCALLY]" -ForegroundColor Yellow
    }
}
