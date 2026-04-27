# ============================================================
#  GITHUB DEPLOYER — iederees-create
#  Tests auth + creates repos + pushes + enables GitHub Pages
# ============================================================

param(
    [string]$GitHubUser = "iederees-create",
    [string]$CommitUser = "iederees-create",
    [string]$CommitEmail = "iederees@users.noreply.github.com"
)

# ----- Step 1: Get Token from Windows Credential Manager -----
Add-Type -AssemblyName System.Runtime.WindowsRuntime
$pat = $null
try {
    $creds = git credential fill 2>$null <<< "protocol=https`nhost=github.com"
    if ($creds) {
        $pat = ($creds | Where-Object { $_ -match "^password=" }) -replace "^password=",""
    }
} catch {}

# Fallback: read from local file (user can place token here)
$tokenFile = "C:\Users\afrancis\Desktop\qm\CT-Lead-Gen\GITHUB_TOKEN.txt"
if (-not $pat -and (Test-Path $tokenFile)) {
    $pat = (Get-Content $tokenFile -Raw).Trim()
}

if (-not $pat) {
    Write-Host "No GitHub token found. Please paste your GitHub Personal Access Token:" -ForegroundColor Yellow
    $pat = Read-Host
    $pat | Out-File $tokenFile -Encoding UTF8
}

$headers = @{
    Authorization = "token $pat"
    Accept        = "application/vnd.github+json"
}

# ----- Step 2: Test Auth -----
try {
    $userInfo = Invoke-RestMethod -Uri "https://api.github.com/user" -Headers $headers
    Write-Host "✅ Authenticated as: $($userInfo.login)" -ForegroundColor Green
    $GitHubUser = $userInfo.login   # use actual login
} catch {
    Write-Host "❌ GitHub authentication failed. Check your token." -ForegroundColor Red
    exit 1
}

function Deploy-Site {
    param([string]$slug, [string]$businessName, [string]$clientDir)

    $repoName = "$slug-ct"
    $remoteUrl = "https://$($pat)@github.com/$GitHubUser/$repoName.git"

    # Create repo via API
    $body = @{ name=$repoName; description="Premium ecosystem site for $businessName, Cape Town"; private=$false; auto_init=$false } | ConvertTo-Json
    try {
        Invoke-RestMethod -Method Post -Uri "https://api.github.com/user/repos" -Headers $headers -Body $body -ContentType "application/json" | Out-Null
        Write-Host "  📁 Repo created: $repoName" -ForegroundColor Cyan
    } catch {
        # Repo may already exist – continue
        Write-Host "  ℹ️  Repo exists or error: $($_.Exception.Message)" -ForegroundColor Yellow
    }

    # Push code
    Set-Location $clientDir
    git init -b main 2>&1 | Out-Null
    git config user.name $CommitUser 2>&1 | Out-Null
    git config user.email $CommitEmail 2>&1 | Out-Null
    git add . 2>&1 | Out-Null
    git commit -m "Launch: $businessName — Cape Town Ecosystem" 2>&1 | Out-Null
    git remote remove origin 2>&1 | Out-Null
    git remote add origin $remoteUrl
    $push = git push -u origin main --force 2>&1
    $pushed = ($push -join "") -match "main"

    # Enable Pages
    Start-Sleep -Milliseconds 800
    $pagesBody = @{ source=@{ branch="main"; path="/" } } | ConvertTo-Json
    try {
        Invoke-RestMethod -Method Post -Uri "https://api.github.com/repos/$GitHubUser/$repoName/pages" `
            -Headers ($headers + @{ Accept="application/vnd.github.switcheroo-preview+json" }) `
            -Body $pagesBody -ContentType "application/json" | Out-Null
    } catch { } # Pages may already be enabled

    return $pushed
}

Export-ModuleMember -Function Deploy-Site 2>$null
Write-Host "Deployer module ready." -ForegroundColor Green
Write-Host "GitHub User: $GitHubUser" -ForegroundColor Green
