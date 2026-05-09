$targetDirs = @(
    "c:\Users\afrancis\Desktop\qm\CT-Lead-Gen\clients",
    "c:\Users\afrancis\Desktop\qm\CT-Lead-Gen\white-label-blueprints",
    "c:\Users\afrancis\Desktop\qm\CT-Lead-Gen"
)

$WA_NUM = "27845272182"

foreach ($dir in $targetDirs) {
    if (Test-Path $dir) {
        $files = Get-ChildItem -Path $dir -Filter "index.html" -Recurse
        foreach ($file in $files) {
            $content = Get-Content $file.FullName -Raw
            
            # Use LITERAL string replacement - No regex drama
            $broken = "wa.me/="
            $fixed = "wa.me/$WA_NUM?text="
            
            if ($content.Contains($broken)) {
                Write-Host "Fixing broken link in: $($file.FullName)"
                $content = $content.Replace($broken, $fixed)
                Set-Content $file.FullName $content
            }
        }
    }
}
Write-Host "WhatsApp Links LITERAL-FIXED."
