export function createFooter() {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <h3>ZINARA</h3>
            <p>Revenue Recovery Systems</p>
            <ul class="footer-contact">
              <li><strong>Email:</strong> <a href="mailto:info@zinara.co.ke">info@zinara.co.ke</a></li>
              <li><strong>Phone:</strong> <a href="tel:+254798859452">+254 798 859 452</a></li>
              <li><strong>Location:</strong> Kenya & East Africa</li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4>Services</h4>
            <ul class="footer-links">
              <li><a href="/audit.html">Revenue Recovery Audit</a></li>
              <li><a href="/systems.html">Systems</a></li>
              <li><a href="/insights.html">Insights</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4>Company</h4>
            <ul class="footer-links">
              <li><a href="/about.html">About</a></li>
              <li><a href="/contact.html">Contact</a></li>
              <li><a href="/privacy.html">Privacy Policy</a></li>
              <li><a href="/terms.html">Terms</a></li>
            </ul>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} Zinara. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `;
}
