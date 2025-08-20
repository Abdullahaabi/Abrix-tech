// Hero Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Hero Slider
    const heroSlides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    function showSlide(index) {
        // Remove active class from all slides
        heroSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Add active class to current slide
        heroSlides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % heroSlides.length;
        showSlide(currentSlide);
    }

    // Initialize first slide
    if (heroSlides.length > 0) {
        showSlide(0);
        // Auto-advance slides
        setInterval(nextSlide, slideInterval);
    }

    // Floating arrow click to scroll
    const floatingArrow = document.querySelector('.floating-arrow');
    if (floatingArrow) {
        floatingArrow.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Services Navigation
    const servicesSlider = document.querySelector('.services-slider');
    const servicesPages = document.querySelectorAll('.services-page');
    const prevBtn = document.querySelector('.services-prev');
    const nextBtn = document.querySelector('.services-next');
    let currentPage = 0;

    function showServicesPage(pageIndex) {
        servicesPages.forEach((page, index) => {
            if (index === pageIndex) {
                page.classList.add('active');
            } else {
                page.classList.remove('active');
            }
        });

        // Update button states and visibility
        if (prevBtn) {
            prevBtn.disabled = pageIndex === 0;
            if (pageIndex === 0) {
                prevBtn.classList.remove('active');
            } else {
                prevBtn.classList.add('active');
            }
        }
        
        if (nextBtn) {
            nextBtn.disabled = pageIndex === servicesPages.length - 1;
            if (pageIndex === servicesPages.length - 1) {
                nextBtn.classList.remove('active');
            } else {
                nextBtn.classList.add('active');
            }
        }
    }

    // Initialize the first page
    if (servicesPages.length > 0) {
        showServicesPage(0);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentPage > 0) {
                currentPage--;
                showServicesPage(currentPage);
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (currentPage < servicesPages.length - 1) {
                currentPage++;
                showServicesPage(currentPage);
            }
        });
    }

    // Mobile Menu Functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.add('active');
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Close mobile menu when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Close mobile menu when clicking outside
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function(e) {
            if (e.target === this) {
                mobileMenuBtn.classList.remove('active');
                this.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // CTA Buttons with data-target="#inquiry" - Scroll to Form
    const inquiryButtons = document.querySelectorAll('[data-target="#inquiry"]');
    inquiryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const inquirySection = document.querySelector('#inquiry');
            if (inquirySection) {
                inquirySection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form Submission Handling
    const inquiryForm = document.querySelector('.inquiry-form');
    const successModal = document.getElementById('successModal');
    const successModalClose = document.querySelector('.success-modal__close');
    const successModalBackdrop = document.querySelector('.success-modal__backdrop');

    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            // Don't prevent default - let FormSubmit.co handle it
            // Just show loading state and set replyto field
            
            // Show loading state
            const submitButton = this.querySelector('.inquiry-submit');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Set the _replyto field to the email from the form
            const emailInput = this.querySelector('input[name="email"]');
            const replyToField = this.querySelector('input[name="_replyto"]');
            if (emailInput && replyToField) {
                replyToField.value = emailInput.value;
            }
            
            // Let the form submit naturally to FormSubmit.co
            // The form will redirect to thank-you.html on success
        });
        

    }

    // Close success modal
    if (successModalClose) {
        successModalClose.addEventListener('click', function() {
            successModal.style.display = 'none';
            successModal.setAttribute('aria-hidden', 'true');
        });
    }

    if (successModalBackdrop) {
        successModalBackdrop.addEventListener('click', function() {
            successModal.style.display = 'none';
            successModal.setAttribute('aria-hidden', 'true');
        });
    }

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
    const animateElements = document.querySelectorAll('.service-card, .service-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });



    // CTA button functionality (excluding project detail buttons)
    const ctaButtons = document.querySelectorAll('.cta-button:not(.view-project), .contact-btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Scroll to contact section
            const contactSection = document.querySelector('#inquiry');
            if (contactSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = contactSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Project modal functionality
    const projectButtons = document.querySelectorAll('.view-project');
    
    projectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectType = this.getAttribute('data-project');
            let modalId;
            
            // Handle different naming conventions
            if (projectType === 'mfg-opt') {
                modalId = 'mfgOptModal';
            } else {
                modalId = projectType + 'Modal';
            }
            
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.setAttribute('aria-hidden', 'false');
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal functionality
    const closeButtons = document.querySelectorAll('.project-modal__close');
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.project-modal');
            if (modal) {
                modal.setAttribute('aria-hidden', 'true');
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Close modal when clicking backdrop
    const modalBackdrops = document.querySelectorAll('.project-modal__backdrop');
    
    modalBackdrops.forEach(backdrop => {
        backdrop.addEventListener('click', function() {
            const modal = this.closest('.project-modal');
            if (modal) {
                modal.setAttribute('aria-hidden', 'true');
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
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





    // Parallax effect for background elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.services-background, .portfolio-background');
        
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



    // Hide loading indicator when page is ready
    const loadingIndicator = document.getElementById('loadingIndicator');
    if (loadingIndicator) {
        // Hide loading indicator faster for better perceived performance
        setTimeout(() => {
            loadingIndicator.style.opacity = '0';
            setTimeout(() => {
                loadingIndicator.style.display = 'none';
            }, 200);
        }, 300);
    }
    
    // Performance optimization: Load non-critical resources after page is ready
    function loadNonCriticalResources() {
        // Preload other hero images
        const heroImages = ['R/R3.jpg', 'R/R7.jpg'];
        heroImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }
    
    // Load non-critical resources after page is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadNonCriticalResources);
    } else {
        loadNonCriticalResources();
    }
    
    // Page is ready
    console.log('Abrix Tech website loaded successfully');
});

 