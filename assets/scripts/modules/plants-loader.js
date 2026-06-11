export async function carregarPlantas() {
    const container = document.getElementById('container-plantas');
    
    // Evita erros caso a seção não exista na página atual
    if (!container) return;

    try {
        const resposta = await fetch('data/plants.json');
        const plantas = await resposta.json();

        let htmlContent = '';

        plantas.forEach(planta => {
            // Verifica se tem badge para não criar tag vazia
            const badgeHtml = planta.badge 
                ? `<span class="planta__badge">${planta.badge}</span>` 
                : '';

            htmlContent += `
                <div class="planta ${planta.classes}" data-animate="${planta.animacao}">
                    <div class="planta__imagem">
                        <img src="${planta.imagem}" alt="${planta.alt}">
                        ${badgeHtml}
                    </div>
                    <div class="planta__descricao">
                        <span class="planta__eyebrow">${planta.tipologia}</span>
                        <h2 class="planta__nome">${planta.titulo}</h2>
                        <p class="planta__texto">${planta.descricao}</p>
                        <a href="${planta.ctaUrl}" class="planta__cta">${planta.ctaTexto}</a>
                    </div>
                </div>
            `;
        });

        // Injeta tudo de uma vez para melhor performance
        container.innerHTML = htmlContent;

    } catch (erro) {
        console.error('Erro ao carregar as plantas:', erro);
        container.innerHTML = '<p>Erro ao carregar as plantas. Tente novamente mais tarde.</p>';
    }
}



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