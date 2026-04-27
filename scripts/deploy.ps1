# ============================================================
#  GITHUB MASS DEPLOYER — iederees-create
#  Run AFTER generate_sites.js has built all 50 client folders
#  Usage: .\deploy.ps1
# ============================================================

$GitHubUser = "iederees-create"
$ClientBase = "C:\Users\afrancis\Desktop\qm\CT-Lead-Gen\clients"

# ---- Verify git is available ----
$gitPath = (Get-Command git -ErrorAction SilentlyContinue)
if (-not $gitPath) { Write-Host "ERROR: git not found." -ForegroundColor Red; exit 1 }

# ---- Read stored GitHub PAT from local file (fallback to prompt) ----
$tokenFile = "C:\Users\afrancis\Desktop\qm\CT-Lead-Gen\GITHUB_TOKEN.txt"
if (Test-Path $tokenFile) {
    $pat = (Get-Content $tokenFile -Raw).Trim()
    Write-Host "Token loaded from file." -ForegroundColor Green
} else {
    Write-Host "Paste your GitHub Personal Access Token (classic, repo + pages scope):" -ForegroundColor Yellow
    $pat = Read-Host
    $pat | Out-File $tokenFile -Encoding ASCII
}

$headers = @{ Authorization = "token $pat"; Accept = "application/vnd.github+json" }

# ---- Test auth ----
try {
    $user = Invoke-RestMethod -Uri "https://api.github.com/user" -Headers $headers
    Write-Host "Authenticated as: $($user.login)" -ForegroundColor Cyan
    $GitHubUser = $user.login
} catch {
    Write-Host "GitHub auth failed. Check your token." -ForegroundColor Red; exit 1
}

# ---- Get list of all client folders ----
$clientFolders = Get-ChildItem -Path $ClientBase -Directory | Sort-Object Name
$total = $clientFolders.Count
Write-Host "`nDeploying $total client sites to GitHub Pages..." -ForegroundColor Cyan
Write-Host ("=" * 60)

$deployed = 0
$errors   = 0

foreach ($folder in $clientFolders) {
    $slug     = $folder.Name
    $repoName = "$slug-ct"
    $dir      = $folder.FullName
    $liveUrl  = "https://$GitHubUser.github.io/$repoName/"

    Write-Host "`n[$($deployed + $errors + 1)/$total] $slug" -NoNewline

    # -- Create GitHub repo --
    $body = @{
        name        = $repoName
        description = "Cape Town Ecosystem site - iederees-create"
        private     = $false
        auto_init   = $false
    } | ConvertTo-Json

    try {
        Invoke-RestMethod -Method Post -Uri "https://api.github.com/user/repos" `
            -Headers $headers -Body $body -ContentType "application/json" | Out-Null
        Write-Host " [repo created]" -NoNewline -ForegroundColor DarkCyan
    } catch {
        Write-Host " [repo exists]" -NoNewline -ForegroundColor DarkYellow
    }

    # -- Git init + commit + push --
    Set-Location $dir
    git init -b main 2>&1 | Out-Null
    git config user.name  $GitHubUser 2>&1 | Out-Null
    git config user.email "$GitHubUser@users.noreply.github.com" 2>&1 | Out-Null
    git add . 2>&1 | Out-Null
    git commit -m "Launch: Cape Town Ecosystem Site" --allow-empty 2>&1 | Out-Null
    git remote remove origin 2>&1 | Out-Null

    $remoteUri = "https://$($pat)@github.com/$GitHubUser/$repoName.git"
    git remote add origin $remoteUri
    $push = git push -u origin main --force 2>&1
    $ok   = ($push -join " ") -match "main|HEAD"

    if ($ok) {
        Write-Host " [pushed]" -NoNewline -ForegroundColor Green
        $deployed++
    } else {
        Write-Host " [push failed: $($push -join ' ')]" -NoNewline -ForegroundColor Red
        $errors++
    }

    # -- Enable GitHub Pages --
    Start-Sleep -Milliseconds 500
    $pagesBody = @{ source = @{ branch = "main"; path = "/" } } | ConvertTo-Json
    try {
        Invoke-RestMethod -Method Post `
            -Uri "https://api.github.com/repos/$GitHubUser/$repoName/pages" `
            -Headers ($headers + @{ Accept = "application/vnd.github.switcheroo-preview+json" }) `
            -Body $pagesBody -ContentType "application/json" | Out-Null
        Write-Host " [pages enabled] -> $liveUrl" -ForegroundColor Green
    } catch {
        Write-Host " [pages may already be on]" -ForegroundColor DarkYellow
    }
}

Write-Host "`n" + ("=" * 60)
Write-Host "COMPLETE: $deployed deployed | $errors errors" -ForegroundColor Cyan
Write-Host "All sites will be live at: https://$GitHubUser.github.io/[slug]-ct/" -ForegroundColor Cyan
