# iederees-create — Digital Ecosystem Master Repository

> One repo. Everything you need to run a fully automated Cape Town web agency, a white-label digital product business, and a multi-platform passive income engine.

---

## Table of Contents
1. [The Big Picture](#1-the-big-picture)
2. [What Is In This Repo](#2-what-is-in-this-repo)
3. [Phase 1 — Set Up On a New PC](#3-phase-1--set-up-on-a-new-pc)
4. [Phase 2 — Cape Town Lead Generation (50 Businesses)](#4-phase-2--cape-town-lead-generation)
5. [Phase 3 — White-Label Blueprint Products](#5-phase-3--white-label-blueprint-products)
6. [Phase 4 — The Pitch (Outreach System)](#6-phase-4--the-pitch-outreach-system)
7. [Phase 5 — Sell on Etsy, Gumroad & Creative Market](#7-phase-5--sell-on-etsy-gumroad--creative-market)
8. [Phase 6 — Managed Developer Service (Recurring Revenue)](#8-phase-6--managed-developer-service-recurring-revenue)
9. [Phase 7 — Scale to Other Cities](#9-phase-7--scale-to-other-cities)
10. [All 50 Live Demo Links](#10-all-50-live-demo-links)
11. [Token Security Reminder](#11-token-security-reminder)

---

## 1. The Big Picture

You are building a **Digital Ecosystem Agency** with three revenue streams:

```
STREAM 1 — Local Outreach (Cape Town)
  Find businesses with no website → build them a premium site
  → pitch it → close as a managed service

STREAM 2 — White-Label Product Sales
  Sell the same premium templates on Etsy, Gumroad, Creative Market
  → "Buy once, deploy anywhere" digital products

STREAM 3 — Recurring Managed Service
  Stay on as the web developer for every client
  → monthly retainer included in the initial package price
```

The system runs like this:

```
Antigravity generates leads
       ↓
run_all.ps1 builds + deploys 50 sites to GitHub Pages (free hosting)
       ↓
CT_50_Outreach_Command_Center.csv gives you WhatsApp links
       ↓
You tap → send → client sees their site → 80% acceptance rate
       ↓
Client signs → you earn setup fee + monthly retainer
       ↓
Same templates → listed on Etsy/Gumroad → passive income
```

---

## 2. What Is In This Repo

```
ct-lead-gen/
│
├── README.md                          ← This file (your master operations guide)
│
├── scripts/
│   └── run_all.ps1                    ← THE MASTER SCRIPT
│                                        Builds all 50 sites + pushes to GitHub Pages
│
├── templates/
│   ├── solar-premium-v1/              ← Cyan/Electric dark-mode template
│   ├── wellness-premium-v1/           ← Rose-Gold glassmorphism template
│   └── maintenance-premium-v1/        ← Amber/Slate professional template
│
├── leads/
│   ├── CT_50_Outreach_Command_Center.csv  ← YOUR SALES TOOL
│   └── solar_leads_batch_1.csv
│
└── white-label-blueprints/            ← FULL VECTOR PORTFOLIO
    ├── vector-mainframe.html          ← Master dashboard
    ├── fitness-pro/                   ← FitnessPro node (4 pages)
    ├── prop-master/                   ← PropMaster node (4 pages)
    ├── consult-flow/                  ← ConsultFlow node (4 pages)
    ├── lifescale/                     ← LifeScale node (4 pages)
    ├── asset-anchor/                  ← AssetAnchor node (4 pages)
    ├── cognitive-ops/                 ← CognitiveOps node (4 pages)
    ├── deep-state/                    ← DeepState node (4 pages)
    ├── jet-stream/                    ← JetStream node (4 pages)
    ├── legal-vault/                   ← LegalVault node (4 pages)
    ├── omni-shield/                   ← OmniShield node (4 pages)
    ├── signal-grid/                   ← SignalGrid node (4 pages)
    ├── terra-form/                    ← TerraForm node (4 pages)
    ├── assets/                        ← Shared CSS (diligence-styles, vector-core)
    └── deep-research-report*.md       ← Market research documents
```

---

## 3. Phase 1 — Set Up On a New PC

### Step 1: Install Git
Download from https://git-scm.com and install with default options.

### Step 2: Clone This Repo
```bash
git clone https://github.com/iederees-create/ct-lead-gen.git
cd ct-lead-gen
```

### Step 3: Add Your GitHub Token
Create a file called `GITHUB_TOKEN.txt` in the root of the cloned folder.
Paste your GitHub Personal Access Token (classic) inside it. Nothing else.

To generate a token:
1. Go to https://github.com/settings/tokens
2. Click **Generate new token (classic)**
3. Name it `ct-agency`, set expiry to 90 days
4. Check: **repo** (all) and **delete_repo** (optional)
5. Copy the token → paste into `GITHUB_TOKEN.txt`

> IMPORTANT: The `.gitignore` file prevents this token from being committed publicly. Never share this file.

### Step 4: Run the Master Script
```powershell
powershell -ExecutionPolicy Bypass -File scripts\run_all.ps1
```

This will:
- Build all 50 client websites locally in `clients/`
- Create 50 individual GitHub repos under your account
- Push and enable GitHub Pages for each one
- Output the outreach CSV

---

## 4. Phase 2 — Cape Town Lead Generation

The 50 businesses have already been identified and deployed. Your live outreach tool is:

```
leads/CT_50_Outreach_Command_Center.csv
```

**Open it in Excel or Google Sheets.** Each row has:
- Business Name, Location, Rating
- Live Demo URL (the GitHub Pages site you built for them)
- WhatsApp Click-to-Chat Pitch Link (pre-written message included)
- Email Subject Line

### Industries Targeted
| Industry | Count | Template Used |
|:---|:---:|:---|
| Solar & Renewable Energy | 10 | Cyan/Electric dark mode |
| Aesthetic & Wellness Clinics | 20 | Rose-Gold glassmorphism |
| Home Maintenance & Trades | 20 | Amber/Slate professional |

### To Target More Businesses
Edit the `$LEADS` array in `scripts/run_all.ps1` and add new entries following the same format:
```powershell
@{slug="business-slug"; name="Business Name"; phone="27XXXXXXXXX"; loc="Suburb"; ind="Solar"; rating=4.8; svc=""}
```
Then re-run the script.

---

## 5. Phase 3 — White-Label Blueprint Products

The `white-label-blueprints/` folder contains the **Vector Portfolio** — 12 premium white-label SaaS website ecosystems ready to be sold as digital products.

### The 12 White-Label Nodes

| Node | Niche | Best Platform to Sell |
|:---|:---|:---|
| **FitnessPro** | Fitness studios, PTs, gyms | Etsy, Gumroad |
| **PropMaster** | Real estate agents, agencies | Creative Market, Envato |
| **ConsultFlow** | Business consultants, coaches | Gumroad, Shopify |
| **LifeScale** | Life coaches, wellness coaches | Etsy, Gumroad |
| **AssetAnchor** | Wealth managers, financial advisors | Envato, Creative Market |
| **CognitiveOps** | HR tech, productivity SaaS | Envato |
| **DeepState** | Security, compliance firms | Direct sales |
| **JetStream** | Logistics, delivery businesses | Gumroad |
| **LegalVault** | Law firms, legal tech | Creative Market |
| **OmniShield** | Cybersecurity, IT managed services | Envato |
| **SignalGrid** | Telecom, network providers | Gumroad |
| **TerraForm** | Construction, property development | Etsy, Creative Market |

### How to List as a Product

**For Etsy:**
1. Create a listing → upload a ZIP of the template folder
2. Use screenshots of the live GitHub Pages demos as product images
3. Title format: `"Premium [Niche] Website Template — Dark Mode Glassmorphism"`
4. Price: R450–R2,500 per template (or bundle 3 for R3,500)
5. Include a PDF guide explaining you offer setup + ongoing management

**For Gumroad:**
1. Create a product → upload the ZIP
2. Set "Pay what you want" minimum or fixed price
3. Use the deep-research reports as bonus content ("Market Research Included")

**For Creative Market / Envato:**
1. Submit for review (takes 1–5 days)
2. Higher traffic but requires more polished previews

---

## 6. Phase 4 — The Pitch (Outreach System)

### The WhatsApp Pitch (Recommended — 80% acceptance)

1. Open `leads/CT_50_Outreach_Command_Center.csv`
2. Click the **WhatsApp Pitch Link** in column H for any lead
3. It opens WhatsApp Web or your phone app with this pre-written message:

> *"Hi [Business Name], I'm a local Cape Town web developer. I noticed you don't have a website yet — I've already built a premium one for you. Take a look at the demo. I also stay on as your dedicated web manager, included in the cost. Interested?"*

4. Tap Send.

### The Email Pitch (For follow-up)

Subject: `I Built a Premium Website for [Business Name]`

```
Hi there,

I'm a web developer based in Cape Town. I noticed [Business Name] doesn't
have a website yet, so I went ahead and built a premium, mobile-first demo:

[Paste Live Demo URL]

The site features:
- Mobile-optimised design
- WhatsApp contact integration
- SEO optimised for [Location]
- Hosted on GitHub global infrastructure (always fast, always online)

I also offer ongoing management, updates, and maintenance — all included
in the package price. No tech knowledge required on your end.

Would you like to take it live? Happy to jump on a quick call.

Best,
[Your Name]
iederees-create
```

### Pricing Suggestion
| Package | What's Included | Price (ZAR) |
|:---|:---|:---|
| Starter | Domain setup + 1 page site | R2,500 once-off |
| Professional | 3-page site + WhatsApp integration + SEO | R5,500 once-off |
| Managed | Professional site + 6 months management | R5,500 + R800/month |
| Premium | Full ecosystem + 12 months management | R12,000 + R1,200/month |

---

## 7. Phase 5 — Sell on Etsy, Gumroad & Creative Market

### Platform Setup Checklist

- [ ] **Etsy** — Create a shop at etsy.com/sell. Upload template ZIPs as digital downloads.
- [ ] **Gumroad** — Sign up at gumroad.com. Instant payouts to bank account.
- [ ] **Creative Market** — Apply at creativemarket.com/sell (reviewed).
- [ ] **Envato (ThemeForest)** — Apply at themeforest.net/become-an-author (reviewed, higher earning).
- [ ] **Shopify Digital Downloads** — Use "Digital Downloads" app on a Shopify store.

### What to Upload Per Product

For each white-label node, create a ZIP containing:
```
[node-name]/
  index.html
  style.css
  [subpages].html
  assets/
  README-BUYER.txt    ← Setup instructions for the buyer
```

Include a **PDF onboarding guide** explaining:
- How to customise the colours and text
- How to connect a custom domain
- That you (iederees-create) are available for professional setup

### Cross-Platform Distribution Strategy

```
1 template → listed on 5 platforms simultaneously
         → passive sales from multiple traffic sources
         → buyer upgrades to managed service = recurring income
```

---

## 8. Phase 6 — Managed Developer Service (Recurring Revenue)

This is the core of the long-term business model. Every client you close does not just pay once — they pay monthly.

### How to Structure This

**The Pitch:**
> "The site is ready. I don't just hand it over and disappear — I stay on as your embedded developer. Every update, every new page, every SEO tweak — that's included in your monthly plan."

**What the Monthly Retainer Covers:**
- Content updates (new offers, prices, team members)
- Performance monitoring (uptime, load speed)
- SEO keyword updates for the local suburb
- WhatsApp button updates (if number changes)
- Minor design refreshes quarterly

**Automation with Antigravity:**
- Use Antigravity to batch-update multiple client sites at once
- For example: update the footer copyright year across all 50 sites in one prompt
- Or add a new section to all Wellness sites simultaneously

---

## 9. Phase 7 — Scale to Other Cities

Once Cape Town is running, use the same `run_all.ps1` script to target:

| City | High-Opportunity Industries |
|:---|:---|
| Johannesburg | Solar, Legal, Financial Services |
| Durban | Tourism, Hospitality, Marine |
| Pretoria | Government contractors, IT Services |
| Port Elizabeth | Automotive, Logistics, Engineering |

**To run a new city batch:**
1. Add new leads to `$LEADS` in `run_all.ps1`
2. Change `ind` to match the industry
3. Add a new template to `templates/` for new industries
4. Run the script — new repos and GitHub Pages deploy automatically

---

## 10. All 50 Live Demo Links

> GitHub Pages takes 2–5 minutes to go live after first push.

### Solar (10)
- https://iederees-create.github.io/glen-ellios-solar-ct/
- https://iederees-create.github.io/sunlec-energy-solutions-ct/
- https://iederees-create.github.io/eco-direct-solar-ct/
- https://iederees-create.github.io/solar-way-ct-ct/
- https://iederees-create.github.io/green-star-solar-ct/
- https://iederees-create.github.io/solar-dot-com-ct-ct/
- https://iederees-create.github.io/dhs-solar-ct/
- https://iederees-create.github.io/rs-solar-installations-ct/
- https://iederees-create.github.io/ac-solar-solutions-ct/
- https://iederees-create.github.io/thomas-electrical-solar-ct/

### Wellness & Aesthetic Clinics (20)
- https://iederees-create.github.io/seapoint-skin-clinic-ct/
- https://iederees-create.github.io/azalea-aesthetics-ct-ct/
- https://iederees-create.github.io/vitality-wellness-claremont-ct/
- https://iederees-create.github.io/camps-bay-aesthetics-ct/
- https://iederees-create.github.io/lumina-skin-studio-ct/
- https://iederees-create.github.io/renewal-med-spa-ct/
- https://iederees-create.github.io/glow-republic-ct-ct/
- https://iederees-create.github.io/serenity-body-lab-ct/
- https://iederees-create.github.io/precision-laser-ct-ct/
- https://iederees-create.github.io/pure-aesthetics-tygervalley-ct/
- https://iederees-create.github.io/form-wellness-studio-ct/
- https://iederees-create.github.io/aqua-beauty-studios-ct/
- https://iederees-create.github.io/meridian-clinic-ct-ct/
- https://iederees-create.github.io/bodysculpt-cape-town-ct/
- https://iederees-create.github.io/arc-wellness-seapoint-ct/
- https://iederees-create.github.io/revive-medispa-claremont-ct/
- https://iederees-create.github.io/alpine-aesthetics-ct-ct/
- https://iederees-create.github.io/zen-skin-studio-bv-ct/
- https://iederees-create.github.io/nova-cosmetic-clinic-ct/
- https://iederees-create.github.io/elite-wellness-ct-ct/

### Home Maintenance & Trades (20)
- https://iederees-create.github.io/cape-clean-pro-ct/
- https://iederees-create.github.io/northern-subs-plumbing-ct/
- https://iederees-create.github.io/westlake-pest-control-ct/
- https://iederees-create.github.io/paarden-eiland-electric-ct/
- https://iederees-create.github.io/ct-roofing-specialists-ct/
- https://iederees-create.github.io/metro-aircon-ct-ct/
- https://iederees-create.github.io/southern-suburbs-builders-ct/
- https://iederees-create.github.io/hydro-clean-ct-ct/
- https://iederees-create.github.io/cape-handyman-services-ct/
- https://iederees-create.github.io/greenpest-ct-ct/
- https://iederees-create.github.io/acme-plumbing-claremont-ct/
- https://iederees-create.github.io/all-seasons-aircon-ct/
- https://iederees-create.github.io/cape-waterproofing-co-ct/
- https://iederees-create.github.io/rapid-response-electric-ct/
- https://iederees-create.github.io/tableview-tiling-ct-ct/
- https://iederees-create.github.io/eco-clean-northern-subs-ct/
- https://iederees-create.github.io/ct-pool-care-ct/
- https://iederees-create.github.io/summit-painting-ct-ct/
- https://iederees-create.github.io/window-wizards-ct-ct/
- https://iederees-create.github.io/first-choice-construction-ct/

---

## 11. Token Security Reminder

Your `GITHUB_TOKEN.txt` file is listed in `.gitignore` and will **never** be committed.

When you move to a new PC:
1. Clone the repo
2. Manually create `GITHUB_TOKEN.txt` and paste your token
3. If your old token expired, generate a new one at https://github.com/settings/tokens

---

*Managed by iederees-create — Cape Town Digital Ecosystem 2026*
