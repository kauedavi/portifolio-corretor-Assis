/**
 * Carrega propriedades do arquivo JSON e renderiza cards dinâmicos.
 * @async
 * @exports carregarPlantas
 */
export async function carregarPlantas() {
    const container = document.getElementById('container-plantas');
    
    if (!container) return;

    try {
        const responseUrl = new URL('../../../data/plants.json', import.meta.url);
        const resposta = await fetch(responseUrl);

        if (!resposta.ok) {
            throw new Error(`Falha ao obter plants.json: ${resposta.status} ${resposta.statusText}`);
        }

        const plantas = await resposta.json();

        let htmlContent = '';

        plantas.forEach(planta => {
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

        container.innerHTML = htmlContent;

    } catch (erro) {
        console.error('Erro ao carregar as plantas:', erro);
        container.innerHTML = '<p>Erro ao carregar as plantas. Tente novamente mais tarde.</p>';
    }
}

/**
 * Observa elementos `.planta[data-animate]` e aplica classe ao entrar na viewport.
 * @param {object} [options] - Configurações opcionais
 * @param {string} [options.selector] - Seletor dos elementos a observar
 * @param {number} [options.threshold] - Fração visível para disparar (0–1)
 * @param {string} [options.visibleClass] - Classe CSS adicionada
 * @exports initPlantas
 */
const DEFAULTS = {
  selector: '.planta[data-animate]',
  threshold: 0.18,
  visibleClass: 'planta--visible',
};

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