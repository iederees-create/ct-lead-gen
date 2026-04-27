# ============================================================
#  Etsy Digital Product Packager
#  Zips up the White-Label Blueprints & Cape Town Templates
# ============================================================

$BASE_DIR = "C:\Users\afrancis\Desktop\qm\CT-Lead-Gen"
$OUT_DIR  = "$BASE_DIR\etsy-ready-packages"

# Ensure output directory exists (clean it if it does)
if (Test-Path $OUT_DIR) { Remove-Item -Recurse -Force "$OUT_DIR\*" }
else { New-Item -ItemType Directory -Path $OUT_DIR | Out-Null }

Write-Host "Packaging Vector Portfolios..." -ForegroundColor Cyan
$blueprints = Get-ChildItem -Path "$BASE_DIR\white-label-blueprints" -Directory
foreach ($folder in $blueprints) {
    # Skip the assets folder, we want to include it inside each zip if needed
    if ($folder.Name -eq "assets") { continue }
    
    $zipPath = "$OUT_DIR\$($folder.Name)-Premium-Template.zip"
    Compress-Archive -Path "$($folder.FullName)\*" -DestinationPath $zipPath -Force
    Write-Host "   -> $($folder.Name).zip" -ForegroundColor Green
}

Write-Host "`nPackaging Cape Town Industry Templates..." -ForegroundColor Cyan
$ctTemplates = Get-ChildItem -Path "$BASE_DIR\templates" -Directory
foreach ($folder in $ctTemplates) {
    $cleanName = $folder.Name.Replace("-premium-v1", "")
    $cleanName = (Get-Culture).TextInfo.ToTitleCase($cleanName)
    $zipPath = "$OUT_DIR\$cleanName-Industry-Website-Template.zip"
    
    Compress-Archive -Path "$($folder.FullName)\*" -DestinationPath $zipPath -Force
    Write-Host "   -> $cleanName-Industry-Website-Template.zip" -ForegroundColor Green
}

Write-Host "`nAll Etsy ZIP packages created at: $OUT_DIR" -ForegroundColor Green
