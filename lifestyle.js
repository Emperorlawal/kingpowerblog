document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll to lifestyle section when clicking nav link
    document.querySelectorAll('nav a[href="#lifestyle"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = document.getElementById('lifestyle');
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Google Analytics event tracking for post clicks
    document.querySelectorAll('.post a').forEach(link => {
        link.addEventListener('click', () => {
            gtag('event', 'post_click', {
                'event_category': 'Lifestyle',
                'event_label': link.querySelector('h3').textContent,
                'page_path': window.location.pathname
            });
        });
    });
});