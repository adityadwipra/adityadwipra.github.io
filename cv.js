


// Industrial Portfolio - Enhanced Functionality
class IndustrialPortfolio {
    constructor() {
        this.lastScrollY = window.scrollY;
        this.scrollDirection = 'up';
        this.scrollThreshold = 100;
        this.isAnimating = false;
        this.observer = null;
        this.init();
    }

    init() {
        this.setupTheme();
        this.setupNavigation();
        this.setupAnimations();
        this.setupScrollEffects();
        this.setupContactForm();
        this.setupSkillAnimations();
        this.setupProjectInteractions();
        this.setupTypewriterEffect();
        this.setupCounterAnimations();
    }

    // Enhanced Theme Setup
    setupTheme() {
        this.themeToggle = document.getElementById('themeToggleHeader');
        this.body = document.body;
        this.nav = document.getElementById('fixedHeader');
        
        // Set default to dark mode if no preference saved
        const savedTheme = localStorage.getItem('industrial-theme');
        if (savedTheme === null) {
            // No saved preference, default to dark mode
            this.body.classList.add('dark-mode');
            localStorage.setItem('industrial-theme', 'dark');
        } else if (savedTheme === 'dark') {
            this.body.classList.add('dark-mode');
        }

        this.updateThemeIcon();
        // Update nav background immediately when theme is initialized
        this.updateNavBackground(window.scrollY);

        this.themeToggle.addEventListener('click', () => {
            this.body.classList.toggle('dark-mode');
            this.updateThemeIcon();
            
            // Update nav background immediately when theme is toggled
            this.updateNavBackground(window.scrollY);
            
            // Save theme preference
            const isDark = this.body.classList.contains('dark-mode');
            localStorage.setItem('industrial-theme', isDark ? 'dark' : 'light');
        });
    }

    updateThemeIcon() {
        const icon = this.themeToggle.querySelector('i');
        if (this.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    // Enhanced Navigation Setup - DIPERBAIKI
    setupNavigation() {
        this.nav = document.getElementById('fixedHeader');
        this.navLinks = document.querySelectorAll('.nav-links a');
        this.sections = document.querySelectorAll('.industrial-section');
        
        // Calculate nav height for offset
        this.navHeight = this.nav.offsetHeight;
        
        // Smooth scrolling for navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                
                // Skip for PDF CV link
                if (targetId === '#pdf-cv') {
                    window.open('cv/CV_ADITYA_DWI_P.pdf', '_blank');
                    return;
                }
                
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Calculate offset based on target section
                    let offsetTop = targetSection.offsetTop;
                    
                    // Different offset for header section
                    if (targetId === '#header') {
                        offsetTop = 0;
                    } else {
                        offsetTop = offsetTop - this.navHeight - 10; // Extra 10px spacing
                    }
                    
                    window.scrollTo({
                        top: Math.max(offsetTop, 0), // Ensure not negative
                        behavior: 'smooth'
                    });

                    // Update active link
                    this.navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        });

        // Initial nav state
        this.updateNavBackground(window.scrollY);
        this.updateActiveNavLink();
    }

    // Enhanced Scroll Effects
    setupScrollEffects() {
        let ticking = false;
        
        const updateScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Determine scroll direction
            if (currentScrollY > this.lastScrollY + 5) {
                this.scrollDirection = 'down';
            } else if (currentScrollY < this.lastScrollY - 5) {
                this.scrollDirection = 'up';
            }
            
            // Update navigation based on scroll
            this.handleNavVisibility(currentScrollY);
            
            // Parallax effect for hero image
            this.handleParallax(currentScrollY);
            
            // Update active navigation link
            this.updateActiveNavLink();
            
            // Trigger animations on scroll
            this.handleScrollAnimations(currentScrollY);
            
            this.lastScrollY = currentScrollY;
            ticking = false;
        };

