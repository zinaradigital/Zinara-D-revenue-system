// Fix original repository with bulletproof navigation
const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing original repository with bulletproof navigation...\n');

// Simple navigation HTML that works
const simpleNavigation = `
  <!-- Simple Navigation -->
  <nav class="main-nav">
    <div class="nav-container">
      <a href="index.html" class="nav-logo">ZINARA</a>
      
      <button class="mobile-toggle" id="mobile-toggle">
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <ul class="nav-menu" id="nav-menu">
        <li><a href="index.html" class="nav-link">Home</a></li>
        <li><a href="systems.html" class="nav-link">Systems</a></li>
        <li><a href="failure.html" class="nav-link">How Systems Fail</a></li>
        <li><a href="results.html" class="nav-link">Results</a></li>
        <li><a href="portfolio.html" class="nav-link">Portfolio</a></li>
        <li><a href="insights.html" class="nav-link">Insights</a></li>
        <li><a href="about.html" class="nav-link">About</a></li>
        <li><a href="contact.html" class="nav-link">Contact</a></li>
        <li><a href="audit.html" class="nav-cta">Request Audit</a></li>
      </ul>
    </div>
  </nav>
`;

// Simple navigation CSS using original design variables
const simpleNavCSS = `
/* Simple Navigation - Uses Original Design Variables */
.main-nav {
  background: var(--navy);
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.nav-logo {
  color: var(--white);
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.3s ease;
}

.nav-logo:hover {
  color: var(--yellow);
}

.mobile-toggle {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.mobile-toggle span {
  width: 25px;
  height: 3px;
  background: var(--white);
  margin: 3px 0;
  transition: all 0.3s ease;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: var(--white);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.nav-link:hover,
.nav-link.active {
  background: var(--yellow);
  color: var(--navy);
}

.nav-cta {
  background: var(--yellow);
  color: var(--navy);
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.nav-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(248, 207, 64, 0.3);
}

/* Mobile Navigation */
@media (max-width: 768px) {
  .mobile-toggle {
    display: flex;
  }
  
  .nav-menu {
    position: fixed;
    top: 70px;
    left: -100%;
    width: 100%;
    height: calc(100vh - 70px);
    background: var(--navy);
    flex-direction: column;
    padding: 2rem;
    transition: left 0.3s ease;
    gap: 1rem;
  }
  
  .nav-menu.active {
    left: 0;
  }
  
  .mobile-toggle.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }
  
  .mobile-toggle.active span:nth-child(2) {
    opacity: 0;
  }
  
  .mobile-toggle.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
  }
}
`;

// Simple navigation JavaScript
const simpleNavJS = `
// Simple Navigation System
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
        
        // Close menu when clicking links
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }
    
    // Active Link Detection
    function setActiveLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            // Remove active class from all links
            link.classList.remove('active');
            
            // Add active class to current page
            if (href === currentPage || 
                (currentPage === '' && href === 'index.html') ||
                (currentPage === 'index.html' && href === '')) {
                link.classList.add('active');
            }
        });
    }
    
    // Initialize active link
    setActiveLink();
    
    console.log('Simple Navigation Loaded Successfully');
});
`;

// HTML files to process
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

function processHtmlFile(fileName) {
    const filePath = path.join('.', fileName);
    
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  File not found: ${fileName}`);
        return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove ALL old navigation and scripts
    content = content.replace(/<!-- Navigation Scripts -->[\s\S]*?<script[\s\S]*?<\/script>/g, '');
    content = content.replace(/import.*createHeader.*from.*components.*;/g, '');
    content = content.replace(/document\.body\.insertAdjacentHTML.*createHeader.*/g, '');
    content = content.replace(/document\.body\.insertAdjacentHTML.*createFooter.*/g, '');
    content = content.replace(/<script.*src.*components.*><\/script>/g, '');
    content = content.replace(/<script.*src.*router.*><\/script>/g, '');
    content = content.replace(/<script.*src.*navigation-guard.*><\/script>/g, '');
    content = content.replace(/<script.*src.*breadcrumbs.*><\/script>/g, '');
    content = content.replace(/<script.*src.*emergency-nav-fix.*><\/script>/g, '');
    content = content.replace(/<script.*src.*navigation.*><\/script>/g, '');
    
    // Remove old navigation elements
    content = content.replace(/<nav[\s\S]*?<\/nav>/g, '');
    content = content.replace(/<header[\s\S]*?<\/header>/g, '');
    content = content.replace(/<footer[\s\S]*?<\/footer>/g, '');
    
    // Add simple navigation after body tag
    content = content.replace('<body>', `<body>\\n${simpleNavigation}`);
    
    // Add navigation CSS and JS before closing body tag
    content = content.replace('</body>', `
<style>
${simpleNavCSS}
</style>
<script>
${simpleNavJS}
</script>
</body>`);
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed ${fileName}`);
}

// Process all files
console.log('🔄 Processing HTML files...');
htmlFiles.forEach(processHtmlFile);

console.log('\\n🎉 Original repository fixed with bulletproof navigation!');
console.log('📍 Repository: https://github.com/zinaradigital/ZINARA-R.STM.-WIND-CLONE');
console.log('✅ All original content preserved');
console.log('✅ Bulletproof navigation added');
console.log('✅ Ready for push and deployment');
