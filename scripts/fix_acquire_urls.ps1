$dashboard = "c:\Users\afrancis\Desktop\qm\CT-Lead-Gen\index.html"
$content = Get-Content $dashboard -Raw

# Match each website block and update its acquireUrl to include its actual name
# Pattern: name: '...', category: '...', ..., acquireUrl: '...Agency%20OS'
$newContent = [regex]::Replace($content, '(?s)name:\s*[''"]([^''"]+)[''"].*?acquireUrl:\s*[''"]([^''"]+?)Agency%20OS[''"]', {
    param($m)
    $name = $m.Groups[1].Value
    $urlBase = $m.Groups[2].Value
    $encodedName = [uri]::EscapeDataString($name)
    return $m.Value -replace "Agency%20OS", $encodedName
})

Set-Content $dashboard $newContent
Write-Host "Acquire URLs Updated."
