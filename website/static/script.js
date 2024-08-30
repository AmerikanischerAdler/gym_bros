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
    const commentButtons = document.querySelectorAll(".post-button"); // Select all elements with the class 'post-button'

    commentButtons.forEach(button => {
        button.addEventListener("click", function() {
            const commentBox = this.nextElementSibling; // Assuming the comment box is the next sibling element
            if (commentBox.style.display === "none" || commentBox.style.display === "") {
                commentBox.style.display = "block";
            } else {
                commentBox.style.display = "none";
            }
        });
    });
});

// Comments in Comment Box
document.querySelectorAll('.post-button').forEach(function(button) {
    button.addEventListener('click', function() {
        const commentBox = this.nextElementSibling;
        if (commentBox.style.display === "none") {
            commentBox.style.display = "block";
        } else {
            commentBox.style.display = "none";
        }
    });
});

