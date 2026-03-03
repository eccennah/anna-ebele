// Main JS
console.log('Anna Ebele Portfolio Loaded');

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for Fade-ins
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in-section');
    observer.observe(section);
});

// Show header name only on first and last sections
const logo = document.querySelector('.logo');
const heroSection = document.querySelector('.hero');
const lastSection = document.querySelector('#contact');
const pageFooter = document.querySelector('footer');

if (logo && heroSection && lastSection) {
    let heroInView = true;
    let endInView = false;

    const updateLogoVisibility = () => {
        const shouldShow = heroInView || endInView;
        logo.classList.toggle('is-hidden', !shouldShow);
    };

    const visibilityObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.target === heroSection) {
                heroInView = entry.isIntersecting;
            }

            if (entry.target === lastSection || entry.target === pageFooter) {
                endInView = entry.isIntersecting;
            }
        });

        updateLogoVisibility();
    }, {
        root: null,
        threshold: 0.15
    });

    visibilityObserver.observe(heroSection);
    visibilityObserver.observe(lastSection);

    if (pageFooter) {
        visibilityObserver.observe(pageFooter);
    }

    updateLogoVisibility();
}
