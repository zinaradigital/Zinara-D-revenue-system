// Update HTML files with correct import statement
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

const correctScript = `
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
    
    // Replace the old import statement
    content = content.replace(
      /<script type="module">\s*import \{ createHeader, createFooter \} from ['"]\.\/components\/header\.js['"];[\s\S]*?<\/script>/,
      correctScript.trim()
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

console.log('🎉 All HTML files have been updated with the correct import statement.');
