document.addEventListener("DOMContentLoaded", function () {
    const frontCover = document.getElementById("front-cover");
    const book = document.querySelector(".book");

    function coverTurn() {
        if (!frontCover.classList.contains("flipped")) {
            frontCover.style.animation = "open-cover 1s forwards";
            frontCover.classList.add("flipped");

            $("#front-cover").css("z-index", "1");
            $("#cover-container").css("z-index", "1");
            $(".book").css("z-index", "50");
            $(".book-contain").css("z-index", "50");

            $(".book").css("visibility", "visible");
            $(".book-contain").css("visibility", "visible");
        } else {
            frontCover.style.animation = "close-cover 1s forwards";
            frontCover.classList.remove("flipped");

            $("#front-cover").css("z-index", "100");
            $("#cover-container").css("z-index", "100");
            $(".book").css("z-index", "50");
            $(".book-contain").css("z-index", "50");

            $(".book").css("visibility", "hidden");
            $(".book-contain").css("visibility", "hidden");
        }
    }

    frontCover.addEventListener("click", coverTurn);
    //book.addEventListener("click", coverTurn);
});


