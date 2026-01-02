const backToTopBtn = document.getElementById('backToTop');
const progressCircle = document.querySelector('.progress-ring-circle');
const circumference = 2 * Math.PI * 24; // 2πr (r=24 because diameter=50-2=48)

// Set initial stroke-dasharray and stroke-dashoffset
if (progressCircle) {
    progressCircle.style.strokeDasharray = circumference;
    progressCircle.style.strokeDashoffset = circumference;
}

window.addEventListener('scroll', function() {
    // Calculate scroll progress (0 to 1)
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;
    const scrollProgress = Math.min(scrollPosition / scrollHeight, 1);
    
    // Update progress circle
    if (progressCircle) {
        const offset = circumference - (scrollProgress * circumference);
        progressCircle.style.strokeDashoffset = offset;
    }
    
    // Show/hide button (only appears after scrolling down 300px)
    if (backToTopBtn) {
        if (scrollPosition > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
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

document.addEventListener('DOMContentLoaded', function() {
    // FAQ functionality
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

    // Mobile menu toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            document.querySelector('nav').classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelector('nav').classList.remove('active');
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.padding = '5px 0';
                header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.padding = '0';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        }
    });

    // Scroll animations
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
    
    // Add scroll event listener for animations
    window.addEventListener('scroll', checkScroll);
    // Initial check
    checkScroll();

    // VIN elements
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

    // Sample Report Tabs
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

    // Animation for sample report section
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
    
    // Initial check
    window.addEventListener('load', checkReportScroll);
    // Check on scroll
    window.addEventListener('scroll', checkReportScroll);

    // Stats Counter Animation
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

    // Dark Mode Toggle
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

    // Simple Auto Typing Animation
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

    // Form Submission
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
    
    // Mobile dropdown toggle
    document.querySelectorAll('.dropdown > a').forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            // Only on mobile screens
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const parent = this.parentElement;
                
                // Toggle active class
                parent.classList.toggle('active');
                
                // Close other dropdowns
                document.querySelectorAll('.dropdown').forEach(other => {
                    if (other !== parent) {
                        other.classList.remove('active');
                    }
                });
            }
        });
    });

    // Close dropdowns when clicking outside (mobile)
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        }
    });
});
