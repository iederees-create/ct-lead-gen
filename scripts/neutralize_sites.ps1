$targetDirs = @(
    "c:\Users\afrancis\Desktop\qm\CT-Lead-Gen\clients",
    "c:\Users\afrancis\Desktop\qm\CT-Lead-Gen\white-label-blueprints"
)

$NEW_WA_NUMBER = "27845272182"
$NEW_PHONE = "+27 84 527 2182"

foreach ($dir in $targetDirs) {
    if (Test-Path $dir) {
        $files = Get-ChildItem -Path $dir -Filter "index.html" -Recurse
        foreach ($file in $files) {
            $content = Get-Content $file.FullName -Raw
            
            # Extract Site Name
            $siteName = "this digital asset"
            if ($content -match "(?i)<title>(.*?)<\/title>") {
                $rawTitle = $Matches[1]
                $siteName = $rawTitle.Split('|')[0].Split('/')[0].Trim()
                if ($siteName -eq "Asset Profile" -or $siteName -eq "") {
                    if ($content -match "(?i)<h1>(.*?)<\/h1>") {
                        $siteName = $Matches[1].Trim()
                    }
                }
            }
            
            $encodedName = [uri]::EscapeDataString($siteName)
            $waLink = "https://wa.me/$NEW_WA_NUMBER?text=im%20interested%20inthe%20website%20$encodedName"
            
            Write-Host "Fixing WhatsApp: $siteName ($($file.FullName))"
            
            # AGGRESSIVE REPLACEMENT: Match any wa.me link up to the next quote or space
            $content = $content -replace 'https?:\/\/wa\.me\/[^"''\s<>]*', $waLink
            
            # Replace hardcoded phone numbers
            $content = $content -replace '\+27\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{4}', $NEW_PHONE
            
            Set-Content $file.FullName $content
        }
    }
}

Write-Host "WhatsApp Links Fixed."
