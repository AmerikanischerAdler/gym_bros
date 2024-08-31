function like(postId) {
    const likeCount = document.getElementById(`likes-count-${postId}`);
    const likeButton = document.getElementById(`like-button-${postId}`);
    const postElement = document.getElementById(`post-${postId}`);

    fetch(`/like-post/${postId}`, {method: "POST"})
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
                alert(data.error);
            } else {
                if (!data.liked) {
                    postElement.remove();
                } else {
                    // Like Count
                    likeCount.textContent = data.likes;

                    // Colors If Liked/Not Liked
                    likeButton.classList.remove("not_liked_post");
                    likeButton.classList.add("liked_post");
                }
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}
