// Highlight active navigation link
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        // Handle both root-level and subdirectory navigation
        if (linkHref === currentPage || 
            (linkHref.endsWith(currentPage) && currentPage !== 'index.html') ||
            (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
            // Also add active class to parent li if it exists
            if (link.parentElement) {
                link.parentElement.classList.add('active');
            }
        }
    });
    
    // Mobile menu toggle functionality
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        const allNavLinks = document.querySelectorAll('.nav-link, .nav-cta');
        allNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                if (navToggle) navToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
    
    // Hide nav on scroll down, show on scroll up
    let lastScroll = 0;
    const nav = document.getElementById('nav');
    
    if (nav) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                nav.classList.remove('hidden');
                return;
            }
            
            if (currentScroll > lastScroll && currentScroll > 100) {
                nav.classList.add('hidden');
                if (navMenu) navMenu.classList.remove('active');
                if (navToggle) navToggle.classList.remove('active');
            } else {
                nav.classList.remove('hidden');
            }
            
            lastScroll = currentScroll;
        });
    }
});
