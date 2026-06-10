// Módulo de menu mobile (drawer)
export function initMobileMenu() {
  const toggle = document.getElementById('mobileMenuToggle');
  const overlay = document.getElementById('mobileNav');
  const closeBtn = document.getElementById('mobileMenuClose');

  if (!toggle || !overlay) return;

  function openMenu() {
    overlay.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const span = toggle.querySelector('.material-symbols-outlined');
    if (span) span.textContent = 'close';
  }

  function closeMenu() {
    overlay.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    const span = toggle.querySelector('.material-symbols-outlined');
    if (span) span.textContent = 'menu';
  }

  toggle.addEventListener('click', () => {
    const isOpen = overlay.classList.contains('open');
    if (isOpen) closeMenu(); else openMenu();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeMenu();
  });

  overlay.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}
