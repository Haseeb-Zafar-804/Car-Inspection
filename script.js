const backToTopBtn = document.getElementById('backToTop');
const progressCircle = document.querySelector('.progress-ring-circle');
const circumference = 2 * Math.PI * 24; // 2πr (r=24 because diameter=50-2=48)

// Set initial stroke-dasharray and stroke-dashoffset
progressCircle.style.strokeDasharray = circumference;
progressCircle.style.strokeDashoffset = circumference;

window.addEventListener('scroll', function() {
    // Calculate scroll progress (0 to 1)
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;
    const scrollProgress = Math.min(scrollPosition / scrollHeight, 1);
    
    // Update progress circle
    const offset = circumference - (scrollProgress * circumference);
    progressCircle.style.strokeDashoffset = offset;
    
    // Show/hide button (only appears after scrolling down 300px)
    if (scrollPosition > 300) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


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
    document.querySelector('.mobile-menu').addEventListener('click', function() {
        document.querySelector('nav').classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelector('nav').classList.remove('active');
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (window.scrollY > 100) {
            header.style.padding = '5px 0';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
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

    // Initial check
    window.addEventListener('load', checkScroll);
    // Check on scroll
    window.addEventListener('scroll', checkScroll);

    // VIN Validation
    const vinInput = document.getElementById('vin');
    const vinValidation = document.getElementById('vinValidation');
    const searchBtn = document.getElementById('searchBtn');
    
    vinInput.addEventListener('input', function() {
        const vin = vinInput.value.toUpperCase();
        const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;
        
        if (vin.length === 17) {
            if (vinRegex.test(vin)) {
                vinValidation.textContent = '✓ Valid VIN format';
                vinValidation.className = 'vin-validation vin-valid';
                searchBtn.disabled = false;
            } else {
                vinValidation.textContent = '✗ Invalid VIN format';
                vinValidation.className = 'vin-validation vin-invalid';
                searchBtn.disabled = true;
            }
        } else {
            vinValidation.textContent = '';
            searchBtn.disabled = false;
        }
    });

    // Form submission
    document.getElementById('vinForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const vin = document.getElementById('vin').value;
        const country = document.getElementById('country').value;
        
        if (vin.length === 17 && country) {
            // In a real application, you would submit the form here
            alert(`Searching for VIN: ${vin} in ${document.getElementById('country').options[document.getElementById('country').selectedIndex].text}`);
            // Redirect to pricing or report page
            window.location.href = '#pricing';
        } else {
            alert('Please enter a valid VIN and select a country');
        }
    });

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
        const elementTop = reportContainer.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            reportContainer.classList.add('animated');
        }
    }
    
    // Initial check
    window.addEventListener('load', checkReportScroll);
    // Check on scroll
    window.addEventListener('scroll', checkReportScroll);

// Stats Counter Animation - Quick Fix
function animateStats() {
const statNumbers = document.querySelectorAll('.stat-number');

statNumbers.forEach(stat => {
// FIX: Use parseFloat instead of parseInt
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
let hasAnimated = false; // Add this to prevent multiple triggers

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

    // Dark Mode Toggle
    const themeToggle = document.getElementById('themeToggle');
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
});
// Simple Auto Typing Animation
const messages = [
" Get detailed vehicle history reports",
" Ownership and accident records",
" Service records and more",
" Make informed decisions with Car Examin"
];


const typingElement = document.getElementById('typing-text');
let messageIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 40; // Reduced from 100 (typing speed)
let pauseBetween = 1000; // Reduced from 2000 (pause at end)

function typeWriter() {
const currentMessage = messages[messageIndex];

if (isDeleting) {
typingElement.textContent = currentMessage.substring(0, charIndex - 1);
charIndex--;
typingSpeed = 25; // Faster deleting (was 50)
} else {
typingElement.textContent = currentMessage.substring(0, charIndex + 1);
charIndex++;
typingSpeed = 50; // Faster typing (was 100)
}

if (!isDeleting && charIndex === currentMessage.length) {
typingSpeed = pauseBetween;
isDeleting = true;
} else if (isDeleting && charIndex === 0) {
isDeleting = false;
messageIndex = (messageIndex + 1) % messages.length;
typingSpeed = 250; // Faster between messages (was 500)
}

setTimeout(typeWriter, typingSpeed);
}

// Start animation
window.addEventListener('DOMContentLoaded', () => {
setTimeout(typeWriter, 500); // Shorter initial delay (was 1000)
});
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
