---
name: ecosystem_deployment
description: Contains the exact automation logic, PowerShell commands, and GitHub API interactions needed to safely deploy new sites or debug the CT-Lead-Gen deployment pipeline.
---

# Ecosystem Deployment Blueprint

## Core Philosophy
The deployment of sites is completely automated. We do not manually handle git pushes for 50+ clients. If requested to orchestrate deployments or debug failures, read this logic first.

## The Generation Script Architecture
*   The primary script is `scripts/run_all.ps1`.
*   It generates static HTML/CSS files based on variables in a PowerShell array (e.g., `$LEADS`).
*   It writes the output directly to a local workspace under `clients/`.
*   It automatically creates repos using the GitHub API `/user/repos`.

## GitHub Pages Enabling (The Race Condition)
> [!WARNING]
> A known issue in GitHub's architecture is that immediately after pushing code to a new remote branch (`main`), the API endpoint for enabling pages (`/repos/{owner}/{repo}/pages`) will return a 422 error ("The main branch must exist") because it hasn't propagated internally yet.
*   **Resolution:** When scripting API calls to turn on GitHub pages, you MUST implement a retry loop with a backoff (e.g., trying 3 times with `Start-Sleep -Seconds 2`).
*   If testing whether Pages is active, the API will return a 409 error with the text `"already exists"` or `"already enabled"`. Treat this 409 as a SUCCESS.

## Lead Arrays
*   When instructed to add new businesses to the pipeline, ensure you append to the `$LEADS` object array and supply the correct industry template keys.
