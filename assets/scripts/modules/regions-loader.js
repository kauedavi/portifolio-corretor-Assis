/**
 * regions-loader.js
 * Carrega regiões do JSON e renderiza os cards
 */

async function carregarRegioes() {
    try {
        const responseUrl = new URL('../../../data/regioes.json', import.meta.url);
        const response = await fetch(responseUrl);

        if (!response.ok) {
            throw new Error(`Falha ao obter regioes.json: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        const track = document.getElementById('locaisTrack');
        track.innerHTML = '';

        data.regioes.forEach(regiao => {
            const cardHTML = `
                <div class="regiao-card ${regiao.classe}">
                    <img class="regiao-img"
                         src="${regiao.imagem}"
                         alt="${regiao.nome} — São Paulo">
                    <div class="regiao-overlay">
                        <span class="regiao-tag">${regiao.tag}</span>
                        <div class="regiao-linha"></div>
                        <h3 class="regiao-nome">${regiao.nome}</h3>
                        <p class="regiao-desc">${regiao.descricao}</p>
                    </div>
                </div>
            `;
            track.innerHTML += cardHTML;
        });

        if (typeof initRegionCarousel === 'function') {
            initRegionCarousel();
        }

    } catch (error) {
        console.error('Erro ao carregar regiões:', error);
    }
}

export { carregarRegioes };
