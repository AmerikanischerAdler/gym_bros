document.addEventListener("DOMContentLoaded", function() {

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
                while (nextPost && nextPost.classList.contains('post')) {
                    nextPost.style.marginTop = '0';
                    nextPost = nextPost.nextElementSibling;
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

    // Click Anywhere to Close Comment Div
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

// Following
document.addEventListener("DOMContentLoaded", function() {
  const followButtons = document.querySelectorAll('.follow-friend .followBtn');

  followButtons.forEach(followButton => {
    followButton.addEventListener('click', function(event) {
      event.preventDefault();
      var followedUserId = followButton.getAttribute('data-userId');

      if (followedUserId) {
        fetch(`/follow/${followedUserId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({}) 
        })
        .then(response => response.json())
        .then(data => {
          if (data.message) {
            console.log(data.message); 

            var followersCountElement = document.querySelector(`#followers-count-${followedUserId}`);
            if (followersCountElement && data.followers_count !== undefined) {
              followersCountElement.textContent = data.followers_count;
            }

            var friendsCountElement = document.querySelector(`#friends-count-${followedUserId}`);
            if (friendsCountElement && data.friends_count !== undefined) {
              friendsCountElement.textContent = data.friends_count;
            }

            var followText = document.querySelector(`#followText-${followedUserId}`);
            var friendText = document.querySelector(`#friendText-${followedUserId}`);

            followText.textContent = data.isFollowing ? 'Unfollow' : 'Follow';

            // for friend request
            //friendText.textContent = data.friendStatus

          } else if (data.error) {
            console.error(data.error);  
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
      } else {
        console.error("No user ID found.");
      }
    });
  });
});

