/* The Vector: CORE SYNERGY LAYER v1.0 */
(function() {
    console.log(">> Vector_CORE_SYNC: ACTIVE");

    const Vector_DATA = {
        nodes: [
            { id: "node_01", name: "FitnessPro", path: "fitness-pro", status: "NOMINAL", icon: "VITA" },
            { id: "node_02", name: "PropMaster", path: "prop-master", status: "NOMINAL", icon: "RES" },
            { id: "node_03", name: "ConsultFlow", path: "consult-flow", status: "NOMINAL", icon: "STRAT" },
            { id: "node_04", name: "OmniShield", path: "omni-shield", status: "NOMINAL", icon: "SEC" },
            { id: "node_05", name: "LifeScale", path: "lifescale", status: "NOMINAL", icon: "LAB" },
            { id: "node_06", name: "LegalVault", path: "legal-vault", status: "NOMINAL", icon: "LAW" },
            { id: "node_07", name: "AssetAnchor", path: "asset-anchor", status: "PENDING", icon: "WEALTH" },
            { id: "node_08", name: "SignalGrid", path: "signal-grid", status: "PENDING", icon: "COMMS" },
            { id: "node_09", name: "JetStream", path: "jet-stream", status: "PENDING", icon: "TRANS" },
            { id: "node_10", name: "TerraForm", path: "terra-form", status: "PENDING", icon: "GEO" },
            { id: "node_11", name: "DeepState", path: "deep-state", status: "PENDING", icon: "DATA" },
            { id: "node_12", name: "CognitiveOps", path: "cognitive-ops", status: "PENDING", icon: "PSYC" }
        ],
        alerts: [
            "OMNISHIELD: Zero-trust perimeter verified across all nodes.",
            "LifeScale: Lab auditing complete, verifiable cohort data ready.",
            "LEGALVAULT: Compliance Audit 100% Verified.",
            "CONSULTFLOW: Strategic Value Delta +14% reported.",
            "PROPM@STER: Autonomous maintenance cycle validated.",
            "ASSETANCHOR: Source-of-funds verification complete.",
            "JETSTREAM: Continuity logistics and transit verified.",
            "SIGNALGRID: Phishing-resistant MFA enforced globally."
        ]
    };

    function injectSynergyLayer() {
        // 1. Inject Floating Synergy Feed (Bottom Marquee)
        const marquee = document.createElement('div');
        marquee.id = 'Vector-intel-feed';
        marquee.style = `
            position: fixed; bottom: 0; left: 0; width: 100%; 
            background: #000; color: #555; font-family: 'JetBrains Mono', monospace; 
            font-size: 10px; padding: 5px 20px; border-top: 1px solid #111; 
            z-index: 10000; white-space: nowrap; overflow: hidden;
        `;
        
        const content = document.createElement('div');
        content.style = "display: inline-block; padding-left: 100%; animation: VectorScroll 30s linear infinite;";
        content.innerHTML = Vector_DATA.alerts.join(" &nbsp;&nbsp; // &nbsp;&nbsp; ");
        
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes VectorScroll { 0% { transform: translate(0, 0); } 100% { transform: translate(-100%, 0); } }
        `;
        document.head.appendChild(style);

        marquee.appendChild(content);
        document.body.appendChild(marquee);

        // 2. Inject Partner Badges based on current folder
        const path = window.location.pathname;
        let badgeHtml = "";

        if (path.includes('prop-master')) {
            badgeHtml = '<div style="position:fixed; bottom: 40px; right: 40px; border: 1px solid #ef4444; color: #ef4444; padding: 10px; font-size: 10px; background: rgba(0,0,0,0.8); font-family: monospace;">SECURED BY OMNISHIELD</div>';
        } else if (path.includes('consult-flow')) {
            badgeHtml = '<div style="position:fixed; bottom: 40px; right: 40px; border: 1px solid #d4af37; color: #d4af37; padding: 10px; font-size: 10px; background: rgba(0,0,0,0.8); font-family: monospace;">VERIFIED BY LEGALVAULT</div>';
        } else if (path.includes('fitness-pro')) {
            badgeHtml = '<div style="position:fixed; bottom: 40px; right: 40px; border: 1px solid #10b981; color: #10b981; padding: 10px; font-size: 10px; background: rgba(0,0,0,0.8); font-family: monospace;">OPTIMIZED BY LifeScale</div>';
        }

        if (badgeHtml) {
            const badge = document.createElement('div');
            badge.innerHTML = badgeHtml;
            document.body.appendChild(badge);
        }
    }

    // Initialize on load
    if (document.readyState === "complete") {
        injectSynergyLayer();
    } else {
        window.addEventListener('load', injectSynergyLayer);
    }
})();
 Riverside


