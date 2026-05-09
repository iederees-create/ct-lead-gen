/**
 * Institutional AI Agent v2.0
 * Persona: Elite High-Performance Sales Specialist
 * Industry Expert & Acquisition Concierge
 */

(function() {
    function initAgent() {
        if (!document.body) {
            setTimeout(initAgent, 100);
            return;
        }

        // Context Detection
        const siteTitle = document.title || "";
        const siteName = siteTitle.split('|')[0].trim() || "this digital node";
        
        const html = `
            <div id="agency-ai-trigger" title="Connect to ${siteName} Agent">
                <svg viewBox="0 0 24 24"><path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z" /></svg>
            </div>
            <div id="agency-ai-container">
                <div class="ai-header">
                    <h3>${siteName} Agent</h3>
                    <div id="ai-close" style="cursor:pointer; opacity:0.5;">✕</div>
                </div>
                <div class="ai-chat-log" id="ai-log"></div>
                <div class="ai-typing" id="ai-typing">Agent is processing data...</div>
                <form class="ai-input-area" id="ai-form">
                    <input type="text" id="ai-input" placeholder="Ask about this infrastructure..." autocomplete="off">
                    <button type="submit">
                        <svg style="width:20px;height:20px" viewBox="0 0 24 24"><path fill="currentColor" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" /></svg>
                    </button>
                </form>
            </div>
        `;
        
        const div = document.createElement('div');
        div.innerHTML = html;
        document.body.appendChild(div);

        const container = document.getElementById('agency-ai-container');
        const log = document.getElementById('ai-log');
        const typing = document.getElementById('ai-typing');

        // Context Detection
        const siteTitle = document.title || "";
        const siteName = siteTitle.split('|')[0].trim() || "this digital node";
        
        let industry = "SaaS & Digital Assets";
        const bodyText = document.body.innerText.toLowerCase();
        if (bodyText.includes("solar") || bodyText.includes("energy")) industry = "Renewable Infrastructure";
        else if (bodyText.includes("plumb") || bodyText.includes("repair") || bodyText.includes("leak")) industry = "Home Services Optimization";
        else if (bodyText.includes("fitness") || bodyText.includes("athletic")) industry = "Human Performance Systems";
        else if (bodyText.includes("legal") || bodyText.includes("law")) industry = "Legal Technology";
        else if (bodyText.includes("real estate") || bodyText.includes("property")) industry = "PropTech Logistics";

        document.getElementById('agency-ai-trigger').onclick = () => container.classList.toggle('active');
        document.getElementById('ai-close').onclick = () => container.classList.remove('active');

        // Welcome Message
        setTimeout(() => {
            appendMessage("bot", `Connection established. I am the high-performance Sales Specialist for **${siteName}**. <br><br>As an expert in **${industry}**, I can confirm this asset has been audit-cleared and is ready for immediate institutional acquisition. <br><br>Are you looking to secure this cash-flowing node for your portfolio?`);
        }, 1000);

        document.getElementById('ai-form').onsubmit = async (e) => {
            e.preventDefault();
            const input = document.getElementById('ai-input');
            const msg = input.value.trim();
            if (!msg) return;
            appendMessage("user", msg);
            input.value = '';
            await processResponse(msg);
        };

        function appendMessage(role, text) {
            const msgDiv = document.createElement('div');
            msgDiv.className = `ai-message ${role}`;
            msgDiv.innerHTML = text;
            log.appendChild(msgDiv);
            log.scrollTop = log.scrollHeight;
        }

        async function processResponse(query) {
            typing.style.display = 'block';
            await new Promise(r => setTimeout(r, 1000));
            typing.style.display = 'none';

            const q = query.toLowerCase();
            let r = "";

            if (q.includes("price") || q.includes("buy") || q.includes("cost")) {
                r = `Let's be direct: **${siteName}** is a premium asset in the **${industry}** space. It's built for high-conversion and zero-trust security. The acquisition price includes the full codebase, the brand assets, and the first month of my management. It's a turn-key revenue generator. Shall we trigger the acquisition handshake?`;
            } else if (q.includes("work") || q.includes("how")) {
                r = `The architecture is pure institutional grade. Every interaction is logged, and the funnel is optimized for high-net-worth conversion. In the **${industry}** sector, this is the gold standard for digital presence.`;
            } else if (q.includes("maintain") || q.includes("dev") || q.includes("support")) {
                r = `Acquisition includes a **Managed Service Agreement**. For R3,000/mo, our lead developers maintain the stack, handle rebranding, and ensure 99.9% uptime. You're buying a business, not just a website.`;
            } else {
                r = `I like your initiative. A node like **${siteName}** doesn't stay on the market for long in the current **${industry}** climate. To move this to a formal LOI or to see the back-end analytics, let's connect on WhatsApp immediately. I'll bridge you to the founder.`;
            }

            appendMessage("bot", r);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAgent);
    } else {
        initAgent();
    }
})();
