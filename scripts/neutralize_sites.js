const fs = require('fs');
const path = require('path');

const targetDirs = [
    path.join(__dirname, '../clients'),
    path.join(__dirname, '../white-label-blueprints')
];

const NEW_WA_NUMBER = '27845272182';
const NEW_PHONE = '+27 84 527 2182';

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            walkDir(filePath);
        } else if (file === 'index.html') {
            neutralizeFile(filePath);
        }
    });
}

function neutralizeFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Extract Site Name
    let siteName = "this digital asset";
    const titleMatch = content.match(/<title>(.*?)<\/title>/i);
    if (titleMatch) {
        siteName = titleMatch[1].split('|')[0].split('//')[0].trim();
    }
    
    const encodedName = encodeURIComponent(siteName);
    const waLink = `https://wa.me/${NEW_WA_NUMBER}?text=im%20interested%20inthe%20website%20${encodedName}`;
    
    console.log(`Neutralizing: ${siteName} (${filePath})`);
    
    // Replace WhatsApp links
    // Match patterns like wa.me/123 or wa.me/123?text=...
    content = content.replace(/https?:\/\/wa\.me\/[0-9]+(\?text=[^"'>]*)?/g, waLink);
    
    // Replace hardcoded phone numbers (common SA patterns)
    content = content.replace(/\+27\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{4}/g, NEW_PHONE);
    
    fs.writeFileSync(filePath, content);
}

targetDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
        walkDir(dir);
    }
});

console.log("Neutralization Complete.");
