window.onload = () => {
    initSplide();
    const horizontalSections = gsap.utils.toArray('section.horizontal')

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
                //anticipatePin: 1,
                scrub: true,
                //markers: true,
            }
        });

    });
}
const initSplide = () => {
    new Splide('#splide', {
        type: 'loop',
        grid: {
            rows: 2,
            cols: 3,
            gap: {
                row: '1rem',
                col: '1.5rem',
            },
        },
    }).mount(window.splide.Extensions);
}