        // Throttled scroll handler
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScroll);
                ticking = true;
            }
        });

        // Initial call
        updateScroll();
    }

    handleNavVisibility(currentScrollY) {
        // Remove the hide/show logic - always show the nav
        this.nav.style.transform = 'translateY(0)';
        
        // Update background based on scroll position
        this.updateNavBackground(currentScrollY);
    }

    handleParallax(currentScrollY) {
        const heroImage = document.querySelector('.industrial-profile');
        if (heroImage && currentScrollY < window.innerHeight) {
            const scrolled = currentScrollY * 0.3;
            heroImage.style.transform = `translateY(${scrolled}px)`;
        }
    }

    updateNavBackground(currentScrollY = 0) {
        if (!this.nav) return;
        
        if (currentScrollY > 50) {
            this.nav.style.background = this.body.classList.contains('dark-mode') 
                ? 'rgba(45, 45, 45, 0.98)' 
                : 'rgba(255, 255, 255, 0.98)';
            this.nav.style.backdropFilter = 'blur(20px)';
            this.nav.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            this.nav.style.background = this.body.classList.contains('dark-mode')
                ? 'rgba(45, 45, 45, 0.95)'
                : 'rgba(255, 255, 255, 0.95)';
            this.nav.style.backdropFilter = 'blur(10px)';
            this.nav.style.boxShadow = 'none';
        }
    }

    updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        let currentSection = '';
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Enhanced Animations Setup
    setupAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Stagger animation for timeline items
                    if (entry.target.classList.contains('timeline-item')) {
                        const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                        entry.target.style.transitionDelay = `${index * 0.2}s`;
                    }
                    
                    // Stagger animation for cards
                    if (entry.target.classList.contains('about-card-industrial') || 
                        entry.target.classList.contains('achievement-card') ||
                        entry.target.classList.contains('project-card')) {
                        const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                        entry.target.style.transitionDelay = `${index * 0.1}s`;
                    }
                    
                    // Animation for contact form
                    if (entry.target.classList.contains('contact-form-industrial')) {
                        entry.target.style.transitionDelay = '0.3s';
                    }

                    // Animate skill bars when skills section is visible
                    if (entry.target.id === 'skills') {
                        this.animateSkillBars();
                    }

                    // Animate counters when achievements section is visible
                    if (entry.target.id === 'achievements') {
                        this.animateCounters();
                    }
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll(
            '.about-card-industrial, .timeline-item, .contact-method, .stat-item, ' +
            '.contact-form-industrial, .achievement-card, .project-card, .skills-category, ' +
            '.tool-item, .section-header'
        );
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            this.observer.observe(el);
        });

        // Observe sections for counter animations
        const sectionsToObserve = document.querySelectorAll('#skills, #achievements, #about');
        sectionsToObserve.forEach(section => {
            this.observer.observe(section);
        });
    }

    // Skill Bar Animations
    setupSkillAnimations() {
        this.skillBars = document.querySelectorAll('.skill-progress');
    }

    animateSkillBars() {
        this.skillBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            bar.style.transform = `scaleX(${level / 100})`;
        });
    }

    // Counter Animations
    setupCounterAnimations() {
        this.counters = document.querySelectorAll('.stat-number, .hero-number, .achievement-card h3');
    }

    animateCounters() {
        this.counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            if (!isNaN(target)) {
                this.animateCounter(counter, 0, target, 2000);
            }
        });
    }

    animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            
            // Format numbers with plus sign and commas
            if (element.classList.contains('stat-number') || element.classList.contains('hero-number')) {
                element.textContent = value.toLocaleString() + (element.textContent.includes('+') ? '+' : '');
            } else {
                element.textContent = value + (element.textContent.includes('%') ? '%' : '');
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Project Interactions
    setupProjectInteractions() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Typewriter Effect for Hero Section
    setupTypewriterEffect() {
    const heroTitle = document.querySelector('.industrial-hero-title');
    const originalText = heroTitle.textContent;
    
    // Clear and set up for typewriter effect
    heroTitle.innerHTML = '';
    const lineElement = document.createElement('div');
    lineElement.className = 'typewriter-line';
    heroTitle.appendChild(lineElement);
    
    // Typewriter animation
    this.typeWriter(lineElement, originalText, 0, 100);
}

typeWriter(element, text, i, speed) {
    if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(() => this.typeWriter(element, text, i, speed), speed);
    } else {
        // Add finished class to remove cursor
        setTimeout(() => {
            element.classList.add('finished');
        }, 500); // Wait 500ms before removing cursor
    }
}

    // Scroll Animations Handler
    handleScrollAnimations(currentScrollY) {
        // Parallax for hero section
        const heroContent = document.querySelector('.hero-text');
        if (heroContent && currentScrollY < window.innerHeight) {
            const scrolled = currentScrollY * 0.1;
            heroContent.style.transform = `translateY(${scrolled}px)`;
        }

        // Fade in elements based on scroll position
        this.fadeElementsOnScroll();
    }

    fadeElementsOnScroll() {
        const fadeElements = document.querySelectorAll('.fade-on-scroll');
        
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('fade-in');
            } else {
                element.classList.remove('fade-in');
            }
        });
    }

    // Enhanced Contact Form Setup
    setupContactForm() {
        this.contactForm = document.getElementById('contactForm');
        if (!this.contactForm) return;

        this.submitButton = this.contactForm.querySelector('.industrial-form-submit');
        this.submitText = this.submitButton.querySelector('.submit-text');
        this.loadingSpinner = this.submitButton.querySelector('.loading-spinner');
        this.formMessage = document.getElementById('formMessage');

        // Initialize form state
        this.setFormState('idle');

        // Add form submission handler
        this.contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });

        // Add real-time validation
        this.setupFormValidation();

        // Add input animations
        this.setupInputAnimations();
    }

    setupFormValidation() {
        const inputs = this.contactForm.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                this.clearFieldError(input);
                this.animateInput(input);
            });

            input.addEventListener('focus', () => {
                this.animateInput(input, true);
            });
        });
    }

    setupInputAnimations() {
        const inputs = this.contactForm.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Add floating label effect
            const label = input.previousElementSibling;
            if (label && label.tagName === 'LABEL') {
                input.addEventListener('focus', () => {
                    label.style.transform = 'translateY(-25px) scale(0.85)';
                    label.style.color = 'var(--industrial-accent)';
                });

                input.addEventListener('blur', () => {
                    if (!input.value) {
                        label.style.transform = 'translateY(0) scale(1)';
                        label.style.color = '';
                    }
                });

                // Initialize label position if input has value
                if (input.value) {
                    label.style.transform = 'translateY(-25px) scale(0.85)';
                }
            }
        });
    }

    animateInput(input, isFocus = false) {
        if (isFocus) {
            input.style.borderColor = 'var(--industrial-accent)';
            input.style.boxShadow = '0 0 0 2px rgba(139, 69, 19, 0.1)';
        } else {
            input.style.borderColor = '';
            input.style.boxShadow = '';
        }
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        switch (fieldName) {
            case 'name':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Name must be at least 2 characters long';
                }
                break;
                
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
                
            case 'subject':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Please select a subject';
                }
                break;
                
            case 'message':
                if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Message must be at least 10 characters long';
                }
                break;
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.clearFieldError(field);
        }

        return isValid;
    }

    showFieldError(field, message) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        formGroup.classList.add('error');
        errorElement.textContent = message;
        
        // Shake animation for error
        field.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            field.style.animation = '';
        }, 500);
    }

    clearFieldError(field) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.remove('error');
    }

    async handleFormSubmit() {
        // Validate all fields
        const inputs = this.contactForm.querySelectorAll('input, textarea, select');
        let isFormValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showFormMessage('Please fix the errors in the form before submitting.', 'error');
            return;
        }

        // Show loading state
        this.setFormState('loading');

        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            company: document.getElementById('company').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim(),
            timestamp: new Date().toISOString()
        };

        try {
            // Submit to Google Forms
            const success = await this.submitToGoogleForms(formData);
            
            if (success) {
                // Show success message
                this.showFormMessage('Message sent successfully! I will get back to you soon.', 'success');
                
                // Reset form
                this.contactForm.reset();
                
                // Reset labels
                this.resetFormLabels();
            } else {
                throw new Error('Failed to submit form');
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showFormMessage('Sorry, there was an error sending your message. Please try again or contact me directly via email/WhatsApp.', 'error');
        } finally {
            // Reset button state
            this.setFormState('idle');
        }
    }

    resetFormLabels() {
        const labels = this.contactForm.querySelectorAll('label');
        labels.forEach(label => {
            label.style.transform = 'translateY(0) scale(1)';
            label.style.color = '';
        });
    }

    async submitToGoogleForms(formData) {
        return new Promise((resolve, reject) => {
            try {
                // ================================
                // KONFIGURASI GOOGLE FORM ANDA
                // ================================
                
                // GANTI URL INI DENGAN URL GOOGLE FORM ANDA
                const googleFormURL = 'https://docs.google.com/forms/d/e/1FAIpQLSfwh-hJ6HK51uVNxX-bYtAMAWqU37z20PJERH_pBiMjBWggjw/formResponse';
                
                // GANTI ENTRY IDs DENGAN YANG SESUAI FORM ANDA
                const formFields = {
                    'entry.1781197046': formData.name,      // Field Nama
                    'entry.1708354333': formData.email,     // Field Email
                    'entry.529704093': formData.subject,    // Field Subject
                    'entry.1874193306': formData.message    // Field Message
                };

                // Create hidden iframe untuk submission
                const iframe = document.createElement('iframe');
                iframe.style.display = 'none';
                iframe.name = 'google-form-submit';
                document.body.appendChild(iframe);

                // Create form untuk submission
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = googleFormURL;
                form.target = 'google-form-submit';
                form.style.display = 'none';

                // Add form fields
                Object.entries(formFields).forEach(([key, value]) => {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = key;
                    input.value = value;
                    form.appendChild(input);
                });

                document.body.appendChild(form);

                // Handle response dengan event listener
                iframe.onload = () => {
                    console.log('Google Form submitted successfully');
                    document.body.removeChild(form);
                    document.body.removeChild(iframe);
                    resolve(true);
                };

                iframe.onerror = () => {
                    console.error('Google Form submission failed');
                    document.body.removeChild(form);
                    document.body.removeChild(iframe);
                    reject(new Error('Submission failed'));
                };

                // Submit form
                form.submit();

                // Fallback timeout
                setTimeout(() => {
                    if (document.body.contains(iframe)) {
                        console.log('Google Form submission timeout');
                        document.body.removeChild(form);
                        document.body.removeChild(iframe);
                        resolve(true); // Assume success for timeout
                    }
                }, 5000);

            } catch (error) {
                console.error('Google Forms submission error:', error);
                reject(error);
            }
        });
    }

    setFormState(state) {
        if (!this.submitButton) return;
        
        switch (state) {
            case 'loading':
                this.submitButton.disabled = true;
                if (this.submitText) this.submitText.style.display = 'none';
                if (this.loadingSpinner) this.loadingSpinner.style.display = 'flex';
                break;
            case 'idle':
                this.submitButton.disabled = false;
                if (this.submitText) this.submitText.style.display = 'block';
                if (this.loadingSpinner) this.loadingSpinner.style.display = 'none';
                break;
        }
    }

    showFormMessage(message, type) {
        if (!this.formMessage) return;
        
        this.formMessage.textContent = message;
        this.formMessage.className = `form-message ${type}`;
        this.formMessage.style.display = 'block';

        // Add animation
        this.formMessage.style.animation = 'slideInUp 0.5s ease-out';

        // Scroll to message
        this.formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Hide message after 5 seconds for success, 10 seconds for error
        const hideTime = type === 'success' ? 5000 : 10000;
        setTimeout(() => {
            if (this.formMessage) {
                this.formMessage.style.animation = 'slideOutDown 0.5s ease-in';
                setTimeout(() => {
                    if (this.formMessage) {
                        this.formMessage.style.display = 'none';
                    }
                }, 500);
            }
        }, hideTime);
    }

    // Utility method to handle resize events
    handleResize() {
        this.updateNavBackground(window.scrollY);
    }

    // Cleanup method
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        window.removeEventListener('resize', this.handleResize.bind(this));
    }
}

