// Navigation guard to prevent broken links
class NavigationGuard {
  constructor() {
    this.init();
  }

  init() {
    // Intercept all navigation clicks
    document.addEventListener('click', this.handleNavigationClick.bind(this));
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', this.handlePopState.bind(this));
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', this.handleKeyboardShortcuts.bind(this));
  }

  handleNavigationClick(event) {
    const link = event.target.closest('a');
    if (!link) return;
    
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return; // Allow internal links and mail/phone
    }
    
    // Check if the route exists
    if (!window.router.routeExists(href)) {
      event.preventDefault();
      this.showRouteError(href);
      return;
    }
    
    // Add to history
    window.router.addToHistory(href);
  }

  handlePopState(event) {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    if (!window.router.routeExists(path)) {
      // Redirect to safe route
      const parent = window.router.getParentRoute(path);
      if (parent) {
        window.location.href = parent.path;
      }
    }
  }

  handleKeyboardShortcuts(event) {
    // Alt + Left arrow for back navigation
    if (event.altKey && event.key === 'ArrowLeft') {
      event.preventDefault();
      this.navigateBack();
    }
    
    // Alt + Right arrow for forward navigation
    if (event.altKey && event.key === 'ArrowRight') {
      event.preventDefault();
      this.navigateForward();
    }
  }

  navigateBack() {
    const history = window.router.getHistory();
    const currentIndex = history.findIndex(h => h.path === window.location.pathname);
    
    if (currentIndex > 0 && currentIndex < history.length - 1) {
      const previousRoute = history[currentIndex + 1];
      if (window.router.routeExists(previousRoute.path)) {
        window.location.href = previousRoute.path;
      }
    }
  }

  navigateForward() {
    const history = window.router.getHistory();
    const currentIndex = history.findIndex(h => h.path === window.location.pathname);
    
    if (currentIndex > 0) {
      const nextRoute = history[currentIndex - 1];
      if (window.router.routeExists(nextRoute.path)) {
        window.location.href = nextRoute.path;
      }
    }
  }

  showRouteError(attemptedPath) {
    const parent = window.router.getParentRoute(attemptedPath);
    const fallbackPath = parent ? parent.path : 'index.html';
    
    // Create error modal
    const modal = document.createElement('div');
    modal.className = 'route-error-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <h3>Page Not Found</h3>
        <p>The page "${attemptedPath}" doesn't exist.</p>
        <p>Would you like to navigate to <strong>${parent ? parent.title : 'Home'}</strong> instead?</p>
        <div class="modal-buttons">
          <button class="btn btn-primary" onclick="window.router.navigate('${fallbackPath}')">
            Go to ${parent ? parent.title : 'Home'}
          </button>
          <button class="btn btn-secondary" onclick="this.closest('.route-error-modal').remove()">
            Cancel
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (modal.parentNode) {
        modal.remove();
      }
    }, 10000);
  }
}

// Initialize navigation guard
window.navigationGuard = new NavigationGuard();
