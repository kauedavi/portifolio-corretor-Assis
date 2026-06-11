/**
 * Observa elemento na viewport e aplica classe de animação.
 * @exports initTextAnimation
 */
function initTextAnimation() {
  const divider = document.getElementById('corretorDivider');
  if (!divider) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        divider.classList.add('is-visible');
        observer.disconnect();
      }
    },
    { threshold: 0.4 }
  );

  const headline = document.getElementById('corretorHeadline');
  if (headline) observer.observe(headline);
}

export { initTextAnimation };