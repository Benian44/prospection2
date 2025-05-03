/**
 * DMCI IMMOBILIER - Homepage Slider Script
 * This script handles the hero slider and testimonial slider functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize hero slider
    initHeroSlider();
    
    // Initialize testimonials slider
    initTestimonialsSlider();
});

/**
 * Initialize hero slider functionality
 */
function initHeroSlider() {
    const sliderContainer = document.querySelector('.slider-container');
    
    if (!sliderContainer) return;
    
    const slides = sliderContainer.querySelectorAll('.slide');
    const dotsContainer = sliderContainer.querySelector('.slider-dots');
    const prevButton = sliderContainer.querySelector('.prev');
    const nextButton = sliderContainer.querySelector('.next');
    
    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 5000; // Time between auto slides (5 seconds)
    
    // Create dots based on number of slides
    if (dotsContainer) {
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    // Initialize auto sliding
    startSlideInterval();
    
    // Event listeners for controls
    if (prevButton) {
        prevButton.addEventListener('click', prevSlide);
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', nextSlide);
    }
    
    // Pause auto sliding on hover
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', startSlideInterval);
    
    /**
     * Go to a specific slide
     * @param {number} slideIndex - The index of the slide to display
     */
    function goToSlide(slideIndex) {
        // Hide current slide
        slides[currentSlide].classList.remove('active');
        
        // Update dots
        if (dotsContainer) {
            const dots = dotsContainer.querySelectorAll('.dot');
            dots[currentSlide].classList.remove('active');
            dots[slideIndex].classList.add('active');
        }
        
        // Show new slide
        currentSlide = slideIndex;
        slides[currentSlide].classList.add('active');
    }
    
    /**
     * Go to the next slide
     */
    function nextSlide() {
        const newIndex = (currentSlide + 1) % slides.length;
        goToSlide(newIndex);
    }
    
    /**
     * Go to the previous slide
     */
    function prevSlide() {
        const newIndex = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(newIndex);
    }
    
    /**
     * Start auto sliding
     */
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }
}

/**
 * Initialize testimonials slider functionality
 */
function initTestimonialsSlider() {
    const testimonialContainer = document.querySelector('.testimonials-container');
    
    if (!testimonialContainer) return;
    
    const testimonials = testimonialContainer.querySelectorAll('.testimonial');
    const dotsContainer = testimonialContainer.querySelector('.testimonial-dots');
    const prevButton = testimonialContainer.querySelector('.prev-testimonial');
    const nextButton = testimonialContainer.querySelector('.next-testimonial');
    
    let currentTestimonial = 0;
    let testimonialInterval;
    const intervalTime = 6000; // Time between auto slides (6 seconds)
    
    // Create dots based on number of testimonials
    if (dotsContainer) {
        testimonials.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('testimonial-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToTestimonial(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    // Initialize auto sliding
    startTestimonialInterval();
    
    // Event listeners for controls
    if (prevButton) {
        prevButton.addEventListener('click', prevTestimonial);
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', nextTestimonial);
    }
    
    // Pause auto sliding on hover
    testimonialContainer.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    testimonialContainer.addEventListener('mouseleave', startTestimonialInterval);
    
    /**
     * Go to a specific testimonial
     * @param {number} testimonialIndex - The index of the testimonial to display
     */
    function goToTestimonial(testimonialIndex) {
        // Hide current testimonial
        testimonials[currentTestimonial].classList.remove('active');
        
        // Update dots
        if (dotsContainer) {
            const dots = dotsContainer.querySelectorAll('.testimonial-dot');
            dots[currentTestimonial].classList.remove('active');
            dots[testimonialIndex].classList.add('active');
        }
        
        // Show new testimonial
        currentTestimonial = testimonialIndex;
        testimonials[currentTestimonial].classList.add('active');
    }
    
    /**
     * Go to the next testimonial
     */
    function nextTestimonial() {
        const newIndex = (currentTestimonial + 1) % testimonials.length;
        goToTestimonial(newIndex);
    }
    
    /**
     * Go to the previous testimonial
     */
    function prevTestimonial() {
        const newIndex = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        goToTestimonial(newIndex);
    }
    
    /**
     * Start auto sliding
     */
    function startTestimonialInterval() {
        testimonialInterval = setInterval(nextTestimonial, intervalTime);
    }
}