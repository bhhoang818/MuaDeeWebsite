$(document).ready(() => {
    bannerHome();
    initSplide();
    gsapInit();
    checkLayoutBanner();
    jumpSection();
    scrollTop();
    if ($('#vid').length >= 1) {
        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                    vid.currentTime = 1.2;
                    vid.play();
                } else if (entry.isIntersecting) {
                    vid.pause();
                }
            });
        });
        observer.observe(vid);

    }
    headerActive();
    navActive();
    parallaxBackground();
})
const bannerHome = () => {
    if ($(window).width() >= 1025 && $('#hero-banner').length >= 1) {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);
        let sections = gsap.utils.toArray(".banner-item");
        gsap.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: ".bannerSwiper",
                pin: true,
                scrub: 0.2,
                snap: 1 / (sections.length - 1),
                end: () => "+=" + document.querySelector(".bannerSwiper").offsetWidth
            }
        });
    }
}
const initSplide = () => {
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 3,
        grid: {
            rows: 2,
            fill: 'row',
        },
        spaceBetween: 16,
        navigation: {
            nextEl: ".button-swiper .swiper-button-next",
            prevEl: ".button-swiper  .swiper-button-prev",
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 16,
            },
            768: {
                slidesPerView: 2,
            },
        },

    });
    var swiperBottom = new Swiper(".gallery-bottom", {
        freeMode: true,
        watchSlidesProgress: true,
        breakpoints: {
            320: {
                direction: 'horizontal',
                slidesPerView: 1,
                spaceBetween: 24,
            },
            768: {
                direction: 'horizontal',
                slidesPerView: 3,
            },
            1025: {
                direction: 'vertical',
                slidesPerView: 3,
                spaceBetween: 0,
            },
        },
    });
    var swiperTop = new Swiper(".gallery-top", {
        spaceBetween: 10,
        navigation: {
            nextEl: ".gallery-top .button-swiper .swiper-button-next",
            prevEl: ".gallery-top .button-swiper .swiper-button-prev",
        },
        thumbs: {
            swiper: swiperBottom,
        },
    });
    var swiperHero = new Swiper(".banner-mobile", {
        navigation: {
            nextEl: ".banner-mobile .swiper-button-next",
            prevEl: ".banner-mobile .swiper-button-prev",
        },
        slidesPerView: 1
    });
}
const gsapInit = () => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);

    if ($(window).width() >= 1025 && $('#hero-banner').length >= 1) {

        function animateFrom(elem, direction) {
            direction = direction || 1;
            var x = 0,
                y = direction * 100;
            if (elem.classList.contains("gs_reveal_fromLeft")) {
                x = -100;
                y = 0;
            } else if (elem.classList.contains("gs_reveal_fromRight")) {
                x = 100;
                y = 0;
            } else if (elem.classList.contains("gs_reveal_fromTop")) {
                x = 0;
                y = 100;
            }
            elem.style.transform = "translate(" + x + "px, " + y + "px)";
            elem.style.opacity = "0";
            gsap.fromTo(elem, {
                x: x,
                y: y,
                autoAlpha: 0
            }, {
                duration: 2.25,
                x: 0,
                y: 0,
                autoAlpha: 1,
                ease: "expo",
                overwrite: "auto"
            });
        }

        function hide(elem) {
            gsap.set(elem, {
                autoAlpha: 0
            });
        }
        gsap.utils.toArray(".gs_reveal").forEach(function (elem) {
            hide(elem);

            ScrollTrigger.create({
                trigger: elem,
                onEnter: function () {
                    animateFrom(elem)
                },
                onEnterBack: function () {
                    animateFrom(elem, -1)
                },
                onLeave: function () {
                    hide(elem)
                }
            });

        });

        /* Panels */
        let panel = gsap.utils.toArray(".panels");

        gsap.to(panel, {
            xPercent: -100 * (panel.length - 1),
            ease: "none",
            scrollTrigger: {
                start: 'top -80',
                trigger: ".panels-container",
                pin: true,
                scrub: 1,
                end: () => "+=" + document.querySelector(".panels-container").offsetWidth
            }
        });

    } else {
        function animateFrom(elem, direction) {
            direction = direction || 1;
            var x = 0,
                y = direction * 50;
            if (elem.classList.contains("gs_reveal_fromLeft")) {
                x = -50;
                y = 0;
            } else if (elem.classList.contains("gs_reveal_fromRight")) {
                x = 50;
                y = 0;
            } else if (elem.classList.contains("gs_reveal_fromTop")) {
                x = 0;
                y = 50;
            } else if (elem.classList.contains("gs_reveal_fromBottom")) {
                x = 0;
                y = -50;
            }
            elem.style.transform = "translate(" + x + "px, " + y + "px)";
            elem.style.opacity = "0";
            gsap.fromTo(elem, {
                x: x,
                y: y,
                autoAlpha: 0
            }, {
                duration: 2.25,
                x: 0,
                y: 0,
                autoAlpha: 1,
                ease: "expo",
                overwrite: "auto"
            });
        }

        function hide(elem) {
            gsap.set(elem, {
                autoAlpha: 0
            });
        }
        gsap.utils.toArray(".gs_reveal").forEach(function (elem) {
            hide(elem);

            ScrollTrigger.create({
                trigger: elem,
                onEnter: function () {
                    animateFrom(elem)
                },
                onEnterBack: function () {
                    animateFrom(elem, -1)
                },
                onLeave: function () {
                    hide(elem)
                }
            });

        });
    }
    let smoother = ScrollSmoother.create({
        wrapper: '.body-container-wrapper',
        content: '.body-scrollable-area',
        smooth: 1.8,
        effects: true
    });
    smoother.scrollTop(window.pageYOffset);
    window.history.scrollRestoration = "auto";
}

