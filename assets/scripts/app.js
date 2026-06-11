/**
 * Ponto de entrada da aplicação.
 * Orquestra a inicialização de todos os módulos na sequência correta.
 */

import { carregarRegioes } from './modules/regions-loader.js';
import { initRegionCarousel } from './modules/region-carousel.js';
import { toggleChat, toggleChatIg, initChatToggle } from './modules/chat-toggle.js';
import { initTextAnimation } from './modules/text-animation.js';
import { initMobileMenu } from './modules/mobile-menu.js';
import { carregarPlantas, initPlantas } from './modules/plants-loader.js';

window.toggleChat = toggleChat;
window.toggleChatIg = toggleChatIg;
window.initRegionCarousel = initRegionCarousel;

document.addEventListener('DOMContentLoaded', async () => {
    initChatToggle();
    initMobileMenu();
    await carregarPlantas();
    initPlantas();
    await carregarRegioes();
    initTextAnimation();
});