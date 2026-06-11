/**
 * app.js
 * Orquestra todos os módulos da aplicação
 */

import { carregarRegioes } from './modules/regions-loader.js';
import { initRegionCarousel } from './modules/region-carousel.js';
import { toggleChat, toggleChatIg, initChatToggle } from './modules/chat-toggle.js';
import { initTextAnimation } from './modules/text-animation.js';
import { initMobileMenu } from './modules/mobile-menu.js';
import{initPlantas} from './modules/plants-loader.js'

// Exporta as funções para o escopo global (necessário para onclick no HTML)
window.toggleChat = toggleChat;
window.toggleChatIg = toggleChatIg;
window.initRegionCarousel = initRegionCarousel;

// Inicializa a aplicação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializa o sistema de chats
    initChatToggle();
    
    // 2. Carrega as regiões (que também chamará initRegionCarousel)
    carregarRegioes();

    // 3. Inicializa menu mobile
    initMobileMenu();

    initPlantas()
    
    // 4. Inicializa a animação de texto
    initTextAnimation();

    
    
});
