async function carregarRegioes() {
    try {
        const response = await fetch('data/regioes.json');
        const data = await response.json();

        const track = document.getElementById('locaisTrack');
        track.innerHTML = ''; // Limpa caso tenha algo

        data.regioes.forEach(regiao => {
            const cardHTML = `
                <div class="regiao-card ${regiao.classe}">
                    <img class="regiao-img" 
                         src="${regiao.imagem}" 
                         alt="${regiao.nome} — São Paulo">
                    <div class="regiao-overlay">
                        <span class="regiao-numero">${String(regiao.id).padStart(2, '0')}</span>
                        <span class="regiao-tag">${regiao.tag}</span>
                        <div class="regiao-linha"></div>
                        <h3 class="regiao-nome">${regiao.nome}</h3>
                        <p class="regiao-desc">${regiao.descricao}</p>
                    </div>
                </div>
            `;
            track.innerHTML += cardHTML;
        });

        // Re-inicializa o carrossel/scroll se necessário
        if (typeof initRegionCarousel === 'function') {
            initRegionCarousel();
        }

    } catch (error) {
        console.error('Erro ao carregar regiões:', error);
    }
}

// Executa quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', carregarRegioes);