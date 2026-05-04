
/* ── Etsy Intel Dashboard Logic ── */

const PROXIES = [
  u => `https://api.allorigins.win/get?url=${encodeURIComponent(u)}`,
  u => `https://corsproxy.io/?${encodeURIComponent(u)}`,
];

async function fetchViaProxy(url) {
  for (const makeProxy of PROXIES) {
    try {
      const res = await fetch(makeProxy(url), { signal: AbortSignal.timeout(15000) });
      if (!res.ok) continue;
      const json = await res.json();
      return json.contents ?? json;
    } catch (_) { }
  }
  throw new Error('INTEL_LINK_FAILURE: PROXY_NODES_OFFLINE');
}

function parseSearchListings(html) {
  const listings = [];
  if (typeof html !== 'string') return listings;
  const re = /"listing_id"\s*:\s*(\d+).*?"title"\s*:\s*"([^"]+)".*?"price"\s*:\s*\{.*?"amount"\s*:\s*([\d.]+).*?"currency_code"\s*:\s*"([A-Z]+)".*?"shop_name"\s*:\s*"([^"]+)"/gs;
  const seen = new Set();
  for (const m of html.matchAll(re)) {
    if (seen.has(m[1])) continue;
    seen.add(m[1]);
    listings.push({
      id: m[1],
      title: m[2].replace(/\\u[\dA-F]{4}/gi, c => String.fromCharCode(parseInt(c.replace('\\u',''),16))),
      price: parseFloat(m[3]).toFixed(2),
      currency: m[4],
      shop: m[5],
      url: `https://www.etsy.com/listing/${m[1]}`
    });
  }
  return listings;
}

// Global intel store
let intelData = [];

window.startEtsyScrape = async function() {
    const query = document.getElementById('etsyQuery').value;
    if(!query) return;
    
    const status = document.getElementById('etsyStatus');
    const tbody = document.getElementById('etsyResultsBody');
    status.innerHTML = "[SYSTEM]: INITIATING_SCRAPE...";
    status.style.color = "var(--accent)";
    
    try {
        const url = `https://www.etsy.com/search?q=${encodeURIComponent(query)}&explicit=1`;
        const html = await fetchViaProxy(url);
        intelData = parseSearchListings(html);
        
        tbody.innerHTML = intelData.map((item, idx) => `
            <tr>
                <td>${idx + 1}</td>
                <td style="color:var(--accent);">${item.id}</td>
                <td title="${item.title}">${item.title.slice(0, 40)}...</td>
                <td>${item.shop}</td>
                <td style="color:var(--accent-green); font-weight:700;">$${item.price}</td>
                <td><button class="btn-node" style="padding:2px 8px; margin:0;" onclick="window.open('${item.url}')">VIEW</button></td>
            </tr>
        `).join('');
        
        status.innerHTML = `[SYSTEM]: SCRAPE_COMPLETE // ${intelData.length} NODES_EXTRACTED`;
        status.style.color = "var(--accent-green)";
    } catch (e) {
        status.innerHTML = `[SYSTEM]: ERROR // ${e.message}`;
        status.style.color = "var(--accent-red)";
    }
};

window.exportEtsyIntel = function() {
    if(!intelData.length) return;
    const csv = "ID,Title,Shop,Price,Currency,URL\n" + 
        intelData.map(i => `"${i.id}","${i.title.replace(/"/g,'')}",${i.shop},${i.price},${i.currency},${i.url}`).join("\n");
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `etsy_intel_${Date.now()}.csv`; a.click();
};
