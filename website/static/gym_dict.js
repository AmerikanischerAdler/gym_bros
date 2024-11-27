var frontCover = document.getElementById("front-cover");

document.addEventListener("DOMContentLoaded", function () {
    const frontCover = document.getElementById("front-cover");

    frontCover.addEventListener("animationend", () => {
        if (frontCover.classList.contains("flipped")) {
            frontCover.style.zIndex = 1; // Behind the book after flipping
        } else {
            frontCover.style.zIndex = 3; // On top before flipping
        }
    });

    frontCover.addEventListener("click", () => {
        if (!frontCover.classList.contains("flipped")) {
            frontCover.style.animation = "open-cover 1s forwards";
            frontCover.classList.add("flipped");
        } else {
            frontCover.style.animation = "close-cover 1s forwards"; // Define a reverse animation
            frontCover.classList.remove("flipped");
        }
    });
});

