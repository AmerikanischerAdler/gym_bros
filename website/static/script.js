document.addEventListener("DOMContentLoaded", function() {

    // Delete Posts
    document.querySelectorAll('.post-button.del').forEach(button => {
        button.addEventListener('click', function() {
            const postId = this.getAttribute('data-post-id');
    
            fetch(`/delete-post/${postId}`, {
                method: 'DELETE',
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else {
                    // Remove Post from DOM
                    const postElement = document.querySelector(`div.post[data-post-id="${postId}"]`);
                    if (postElement) {
                        postElement.remove();
                    }
                }
            })
            .catch(error => console.error('Error:', error));
        });
    });
    
    // Show & Hide Comment Box
    document.querySelectorAll('.comment-container .post-button').forEach(button => {
        button.addEventListener('click', function() {
            const postContainer = this.closest('.post');
            const commentBox = postContainer.querySelector('.comment-box');

            if (!commentBox.classList.contains('show')) {
                commentBox.classList.add('show');
                commentBox.setAttribute('data-visible', 'true'); 
                const commentBoxHeight = commentBox.offsetHeight;
                let nextPost = postContainer.nextElementSibling;
                if (nextPost && nextPost.classList.contains('post')) {
                    nextPost.style.marginTop = `${commentBoxHeight}px`;
                }
            } else {
                commentBox.classList.remove('show');
                commentBox.setAttribute('data-visible', 'false'); 
                let nextPost = postContainer.nextElementSibling;
                if (nextPost && nextPost.classList.contains('post')) {
                    nextPost.style.marginTop = '0';
                }
            }
        });
    });

    // Add Comment
    document.querySelectorAll('.comment-form').forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); 

            const formData = new FormData(this);
            const postId = this.id.split('-')[2]; 

            fetch(`/comment/${postId}`, {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                console.log(data); 
            
                if (data.error) {
                    alert(data.error); 
                } else {
                    if (data.comment) {
                        const comment = data.comment;
                        const commentList = document.querySelector(`#comment-list-${postId}`);
                        const newComment = document.createElement('div');
                        newComment.classList.add('single-comment');
                        newComment.id = `comment-${comment.id}`;
                        newComment.innerHTML = `
                            <p>${comment.text}</p>
                            <div class="com-info">
                                <a class="com-username" href="/profile/${comment.author}">${comment.author}</a>
                                <p class="com-date">${comment.date_created}</p>
                                <a class="post-button" id="com-trash" href="/delete-comment/${comment.id}" data-comment-id="${comment.id}" data-post-id="${postId}">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path fill="currentColor" d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/>
                                    </svg>
                                </a>
                            </div>
                        `;
                        commentList.prepend(newComment); 
            
                        const commentsCount = document.querySelector(`#comments-count-${postId}`);
                        commentsCount.textContent = data.comments_count;
            
                        this.querySelector('input[name="text"]').value = '';

                        const commentBox = document.querySelector(`#comment-box-${postId}`);
                        const noCommentsDiv = commentBox.querySelector('div.single-comment.no-comments');
                        
                        if (noCommentsDiv) {
                            noCommentsDiv.remove();
                        }
                    } else {
                        console.error('Comment data is undefined');
                    }
                }
            })
            .catch(error => console.error('Error:', error));
        });
    });

    // Delete Comment
    document.addEventListener('click', function(event) {
        if (event.target.closest('#com-trash')) {
            event.preventDefault();
            const deleteLink = event.target.closest('#com-trash');
            const commentId = deleteLink.getAttribute('data-comment-id');
            const postId = deleteLink.getAttribute('data-post-id');

            fetch(`/delete-comment/${commentId}`, {
                method: 'POST',
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(data.error); 
                } else {
                    const commentBox = document.querySelector(`#comment-box-${postId}`);
                    const comment = document.querySelector(`#comment-${commentId}`);
                    if (comment) {
                        comment.remove(); 
                    }

                    const commentsCount = document.querySelector(`#comments-count-${postId}`);
                    commentsCount.textContent = data.comments_count;

                    if (data.comments_count === 0) {
                        const commentList = document.querySelector(`#comment-list-${postId}`);
                        const noComments = document.createElement('div');
                        noComments.classList.add('single-comment', 'no-comments');
                        noComments.innerHTML = '<p>No Comments</p>';
                        commentList.appendChild(noComments);
                    }

                }

                // Force Comment Box Open On Delete
                const postContainer = document.querySelector(`.post[data-post-id="${postId}"]`);
                const commentBox = postContainer.querySelector('.comment-box');

                if (commentBox.getAttribute('data-visible') === 'false') {
                    commentBox.classList.add('show');
                    commentBox.setAttribute('data-visible', 'true'); 

                    const commentBoxHeight = commentBox.offsetHeight;
                    let nextPost = postContainer.nextElementSibling;
                    if (nextPost && nextPost.classList.contains('post')) {
                        nextPost.style.marginTop = `${commentBoxHeight}px`;
                    }

                }

            })
            .catch(error => console.error('Error:', error));
        }

        // Click Anywhere to Close Comment Div
        document.addEventListener("click", function(event) {
            const clickedElement = event.target;
            const commentContainer = clickedElement.closest('.comment-container');
            if (!commentContainer) {
                document.querySelectorAll('.comment-box.show').forEach(box => {
                    box.classList.remove('show');
                    box.setAttribute('data-visible', 'false');

                    let nextPost = box.closest('.post').nextElementSibling;
                    if (nextPost && nextPost.classList.contains('post')) {
                        nextPost.style.marginTop = '0';
                    }
                });
            }
        });
    });
});

// Scroll Gallery
let scrollContainer = document.querySelector(".gallery");
let forwScroll = document.getElementById("forw");
let backScroll = document.getElementById("back");

scrollContainer.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
    scrollContainer.style.scrollBehavior = "auto";
});

forwScroll.addEventListener("click", () => {
    scrollContainer.style.scrollBehavior = "smooth";
    scrollContainer.scrollLeft += 930;
});

backScroll.addEventListener("click", () => {
    scrollContainer.style.scrollBehavior = "smooth";
    scrollContainer.scrollLeft -= 930;
});

