document.addEventListener('DOMContentLoaded', () => {

  // ---- FAQ accordion ----
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    btn.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(open => open.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // ---- Mobile nav (simple: reveal links stacked under the bar) ----
  const mobileToggle = document.getElementById('mobileToggle');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const links = document.querySelector('.nav-links');
      const actions = document.querySelector('.nav-actions');
      const isOpen = links.style.display === 'flex';
      links.style.display = isOpen ? 'none' : 'flex';
      actions.style.display = isOpen ? 'none' : 'flex';
      links.style.flexDirection = 'column';
      actions.style.flexDirection = 'column';
    });
  }

  // ---- Scroll reveal ----
  const revealTargets = document.querySelectorAll('.section, .feature-card, .price-card, .testimonial-card, .step');
  revealTargets.forEach(el => el.classList.add('reveal'));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach(el => observer.observe(el));

  // ---- Subtle mockup tilt on mouse move (desktop only) ----
  const mockup = document.getElementById('mockup');
  if (mockup && window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', (e) => {
      const rect = mockup.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      const maxTilt = 3;
      mockup.style.transform = `rotateX(${(-dy * maxTilt).toFixed(2)}deg) rotateY(${(dx * maxTilt).toFixed(2)}deg)`;
    });
  }
});
