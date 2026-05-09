$targetDir = "c:\Users\afrancis\Desktop\qm\CT-Lead-Gen\clients"
$files = Get-ChildItem -Path $targetDir -Filter "index.html" -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $folderName = $file.Directory.Name
    
    $newName = ""
    # More specific detection based on folder name
    if ($folderName -match "solar") { $newName = "Photon Flux Energy" }
    elseif ($folderName -match "plumb") { $newName = "Hydro Logic Systems" }
    elseif ($folderName -match "aircon") { $newName = "Climate Forge Systems" }
    elseif ($folderName -match "aesthetics|skin|wellness|spa|laser") { $newName = "Aura Skin Sanctuary" }
    elseif ($folderName -match "electric") { $newName = "Volt Vault Systems" }
    elseif ($folderName -match "clean") { $newName = "Sparkle Logic Clean" }
    elseif ($folderName -match "construct|build|paint|tiling|roof|waterproof|handyman") { $newName = "Apex Structural" }
    elseif ($folderName -match "pest") { $newName = "Vermin Guard Pro" }
    elseif ($folderName -match "tutoring") { $newName = "Cognitive Bridge Academics" }
    elseif ($folderName -match "pool") { $newName = "Blue Lagoon Pools" }
    else { $newName = "Premium Asset Hub" }

    # Append Location if found in folder name
    if ($folderName -match "(claremont|tygervalley|seapoint|wynberg|durbanville|campsbay|goodwood|parow|mitchells|bellville|milnerton)") {
        $location = $matches[1]
        $newName = "$newName ($location)"
    } else {
        # Random suffix to ensure uniqueness if no location
        $hash = $folderName.GetHashCode() % 100
        $newName = "$newName (Node-$hash)"
    }

    # Identify current name
    if ($content -match '<title>(.*?)<\/title>') {
        $oldName = $matches[1].Split('|')[0].Trim()
        if ($oldName -ne "" -and $newName -ne $oldName) {
            Write-Host "Renaming: $oldName -> $newName ($folderName)"
            $escapedOld = [regex]::Escape($oldName)
            $content = $content -replace $escapedOld, $newName
            Set-Content $file.FullName $content
        }
    }
}
Write-Host "Creative Naming V2 Complete."