// Additional utility functions and animations
const IndustrialUtils = {
    // Debounce function for performance
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Format numbers with commas
    formatNumber: (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Smooth scroll to element
    smoothScrollTo: (element, duration = 1000) => {
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        const ease = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        requestAnimationFrame(animation);
    }
};

// CSS Animations for dynamic elements
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes slideInUp {
        from {
            transform: translateY(20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(20px);
            opacity: 0;
        }
    }
    
    @keyframes typewriter {
        from { width: 0; }
        to { width: 100%; }
    }
    
    .typewriter-line {
        overflow: hidden;
        border-right: 2px solid var(--industrial-accent);
        white-space: nowrap;
        animation: typewriter 2s steps(40, end);
    }
    
    .fade-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .fade-on-scroll.fade-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Loading animation for skills */
    .skill-progress {
        transform: scaleX(0);
        transition: transform 1.5s ease-in-out;
    }
`;
document.head.appendChild(style);

// Initialize the portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new IndustrialPortfolio();
    
    // Add resize handler
    window.addEventListener('resize', IndustrialUtils.debounce(() => {
        portfolio.handleResize();
    }, 250));

    // Add beforeunload handler for cleanup
    window.addEventListener('beforeunload', () => {
        portfolio.destroy();
    });

    // Make portfolio globally available for debugging
    window.portfolio = portfolio;
});

// Fallback untuk browser lama dan error handling
if (typeof window !== 'undefined') {
    window.IndustrialPortfolio = IndustrialPortfolio;
    window.IndustrialUtils = IndustrialUtils;
    
    // Error boundary for the portfolio
    window.addEventListener('error', (event) => {
        console.error('Portfolio error:', event.error);
    });
}

// Service Worker Registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Performance monitoring
const observePerformance = () => {
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                console.log(`${entry.name}: ${entry.duration}ms`);
            });
        });
        
        observer.observe({ entryTypes: ['measure', 'navigation', 'resource'] });
    }
};

// Start performance monitoring when page is fully loaded
window.addEventListener('load', observePerformance);
