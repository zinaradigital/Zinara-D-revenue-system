// Emergency navigation fix - guaranteed working navigation
document.addEventListener('DOMContentLoaded', function() {
  // Create a simple, reliable navigation system
  const navLinks = document.querySelectorAll('.nav-link, .nav-cta');
  
  // Simple active state detection
  function setActiveLinkSimple() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || 
          (currentPage === '' && href === 'index.html') ||
          (currentPage === 'index.html' && href === '')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }
  
  // Override any broken router
  if (window.router) {
    // Keep existing router but add fallback
    const originalNavigate = window.router.navigate;
    window.router.navigate = function(path, options) {
      // Always try to navigate
      const result = originalNavigate.call(this, path, options);
      
      // If navigation fails, provide fallback
      if (!result) {
        console.warn('Navigation failed, providing fallback');
        // Fallback to parent or home
        const pathParts = path.split('/');
        const parentPath = pathParts.length > 1 ? pathParts[0] + '.html' : 'index.html';
        
        // Show user-friendly message
        const fallbackDiv = document.createElement('div');
        fallbackDiv.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: #ff6b6b;
          color: white;
          padding: 10px 15px;
          border-radius: 5px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
          z-index: 9999;
          font-size: 14px;
          max-width: 300px;
        `;
        fallbackDiv.innerHTML = `
          <strong>Navigation Issue</strong><br>
          Redirecting to safe page...
        `;
        
        document.body.appendChild(fallbackDiv);
        
        // Redirect after 2 seconds
        setTimeout(() => {
          window.location.href = parentPath;
        }, 2000);
        
        return true; // Prevent default error handling
      }
      
      return result;
    };
  }
  
  // Initialize simple navigation
  setActiveLinkSimple();
  
  // Mobile menu functionality (simplified)
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
    
    // Close menu when clicking links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
  }
  
  // Basic scroll hide/show
  let lastScroll = 0;
  const nav = document.getElementById('nav');
  
  if (nav) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > lastScroll && currentScroll > 100) {
        nav.style.transform = 'translateY(-100%)';
      } else {
        nav.style.transform = 'translateY(0)';
      }
      
      lastScroll = currentScroll;
    }, { passive: true });
  }
});
