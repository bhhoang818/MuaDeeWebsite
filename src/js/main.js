window.onload = () => {
    initSplide();
}
const initSplide = () => {
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 2,
        slidesPerColumn: 2,
        spaceBetween: 30,
        navigation: {
            nextEl: ".mySwiper .swiper-button-next",
            prevEl: ".mySwiper .swiper-button-prev",
        },
    });
    var swiper = new Swiper(".bannerSwiper", {
        speed: 3500,
        grabCursor: true,
        effect: "creative",
        creativeEffect: {
            prev: {
                shadow: true,
                translate: ["-150%", 0, -500],
            },
            next: {
                shadow: true,
                translate: ["150%", 0, -500],
            },
        },
        autoplay: {
            delay: 3000
        },
    });
}