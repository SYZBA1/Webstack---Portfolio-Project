/*jslint es6 */
'use strict';

document.addEventListener('DOMContentLoaded', function () {

    // --- Mobile Menu Functionality ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        mobileMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    // --- Language Switching Functionality ---
    const langToggle = document.getElementById('langToggle');
    const currentLangSpan = document.getElementById('currentLang');
    const amharicElements = document.querySelectorAll('.amharic');
    const englishElements = document.querySelectorAll('.english');

    let isAmharic = true; // Default to Amharic

    const setLanguage = (amharicActive) => {
        amharicElements.forEach(el => {
            el.style.display = amharicActive ? 'inline-block' : 'none';
        });
        englishElements.forEach(el => {
            el.style.display = amharicActive ? 'none' : 'inline-block';
        });
        if (currentLangSpan) {
            currentLangSpan.textContent = amharicActive ? 'አማርኛ' : 'English';
        }
    };

    // Set initial language on page load
    setLanguage(isAmharic);

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            isAmharic = !isAmharic;
            setLanguage(isAmharic);
        });
    }

    // --- Page Load Animation Functionality ---
    const elementsToAnimate = document.querySelectorAll('.animate-on-load');
    elementsToAnimate.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('is-visible');
        }, index * 200); // 200ms delay between each element
    });

    // --- Sticky Navigation Functionality ---
    const mainNav = document.getElementById('main-nav');
    const mainHeader = document.getElementById('main-header');

    if (mainNav && mainHeader) {
        const headerHeight = mainHeader.offsetHeight;
        let lastScrollTop = 0; // To track scroll direction

        window.addEventListener('scroll', () => {
            let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            if (currentScroll > headerHeight) {
                // User is scrolled past the header
                if (currentScroll > lastScrollTop) {
                    // Scrolling down: hide the sticky nav (or slide it up if already sticky)
                    mainNav.classList.remove('sticky-nav'); // Remove to hide/slide up
                } else {
                    // Scrolling up: show the sticky nav
                    mainNav.classList.add('sticky-nav'); // Add to show/slide down
                }
            } else {
                // User is at the top or within the header
                mainNav.classList.remove('sticky-nav'); // Always remove sticky when at the top
            }

            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        });
    }
});
        // Initialize Leaflet Map
        // Coordinates for Megenagna Near Bellivou Hotel, Addis Ababa, Ethiopia
    const latitude = 9.02350;
    const longitude = 38.79840;
    const zoomLevel = 15; // A good zoom level to see the area

    const mapElement = document.getElementById('map');

    if (mapElement) {
        // Initialize the map
        const map = L.map('map').setView([latitude, longitude], zoomLevel);

        // Add a tile layer (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Add a marker at the specified location
        L.marker([latitude, longitude]).addTo(map)
            .bindPopup('<b>Grace Agape Holistic Ministry</b><br>Megenagna Near Bellivou Hotel, Addis Ababa, Ethiopia')
            .openPopup();

        // Optional: Invalidate map size on window resize to ensure it renders correctly
        window.addEventListener('resize', () => {
            map.invalidateSize();
        });
    } else {
        console.error("Map element with ID 'map' not found.");
    }

