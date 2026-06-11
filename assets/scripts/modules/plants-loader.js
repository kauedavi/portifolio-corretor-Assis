// ================================================================
// plantas.js
// Módulo de animação da section #plantas
//
// Uso:
//   import { initPlantas } from './plantas.js';
//   initPlantas();
//
//   // ou com seletor/threshold customizados:
//   initPlantas({ selector: '.planta[data-animate]', threshold: 0.25 });
// ================================================================

const DEFAULTS = {
  selector:  '.planta[data-animate]',
  threshold: 0.18,
  visibleClass: 'planta--visible',
};

/**
 * Observa cada card `.planta[data-animate]` e adiciona
 * a classe `planta--visible` quando ele entra na viewport,
 * disparando a animação CSS correspondente.
 *
 * @param {object} [options]
 * @param {string} [options.selector]     - Seletor dos elementos a observar.
 * @param {number} [options.threshold]    - Fração visível para disparar (0–1).
 * @param {string} [options.visibleClass] - Classe CSS adicionada ao tornar-se visível.
 */
export function initPlantas(options = {}) {
  const { selector, threshold, visibleClass } = { ...DEFAULTS, ...options };

  const elements = document.querySelectorAll(selector);

  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(visibleClass);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold }
  );

  elements.forEach((el) => observer.observe(el));
}