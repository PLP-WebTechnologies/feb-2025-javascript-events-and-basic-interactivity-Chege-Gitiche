// Wait for the DOM to fully load before running JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    /*** SECTION 1: EVENT HANDLING ***/
    
    // Button click event
    const clickMeButton = document.getElementById('click-me');
    const eventOutput = document.getElementById('event-output');
    
    clickMeButton.addEventListener('click', function() {
        eventOutput.textContent = 'Button was clicked! 🎉';
        this.classList.add('pulse');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            this.classList.remove('pulse');
        }, 500);
    });
    
    // Hover event
    const hoverArea = document.getElementById('hover-area');
    
    hoverArea.addEventListener('mouseenter', function() {
        eventOutput.textContent = 'Mouse entered hover area! 🖱️';
    });
    
    hoverArea.addEventListener('mouseleave', function() {
        eventOutput.textContent = 'Mouse left hover area! 👋';
    });
    
    // Keypress detection
    const keyDisplay = document.getElementById('key-display');
    
    document.addEventListener('keydown', function(event) {
        keyDisplay.textContent = `Key: ${event.key} | Code: ${event.code}`;
        eventOutput.textContent = `Key pressed: ${event.key}`;
    });
    
    // Secret action (double-click)
    const secretButton = document.getElementById('secret-button');
    
    secretButton.addEventListener('dblclick', function() {
        eventOutput.textContent = '🎉 SECRET ACTIVATED! You found the double-click! 🎉';
        document.body.style.backgroundColor = '#f8e9a1';
        
        // Reset body background after 2 seconds
        setTimeout(() => {
            document.body.style.backgroundColor = '#f0f2f5';
        }, 2000);
    });
    
    
    /*** SECTION 2: INTERACTIVE ELEMENTS ***/
    
    // Color changing button
    const colorButton = document.getElementById('color-button');
    const colors = ['#e53e3e', '#38a169', '#3182ce', '#805ad5', '#d69e2e'];
    let colorIndex = 0;
    
    colorButton.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        this.style.backgroundColor = colors[colorIndex];
        this.textContent = `Color #${colorIndex + 1}`;
    });
    
    // Image Gallery/Slideshow
    const galleryImages = document.querySelectorAll('.gallery-img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const currentImageText = document.getElementById('current-image');
    let currentImageIndex = 0;
    
    // Function to update which image is displayed
    function updateGallery() {
        // Hide all images
        galleryImages.forEach(img => img.classList.remove('active'));
        
        // Show current image
        galleryImages[currentImageIndex].classList.add('active');
        
        // Update text
        currentImageText.textContent = `Image ${currentImageIndex + 1} of ${galleryImages.length}`;
    }
    
    // Initialize gallery
    updateGallery();
    
    // Navigation buttons
    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        updateGallery();
    });
    
    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateGallery();
    });
    
    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            
            // Toggle active class on the clicked item
            accordionItem.classList.toggle('active');
            
            // Optional: Close other open accordion items
            const allItems = document.querySelectorAll('.accordion-item');
            allItems.forEach(item => {
                if (item !== accordionItem && item.classList.contains('active')) {
                    item.classList.remove('active');
                }
            });
        });
    });
    
    
    /*** SECTION 3: FORM VALIDATION ***/
    
    const validationForm = document.getElementById('validation-form');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const showPasswordCheckbox = document.getElementById('show-password');
    const formResult = document.getElementById('form-result');
    
    // Feedback elements
    const usernameFeedback = document.getElementById('username-feedback');
    const emailFeedback = document.getElementById('email-feedback');
    const passwordFeedback = document.getElementById('password-feedback');
    const confirmFeedback = document.getElementById('confirm-feedback');
    
    // Show/hide password toggle
    showPasswordCheckbox.addEventListener('change', function() {
        const type = this.checked ? 'text' : 'password';
        passwordInput.type = type;
        confirmPasswordInput.type = type;
    });
    
    // Real-time validation for username
    usernameInput.addEventListener('input', function() {
        if (this.value.trim().length < 3) {
            usernameFeedback.textContent = 'Username must be at least 3 characters';
            usernameFeedback.className = 'feedback invalid-feedback';
        } else {
            usernameFeedback.textContent = 'Username looks good!';
            usernameFeedback.className = 'feedback valid-feedback';
        }
    });
    
    // Real-time validation for email
    emailInput.addEventListener('input', function() {
        // Simple email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailRegex.test(this.value.trim())) {
            emailFeedback.textContent = 'Email format is valid!';
            emailFeedback.className = 'feedback valid-feedback';
        } else {
            emailFeedback.textContent = 'Please enter a valid email address';
            emailFeedback.className = 'feedback invalid-feedback';
        }
    });
    
    // Real-time validation for password
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        
        if (password.length < 8) {
            passwordFeedback.textContent = 'Password must be at least 8 characters';
            passwordFeedback.className = 'feedback invalid-feedback';
        } else if (!/[A-Z]/.test(password)) {
            passwordFeedback.textContent = 'Password must include at least one uppercase letter';
            passwordFeedback.className = 'feedback invalid-feedback';
        } else if (!/[0-9]/.test(password)) {
            passwordFeedback.textContent = 'Password must include at least one number';
            passwordFeedback.className = 'feedback invalid-feedback';
        } else {
            passwordFeedback.textContent = 'Password strength: Strong';
            passwordFeedback.className = 'feedback valid-feedback';
        }
        
        // Check password confirmation match if confirm field has input
        if (confirmPasswordInput.value) {
            checkPasswordMatch();
        }
    });
    
    // Check if passwords match
    function checkPasswordMatch() {
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmFeedback.textContent = 'Passwords do not match';
            confirmFeedback.className = 'feedback invalid-feedback';
            return false;
        } else {
            confirmFeedback.textContent = 'Passwords match!';
            confirmFeedback.className = 'feedback valid-feedback';
            return true;
        }
    }
    
    // Real-time validation for password confirmation
    confirmPasswordInput.addEventListener('input', checkPasswordMatch);
    
    // Form submission handling
    validationForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent actual form submission
        
        // Trigger validation for all fields
        let isValid = true;
        
        // Validate username
        if (usernameInput.value.trim().length < 3) {
            usernameFeedback.textContent = 'Username must be at least 3 characters';
            usernameFeedback.className = 'feedback invalid-feedback';
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailFeedback.textContent = 'Please enter a valid email address';
            emailFeedback.className = 'feedback invalid-feedback';
            isValid = false;
        }
        
        // Validate password
        const password = passwordInput.value;
        if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
            passwordFeedback.textContent = 'Password must be at least 8 characters with 1 uppercase letter and 1 number';
            passwordFeedback.className = 'feedback invalid-feedback';
            isValid = false;
        }
        
        // Check passwords match
        if (!checkPasswordMatch()) {
            isValid = false;
        }
        
        // Show form result
        formResult.style.display = 'block';
        
        if (isValid) {
            formResult.textContent = 'Form submitted successfully! 🎉';
            formResult.className = 'form-success';
            
            // Optional: Reset form after successful submission
            setTimeout(() => {
                validationForm.reset();
                formResult.style.display = 'none';
                
                // Clear feedback messages
                const feedbacks = document.querySelectorAll('.feedback');
                feedbacks.forEach(el => el.textContent = '');
            }, 3000);
        } else {
            formResult.textContent = 'Please fix the errors in the form.';
            formResult.className = 'form-error';
            
            // Hide error message after 3 seconds
            setTimeout(() => {
                formResult.style.display = 'none';
            }, 3000);
        }
    });
});