export function createHeader() {
  return `
    <header class="header">
      <nav class="nav" id="nav" aria-label="Main navigation">
        <div class="nav-container">
          <a href="index.html" class="nav-logo" aria-label="Zinara Home">
            <span>ZINARA</span>
          </a>
          
          <button 
            class="nav-toggle" 
            id="nav-toggle" 
            aria-label="Toggle menu" 
            aria-expanded="false" 
            aria-controls="nav-menu"
          >
            <span class="hamburger" aria-hidden="true"></span>
          </button>
          
          <ul class="nav-menu" id="nav-menu" role="menubar">
            <li role="none">
              <a href="systems.html" class="nav-link" role="menuitem">Systems</a>
            </li>
            <li role="none">
              <a href="failure.html" class="nav-link" role="menuitem">How Systems Fail</a>
            </li>
            <li role="none">
              <a href="results.html" class="nav-link" role="menuitem">Results</a>
            </li>
            <li role="none">
              <a href="portfolio.html" class="nav-link" role="menuitem">Portfolio</a>
            </li>
            <li role="none">
              <a href="insights.html" class="nav-link" role="menuitem">Insights</a>
            </li>
            <li role="none">
              <a href="about.html" class="nav-link" role="menuitem">About</a>
            </li>
            <li role="none">
              <a href="contact.html" class="nav-link" role="menuitem">Contact</a>
            </li>
            <li role="none" class="nav-cta-wrapper">
              <a href="audit.html" class="nav-cta" role="menuitem">Request Audit</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  `;
}

export function createHeaderWithBreadcrumbs() {
  const header = createHeader();
  
  // Always try to create breadcrumbs, but don't fail if router isn't ready
  const breadcrumbScript = `
    <script type="module">
      import { createBreadcrumbs } from './components/breadcrumbs.js';
      document.body.insertAdjacentHTML('afterbegin', createBreadcrumbs());
    </script>
  `;
  
  return header + breadcrumbScript;
}
}

export function createFooter() {
  const currentYear = new Date().getFullYear();
  
  return `
    <footer class="footer" role="contentinfo">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <h3 class="footer-heading">ZINARA</h3>
            <p class="footer-tagline">Revenue Recovery Systems</p>
            <address class="footer-contact">
              <p><strong>Email:</strong> <a href="mailto:info@zinara.co.ke">info@zinara.co.ke</a></p>
              <p><strong>Phone:</strong> <a href="tel:+254798859452">+254 798 859 452</a></p>
              <p><strong>Location:</strong> Kenya & East Africa</p>
            </address>
          </div>
          
          <div class="footer-section">
            <h4 class="footer-heading">Services</h4>
            <ul class="footer-links">
              <li><a href="audit.html">Revenue Recovery Audit</a></li>
              <li><a href="systems.html">Systems</a></li>
              <li><a href="insights.html">Insights</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4 class="footer-heading">Company</h4>
            <ul class="footer-links">
              <li><a href="about.html">About Us</a></li>
              <li><a href="contact.html">Contact Us</a></li>
              <li><a href="privacy.html">Privacy Policy</a></li>
              <li><a href="terms.html">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; ${currentYear} Zinara. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `;
}
