// --- Main DOM Content Loaded ---
document.addEventListener('DOMContentLoaded', () => {
    // ===== LANGUAGE TOGGLE =====
    let currentLang = localStorage.getItem('language') || 'am'; // Get saved language or default to Amharic
    const langToggle = document.getElementById('lang-toggle');
    // Updated selector to include new data-lang attributes for form placeholders and library page elements
    const elementsWithLang = document.querySelectorAll('[data-en][data-am], [data-en-placeholder][data-am-placeholder], [data-account-name-en], [data-account-name-am], [data-account-detail-en], [data-account-detail-am], [data-title-en], [data-title-am], [data-author-en], [data-author-am]');

    function applyLanguage(lang) {
        elementsWithLang.forEach(el => {
            // Update text content
            if (el.hasAttribute(`data-${lang}`)) {
                el.textContent = el.getAttribute(`data-${lang}`);
            }
            // Update placeholders for input/textarea
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                if (el.hasAttribute(`data-${lang}-placeholder`)) {
                    el.placeholder = el.getAttribute(`data-${lang}-placeholder`);
                }
            }
            // Update specific data attributes for account names/details (Donate page)
            if (el.classList.contains('account-value')) {
                const accountNameKey = `data-account-name-${lang}`;
                if (el.hasAttribute(accountNameKey)) {
                    el.textContent = el.getAttribute(accountNameKey);
                }
            }
            if (el.classList.contains('account-detail')) {
                const accountDetailKey = `data-account-detail-${lang}`;
                if (el.hasAttribute(accountDetailKey)) {
                    el.textContent = el.getAttribute(accountDetailKey);
                }
            }
            // Update specific data attributes for book titles/authors (Library page)
            if (el.classList.contains('book-title')) {
                const bookTitleKey = `data-title-${lang}`;
                if (el.hasAttribute(bookTitleKey)) {
                    el.textContent = el.getAttribute(bookTitleKey);
                }
            }
            if (el.classList.contains('book-author')) {
                const bookAuthorKey = `data-author-${lang}`;
                if (el.hasAttribute(bookAuthorKey)) {
                    el.textContent = el.getAttribute(bookAuthorKey);
                }
            }
        });
        if (langToggle) {
            langToggle.textContent = lang === 'am' ? 'EN' : 'አም';
        }
        document.documentElement.lang = lang;
        localStorage.setItem('language', lang);
        // Removed call to applyLibraryFilters here as requested
    }

    // ===== THEME TOGGLE =====
    const themeToggle = document.getElementById('theme-toggle');
    let currentTheme = localStorage.getItem('theme') || 'light'; // Get saved theme or default to light

    function applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        if (themeToggle) {
            themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
        }
        localStorage.setItem('theme', theme);
    }

    // Initialize language and theme on load, AFTER DOM elements are available
    applyLanguage(currentLang);
    applyTheme(currentTheme);

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'am' ? 'en' : 'am';
            applyLanguage(currentLang);
        });
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            currentTheme = currentTheme === 'light' ? 'dark' : 'light';
            applyTheme(currentTheme);
        });
    }

    // ===== MOBILE MENU =====
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', navMenu.classList.contains('active'));
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
            });
    }

    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Adjust for fixed header
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

    // ===== SCROLL EFFECT (Navbar) =====
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            navbar.style.background = scrollTop > 100 ? 'rgba(27, 41, 81, 0.98)' : 'rgba(27, 41, 81, 0.95)';
            navbar.style.boxShadow = scrollTop > 100
                ? '0 2px 20px rgba(0, 0, 0, 0.2)'
                : '0 2px 20px rgba(0, 0, 0, 0.1)';
        });
    }

    // ===== SCROLL PROGRESS =====
    const scrollIndicator = document.getElementById('scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const percent = (scrollTop / scrollHeight) * 100;
            scrollIndicator.style.width = percent + '%';
        });
    }

    // ===== FADE-IN & SLIDE ANIMATIONS =====
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-in, .slide-left, .slide-right').forEach(el => {
        observer.observe(el);
    });

    // ===== LAZY LOAD IMAGES (for article thumbnails and general images) =====
    const lazyImages = document.querySelectorAll('img.lazy-image');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy-image');
                imageObserver.unobserve(img);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px 100px 0px' }); // Load a bit earlier
    lazyImages.forEach(img => imageObserver.observe(img));

    // ===== LAZY LOAD IFRAMES (for YouTube videos on Sermons page) =====
    const lazyVideos = document.querySelectorAll('iframe.lazy-video');
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                iframe.src = iframe.dataset.src;
                iframe.classList.remove('lazy-video');
                videoObserver.unobserve(iframe);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px 100px 0px' }); // Load a bit earlier
    lazyVideos.forEach(iframe => videoObserver.observe(iframe));


    // ===== SOCIAL CLICK LOGGING =====
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', function () {
            const platform = this.classList[1]; // e.g., 'facebook', 'youtube'
            console.log(`Clicked on: ${platform}`);
        });
    });

    // ===== ANIMATION DELAYS FOR CARDS (Updated for all card types) =====
    document.querySelectorAll('.card, .blog-card, .mvcv-card, .focus-card, .video-card, .bank-card, .qr-code-item, .contact-info-card, .quote-card, .article-card, .book-card').forEach((card, i) => {
        // Only apply delay if not already set by inline style
        if (!card.style.animationDelay) {
            card.style.animationDelay = `${i * 0.1}s`;
        }
    });

    // ===== CONTACT FORM VALIDATION =====
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            const fullName = document.getElementById('full-name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // Simple validation
            if (fullName === '' || email === '' || message === '') {
                displayFormMessage('Please fill in all fields.', 'error');
            } else if (!isValidEmail(email)) {
                displayFormMessage('Please enter a valid email address.', 'error');
            } else {
                // Simulate successful submission
                displayFormMessage('Thank you for your message! We will get back to you soon.', 'success');
                contactForm.reset(); // Clear the form
            }
        });
    }

    function displayFormMessage(msg, type) {
        if (formMessage) { // Check if formMessage element exists
            formMessage.textContent = msg;
            formMessage.className = `form-message ${type}`; // Reset classes and add new type
            formMessage.style.display = 'block'; // Show the message

            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }

    function isValidEmail(email) {
        // Basic email regex validation
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // ===== IMAGE SLIDER (Auto-play) - for About page =====
    const slider = document.getElementById('image-slider');
    if (slider) {
        let slideIndex = 0;
        const slides = slider.querySelectorAll('.slide');
        const totalSlides = slides.length;
        const slideIntervalTime = 5000; // 5 seconds

        function showSlides() {
            slideIndex++;
            if (slideIndex >= totalSlides) {
                slideIndex = 0; // Loop back to the first slide
            }
            slider.style.transform = `translateX(${-slideIndex * 100}%)`;
        }

        // Start auto-play
        setInterval(showSlides, slideIntervalTime);
    }

    // ===== SCROLL TO TOP BUTTON =====
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    if (scrollToTopBtn) { // Ensure button exists before adding listeners
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // Show button after scrolling 300px
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== COPY TO CLIPBOARD BUTTONS (Donate Page) =====
    const copyButtons = document.querySelectorAll('.copy-button');
    const copyMessage = document.getElementById('copy-message');

    if (copyButtons.length > 0 && copyMessage) {
        copyButtons.forEach(button => {
            button.addEventListener('click', function() {
                const accountNumber = this.getAttribute('data-copy-target');
                if (accountNumber) {
                    try {
                        // Create a temporary textarea element
                        const tempTextArea = document.createElement('textarea');
                        tempTextArea.value = accountNumber;
                        document.body.appendChild(tempTextArea);
                        tempTextArea.select();
                        document.execCommand('copy');
                        document.body.removeChild(tempTextArea);

                        displayCopyMessage('Account number copied!', 'success');
                    } catch (err) {
                        console.error('Failed to copy text: ', err);
                        displayCopyMessage('Failed to copy. Please copy manually.', 'error');
                    }
                }
            });
        });
    }

    function displayCopyMessage(msg, type) {
        if (copyMessage) { // Ensure copyMessage element exists
            copyMessage.textContent = msg;
            copyMessage.className = `copy-feedback-message ${type}`;
            copyMessage.style.display = 'block';

            setTimeout(() => {
                copyMessage.style.display = 'none';
            }, 3000); // Hide after 3 seconds
        }
    }

    // ===== SERMONS PAGE CATEGORY FILTER =====
    const sermonFilterButtons = document.querySelectorAll('.category-filter .filter-btn');
    const sermonVideoCards = document.querySelectorAll('.sermon-video-grid .video-card');

    if (sermonFilterButtons.length > 0 && sermonVideoCards.length > 0) {
        sermonFilterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons in this filter group
                sermonFilterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to the clicked button
                this.classList.add('active');

                const filter = this.getAttribute('data-filter');

                sermonVideoCards.forEach(card => {
                    // For now, we don't have categories on video cards, so all remain visible.
                    // If you add data-category attributes to your video cards later,
                    // you would add logic here to show/hide based on the filter.
                    // Example:
                    // const cardCategory = card.getAttribute('data-category');
                    // if (filter === 'all' || cardCategory === filter) {
                    //     card.style.display = 'block'; // Or 'flex' depending on your card display
                    // } else {
                    //     card.style.display = 'none';
                    // }
                    card.style.display = 'block'; // Keep all visible for now as no categories are implemented
                });
            });
        });
    }

    // ===== LIBRARY PAGE FILTER & SEARCH (functionality removed as requested) =====
    // Removed libraryFilterButtons and librarySearchBar related event listeners and logic.
    // The book cards will now always be visible unless you re-implement filtering/search.

    // ===== LIBRARY PAGE BOOK BUTTON ACTIONS =====
    document.querySelectorAll('.book-details-btn').forEach(button => {
        button.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            const link = this.getAttribute('data-link');

            if (action === 'download' && link) {
                window.open(link, '_blank'); // Open PDF in new tab
            } else if (action === 'view-details' && link) {
                window.open(link, '_blank'); // Open external link in new tab
            } else if (action === 'contact') {
                window.location.href = 'contact.html'; // Redirect to contact page
            }
        });
    });
});
