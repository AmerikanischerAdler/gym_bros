// Post Comment Box
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.comment-container .post-button').forEach(button => {
        button.addEventListener('click', function() {
            const postContainer = this.closest('.post');
            const commentBox = postContainer.querySelector('.comment-box');

            // Set Visibility 
            if (!commentBox.classList.contains('show')) {
                commentBox.classList.add('show');

                const commentBoxHeight = commentBox.offsetHeight;

                // Move Post Below
                let nextPost = postContainer.nextElementSibling;
                if (nextPost && nextPost.classList.contains('post')) {
                    nextPost.style.marginTop = `${commentBoxHeight}px`;
                }
            } else {
                commentBox.classList.remove('show');

                // Reset Post Margins
                let nextPost = postContainer.nextElementSibling;
                while (nextPost && nextPost.classList.contains('post')) {
                    nextPost.style.marginTop = '0';
                    nextPost = nextPost.nextElementSibling;
                }
            }
        });
    });
});

