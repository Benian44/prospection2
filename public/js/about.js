/**
 * DMCI IMMOBILIER - About Page Scripts
 * This script handles about page specific functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize counter animation
    initCounterAnimation();
});

/**
 * Initialize counter animation for the numbers section
 */
function initCounterAnimation() {
    const numberItems = document.querySelectorAll('.number-value');
    
    if (!numberItems.length) return;
    
    // Use IntersectionObserver to trigger animation when scrolled into view
    if ('IntersectionObserver' in window) {
        const numberObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const target = parseInt(element.getAttribute('data-count'), 10);
                    
                    // Animate the counter
                    animateCounter(element, target);
                    
                    // Stop observing after animation
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.1 });
        
        // Observe all number elements
        numberItems.forEach(number => {
            numberObserver.observe(number);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        function checkScroll() {
            numberItems.forEach(element => {
                if (isInViewport(element) && !element.classList.contains('animated')) {
                    element.classList.add('animated');
                    const target = parseInt(element.getAttribute('data-count'), 10);
                    animateCounter(element, target);
                }
            });
            
            // If all counters are animated, remove the scroll listener
            const allAnimated = Array.from(numberItems).every(item => 
                item.classList.contains('animated')
            );
            
            if (allAnimated) {
                window.removeEventListener('scroll', checkScroll);
            }
        }
        
        // Add scroll event listener
        window.addEventListener('scroll', checkScroll);
        
        // Initial check
        checkScroll();
    }
}