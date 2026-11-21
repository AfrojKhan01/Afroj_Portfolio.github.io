const topbar = document.querySelector('.topbar');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = [...document.querySelectorAll('.nav-link')];
const backToTop = document.querySelector('.back-to-top');

menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  navLinks.classList.toggle('open', !open);
  document.body.classList.toggle('menu-open', !open);
});

navItems.forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    navLinks?.classList.remove('open');
    document.body.classList.remove('menu-open');
  });
});

const updateScrollState = () => {
  const y = window.scrollY;
  topbar?.classList.toggle('scrolled', y > 24);
  backToTop?.classList.toggle('visible', y > 520);
};
window.addEventListener('scroll', updateScrollState, { passive: true });
updateScrollState();

const sections = [...document.querySelectorAll('main section[id]')];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navItems.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-38% 0px -55% 0px', threshold: 0 });
sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const analyticsPanel = document.querySelector('.analytics-panel');
const heroVisual = document.querySelector('.hero-visual');
if (heroVisual && analyticsPanel && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  heroVisual.addEventListener('mousemove', (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    analyticsPanel.style.transform = `perspective(900px) rotateY(${x * 8 - 4}deg) rotateX(${y * -7 + 2}deg)`;
  });
  heroVisual.addEventListener('mouseleave', () => {
    analyticsPanel.style.transform = 'perspective(900px) rotateY(-4deg) rotateX(2deg)';
  });
}

const contactForm = document.getElementById('contact-form');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const name = data.get('name');
  const email = data.get('email');
  const subject = data.get('subject');
  const message = data.get('message');
  const body = `Hello Afroj,\n\n${message}\n\nFrom: ${name} (${email})`;
  window.location.href = `mailto:afrozkhan3796@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

document.getElementById('year').textContent = new Date().getFullYear();