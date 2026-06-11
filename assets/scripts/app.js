import { carregarRegioes } from './modules/regions-loader.js';
import { initRegionCarousel } from './modules/region-carousel.js';
import { toggleChat, toggleChatIg, initChatToggle } from './modules/chat-toggle.js';
import { initTextAnimation } from './modules/text-animation.js';
import { initMobileMenu } from './modules/mobile-menu.js';

// Importe AS DUAS funções do seu módulo de plantas
import { carregarPlantas, initPlantas } from './modules/plants-loader.js';

window.toggleChat = toggleChat;
window.toggleChatIg = toggleChatIg;
window.initRegionCarousel = initRegionCarousel;

// Transforme o callback do DOMContentLoaded em async
document.addEventListener('DOMContentLoaded', async () => {
    initChatToggle();
    initMobileMenu();
    
    // 1. Aguarda o download e a criação do HTML das plantas
    await carregarPlantas(); 

    // 2. SÓ DEPOIS inicializa o Observer (agora os elementos existem no DOM)
    initPlantas();
    
    await carregarRegioes();
    initTextAnimation();
});