const checkLayoutBanner = () => {
    const heightHeader = $("header").outerHeight();
    const mainBanner = $("#hero-banner");
    if (mainBanner.length >= 1 && $(window).width() >= 992) {
        $(".body-container-wrapper").css("padding-top", heightHeader);
    } else {
        $(".body-container-wrapper").css("padding-top", heightHeader);
    }
};
const jumpSection = () => {
    if ($(window).width() >= 1025 && $('#hero-banner').length >= 1) {
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.create({
            trigger: ".home-6 .wrapper-container",
            start: "+40 top",
            end: "bottom top",
            pin: true,
            pinSpacing: false,
        });
    }
}

const scrollTop = () => {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $("#back-to-top").addClass('active');
        } else {
            $("#back-to-top").removeClass('active');
        }
    });

    $("#back-to-top").on("click", function (e) {
        e.preventDefault();
        $("html,body").animate({
            scrollTop: 0,
        });
    });
};

const headerActive = () => {
    if ($('#hero-banner').length >= 1) {
        const showAnim = gsap.from('.main-tool-bar', {
            yPercent: -100,
            paused: true,
            duration: 0.2
        }).progress(1);

        ScrollTrigger.create({
            start: "top -6000",
            end: 99999,
            onUpdate: (self) => {
                self.direction === -1 ? showAnim.play() : showAnim.reverse()
            }
        });
        ScrollTrigger.create({
            start: 'top -150',
            end: 99999,
            toggleClass: {
                className: 'main-tool-bar--scrolled',
                targets: '.main-tool-bar'
            }
        });
    } else {
        ScrollTrigger.create({
            start: 'top -150',
            end: 99999,
            toggleClass: {
                className: 'main-tool-bar--scrolled',
                targets: '.main-tool-bar'
            }
        });
    }
}
const navActive = () => {
    if ($('#hero-banner').length >= 1) {
        $('[data-toggle]').on('click', function (event) {
            event.preventDefault();
            var target = $(this.hash);
            target.toggle();
        });

        var lastId,
            topMenu = $(".navbar-nav"),
            topMenuHeight = topMenu.outerHeight(),
            menuItems = topMenu.find("a"),
            scrollItems = menuItems.map(function () {
                var item = $(this).attr("href");
                if (item != '#') {
                    return $(item)
                }
            });

        console.log(scrollItems)


        menuItems.click(function (e) {
            var href = $(this).attr("href"),
                offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight - 1;
            $('html, body').stop().animate({
                scrollTop: offsetTop
            }, 300);
            e.preventDefault();
        });

        $(window).scroll(function () {
            var fromTop = $(this).scrollTop() + topMenuHeight;

            var cur = scrollItems.map(function () {
                if ($(this).offset().top < fromTop)
                    return this;
            });
            cur = cur[cur.length - 1];
            var id = cur && cur.length ? cur[0].id : "";

            if (lastId !== id) {
                lastId = id;
                menuItems
                    .parent().removeClass("active")
                    .end().filter("[href='#" + id + "']").parent().addClass("active");
            }
        });
    }

}
const parallaxBackground = () => {
    if ($(window).width() >= 1025 && $('#hero-banner').length >= 1) {
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.create({
            trigger: ".bg",
            start: "top top",
            end: "bottom top",
            pin: true,
            pinSpacing: false,
            toggleClass: {
                targets: ".bg",
                className: "active"
            }
        });

    }

}