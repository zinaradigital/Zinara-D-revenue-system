export function createHeader() {
  return `
    <nav class="nav" id="nav">
      <div class="nav-container">
        <a href="/" class="nav-logo">ZINARA</a>
        
        <button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <ul class="nav-menu" id="nav-menu">
          <li><a href="/systems.html" class="nav-link">Systems</a></li>
          <li><a href="/failure.html" class="nav-link">How Systems Fail</a></li>
          <li><a href="/results.html" class="nav-link">Results</a></li>
          <li><a href="/portfolio.html" class="nav-link">Portfolio</a></li>
          <li><a href="/insights.html" class="nav-link">Insights</a></li>
          <li><a href="/about.html" class="nav-link">About</a></li>
          <li><a href="/contact.html" class="nav-link">Contact</a></li>
          <li><a href="/audit.html" class="nav-cta">Request Audit</a></li>
        </ul>
      </div>
    </nav>
  `;
}
