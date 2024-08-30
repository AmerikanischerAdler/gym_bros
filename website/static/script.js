// Fix This
/*
let heart = document.getElementById("hrz");
let likedPosts = [] // use to add posts to liked posts page in array

heart.addEventListener("click", () => {
    if (heart.style.color != "#9D0000") {
        heart.style.color = "#9D0000";
    } else {
        heart.style.color = "#000";
        alert('worked');
    }
});
*/

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

