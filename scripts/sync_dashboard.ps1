$dashboard = "c:\Users\afrancis\Desktop\qm\CT-Lead-Gen\index.html"
$content = Get-Content $dashboard -Raw

$clients = Get-ChildItem -Path "c:\Users\afrancis\Desktop\qm\CT-Lead-Gen\clients" -Filter "index.html" -Recurse
foreach ($client in $clients) {
    $folderName = $client.Directory.Name
    $clientContent = Get-Content $client.FullName -Raw
    if ($clientContent -match '<title>(.*?)<\/title>') {
        $realName = $matches[1].Split('|')[0].Trim()
        
        # This regex looks for a block that contains the folderName in liveUrl,
        # then finds the 'name:' property within that same block (bounded by { })
        # Using a balanced search or a simpler lookbehind/lookahead
        
        # Pattern: find { ..., name: '...', ..., liveUrl: '...folderName...', ... }
        # We find the whole object block first
        if ($content -match "(?s)\{\s*id:[^}]+?$folderName[^}]+?\}") {
            $block = $matches[0]
            if ($block -match "name:\s*['""]([^'""].*?)['""]") {
                $oldNameInDash = $matches[1]
                if ($oldNameInDash -ne $realName) {
                    Write-Host "Syncing Dashboard: $oldNameInDash -> $realName"
                    $newBlock = $block -replace "name:\s*['""]" + [regex]::Escape($oldNameInDash) + "['""]", "name: '$realName'"
                    $content = $content.Replace($block, $newBlock)
                }
            }
        }
    }
}
Set-Content $dashboard $content
Write-Host "Dashboard Sync Complete."
