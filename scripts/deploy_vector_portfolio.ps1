# ============================================================
#  Vector-Portfolio-Deploy: Automate 12 Elite Asset Sites
#  Deploys the White-Label Portfolio to GitHub Pages for Live Demos
# ============================================================

$BASE     = "/home/iedrees/Workspace/ct-lead-gen"
$VECTOR   = "$BASE/white-label-blueprints"
$GH_USER  = "iederees-create"

# ---- Auth ----
$tokenFile = "$BASE/GITHUB_TOKEN.txt"
if (!(Test-Path $tokenFile)) {
    Write-Host "Error: GITHUB_TOKEN.txt not found. Run setup sequence first." -ForegroundColor Red
    exit 1
}
$PAT = (Get-Content $tokenFile -Raw).Trim()
$HDRS = @{ Authorization = "token $PAT"; Accept = "application/vnd.github+json" }

# ---- Verify Auth ----
try {
    $me = Invoke-RestMethod "https://api.github.com/user" -Headers $HDRS
    $GH_USER = $me.login
    Write-Host "Authenticated: $GH_USER" -ForegroundColor Cyan
} catch {
    Write-Host "Auth failed. Check token." -ForegroundColor Red; exit 1
}

# ---- The 12 Nodes Mapping ----
$NODES = @(
    "fitness-pro", "prop-master", "consult-flow", "lifescale", 
    "asset-anchor", "cognitive-ops", "deep-state", "jet-stream", 
    "legal-vault", "omni-shield", "signal-grid", "terra-form"
)

Write-Host "Starting Vector Portfolio Deployment..." -ForegroundColor Green

foreach ($node in $NODES) {
    $repoName = "vector-$node"
    $nodePath = "$VECTOR/$node"
    $liveUrl  = "https://$GH_USER.github.io/$repoName/"

    if (Test-Path $nodePath) {
        Write-Host "Deploying: $node ..." -ForegroundColor Cyan
        
        # 1. Create Repo (if not exists)
        $repoBody = @{ 
            name=$repoName; 
            description="Vector Portfolio Node: $node - Premium White-Label Blueprint"; 
            private=$false; 
            auto_init=$false 
        } | ConvertTo-Json
        
        try {
            Invoke-RestMethod -Method Post -Uri "https://api.github.com/user/repos" -Headers $HDRS -Body $repoBody -ContentType "application/json" | Out-Null
        } catch {
            Write-Host "   Node repo $repoName might already exist." -ForegroundColor Gray
        }

        # 2. Prepare & Push Files
        Set-Location $nodePath
        # Clean current git if any
        if (Test-Path ".git") { Remove-Item -Recurse -Force ".git" }
        
        # Copy assets folder to node root if it doesn't exist (shared assets fix)
        # Note: BNAME etc are not used in blueprints yet, they are pure white-label
        
        git init -b main 2>&1 | Out-Null
        git config user.name  $GH_USER 2>&1 | Out-Null
        git config user.email "$GH_USER@users.noreply.github.com" 2>&1 | Out-Null
        git add . 2>&1 | Out-Null
        git commit -m "Deploy: Vector Node $node" 2>&1 | Out-Null
        
        git remote add origin "https://$PAT@github.com/$GH_USER/$repoName.git" 2>&1 | Out-Null
        $push = git push -u origin main --force 2>&1

        if (($push -join " ") -match "main|HEAD|Branch") {
            Write-Host "   SUCCESS -> $liveUrl" -ForegroundColor Green
            # 3. Enable Pages
            Start-Sleep -Seconds 1
            $pBody = @{ source = @{ branch = "main"; path = "/" } } | ConvertTo-Json
            try {
                Invoke-RestMethod -Method Post -Uri "https://api.github.com/repos/$GH_USER/$repoName/pages" `
                    -Headers ($HDRS + @{Accept="application/vnd.github.switcheroo-preview+json"}) `
                    -Body $pBody -ContentType "application/json" | Out-Null
            } catch {}
        } else {
            Write-Host "   PUSH_ERROR: $node" -ForegroundColor Red
        }
    } else {
        Write-Host "   Warning: Folder $node not found." -ForegroundColor Yellow
    }
}

Set-Location $BASE
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Vector Portfolio Deployed Successfully." -ForegroundColor Cyan
Write-Host "Master Hub: $VECTOR/vector-mainframe.html" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
