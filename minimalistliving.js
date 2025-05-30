document.addEventListener('DOMContentLoaded', () => {
    // Comment Form Handling
    const commentForm = document.getElementById('comment-form');
    const commentsList = document.getElementById('comments-list');

    // Load comments from localStorage (unique key for this post)
    let comments = JSON.parse(localStorage.getItem('minimalist-living-comments')) || [];

    // Display existing comments
    function displayComments() {
        commentsList.innerHTML = '';
        comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentDiv.innerHTML = `<p><strong>${comment.name}</strong>: ${comment.text}</p>`;
            commentsList.appendChild(commentDiv);
        });
    }

    // Initial display of comments
    displayComments();

    // Handle comment submission
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const commentText = document.getElementById('comment').value;

        // Add new comment
        comments.push({ name, text: commentText });
        localStorage.setItem('minimalist-living-comments', JSON.stringify(comments));

        // Update display
        displayComments();

        // Reset form
        commentForm.reset();
    });

    // Social Sharing Functions
    const postUrl = window.location.href;
    const postTitle = document.querySelector('h1').textContent;

    window.shareToX = function() {
        const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(postTitle)}`;
        window.open(url, '_blank');
    };

    window.shareToFacebook = function() {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
        window.open(url, '_blank');
    };

    window.shareToInstagram = function() {
        alert('Instagram sharing is not directly supported. Copy the link to share manually: ' + postUrl);
    };

    window.shareToThreads = function() {
        alert('Threads sharing is not directly supported. Copy the link to share manually: ' + postUrl);
    };
});
