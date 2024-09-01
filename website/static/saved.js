document.addEventListener("DOMContentLoaded", function() {

    // Show/Hide Comment Box
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
                while (nextPost && nextPost.classList.contains('post')) {
                    nextPost.style.marginTop = '0';
                    nextPost = nextPost.nextElementSibling;
                }
            }
        });
    });

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
                            </div>
                        `;
                        commentList.prepend(newComment); 
            
                        const commentsCount = document.querySelector(`#comments-count-${postId}`);
                        commentsCount.textContent = data.comments_count;
            
                        this.querySelector('input[name="text"]').value = '';
                    } else {
                        console.error('Comment data is undefined');
                    }
                }
            })
            .catch(error => console.error('Error:', error));
        });
    });

    document.addEventListener("click", function(event) {
        const clickedElement = event.target;
        const commentContainer = clickedElement.closest('.comment-container');
        if (!commentContainer) {
            document.querySelectorAll('.comment-box.show').forEach(box => {
                box.classList.remove('show');
                box.setAttribute('data-visible', 'false');

                let nextPost = box.closest('.post').nextElementSibling;
                while (nextPost && nextPost.classList.contains('post')) {
                    nextPost.style.marginTop = '0';
                    nextPost = nextPost.nextElementSibling;
                }
            });
        }
    });
});

