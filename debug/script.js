

document.addEventListener("DOMContentLoaded", () => {
    let scrollContainer = document.querySelector(".gallery");
    let cards = document.querySelector(".cards");
    let forwScroll = document.getElementById("forw");
    let backScroll = document.getElementById("back");

    // Duplicate the cards for seamless looping
    let items = Array.from(cards.children);
    items.forEach(item => {
        cards.appendChild(item.cloneNode(true));
    });

    // GSAP setup for horizontal loop
    let loop = gsap.timeline({ repeat: -1, paused: true })
        .to(".cards", { xPercent: -100, duration: items.length * 5, ease: "none" });

    // GSAP Observer for scroll and pointer events
    Observer.create({
        target: ".gallery",
        type: "pointer,touch,wheel",
        wheelSpeed: -1,
        onChange: self => {
            loop.timeScale(Math.abs(self.deltaX) > Math.abs(self.deltaY) ? -self.deltaX : -self.deltaY);
            gsap.to(loop, { timeScale: 1, duration: 0.5 });
        }
    });

    // Initial loop setup
    loop.timeScale(0);

    // Scroll buttons
    forwScroll.addEventListener("click", () => {
        gsap.to(loop, { timeScale: 1 });
        scrollContainer.scrollLeft += 900;
        setTimeout(() => gsap.to(loop, { timeScale: 0 }), 500);
    });

    backScroll.addEventListener("click", () => {
        gsap.to(loop, { timeScale: -1 });
        scrollContainer.scrollLeft -= 900;
        setTimeout(() => gsap.to(loop, { timeScale: 0 }), 500);
    });
});

