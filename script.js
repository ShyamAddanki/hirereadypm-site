/* ═══════════════════════════════════════════════════════
   Portfolio Interactions
   - Scroll reveal (IntersectionObserver)
   - Accordion toggle (case studies)
   - Keyboard accessibility
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Scroll Reveal ─────────────────────────────────
  // Elements with class "reveal" fade in when 8% visible

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  document.querySelectorAll('.reveal').forEach((el) => {
    revealObserver.observe(el);
  });

  // ── Accordion (Case Studies) ──────────────────────
  // Click a case-header to expand/collapse. One open at a time.

  const caseHeaders = document.querySelectorAll('.case-header');

  caseHeaders.forEach((header) => {
    header.addEventListener('click', () => {
      const card = header.closest('.case-card');
      const isOpen = card.classList.contains('open');

      // Close all
      document.querySelectorAll('.case-card.open').forEach((openCard) => {
        openCard.classList.remove('open');
        openCard.querySelector('.case-header').setAttribute('aria-expanded', 'false');
      });

      // Open clicked (if it wasn't already open)
      if (!isOpen) {
        card.classList.add('open');
        header.setAttribute('aria-expanded', 'true');
      }
    });

    // Keyboard accessibility
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
  });
})();
