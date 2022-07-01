$(document).ready(() => {
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

})

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
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);

        let sections = gsap.utils.toArray(".banner-item");
        gsap.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: ".bannerSwiper",
                pin: true,
                scrub: 1,
                snap: 1 / (sections.length - 1),
                end: () => "+=" + document.querySelector(".bannerSwiper").offsetWidth
            }
        });


        let smoother = ScrollSmoother.create({
            wrapper: '.body-container-wrapper',
            content: '.body-scrollable-area',
            smooth: .8,
            effects: true
        });
        smoother.scrollTop(window.pageYOffset);
        window.history.scrollRestoration = "auto";


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
        let container = document.getElementsByClassName("panels-container");
        console.log(container);
        gsap.to(container, {
            x: () => -(container.scrollWidth - document.documentElement.clientWidth) + "px",
            ease: "none",
            scrollTrigger: {
                trigger: container,
                invalidateOnRefresh: true,
                pin: true,
                scrub: 1,
                end: () => "+=" + container.offsetWidth
            }
        })

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
}

const checkLayoutBanner = () => {
    const heightHeader = $("header").outerHeight();
    const mainBanner = $("#hero-banner");
    if (mainBanner.length >= 1) {
        $(".body-container-wrapper").css("padding-top", 0);
    } else {
        $(".body-container-wrapper").css("padding-top", heightHeader);
    }
};
const jumpSection = () => {
    if ($(window).width() >= 1025) {
        gsap.registerPlugin(ScrollTrigger);

        gsap.utils.toArray(".jump-section").forEach((panel, i) => {
            ScrollTrigger.create({
                trigger: panel,
                start: "top top",
                pin: true,
                pinSpacing: false
            });
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
    var heightHeader = $("header").outerHeight();

    $("#navbar .navbar-nav .nav-item .nav-link").on("click", function (event) {
        $(this).parents("li").addClass("active");
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $("html, body").animate({
                    scrollTop: $(hash).offset().top - heightHeader,
                },
                1000,
                function () {
                    window.location.hash = hash;
                }
            );
        }
        $("#navbar .navbar-nav .nav-item .nav-link")
            .not(this)
            .parent("li")
            .removeClass("active");
        window.addEventListener("scroll", function () {
            var bannerheight = $("header").outerHeight();
            if (window.pageYOffset > bannerheight) {
                document.querySelector("header").classList.add("scrolled");
            } else {
                document.querySelector("header").classList.remove("scrolled");
            }
        });
    });

    window.addEventListener("scroll", function () {
        var bannerheight = $("header").outerHeight();
        if (window.pageYOffset > bannerheight) {
            document.querySelector("header").classList.add("scrolled");
        } else {
            document.querySelector("header").classList.remove("scrolled");
        }
    });
    const showAnim = gsap.from('header', {
        yPercent: -100,
        paused: true,
        duration: 0.2
    }).progress(1);

    ScrollTrigger.create({
        start: "top top",
        end: 99999,
        onUpdate: (self) => {
            self.direction === -1 ? showAnim.play() : showAnim.reverse()
        }
    });

}