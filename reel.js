document.addEventListener('DOMContentLoaded', function() {
    const reelItems = document.querySelectorAll('.reel-item');
    const buyButtons = document.querySelectorAll('.buy-button');

    // Handle reel item click events (play/pause video and toggle action buttons)
    reelItems.forEach(item => {
        item.addEventListener('click', function() {
            const video = this.querySelector('video');
            const actionButtons = this.querySelector('.reel-actions');

            // Toggle video play/pause
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }

            // Show/Hide action buttons
            actionButtons.classList.toggle('visible');
        });
    });

    // Handle share button click events
    document.querySelectorAll('.share-button').forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent the event from triggering the parent reel click event
            alert('Reel shared successfully!');
            // Implement actual share functionality here.
        });
    });

    // Handle "Buy Now" button click events
    buyButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent the event from triggering the parent reel click event
            
            // Get product ID and URL
            const productId = this.getAttribute('data-product-id');
            const productUrl = this.getAttribute('data-product-url');

            // Redirect to the product detail page
            window.location.href = productUrl;

            // Optionally, you can highlight the product in the product grid if it's still available
            const productItems = document.querySelectorAll('.product-item');
            productItems.forEach(function(item) {
                if (item.getAttribute('data-product-id') === productId) {
                    item.classList.add('highlight');
                    item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else {
                    item.classList.remove('highlight');
                }
            });
        });
    });

    // Add CSS to highlight the product
    var style = document.createElement('style');
    style.innerHTML = `
        .highlight {
            border: 2px solid red; /* Highlighting border */
            background-color: #f0f0f0; /* Background color for highlighting */
        }
    `;
    document.head.appendChild(style);
});
