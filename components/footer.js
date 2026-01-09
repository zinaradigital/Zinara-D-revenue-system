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
              <li><a href="/audit.html">Revenue Recovery Audit</a></li>
              <li><a href="/systems.html">Systems</a></li>
              <li><a href="/insights.html">Insights</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4 class="footer-heading">Company</h4>
            <ul class="footer-links">
              <li><a href="/about.html">About Us</a></li>
              <li><a href="/contact.html">Contact Us</a></li>
              <li><a href="/privacy.html">Privacy Policy</a></li>
              <li><a href="/terms.html">Terms of Service</a></li>
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
