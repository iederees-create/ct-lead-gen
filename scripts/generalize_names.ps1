$targetDir = "c:\Users\afrancis\Desktop\qm\CT-Lead-Gen\clients"
$files = Get-ChildItem -Path $targetDir -Filter "index.html" -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $originalName = ""
    if ($content -match '<title>(.*?)<\/title>') {
        $originalName = $matches[1].Split('|')[0].Trim()
    }
    
    if ($originalName -eq "" -or $originalName -eq "this digital asset") { continue }
    
    $newName = $originalName
    
    # Industry Detection & Generic Name Assignment
    if ($originalName -match "Solar") { $newName = "Elite Solar Infrastructure" }
    elseif ($originalName -match "Plumb") { $newName = "Precision Plumbing Systems" }
    elseif ($originalName -match "Aircon|Air Conditioning") { $newName = "Climate Logic Aircon" }
    elseif ($originalName -match "Aesthetics|Wellness|Skin|Spa|Beauty|Clinic|Body|Laser|Medispa") { $newName = "Lumina Wellness Hub" }
    elseif ($originalName -match "Clean") { $newName = "Hygienic Clean Pro" }
    elseif ($originalName -match "Construct|Build|Paint|Handyman|Waterproof|Tiling|Roof") { $newName = "Civic Core Construction" }
    elseif ($originalName -match "Electric") { $newName = "Rapid Response Electric" }
    elseif ($originalName -match "Pest") { $newName = "EcoShield Pest Control" }
    elseif ($originalName -match "Tutoring") { $newName = "Cognitive Excellence Tutoring" }
    elseif ($originalName -match "Pool") { $newName = "Crystal Clear Pool Care" }

    # Append Location if found
    if ($originalName -match "(Claremont|Tygervalley|Sea Point|Wynberg|Durbanville|Camps Bay|Cape Town|CT|Southern Suburbs|Northern Suburbs|Paarden Eiland|Westlake|Tableview)") {
        $location = $matches[1]
        $newName = "$newName ($location)"
    }

    if ($newName -ne $originalName) {
        Write-Host "Renaming: $originalName -> $newName"
        # Escape for regex replace
        $escapedOrig = [regex]::Escape($originalName)
        $content = $content -replace $escapedOrig, $newName
        Set-Content $file.FullName $content
    }
}

Write-Host "Generic Renaming Complete."
