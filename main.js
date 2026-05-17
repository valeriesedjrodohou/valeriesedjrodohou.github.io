// ── FADE UP ANIMATIONS ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.08 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── SKILL BARS ──
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target.querySelector('.skill-fill');
      if (fill) {
        const target = fill.getAttribute('data-width') || fill.style.width;
        fill.style.width = '0';
        setTimeout(() => { fill.style.width = target; }, 200);
      }
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-card').forEach(el => barObserver.observe(el));

// ── NAV SCROLL EFFECT ──
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

// ── MOBILE MENU ──
function toggleMenu() {
  const links = document.querySelector('.nav-links');
  links.classList.toggle('open');
}

document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('open');
  });
});

// ── FLOATING PARTICLES ──
function createParticles() {
  const colors = ['rgba(13,162,199,0.4)', 'rgba(59,130,246,0.3)', 'rgba(56,189,248,0.35)', 'rgba(79,70,229,0.25)'];
  for (let i = 0; i < 8; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const dur  = Math.random() * 15 + 12;
    const delay = Math.random() * 10;
    const color = colors[Math.floor(Math.random() * colors.length)];
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${left}%;
      background:${color};
      animation-duration:${dur}s;
      animation-delay:-${delay}s;
    `;
    document.body.appendChild(p);
  }
}

createParticles();

// ── COUNTER ANIMATION (stats) ──
function animateCounters() {
  document.querySelectorAll('.stat-val[data-count]').forEach(el => {
    const target = parseInt(el.getAttribute('data-count'));
    let current = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + (el.getAttribute('data-suffix') || '');
      if (current >= target) clearInterval(timer);
    }, 40);
  });
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const statsEl = document.querySelector('.about-stats');
if (statsEl) statsObserver.observe(statsEl);
