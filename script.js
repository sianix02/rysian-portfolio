// ─── FADE-UP ON SCROLL ───────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));


// ─── MOBILE NAV HAMBURGER ─────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});


// ─── CAROUSEL ─────────────────────────────────────────────
const track = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('carouselDots');

const cards = Array.from(track.children);
let currentIndex = 0;

// How many cards visible at once based on screen width
function getVisible() {
  if (window.innerWidth <= 768) return 1;
  if (window.innerWidth <= 900) return 2;
  return 3;
}

// Total number of "pages"
function totalPages() {
  return Math.ceil(cards.length / getVisible());
}

// Build dots
function buildDots() {
  dotsContainer.innerHTML = '';
  for (let i = 0; i < totalPages(); i++) {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === currentIndex ? ' active' : '');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  }
}

function updateDots() {
  dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });
}

function goTo(index) {
  const visible = getVisible();
  const pages = totalPages();
  currentIndex = Math.max(0, Math.min(index, pages - 1));

  // Card width + gap
  const cardWidth = track.querySelector('.project-card').offsetWidth;
  const gap = 24; // 1.5rem in px
  const offset = currentIndex * visible * (cardWidth + gap);
  track.style.transform = `translateX(-${offset}px)`;

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex >= pages - 1;
  updateDots();
}

prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

// Re-initialize on resize
window.addEventListener('resize', () => {
  currentIndex = 0;
  buildDots();
  goTo(0);
});

// Init
buildDots();
goTo(0);


// ─── ACTIVE NAV LINK ON SCROLL ───────────────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${entry.target.id}`
          ? 'var(--gold)'
          : 'rgba(255,255,255,0.75)';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
