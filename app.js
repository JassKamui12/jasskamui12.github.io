'use strict';

/* ─── TYPED ROLES ─── */
const rolesES = ['Ciberseguridad', 'Auditor ISO 27001', 'Desarrollo Web', 'IA & Automatización'];
const rolesEN = ['Cybersecurity', 'ISO 27001 Auditor', 'Web Development', 'AI & Automation'];

let currentLang = 'es';
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout;

function type() {
  const roles = currentLang === 'es' ? rolesES : rolesEN;
  const current = roles[roleIndex % roles.length];
  const el = document.getElementById('typed-role');
  if (!el) return;

  if (isDeleting) {
    el.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex++;
      typingTimeout = setTimeout(type, 400);
      return;
    }
    typingTimeout = setTimeout(type, 55);
  } else {
    el.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      typingTimeout = setTimeout(type, 2200);
      return;
    }
    typingTimeout = setTimeout(type, 85);
  }
}

/* ─── LANGUAGE TOGGLE ─── */
function applyLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-es][data-en]').forEach(el => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });

  document.querySelectorAll('[data-lang]').forEach(el => {
    el.classList.toggle('hidden', el.getAttribute('data-lang') !== lang);
  });

  const btnES = document.querySelector('.lang-es');
  const btnEN = document.querySelector('.lang-en');
  if (btnES) btnES.classList.toggle('hidden', lang === 'es');
  if (btnEN) btnEN.classList.toggle('hidden', lang === 'en');

  clearTimeout(typingTimeout);
  charIndex = 0;
  isDeleting = false;
  const el = document.getElementById('typed-role');
  if (el) el.textContent = '';
  typingTimeout = setTimeout(type, 200);
}

/* ─── NAVBAR SCROLL ─── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ─── MOBILE MENU ─── */
function initMenu() {
  const btn = document.getElementById('menu-toggle');
  const links = document.getElementById('nav-links');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      btn.classList.remove('open');
    });
  });
}

/* ─── SCROLL REVEAL ─── */
function initReveal() {
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }),
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ─── ACTIVE NAV LINK ─── */
function initActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          links.forEach(l => l.classList.remove('active'));
          const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    },
    { threshold: 0.5 }
  );
  sections.forEach(s => observer.observe(s));
}

/* ─── CONTACT FORM ─── */
function initForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    const name = form.querySelector('#name').value.trim();
    const subject = form.querySelector('#subject').value.trim() || 'Contacto desde portafolio';
    const body = form.querySelector('#body').value.trim();
    if (!name || !body) return;
    e.preventDefault();
    const mailto = `mailto:alejandrosolorzano023@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nombre: ${name}\n\n${body}`)}`;
    window.location.href = mailto;
  });
}

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMenu();
  initReveal();
  initActiveLink();
  initForm();

  document.getElementById('lang-toggle')?.addEventListener('click', () => {
    applyLang(currentLang === 'es' ? 'en' : 'es');
  });

  applyLang('es');
  setTimeout(type, 800);
});
