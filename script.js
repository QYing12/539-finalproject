(() => {
  const toggle = document.getElementById('navToggle');
  const overlay = document.getElementById('navOverlay');
  if (!toggle || !overlay) return;

  toggle.addEventListener('click', () => {
    const isOpen = overlay.classList.toggle('is-open');
    toggle.innerHTML = isOpen ? '&#10005;' : '&#9776;';
    toggle.setAttribute('aria-expanded', isOpen);
  });

  overlay.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      overlay.classList.remove('is-open');
      toggle.innerHTML = '&#9776;';
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

(() => {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach((el) => {
    observer.observe(el);
  });
})();