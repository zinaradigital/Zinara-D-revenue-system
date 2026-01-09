// Simple client-side router for static HTML pages
class SimpleRouter {
  constructor() {
    this.routes = new Map();
    this.currentPath = '';
    this.init();
  }

  // Define all valid routes
  init() {
    this.routes.set('index.html', { title: 'Home', path: 'index.html' });
    this.routes.set('systems.html', { title: 'Systems', path: 'systems.html' });
    this.routes.set('failure.html', { title: 'How Systems Fail', path: 'failure.html' });
    this.routes.set('results.html', { title: 'Results', path: 'results.html' });
    this.routes.set('portfolio.html', { title: 'Portfolio', path: 'portfolio.html' });
    this.routes.set('insights.html', { title: 'Insights', path: 'insights.html' });
    this.routes.set('about.html', { title: 'About', path: 'about.html' });
    this.routes.set('contact.html', { title: 'Contact', path: 'contact.html' });
    this.routes.set('audit.html', { title: 'Request Audit', path: 'audit.html' });
    this.routes.set('privacy.html', { title: 'Privacy Policy', path: 'privacy.html' });
    this.routes.set('terms.html', { title: 'Terms of Service', path: 'terms.html' });
    
    // Handle subdirectory routes
    this.routes.set('systems/workflow-automation.html', { 
      title: 'Workflow Automation', 
      path: 'systems/workflow-automation.html',
      parent: 'systems.html'
    });
  }

  // Get current page info
  getCurrentPage() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    return this.routes.get(path) || this.routes.get('index.html');
  }

  // Check if route exists
  routeExists(path) {
    return this.routes.has(path);
  }

  // Get parent route
  getParentRoute(path) {
    const route = this.routes.get(path);
    return route && route.parent ? this.routes.get(route.parent) : null;
  }

  // Navigate to a route
  navigate(path, options = {}) {
    if (!this.routeExists(path)) {
      console.warn(`Route ${path} does not exist`);
      // Fallback to parent route if available
      const parent = this.getParentRoute(path);
      if (parent && options.fallback) {
        path = parent.path;
      } else {
        return false;
      }
    }
    
    if (path) {
      window.location.href = path;
      return true;
    }
    return false;
  }

  // Generate breadcrumbs
  generateBreadcrumbs() {
    const breadcrumbs = [];
    const current = this.getCurrentPage();
    
    // Add home
    breadcrumbs.push({ title: 'Home', path: 'index.html' });
    
    // Add parent if in subdirectory
    if (current.parent) {
      const parent = this.routes.get(current.parent);
      breadcrumbs.push({ title: parent.title, path: parent.path });
    }
    
    // Add current page
    if (current.path !== 'index.html') {
      breadcrumbs.push({ title: current.title, path: current.path });
    }
    
    return breadcrumbs;
  }

  // Store navigation history
  addToHistory(path) {
    const history = JSON.parse(sessionStorage.getItem('navHistory') || '[]');
    history.unshift({ path, timestamp: Date.now() });
    // Keep only last 10 items
    if (history.length > 10) history.pop();
    sessionStorage.setItem('navHistory', JSON.stringify(history));
  }

  // Get navigation history
  getHistory() {
    return JSON.parse(sessionStorage.getItem('navHistory') || '[]');
  }
}

// Initialize router
window.router = new SimpleRouter();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SimpleRouter;
}
