function colorChange() {
    let heart = document.getElementById("hrz");
    heart.style.color = "#9D0000";
};

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
})

backScroll.addEventListener("click", () => {
    scrollContainer.style.scrollBehavior = "smooth";
    scrollContainer.scrollLeft -= 930;
})



