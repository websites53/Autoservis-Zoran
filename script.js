/* 1. REVEAL ON SCROLL */
const reveals = document.querySelectorAll(".reveal");

function reveal() {
  reveals.forEach(section => {
    const windowHeight = window.innerHeight;
    const elementTop = section.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      section.classList.add("active");
    }
  });
}

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal); // Run on load too


/* 2. HEADER HIDE/SHOW ON SCROLL */
let lastScrollTop = 0;
const header = document.querySelector('header');

if (header) {
  window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      header.style.top = "-80px"; // Hide
    } else {
      header.style.top = "0";      // Show
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
}


/* 3. HERO SLIDER (Home Page Only) */
const heroSlides = document.querySelectorAll(".hero-slide");
const nextBtn = document.querySelector(".hero-next");
const prevBtn = document.querySelector(".hero-prev");

if (heroSlides.length > 0) {
  let currentHero = 0;
  let heroInterval = setInterval(nextHero, 5000);

  function showHero(index) {
    heroSlides.forEach(slide => slide.classList.remove("active"));
    currentHero = index;
    heroSlides[currentHero].classList.add("active");
  }

  function nextHero() {
    showHero((currentHero + 1) % heroSlides.length);
  }

  function prevHero() {
    showHero((currentHero - 1 + heroSlides.length) % heroSlides.length);
  }

  function resetHeroInterval() {
    clearInterval(heroInterval);
    heroInterval = setInterval(nextHero, 5000);
  }

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener("click", () => { nextHero(); resetHeroInterval(); });
    prevBtn.addEventListener("click", () => { prevHero(); resetHeroInterval(); });
  }

  showHero(currentHero);
}


/* 4. REVIEWS CAROUSEL (Home Page Only) */
const cards = document.querySelectorAll('.review-card');
const prevCardBtn = document.querySelector('.reviews-prev');
const nextCardBtn = document.querySelector('.reviews-next');

if (cards.length > 0 && prevCardBtn && nextCardBtn) {
  let currentIndex = 0;
  const total = cards.length;

  function updateCarousel() {
    const radius = window.innerWidth < 768 ? 100 : 180;
    cards.forEach((card, i) => {
      const angle = ((i - currentIndex) / total) * (Math.PI * 2);
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;
      const scale = 0.75 + (z / radius) * 0.35; 
      const opacity = 0.4 + (z / radius) * 0.6;

      card.style.transform = `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) scale(${scale})`;
      card.style.opacity = opacity;
      card.style.zIndex = Math.round(scale * 10);
    });
  }

  window.addEventListener('resize', updateCarousel);
  nextCardBtn.addEventListener('click', () => { currentIndex = (currentIndex + 1) % total; updateCarousel(); });
  prevCardBtn.addEventListener('click', () => { currentIndex = (currentIndex - 1 + total) % total; updateCarousel(); });
  
  updateCarousel();
}

// Initial trigger
window.dispatchEvent(new Event('scroll'));