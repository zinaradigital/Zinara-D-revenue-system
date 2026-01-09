export function createHeader() {
  return `
    <header class="header">
      <nav class="nav" id="nav" aria-label="Main navigation">
        <div class="nav-container">
          <a href="/" class="nav-logo" aria-label="Zinara Home">
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
              <a href="/systems.html" class="nav-link" role="menuitem">Systems</a>
            </li>
            <li role="none">
              <a href="/failure.html" class="nav-link" role="menuitem">How Systems Fail</a>
            </li>
            <li role="none">
              <a href="/results.html" class="nav-link" role="menuitem">Results</a>
            </li>
            <li role="none">
              <a href="/portfolio.html" class="nav-link" role="menuitem">Portfolio</a>
            </li>
            <li role="none">
              <a href="/insights.html" class="nav-link" role="menuitem">Insights</a>
            </li>
            <li role="none">
              <a href="/about.html" class="nav-link" role="menuitem">About</a>
            </li>
            <li role="none">
              <a href="/contact.html" class="nav-link" role="menuitem">Contact</a>
            </li>
            <li role="none" class="nav-cta-wrapper">
              <a href="/audit.html" class="nav-cta" role="menuitem">Request Audit</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  `;
}
