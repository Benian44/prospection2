/**
 * DMCI IMMOBILIER - Contact Page Scripts
 * This script handles contact form functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize contact form
    initContactForm();
});

/**
 * Initialize contact form functionality
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validate form
        if (!validateForm(name, email, message)) {
            return;
        }
        
        // In a real implementation, this would send the form data to a server
        // For demo purposes, we'll simulate a successful submission
        
        // Disable form while "submitting"
        toggleFormElements(contactForm, true);
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Envoi en cours...';
        
        // Simulate AJAX request
        setTimeout(() => {
            // Re-enable form
            toggleFormElements(contactForm, false);
            
            // Reset button text
            submitButton.textContent = originalButtonText;
            
            // Show success message
            showFormMessage('Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.', 'success');
            
            // Reset form
            contactForm.reset();
        }, 1500);
    });
    
    /**
     * Validate the contact form
     * @param {string} name - The name value
     * @param {string} email - The email value
     * @param {string} message - The message value
     * @returns {boolean} - Whether the form is valid
     */
    function validateForm(name, email, message) {
        // Reset previous error messages
        showFormMessage('', '');
        
        // Validate required fields
        if (!name || !email || !message) {
            showFormMessage('Veuillez remplir tous les champs obligatoires.', 'error');
            return false;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Veuillez entrer une adresse email valide.', 'error');
            return false;
        }
        
        return true;
    }
    
    /**
     * Display a form message
     * @param {string} message - The message to display
     * @param {string} type - The message type ('success' or 'error')
     */
    function showFormMessage(message, type) {
        const messageElement = document.getElementById('form-message');
        
        if (!messageElement) return;
        
        if (!message) {
            messageElement.style.display = 'none';
            messageElement.textContent = '';
            messageElement.className = 'form-message';
            return;
        }
        
        messageElement.textContent = message;
        messageElement.className = `form-message ${type}`;
        messageElement.style.display = 'block';
        
        // Scroll to the message
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    /**
     * Toggle form elements (enable/disable)
     * @param {HTMLFormElement} form - The form element
     * @param {boolean} disabled - Whether to disable the elements
     */
    function toggleFormElements(form, disabled) {
        const elements = form.querySelectorAll('input, textarea, button');
        
        elements.forEach(element => {
            element.disabled = disabled;
        });
    }
}