// Emergency update - add fallback navigation to all pages
const fs = require('fs');
const path = require('path');

const htmlFiles = [
    'index.html',
    'systems.html',
    'failure.html',
    'results.html',
    'portfolio.html',
    'insights.html',
    'about.html',
    'contact.html',
    'audit.html',
    'privacy.html',
    'terms.html'
];

const emergencyScript = `
  <!-- Emergency Navigation Fallback -->
  <script src="/js/emergency-nav-fix.js"></script>
`;

function updateHtmlFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add emergency script before closing body tag
    content = content.replace('</body>', `${emergencyScript}\n</body>`);
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated ${filePath} with emergency fallback`);
}

// Process all HTML files
htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        updateHtmlFile(filePath);
    } else {
        console.log(`⏩ Skipped ${file} (not found)`);
    }
});

console.log('🚨 Emergency navigation fallback added to all pages');
