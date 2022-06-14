window.onload = () => {
    initSplide();
    gsapInit();

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
}
const gsapInit = () => {

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
        smooth: .5,
        effects: true
    });
    smoother.scrollTop(window.pageYOffset);
    window.history.scrollRestoration = "auto";

    function animateFrom(elem, direction) {
        direction = direction || 1;
        var x = 0,
            y = direction * 100;
        if (elem.classList.contains("gs_reveal_fromLeft")) {
            x = -300;
            y = 0;
        } else if (elem.classList.contains("gs_reveal_fromRight")) {
            x = 300;
            y = 0;
        } else if (elem.classList.contains("gs_reveal_fromTop")) {
            x = 0;
            y = 200;
        }
        elem.style.transform = "translate(" + x + "px, " + y + "px)";
        elem.style.opacity = "0";
        gsap.fromTo(elem, {
            x: x,
            y: y,
            autoAlpha: 0
        }, {
            duration: 1.25,
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


    let links = gsap.utils.toArray("nav a");

    gsap.utils.toArray(".nav-link").forEach(function (a) {
        a.addEventListener("click", function (e) {
            e.preventDefault();
            gsap.to(window, {
                duration: 1,
                scrollTo: e.target.getAttribute("href")
            });
        });
    });

    function setActive(link) {
        links.forEach(el => el.classList.remove("active"));
        link.classList.add("active");
    }


    const horizontalSections = gsap.utils.toArray('.horizontal')

    horizontalSections.forEach(function (sec, i) {

        var thisPinWrap = sec.querySelector('.pin-wrap');
        var thisAnimWrap = thisPinWrap.querySelector('.animation-wrap');

        var getToValue = () => -(thisAnimWrap.scrollWidth - window.innerWidth);

        gsap.fromTo(thisAnimWrap, {
            x: () => thisAnimWrap.classList.contains('to-right') ? 0 : getToValue()
        }, {
            x: () => thisAnimWrap.classList.contains('to-right') ? getToValue() : 0,
            ease: "none",
            scrollTrigger: {
                trigger: sec,
                start: "top top",
                end: () => "+=" + (thisAnimWrap.scrollWidth - window.innerWidth),
                pin: thisPinWrap,
                invalidateOnRefresh: true,
                scrub: true,
            }
        });

    });
}