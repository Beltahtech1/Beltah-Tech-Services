/* ═══════════════════════════════════════
   BELTAH TECH SERVICES — MAIN JS
   ═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Year ──
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Navbar scroll effect ──
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ── Mobile hamburger ──
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close nav when link clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity   = '';
      });
    });
  });

  // ── Counter animation ──
  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const step     = 16;
    const increment = target / (duration / step);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current);
    }, step);
  }

  // ── Intersection Observer ──
  const countersDone = new Set();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Fade-in
        entry.target.classList.add('visible');

        // Counters
        entry.target.querySelectorAll('.counter, .hstat-num').forEach(el => {
          if (!countersDone.has(el)) {
            countersDone.add(el);
            animateCounter(el);
          }
        });
      }
    });
  }, { threshold: 0.15 });

  // Observe sections for fade-in
  document.querySelectorAll('section, .service-card, .pillar, .stat-card, .about-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // Also observe the hero stats area so counters run on load
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) observer.observe(heroStats);

  // ── Contact form (client-side only) ──
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name    = document.getElementById('name').value.trim();
      const email   = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email) {
        note.textContent = '⚠️ Please fill in your name and email.';
        note.style.color = '#c0392b';
        return;
      }

      // Simulate sending
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Sending...';
      btn.disabled = true;

      setTimeout(() => {
        note.textContent = '✅ Thank you! We\'ll be in touch within 24 hours.';
        note.style.color = '#2e7d32';
        form.reset();
        btn.textContent = 'Send Message →';
        btn.disabled = false;
      }, 1200);
    });
  }

  // ── Smooth active nav highlight ──
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      const top = s.offsetTop - 100;
      if (window.scrollY >= top) current = s.getAttribute('id');
    });

    navItems.forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === `#${current}`) {
        if (!link.classList.contains('btn-nav')) {
          link.style.color = 'var(--blue)';
        }
      }
    });
  });

});
