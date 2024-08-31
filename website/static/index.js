function like(postId) {
    const likeCount = document.getElementById(`likes-count-${postId}`);
    const likeButton = document.getElementById(`like-button-${postId}`);
    const postElement = document.getElementById(`post-${postId}`);
    const postContainer = document.getElementById('post-container');
    const titleDiv = document.getElementById('title');

    fetch(`/like-post/${postId}`, { method: "POST" })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
                alert(data.error);
            } else {

                // Like Count
                likeCount.textContent = data.likes;

                // Color Change
                if (data.liked) {
                    likeButton.classList.remove("not_liked_post");
                    likeButton.classList.add("liked_post");
                } else {
                    likeButton.classList.remove("liked_post");
                    likeButton.classList.add("not_liked_post");

                    // Remove from Saved
                    if (postElement && window.location.pathname === "/saved") {
                        postElement.remove();

                        if (postContainer.children.length === 0) {
                            titleDiv.innerHTML = `
                                <h1>Saved</h1>
                                <h2>It looks like you don't have any saved posts...</h2>
                                <h4>Click the heart to save your favorite posts!</h4>
                            `;
                        }
                    }
                }
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

