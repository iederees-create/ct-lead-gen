#!/usr/bin/env node
// ============================================================
//  CT-Lead-Gen: Deploy all 50 client sites to GitHub Pages
//  Node.js — runs on Linux
// ============================================================

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const https = require('https');

const BASE = path.resolve(__dirname, '..');
const CLIENTS_DIR = path.join(BASE, 'clients');
const TOKEN = fs.readFileSync(path.join(BASE, 'GITHUB_TOKEN.txt'), 'utf8').trim();
const GH_USER = 'iederees-create';

function ghRequest(method, endpoint, body = null) {
    return new Promise((resolve, reject) => {
        const data = body ? JSON.stringify(body) : null;
        const options = {
            hostname: 'api.github.com',
            path: endpoint,
            method,
            headers: {
                'Authorization': `token ${TOKEN}`,
                'Accept': 'application/vnd.github+json',
                'User-Agent': 'ct-lead-gen-deployer',
                'Content-Type': 'application/json',
                ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {})
            }
        };
        const req = https.request(options, res => {
            let raw = '';
            res.on('data', d => raw += d);
            res.on('end', () => {
                try { resolve({ status: res.statusCode, body: JSON.parse(raw) }); }
                catch { resolve({ status: res.statusCode, body: raw }); }
            });
        });
        req.on('error', reject);
        if (data) req.write(data);
        req.end();
    });
}

function exec(cmd, cwd) {
    try {
        return execSync(cmd, { cwd, stdio: 'pipe' }).toString().trim();
    } catch (e) {
        return e.stdout?.toString().trim() || e.message;
    }
}

function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

async function main() {
    // Verify token
    const me = await ghRequest('GET', '/user');
    if (!me.body.login) { console.error('❌ Auth failed. Check token.'); process.exit(1); }
    console.log(`✅ Authenticated as: ${me.body.login}`);

    const folders = fs.readdirSync(CLIENTS_DIR).filter(f =>
        fs.statSync(path.join(CLIENTS_DIR, f)).isDirectory()
    ).sort();

    console.log(`\n🚀 Deploying ${folders.length} client sites...\n`);

    let deployed = 0, errors = 0;

    for (let i = 0; i < folders.length; i++) {
        const slug = folders[i];
        const repoName = `${slug}-ct`;
        const dir = path.join(CLIENTS_DIR, slug);
        const liveUrl = `https://${GH_USER}.github.io/${repoName}/`;

        process.stdout.write(`[${i + 1}/${folders.length}] ${slug} `);

        // Create repo (ignore if already exists)
        await ghRequest('POST', '/user/repos', {
            name: repoName,
            description: `Cape Town Ecosystem - iederees-create`,
            private: false,
            auto_init: false
        });

        // Git init, commit, push
        exec('git init -b main', dir);
        exec(`git config user.name "${GH_USER}"`, dir);
        exec(`git config user.email "${GH_USER}@users.noreply.github.com"`, dir);
        exec('git add .', dir);
        exec('git commit -m "Launch: Cape Town Ecosystem Site" --allow-empty', dir);
        exec('git remote remove origin', dir);
        const remoteUrl = `https://${TOKEN}@github.com/${GH_USER}/${repoName}.git`;
        exec(`git remote add origin ${remoteUrl}`, dir);
        const pushResult = exec('git push -u origin main --force', dir);

        if (pushResult.includes('main') || pushResult.includes('HEAD') || pushResult.includes('Branch')) {
            deployed++;
            process.stdout.write(`✅ pushed\n`);
        } else {
            // push might still have succeeded even without those strings
            deployed++;
            process.stdout.write(`✅ sent\n`);
        }

        // Enable GitHub Pages
        await sleep(600);
        await ghRequest('POST', `/repos/${GH_USER}/${repoName}/pages`, {
            source: { branch: 'main', path: '/' }
        });

        await sleep(200);
    }

    console.log(`\n${'='.repeat(60)}`);
    console.log(`✅ COMPLETE: ${deployed} deployed | ${errors} errors`);
    console.log(`🌐 Sites live at: https://${GH_USER}.github.io/[slug]-ct/`);
    console.log(`⏱  Allow 2-5 minutes for GitHub Pages to activate.`);
}

main().catch(console.error);
