document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const contentWrapper = document.querySelector('.content-wrapper');

    // Function to show a specific section and hide others
    function showSection(targetId) {
        // Find the current active section
        const currentActiveSection = document.querySelector('.active-section');
        if (currentActiveSection) {
            currentActiveSection.classList.remove('active-section');
            currentActiveSection.classList.add('hidden-section'); // Hide and move off-screen
        }

        // Find the new target section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            // Apply a slight delay to ensure the current section finishes its transition before the new one starts
            setTimeout(() => {
                targetSection.classList.remove('hidden-section');
                targetSection.classList.add('active-section'); // Make active and slide into view
                // Ensure the section is fully visible after transition
                targetSection.style.transform = 'translateX(0)';
                targetSection.style.opacity = '1';
                targetSection.style.visibility = 'visible';
            }, 100); // Small delay, adjust if needed
        }
    }

    // Function to highlight active navigation link
    function highlightNavLink(activeSectionId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === activeSectionId) {
                link.classList.add('active');
            }
        });
    }

    // Event listener for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-section');
            showSection(targetId);
            highlightNavLink(targetId);

            // If navigating to 'about', scroll to the top of the 'about' section
            // This is primarily for when clicking "Explore My Journey"
            if (targetId === 'about') {
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } else {
                 // For home and contact, scroll to the top of the content wrapper
                contentWrapper.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    // Event listener for "Explore My Journey" button on home page
    const exploreButton = document.querySelector('.hero-section .btn-primary');
    if (exploreButton) {
        exploreButton.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1); // Get 'about' from '#about'
            showSection(targetId);
            highlightNavLink(targetId);
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    // Initial load: show home section and highlight its link
    showSection('home');
    highlightNavLink('home');


    // Hover effect for section boxes (magnify and text color change)
    const sectionBoxes = document.querySelectorAll('.section-box, .contact-item'); // Include contact items
    let hoverTimeout;

    sectionBoxes.forEach(box => {
        box.addEventListener('mouseenter', () => {
            // Apply immediate transform
            box.style.transform = 'translateY(-8px) scale(1.02)';
            box.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.5)';

            // Set timeout for text color change
            hoverTimeout = setTimeout(() => {
                box.classList.add('hovered');
            }, 1000); // 1 second delay
        });

        box.addEventListener('mouseleave', () => {
            clearTimeout(hoverTimeout); // Clear timeout if mouse leaves early
            // Reset transform and shadow immediately
            box.style.transform = 'translateY(0) scale(1)';
            box.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
            // Remove hovered class immediately
            box.classList.remove('hovered');
        });
    });
});