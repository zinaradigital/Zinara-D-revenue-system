// Script to update all HTML files with the new navigation system
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

const navigationScript = `
  <!-- Navigation Scripts -->
  <script type="module">
    import { createHeader, createFooter } from './components/header.js';
    
    // Insert header at the beginning of the body
    document.body.insertAdjacentHTML('afterbegin', createHeader());
    
    // Insert footer before the closing body tag
    document.body.insertAdjacentHTML('beforeend', createFooter());
  </script>
  <script src="/js/navigation.js" defer></script>
`;

function updateHtmlFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove existing navigation and footer
    content = content.replace(/<nav[\s\S]*?<\/nav>/g, '');
    content = content.replace(/<footer[\s\S]*?<\/footer>/g, '');
    content = content.replace(/<header[\s\S]*?<\/header>/g, '');
    
    // Remove existing navigation scripts
    content = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/g, '');
    
    // Add skip to content link if not present
    if (!content.includes('skip-to-content')) {
        content = content.replace('<body>', '<body>\n  <a href="#main-content" class="skip-to-content">Skip to content</a>');
    }
    
    // Add the new script before the closing body tag
    content = content.replace('</body>', `${navigationScript}\n</body>`);
    
    // Clean up any duplicate body or html tags
    content = content.replace(/<\/body>\s*<\/html>[\s\S]*$/, '</body>\n</html>');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated ${filePath}`);
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

console.log('🎉 All HTML files have been updated with the new navigation system.');
