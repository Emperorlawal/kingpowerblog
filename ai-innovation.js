document.addEventListener('DOMContentLoaded', () => {
    // Comment form handling
    const commentForm = document.getElementById('comment-form');
    const commentsList = document.getElementById('comments-list');

    if (commentForm && commentsList) {
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const commentText = document.getElementById('comment').value;
            const date = new Date().toLocaleString();

            const comment = document.createElement('div');
            comment.classList.add('comment');
            comment.innerHTML = `
                <p class="comment-meta">By ${name} on ${date}</p>
                <p>${commentText}</p>
            `;
            commentsList.appendChild(comment);

            // Track comment submission in GA4
            gtag('event', 'comment_submit', {
                'event_category': 'Engagement',
                'event_label': 'Blog Post Comment',
                'page_path': window.location.pathname
            });

            commentForm.reset();
        });
    }

    // Social sharing
    window.shareToX = function() {
        const url = `https://twitter.com/intent/tweet?text=Check out this post: ${encodeURIComponent(document.title)}&url=${encodeURIComponent(window.location.href)}`;
        window.open(url, '_blank');
        gtag('event', 'share', {
            'event_category': 'Social',
            'event_label': 'X',
            'page_path': window.location.pathname
        });
    };

    window.shareToFacebook = function() {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
        window.open(url, '_blank');
        gtag('event', 'share', {
            'event_category': 'Social',
            'event_label': 'Facebook',
            'page_path': window.location.pathname
        });
    };

    window.shareToInstagram = function() {
        alert('Instagram sharing is not directly supported. Copy the link to share manually: ' + window.location.href);
        gtag('event', 'share_attempt', {
            'event_category': 'Social',
            'event_label': 'Instagram',
            'page_path': window.location.pathname
        });
    };

    window.shareToThreads = function() {
        alert('Threads sharing is not directly supported. Copy the link to share manually: ' + window.location.href);
        gtag('event', 'share_attempt', {
            'event_category': 'Social',
            'event_label': 'Threads',
            'page_path': window.location.pathname
        });
    };

    // Track quiz CTA click
    window.trackQuizCta = function() {
        gtag('event', 'quiz_cta_click', {
            'event_category': 'Navigation',
            'event_label': 'AI Innovations to Quiz',
            'page_path': window.location.pathname
        });
    };
});