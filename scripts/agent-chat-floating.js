/**
 * Institutional AI Agent v2.0
 * High-Fidelity Autonomous Concierge for Vector Assets
 */

(function() {
    // 1. Inject HTML Structure
    const html = `
        <div id="agency-ai-trigger" title="Connect to Asset Agent">
            <svg viewBox="0 0 24 24"><path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z" /></svg>
        </div>
        <div id="agency-ai-container">
            <div class="ai-header">
                <div>
                    <h3>Asset Agent // v2.0</h3>
                    <div class="ai-status">CONNECTED_TO_MAINFRAME</div>
                </div>
                <div id="ai-close" style="cursor:pointer; opacity:0.5;">âœ•</div>
            </div>
            <div class="ai-chat-log" id="ai-log"></div>
            <div class="ai-typing" id="ai-typing">Agent is processing...</div>
            <form class="ai-input-area" id="ai-form">
                <input type="text" id="ai-input" placeholder="Query asset capabilities..." autocomplete="off">
                <button type="submit">
                    <svg style="width:20px;height:20px" viewBox="0 0 24 24"><path fill="currentColor" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" /></svg>
                </button>
            </form>
        </div>
    `;
    
    const div = document.createElement('div');
    div.innerHTML = html;
    document.body.appendChild(div);

    // 2. Elements
    const trigger = document.getElementById('agency-ai-trigger');
    const container = document.getElementById('agency-ai-container');
    const closeBtn = document.getElementById('ai-close');
    const form = document.getElementById('ai-form');
    const input = document.getElementById('ai-input');
    const log = document.getElementById('ai-log');
    const typing = document.getElementById('ai-typing');

    // 3. State & Context
    const siteName = document.title.split('//')[0].trim() || "this digital asset";
    let isProcessing = false;

    // 4. Initialization
    trigger.onclick = () => container.classList.toggle('active');
    closeBtn.onclick = () => container.classList.remove('active');

    // Welcome Message
    setTimeout(() => {
        appendMessage("bot", `Greeting initiated. I am the autonomous concierge for **${siteName}**. How can I assist with your institutional query today?`);
    }, 1000);

    // 5. Chat Logic
    form.onsubmit = async (e) => {
        e.preventDefault();
        const msg = input.value.trim();
        if (!msg || isProcessing) return;

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
        isProcessing = true;
        typing.style.display = 'block';

        // Simulation Delay
        await new Promise(r => setTimeout(r, 1000 + Math.random() * 1000));

        let response = "";
        const lowerQuery = query.toLowerCase();

        // High-Fidelity Response Heuristics
        if (lowerQuery.includes("price") || lowerQuery.includes("cost") || lowerQuery.includes("buy")) {
            response = `Acquisition protocols are managed via the **Agency OS Mainframe**. This node is currently valued as a premium managed asset. Would you like me to flag an acquisition specialist?`;
        } else if (lowerQuery.includes("who") || lowerQuery.includes("owner")) {
            response = `Ownership of **${siteName}** is secured under the Vector Conglomerate governance. Operations are currently being scaled for institutional exit.`;
        } else if (lowerQuery.includes("what") || lowerQuery.includes("features")) {
            response = `**${siteName}** features a zero-trust architecture, high-performance biometrics (if applicable), and full integration with the Raversus AI protocol suite.`;
        } else {
            response = `Query acknowledged. I have cross-referenced your request with the **${siteName}** logic core. To provide a surgical response, please specify whether this relates to **acquisition**, **deployment**, or **technical optimization**.`;
        }

        typing.style.display = 'none';
        appendMessage("bot", response);
        isProcessing = false;
    }
})();
