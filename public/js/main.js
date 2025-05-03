/**
 * DMCI IMMOBILIER - Main JavaScript
 * This script handles common functionality shared across all pages
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize header scroll effect
    initHeaderScroll();
    
    // Initialize mobile menu toggle
    initMobileMenu();
    
    // Initialize smooth scrolling for anchor links
    initSmoothScroll();

    // Initialize lazy loading for images
    initLazyLoading();
});

/**
 * Handle header style changes on scroll
 */
function initHeaderScroll() {
    const header = document.getElementById('header');
    const scrollThreshold = 50;
    
    // Apply scrolled class initially if page is not at the top
    if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    
    if (!menuToggle || !menu) return;
    
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        menu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.menu') && !event.target.closest('.menu-toggle')) {
            menuToggle.classList.remove('active');
            menu.classList.remove('active');
        }
    });
    
    // Close menu when clicking menu items
    const menuItems = menu.querySelectorAll('a');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            menu.classList.remove('active');
        });
    });
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    const smoothScrollLinks = document.querySelectorAll('a.smooth-scroll');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize lazy loading for images
 */
function initLazyLoading() {
    // Check if the browser supports Intersection Observer
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support Intersection Observer
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        // Simple scroll-based lazy loading
        function lazyLoad() {
            lazyImages.forEach(img => {
                if (img.getBoundingClientRect().top <= window.innerHeight && 
                    img.getBoundingClientRect().bottom >= 0 && 
                    getComputedStyle(img).display !== 'none') {
                    
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
            });
            
            // If all images are loaded, stop checking
            if (lazyImages.length === 0) {
                window.removeEventListener('scroll', lazyLoad);
                window.removeEventListener('resize', lazyLoad);
                window.removeEventListener('orientationChange', lazyLoad);
            }
        }
        
        // Add event listeners
        window.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationChange', lazyLoad);
        
        // Initial check
        lazyLoad();
    }
}

/**
 * Helper function to animate counting for numbers
 * @param {HTMLElement} element - The element containing the number to animate
 * @param {number} target - The target number to count to
 * @param {number} duration - Animation duration in milliseconds
 */
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target > 100 ? 1 : 0.1;
    const stepTime = Math.abs(Math.floor(duration / (target / increment)));
    
    const timer = setInterval(function() {
        start += increment;
        
        // Format the displayed number
        const formattedNumber = target > 100 ? 
            Math.floor(start) : 
            parseFloat(start.toFixed(1));
            
        element.textContent = formattedNumber + (element.textContent.includes('+') ? '+' : '');
        
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        }
    }, stepTime);
}

/**
 * Function to check if an element is in viewport
 * @param {HTMLElement} element - The element to check
 * @returns {boolean} - Whether the element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}