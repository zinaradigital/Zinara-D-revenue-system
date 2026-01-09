// Enhanced navigation functionality with improved mobile support and accessibility
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu elements
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link, .nav-cta');
  const nav = document.getElementById('nav');
  const html = document.documentElement;

  // Set active link based on current page
  function setActiveLink() {
    const currentPath = window.location.pathname;
    navLinks.forEach(link => {
      const linkPath = new URL(link.href).pathname;
      const isActive = currentPath === linkPath || 
                      (currentPath.endsWith('/') && linkPath.endsWith('index.html')) ||
                      (currentPath === '' && linkPath.endsWith('index.html'));
      
      if (isActive) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
        // Ensure parent list item is also marked as active
        const parentLi = link.closest('li');
        if (parentLi) {
          parentLi.classList.add('active');
        }
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  // Toggle mobile menu
  function toggleMenu(isOpen) {
    const newState = isOpen ?? navToggle.getAttribute('aria-expanded') !== 'true';
    
    // Update ARIA attributes
    navToggle.setAttribute('aria-expanded', String(newState));
    navToggle.setAttribute('aria-label', newState ? 'Close menu' : 'Open menu');
    
    // Toggle menu visibility
    navMenu.classList.toggle('active', newState);
    navToggle.classList.toggle('active', newState);
    html.classList.toggle('menu-open', newState);
  }

  // Initialize navigation
  function initNavigation() {
    // Set initial active link
    setActiveLink();
    
    // Toggle menu on button click
    if (navToggle) {
      navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
      });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && navMenu.classList.contains('active')) {
        toggleMenu(false);
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        toggleMenu(false);
        navToggle.focus();
      }
    });

    // Handle keyboard navigation in menu
    if (navMenu) {
      const focusableElements = 'a[href], button, [tabindex]:not([tabindex="-1"])';
      const firstFocusable = navMenu.querySelectorAll(focusableElements)[0];
      const focusableContent = navMenu.querySelectorAll(focusableElements);
      const lastFocusable = focusableContent[focusableContent.length - 1];

      navMenu.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
              lastFocusable.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastFocusable) {
              firstFocusable.focus();
              e.preventDefault();
            }
          }
        }
      });
    }

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth >= 768) {
          toggleMenu(false);
        }
      }, 250);
    });

    // Hide/show nav on scroll
    let lastScroll = 0;
    const scrollThreshold = 100;
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.pageYOffset;

          if (currentScroll <= 0) {
            nav.classList.remove('hidden');
          } else if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
            nav.classList.add('hidden');
            toggleMenu(false);
          } else {
            nav.classList.remove('hidden');
          }

          lastScroll = currentScroll;
          ticking = false;
        });

        ticking = true;
      }
    }, { passive: true });
  }

  // Initialize navigation
  initNavigation();
});
