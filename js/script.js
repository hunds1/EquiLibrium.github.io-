document.addEventListener('DOMContentLoaded', function() {
    // Carousel functionality
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    
    // Function to show slide
    function showSlide(index) {
        // Hide all slides
        carouselSlides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Show current slide
        carouselSlides[index].classList.add('active');
        indicators[index].classList.add('active');
        
        currentSlide = index;
    }
    
    // Next slide
    function nextSlide() {
        let newIndex = currentSlide + 1;
        if (newIndex >= carouselSlides.length) {
            newIndex = 0;
        }
        showSlide(newIndex);
    }
    
    // Previous slide
    function prevSlide() {
        let newIndex = currentSlide - 1;
        if (newIndex < 0) {
            newIndex = carouselSlides.length - 1;
        }
        showSlide(newIndex);
    }
    
    // Event listeners for buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto slide change every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Modal functionality
    const modal = document.getElementById('signup-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');
    const headerSignupBtn = document.getElementById('header-signup-btn');
    const heroSignupBtn = document.getElementById('hero-signup-btn');
    const serviceButtons = document.querySelectorAll('.service-btn');
    
    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    if (headerSignupBtn) {
        headerSignupBtn.addEventListener('click', openModal);
    }
    
    if (heroSignupBtn) {
        heroSignupBtn.addEventListener('click', openModal);
    }
    
    if (serviceButtons) {
        serviceButtons.forEach(button => {
            button.addEventListener('click', openModal);
        });
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Form submission
    const signupForm = document.getElementById('signup-form');
    const promoForm = document.getElementById('promo-form');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to a server
            alert('Спасибо за вашу заявку! Мы свяжемся с вами в ближайшее время.');
            closeModal();
            this.reset();
        });
    }
    
    if (promoForm) {
        promoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to a server
            alert('Спасибо за вашу заявку! Мы свяжемся с вами в ближайшее время.');
            this.reset();
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (nav && nav.classList.contains('active')) {
                        nav.classList.remove('active');
                        mobileMenuBtn.classList.remove('active');
                    }
                }
            }
        });
    });
    
    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Add active class to current nav link
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Initialize map
    function initMap() {
        // Moscow coordinates
        var moscowCoords = [55.7558, 37.6173];
        
        // Create map
        var map = new ymaps.Map("map", {
            center: moscowCoords,
            zoom: 12
        });
        
        // Add marker for the club location (approximate)
        var clubPlacemark = new ymaps.Placemark(
            moscowCoords,
            {
                hintContent: 'Конный клуб EquiLibrium',
                balloonContent: 'Московская область, Ленинский район, пос. Лесной, Конюшенная ул., 15'
            },
            {
                preset: 'islands#brownHorseIcon'
            }
        );
        
        // Add placemark to map
        map.geoObjects.add(clubPlacemark);
    }
    
    // Load Yandex Maps API
    ymaps.ready(initMap);
});