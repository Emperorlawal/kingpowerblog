document.addEventListener('DOMContentLoaded', () => {
    const carouselInner = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;

    // Clone items for infinite scrolling
    const clonedItems = Array.from(items).map(item => item.cloneNode(true));
    clonedItems.forEach(clone => carouselInner.appendChild(clone));

    let currentIndex = 0;
    let isTransitioning = false;

    function moveCarousel() {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex++;

        const itemWidth = items[0].offsetWidth + 20; // Include margin
        const offset = -currentIndex * itemWidth;

        carouselInner.style.transition = 'transform 0.5s ease';
        carouselInner.style.transform = `translateX(${offset}px)`;

        // Reset to start for infinite effect
        if (currentIndex >= totalItems) {
            setTimeout(() => {
                carouselInner.style.transition = 'none';
                currentIndex = 0;
                carouselInner.style.transform = `translateX(0)`;
                isTransitioning = false;
            }, 500); // Match transition duration
        } else {
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }
    }

    // Move carousel every 3 seconds
    setInterval(moveCarousel, 3000);

    // Handle window resize
    window.addEventListener('resize', () => {
        const itemWidth = items[0].offsetWidth + 20;
        carouselInner.style.transition = 'none';
        carouselInner.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
    });
});