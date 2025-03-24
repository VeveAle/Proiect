document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', handleSubmit);
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    validateField(input);
                }
            });
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        // Reset form state
        resetFormState();
        
        // Validate all required fields
        let isValid = true;
        
        if (!validateField(nameInput)) isValid = false;
        if (!validateField(emailInput)) isValid = false;
        if (!validateField(messageInput)) isValid = false;

        if (isValid) {
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            // Simulate API call
            setTimeout(() => {
                showFormMessage('Message sent successfully! We\'ll get back to you soon.', 'success');
                contactForm.reset();
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }, 1500);
        }
    }

    function validateField(field) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        let isValid = true;
        let errorMessage = '';

        // Remove existing error state
        formGroup.classList.remove('error');
        
        // Check required fields
        if (field.required && !field.value.trim()) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Email validation
        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value.trim())) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Name validation (minimum length)
        if (field.id === 'name' && field.value.trim()) {
            if (field.value.trim().length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters long';
            }
        }

        // Message validation (minimum length)
        if (field.id === 'message' && field.value.trim()) {
            if (field.value.trim().length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters long';
            }
        }

        // Show error if validation failed
        if (!isValid) {
            formGroup.classList.add('error');
            errorElement.textContent = errorMessage;
        }

        return isValid;
    }

    function resetFormState() {
        // Clear all error states
        const formGroups = contactForm.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('error');
            const errorElement = group.querySelector('.error-message');
            if (errorElement) errorElement.textContent = '';
        });

        // Clear form message
        formMessage.className = 'form-message';
        formMessage.textContent = '';
    }

    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        
        // Scroll to message if it's not in view
        if (!isElementInViewport(formMessage)) {
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
});