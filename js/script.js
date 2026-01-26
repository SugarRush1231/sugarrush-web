document.addEventListener('DOMContentLoaded', () => {
    // Fade Slider
    const slider = document.querySelector(".fade-slider");
    if (slider) {
        const slides = Array.from(slider.querySelectorAll(".slide"));
        const dots = Array.from(slider.querySelectorAll(".dot"));
        const prevBtn = slider.querySelector(".prev");
        const nextBtn = slider.querySelector(".next");

        let index = 0;
        const AUTOPLAY_MS = 2500;
        let timer = null;

        function show(i) {
            index = (i + slides.length) % slides.length;
            slides.forEach((s, idx) => s.classList.toggle("active", idx === index));
            dots.forEach((d, idx) => d.classList.toggle("active", idx === index));
        }

        function next() { show(index + 1); }
        function prev() { show(index - 1); }

        function start() {
            clearInterval(timer);
            timer = setInterval(next, AUTOPLAY_MS);
        }

        nextBtn.addEventListener("click", () => { next(); start(); });
        prevBtn.addEventListener("click", () => { prev(); start(); });
        dots.forEach((dot, i) => dot.addEventListener("click", () => { show(i); start(); }));

        show(0);
        start();
    }

    // Cookie Consent
    const cookieBanner = document.getElementById('cookie-consent-banner');
    const acceptBtn = document.getElementById('cookie-consent-accept');
    const declineBtn = document.getElementById('cookie-consent-decline');

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${d.toUTCString()}`;
        document.cookie = `${name}=${value};${expires};path=/`;
    }

    if (!getCookie('cookie_consent')) {
        cookieBanner.style.display = 'block';
    }

    acceptBtn.addEventListener('click', () => {
        setCookie('cookie_consent', 'accepted', 365);
        cookieBanner.style.display = 'none';
    });

    declineBtn.addEventListener('click', () => {
        setCookie('cookie_consent', 'declined', 365);
        cookieBanner.style.display = 'none';
    });
});
