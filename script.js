// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current) + '+';
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            
            // Trigger counter animation when impact counter section is visible
            if (entry.target.classList.contains('impact-counter')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.impact-card, .cause-card, .business-card, .involvement-card, .impact-counter');
    animatedElements.forEach(el => observer.observe(el));
});

// Modal Functions
function openDonationModal() {
    document.getElementById('donation-modal').style.display = 'block';
}

function openVolunteerModal() {
    // Create volunteer modal content
    const modal = document.getElementById('donation-modal');
    const modalContent = modal.querySelector('.modal-content');
    
    modalContent.innerHTML = `
        <span class="close">&times;</span>
        <h2>Volunteer With Us</h2>
        <p>Join our team of dedicated volunteers and make a direct impact in your community.</p>
        <form id="volunteer-form">
            <div class="form-group">
                <input type="text" name="name" placeholder="Your Name" required>
            </div>
            <div class="form-group">
                <input type="email" name="email" placeholder="Your Email" required>
            </div>
            <div class="form-group">
                <input type="tel" name="phone" placeholder="Your Phone" required>
            </div>
            <div class="form-group">
                <select name="interest" required>
                    <option value="">Select Area of Interest</option>
                    <option value="food-distribution">Food Distribution</option>
                    <option value="tree-plantation">Tree Plantation</option>
                    <option value="education">Education Support</option>
                    <option value="healthcare">Healthcare Assistance</option>
                    <option value="general">General Volunteering</option>
                </select>
            </div>
            <div class="form-group">
                <textarea name="message" placeholder="Tell us about yourself and your availability" rows="4"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Submit Application</button>
        </form>
    `;
    
    modal.style.display = 'block';
    setupModalClose();
}

function openPartnerModal() {
    const modal = document.getElementById('donation-modal');
    const modalContent = modal.querySelector('.modal-content');
    
    modalContent.innerHTML = `
        <span class="close">&times;</span>
        <h2>Partner With Us</h2>
        <p>Collaborate with Demoody For Change for corporate partnerships, sponsorships, and CSR initiatives.</p>
        <form id="partner-form">
            <div class="form-group">
                <input type="text" name="company" placeholder="Company Name" required>
            </div>
            <div class="form-group">
                <input type="text" name="contact-person" placeholder="Contact Person" required>
            </div>
            <div class="form-group">
                <input type="email" name="email" placeholder="Business Email" required>
            </div>
            <div class="form-group">
                <input type="tel" name="phone" placeholder="Contact Number" required>
            </div>
            <div class="form-group">
                <select name="partnership-type" required>
                    <option value="">Partnership Type</option>
                    <option value="sponsorship">Event Sponsorship</option>
                    <option value="csr">CSR Partnership</option>
                    <option value="collaboration">Project Collaboration</option>
                    <option value="donation">Corporate Donation</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div class="form-group">
                <textarea name="details" placeholder="Partnership Details and Expectations" rows="4" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Submit Proposal</button>
        </form>
    `;
    
    modal.style.display = 'block';
    setupModalClose();
}

function setupModalClose() {
    const modal = document.getElementById('donation-modal');
    const closeBtn = modal.querySelector('.close');
    
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }
    
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
}

// Donation amount selection
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('donation-btn')) {
        // Remove active class from all buttons
        document.querySelectorAll('.donation-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        e.target.classList.add('active');
        
        // Clear custom amount
        const customAmount = document.getElementById('custom-amount');
        if (customAmount) {
            customAmount.value = '';
        }
    }
});

// Custom amount input
document.addEventListener('input', (e) => {
    if (e.target.id === 'custom-amount') {
        // Remove active class from all preset buttons
        document.querySelectorAll('.donation-btn').forEach(btn => {
            btn.classList.remove('active');
        });
    }
});

function processDonation() {
    const activeBtn = document.querySelector('.donation-btn.active');
    const customAmount = document.getElementById('custom-amount');
    
    let amount = 0;
    if (activeBtn) {
        amount = activeBtn.getAttribute('data-amount');
    } else if (customAmount && customAmount.value) {
        amount = customAmount.value;
    }
    
    if (amount > 0) {
        // Here you would integrate with payment gateway (Razorpay, Stripe, etc.)
        alert(`Thank you for your donation of ₹${amount}! Payment integration will be implemented soon.`);
        document.getElementById('donation-modal').style.display = 'none';
    } else {
        alert('Please select or enter a donation amount.');
    }
}

// Form Submissions
document.addEventListener('submit', (e) => {
    if (e.target.id === 'contact-form') {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        // Here you would send the form data to your backend
        console.log('Contact form submitted:', Object.fromEntries(formData));
        alert('Thank you for your message! We will get back to you soon.');
        e.target.reset();
    }
    
    if (e.target.id === 'newsletter-form') {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        
        // Here you would add the email to your newsletter list
        console.log('Newsletter subscription:', email);
        alert('Thank you for subscribing to our newsletter!');
        e.target.reset();
    }
    
    if (e.target.id === 'volunteer-form') {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        // Here you would send the volunteer application to your backend
        console.log('Volunteer application:', Object.fromEntries(formData));
        alert('Thank you for your interest in volunteering! We will contact you soon.');
        document.getElementById('donation-modal').style.display = 'none';
    }
    
    if (e.target.id === 'partner-form') {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        // Here you would send the partnership proposal to your backend
        console.log('Partnership proposal:', Object.fromEntries(formData));
        alert('Thank you for your partnership proposal! Our team will review it and get back to you.');
        document.getElementById('donation-modal').style.display = 'none';
    }
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Initialize modal close functionality
document.addEventListener('DOMContentLoaded', () => {
    setupModalClose();
});