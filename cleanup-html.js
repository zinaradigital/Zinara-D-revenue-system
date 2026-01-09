// Clean up duplicate comments and ensure proper structure
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
    'systems/workflow-automation.html'
];

function cleanHtmlFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove duplicate comments
    content = content.replace(/<!-- Navigation Scripts -->\s*<!-- Navigation Scripts -->/g, '<!-- Navigation Scripts -->');
    
    // Remove duplicate JavaScript comments
    content = content.replace(/<!-- JavaScript -->\s*<!-- JavaScript -->/g, '<!-- JavaScript -->');
    
    // Ensure proper spacing
    content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Cleaned ${filePath}`);
}

// Process all HTML files
htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        cleanHtmlFile(filePath);
    } else {
        console.log(`⏩ Skipped ${file} (not found)`);
    }
});

console.log('🎉 All HTML files have been cleaned.');
