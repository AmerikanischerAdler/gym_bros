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

