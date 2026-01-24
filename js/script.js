document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector(".fade-slider");
  if (!slider) return;

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
});