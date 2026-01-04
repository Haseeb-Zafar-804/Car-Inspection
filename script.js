// Back to Top Button with Progress Circle
const backToTopBtn = document.getElementById('backToTop');
const progressCircle = document.querySelector('.progress-ring-circle');
const circumference = 2 * Math.PI * 24;

if (progressCircle) {
    progressCircle.style.strokeDasharray = circumference;
    progressCircle.style.strokeDashoffset = circumference;
}

window.addEventListener('scroll', function() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;
    const scrollProgress = Math.min(scrollPosition / scrollHeight, 1);
    
    // Update progress circle
    if (progressCircle) {
        const offset = circumference - (scrollProgress * circumference);
        progressCircle.style.strokeDashoffset = offset;
    }
    
    // Show/hide back to top button
    if (backToTopBtn) {
        if (scrollPosition > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    }
    
    // Header scroll effect
    const header = document.getElementById('header');
    if (header) {
        if (scrollPosition > 100) {
            header.style.padding = '2px 0';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    }
});

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Main DOM Content Loaded Functionality
document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // 1. FAQ FUNCTIONALITY
    // ============================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');
            
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    // ============================================
    // 2. SCROLL ANIMATIONS
    // ============================================
    function checkScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animated');
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll();

    // Report container animation
    const reportContainer = document.querySelector('.report-container');
    
    function checkReportScroll() {
        if (reportContainer) {
            const elementTop = reportContainer.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                reportContainer.classList.add('animated');
            }
        }
    }
    
    window.addEventListener('load', checkReportScroll);
    window.addEventListener('scroll', checkReportScroll);

    // ============================================
    // 3. VIN VALIDATION & SEARCH
    // ============================================
    const vinInput = document.getElementById('vin');
    const vinValidation = document.getElementById('vinValidation');
    const searchBtn = document.getElementById('searchBtn');
    const vinForm = document.getElementById('vinForm');

    if (vinInput && vinForm) {
        // VIN validation while typing
        vinInput.addEventListener('input', function() {
            const vin = vinInput.value.toUpperCase().replace(/\s+/g, '');
            const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;

            if (vin.length === 17) {
                if (vinRegex.test(vin)) {
                    vinValidation.textContent = '✓ Valid VIN format';
                    vinValidation.className = 'vin-validation vin-valid';
                    if (searchBtn) searchBtn.disabled = false;
                } else {
                    vinValidation.textContent = '✗ Invalid VIN format';
                    vinValidation.className = 'vin-validation vin-invalid';
                    if (searchBtn) searchBtn.disabled = true;
                }
            } else {
                vinValidation.textContent = '';
                if (searchBtn) searchBtn.disabled = false;
            }
        });

        // Redirect on submit
        vinForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const vin = vinInput.value.trim().toUpperCase().replace(/\s+/g, '');

            if (vin.length !== 17) {
                vinValidation.textContent = "VIN must be exactly 17 characters.";
                vinValidation.className = 'vin-validation vin-invalid';
                return;
            }

            const redirectURL = "https://www.vindecoderz.com/EN/check-lookup/" + vin;
            window.open(redirectURL, "_blank");
        });
    }

    // ============================================
    // 4. SAMPLE REPORT TABS
    // ============================================
    const reportTabs = document.querySelectorAll('.report-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    reportTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            reportTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding content
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });

    // ============================================
    // 5. STATS COUNTER ANIMATION
    // ============================================
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');

        statNumbers.forEach(stat => {
            const target = parseFloat(stat.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                if (stat.getAttribute('data-count').includes('.')) {
                    stat.textContent = current.toFixed(1);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 16);
        });
    }

    // Start counter animation when stats section is in view
    const statsSection = document.querySelector('.stats');
    let hasAnimated = false;

    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    animateStats();
                    hasAnimated = true;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }

    // ============================================
    // 6. DARK MODE TOGGLE
    // ============================================
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');
        
        // Check for saved theme preference or default to light
        const currentTheme = localStorage.getItem('theme') || 'light';
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeIcon.className = 'fa-regular fa-sun';
        }
        
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isDarkMode = document.body.classList.contains('dark-mode');
            
            if (isDarkMode) {
                themeIcon.className = 'fa-regular fa-sun';
                localStorage.setItem('theme', 'dark');
            } else {
                themeIcon.className = 'fa-regular fa-moon';
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // ============================================
    // 7. AUTO TYPING ANIMATION
    // ============================================
    const messages = [
        " Get detailed vehicle history reports",
        " Ownership and accident records",
        " Service records and more",
        " Make informed decisions with Car Examin"
    ];

    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        let messageIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 40;
        let pauseBetween = 1000;

        function typeWriter() {
            const currentMessage = messages[messageIndex];

            if (isDeleting) {
                typingElement.textContent = currentMessage.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 25;
            } else {
                typingElement.textContent = currentMessage.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 50;
            }

            if (!isDeleting && charIndex === currentMessage.length) {
                typingSpeed = pauseBetween;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                messageIndex = (messageIndex + 1) % messages.length;
                typingSpeed = 250;
            }

            setTimeout(typeWriter, typingSpeed);
        }

        // Start animation
        setTimeout(typeWriter, 500);
    }

    // ============================================
    // 8. FORM SUBMISSION
    // ============================================
    const contactForm = document.getElementById('contactForm');
    const commentForm = document.getElementById('commentForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const formMessage = document.getElementById('formMessage');
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    formMessage.textContent = 'Thank you! Your message has been sent successfully.';
                    formMessage.className = 'form-message success';
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                formMessage.textContent = 'Sorry, there was an error sending your message. Please try again later.';
                formMessage.className = 'form-message error';
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            }
        });
    }
    
    if (commentForm) {
        commentForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = document.getElementById('commentSubmitBtn');
            const formMessage = document.getElementById('commentMessage');
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
            
            try {
                const formData = new FormData(commentForm);
                const response = await fetch(commentForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    formMessage.textContent = 'Thank you! Your comment has been submitted.';
                    formMessage.className = 'form-message success';
                    commentForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                formMessage.textContent = 'Sorry, there was an error submitting your comment. Please try again later.';
                formMessage.className = 'form-message error';
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit Comment';
            }
        });
    }
    
    // ============================================
    // 9. MOBILE MENU & DROPDOWN FUNCTIONALITY
    // ============================================
    const mobileMenu = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav');
    const header = document.getElementById('header');
    
    if (mobileMenu && nav) {
        // Toggle mobile menu
        mobileMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            nav.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !mobileMenu.contains(e.target)) {
                nav.classList.remove('active');
            }
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
            });
        });
        
        // Fix for header container position on mobile
        if (window.innerWidth <= 768) {
            // Ensure header container has proper positioning
            if (header) {
                header.style.position = 'fixed';
                header.style.top = '0';
                header.style.width = '100%';
                header.style.zIndex = '1000';
                header.style.backgroundColor = 'white';
            }
            
            // Add padding to body to account for fixed header
            document.body.style.paddingTop = '60px';
        }
    }
    
    // ============================================
    // 10. ENHANCED DROPDOWN BEHAVIOR FOR DEVICES UNDER 600PX
    // ============================================
    const dropdownToggles = document.querySelectorAll('.dropdown > a');
    
    // Function to close all dropdowns
    function closeAllDropdowns(except = null) {
        dropdownToggles.forEach(toggle => {
            const dropdown = toggle.closest('.dropdown');
            if (dropdown && dropdown !== except) {
                dropdown.classList.remove('active');
            }
        });
    }
    
    // Enhanced dropdown toggle for mobile
    dropdownToggles.forEach(toggle => {
        // Desktop: Show on hover (for screens > 600px)
        toggle.addEventListener('mouseenter', function(e) {
            if (window.innerWidth > 600) {
                closeAllDropdowns();
                const dropdown = this.closest('.dropdown');
                if (dropdown) dropdown.classList.add('active');
            }
        });
        
        // Desktop: Hide on mouse leave
        const dropdown = toggle.closest('.dropdown');
        if (dropdown) {
            dropdown.addEventListener('mouseleave', function(e) {
                if (window.innerWidth > 600) {
                    if (!this.contains(e.relatedTarget)) {
                        this.classList.remove('active');
                    }
                }
            });
        }
        
        // Enhanced click behavior for mobile (under 600px)
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 600) {
                e.preventDefault();
                e.stopPropagation();
                
                const dropdown = this.closest('.dropdown');
                const allDropdowns = document.querySelectorAll('.dropdown');
                
                // If this dropdown is already active, do nothing
                if (dropdown.classList.contains('active')) {
                    return;
                }
                
                // Close all other dropdowns
                allDropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
                
                // Open this dropdown
                dropdown.classList.add('active');
            } else if (window.innerWidth <= 768 && window.innerWidth > 600) {
                // For tablets (601px to 768px): Toggle dropdown
                e.preventDefault();
                e.stopPropagation();
                const dropdown = this.closest('.dropdown');
                const isActive = dropdown.classList.contains('active');
                
                closeAllDropdowns(dropdown);
                
                if (!isActive) {
                    dropdown.classList.add('active');
                } else {
                    dropdown.classList.remove('active');
                }
            }
        });
    });
    
    // Close dropdowns when clicking outside (only for mobile under 600px)
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 600) {
            // Check if click is inside any dropdown or its toggle
            const clickedInsideDropdown = e.target.closest('.dropdown');
            
            // If click is outside ALL dropdowns
            if (!clickedInsideDropdown) {
                closeAllDropdowns();
            } else {
                // Click was inside a dropdown, but we need to check if it was on the toggle
                const clickedToggle = e.target.closest('.dropdown > a');
                if (!clickedToggle) {
                    // Click was inside dropdown menu but not on toggle
                    // Don't close - keep it open as requested
                    return;
                }
            }
        }
    });
    
    // Close dropdowns when clicking on nav links inside dropdown (but not the toggle)
    document.querySelectorAll('.dropdown-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 600) {
                // Close the parent dropdown
                const dropdown = this.closest('.dropdown');
                if (dropdown) {
                    dropdown.classList.remove('active');
                }
                
                // Also close the mobile menu
                if (nav) {
                    nav.classList.remove('active');
                }
            }
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        // Reset dropdowns on larger screens
        if (window.innerWidth > 600) {
            closeAllDropdowns();
        }
        
        // Reset mobile menu
        if (nav) {
            nav.classList.remove('active');
        }
        
        // Handle header positioning
        if (window.innerWidth > 768) {
            // Reset on desktop
            if (header) {
                header.style.position = '';
                header.style.top = '';
            }
            document.body.style.paddingTop = '';
        } else {
            // Apply mobile styles
            if (header) {
                header.style.position = 'fixed';
                header.style.top = '0';
                header.style.width = '100%';
                header.style.zIndex = '1000';
                header.style.backgroundColor = 'white';
            }
            document.body.style.paddingTop = '60px';
        }
    });
    
    // ============================================
    // 11. TAWK.TO CHAT FUNCTIONALITY
    // ============================================
    const questionsBtn = document.getElementById('questionsBtn');
    if (questionsBtn) {
        questionsBtn.addEventListener('click', function() {
            // Check if Tawk_API is available and open chat
            if (typeof Tawk_API !== 'undefined') {
                Tawk_API.maximize();
            } else {
                // Fallback if tawk.to isn't loaded
                alert('Chat service is currently unavailable. Please try again later.');
            } 
        });
    }
    
    // ============================================
    // 12. CTA BUTTON FUNCTIONALITY
    // ============================================
    const ctaButtons = document.querySelectorAll('.cta-button, .service-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Scroll to top for VIN input or main page
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
});
