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
                # Split using string method to avoid regex issues with |
                $siteName = $rawTitle.Split('|')[0].Split('/')[0].Trim()
                if ($siteName -eq "Asset Profile") {
                    # Try to get something better from H1
                    if ($content -match "(?i)<h1>(.*?)<\/h1>") {
                        $siteName = $Matches[1].Trim()
                    }
                }
            }
            
            $encodedName = [uri]::EscapeDataString($siteName)
            $waLink = "https://wa.me/$NEW_WA_NUMBER?text=im%20interested%20inthe%20website%20$encodedName"
            
            Write-Host "Neutralizing: $siteName ($($file.FullName))"
            
            # 1. Replace WhatsApp links
            # Match wa.me/[number] with or without text
            $content = $content -replace 'https?:\/\/wa\.me\/[0-9]+(\?text=[^"''<>]+)?', $waLink
            
            # 2. Replace hardcoded South African phone numbers
            $content = $content -replace '\+27\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{4}', $NEW_PHONE
            $content = $content -replace '0[0-9]{2}\s?[0-9]{3}\s?[0-9]{4}', $NEW_PHONE
            
            # 3. Inject the Global Agent Script if not present
            if ($content -notmatch 'agent-chat-floating.js') {
                $scriptTag = "`n    <!-- Global AI Agent v2.0 -->`n    <script src=`"https://iederees-create.github.io/ct-lead-gen/scripts/agent-chat-floating.js`"></script>`n    <link rel=`"stylesheet`" href=`"https://iederees-create.github.io/ct-lead-gen/templates/agent-chat-floating.css`">`n"
                $content = $content -replace '<\/body>', "$scriptTag`n</body>"
            }
            
            Set-Content $file.FullName $content
        }
    }
}

Write-Host "Neutralization & AI Injection Complete."
