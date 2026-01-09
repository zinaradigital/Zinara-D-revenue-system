// Update all HTML files to use enhanced navigation
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

const enhancedScript = `
  <!-- Navigation Scripts -->
  <script type="module">
    import { createHeaderWithBreadcrumbs, createFooter } from './components/header.js';
    
    // Insert header with breadcrumbs at the beginning of the body
    document.body.insertAdjacentHTML('afterbegin', createHeaderWithBreadcrumbs());
    
    // Insert footer before the closing body tag
    document.body.insertAdjacentHTML('beforeend', createFooter());
  </script>
  <script src="/js/router.js"></script>
  <script src="/js/navigation-guard.js"></script>
  <script src="/js/navigation.js" defer></script>
`;

function updateHtmlFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace old navigation script with enhanced version
    content = content.replace(
      /<!-- Navigation Scripts -->[\s\S]*?<script[\s\S]*?<\/script>/g,
      enhancedScript.trim()
    );
    
    // Remove duplicate navigation.js script if exists
    content = content.replace(
      /<script src="\/js\/navigation\.js" defer><\/script>/g,
      ''
    );
    
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

console.log('🎉 All HTML files have been updated with enhanced navigation.');
