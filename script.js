// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a, .footer-section a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });



    // Header background on scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const panel = header; // CSS handles ::before panel; we can adjust opacity via a CSS variable if needed
        if (window.scrollY > 100) {
            header.style.setProperty('--header-opacity', '0.56');
        } else {
            header.style.setProperty('--header-opacity', '0.48');
        }
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .service-item, .team-member, .portfolio-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Testimonial navigation
    const testimonialNav = document.querySelectorAll('.nav-btn');
    let currentTestimonial = 0;
    
    const testimonials = [
        {
            quote: "Working with folio has been an absolute pleasure. Their attention to detail and commitment to delivering exceptional results exceeded our expectations. The website they built for us has significantly improved our online presence and user engagement.",
            author: "John Smith",
            title: "CEO, TechCorp"
        },
        {
            quote: "The team at folio is incredibly talented and professional. They delivered our project on time and within budget, exceeding all our expectations. Highly recommended!",
            author: "Sarah Johnson",
            title: "Marketing Director, InnovateCo"
        },
        {
            quote: "Outstanding work from start to finish. The folio team understood our vision perfectly and brought it to life with stunning design and flawless functionality.",
            author: "Michael Chen",
            title: "Founder, StartupXYZ"
        }
    ];

    function updateTestimonial() {
        const testimonialContent = document.querySelector('.testimonial-content');
        const current = testimonials[currentTestimonial];
        
        testimonialContent.innerHTML = `
            <blockquote>${current.quote}</blockquote>
            <div class="testimonial-author">
                <h4>${current.author}</h4>
                <p>${current.title}</p>
            </div>
        `;
    }

    testimonialNav.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            if (index === 0) { // Previous button
                currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            } else { // Next button
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            }
            updateTestimonial();
        });
    });

    // CTA button functionality
    const ctaButtons = document.querySelectorAll('.cta-button, .contact-btn, .view-project, .brand-cta__button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Scroll to contact section
            const contactSection = document.querySelector('#contact');
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = contactSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Portfolio image hover effect
    const portfolioImage = document.querySelector('.portfolio-image img');
    
    if (portfolioImage) {
        portfolioImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        portfolioImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // Team member hover effects
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.borderColor = '#1dac4b';
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.borderColor = '#1dac4b';
        });
    });

    // Parallax effect for background elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.services-background, .portfolio-background, .contact-background');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translate(-50%, ${-50 + scrolled * speed}px)`;
        });
    });

    // Counter animation for statistics
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            }
        }
        
        updateCounter();
    }

    // Animate counters when they come into view
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    const counters = document.querySelectorAll('.hero-stats .stat h2, .about-stats .stat h3');
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });



    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });

    // Initialize page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
});

 