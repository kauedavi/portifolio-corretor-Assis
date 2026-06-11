/**
 * Gerencia abertura e fechamento dos chats WhatsApp e Instagram.
 * Fornece funções de toggle e listeners para interação do usuário.
 * @exports toggleChat, toggleChatIg, initChatToggle
 */

function toggleChat(event) {
    event.stopPropagation();
    
    const card = document.getElementById("cardChatWa");
    const cardIg = document.getElementById("cardChatIg");

    if (cardIg && cardIg.classList.contains("aberto")) {
        cardIg.classList.remove("aberto");
    }

    card.classList.toggle("aberto");
}

function toggleChatIg(event) {
    event.stopPropagation();
    const cardIg = document.getElementById("cardChatIg");
    const cardWa = document.getElementById("cardChatWa");

    if (cardWa && cardWa.classList.contains("aberto")) {
        cardWa.classList.remove("aberto");
    }

    cardIg.classList.toggle("aberto");
}

function closeChatsOnOutsideClick(event) {
    const clickedInsideChat = event.target.closest("#cardChatWa, #cardChatIg, .gatilho-chat-wa, .gatilho-chat-ig");
    if (!clickedInsideChat) {
        const cardWa = document.getElementById("cardChatWa");
        const cardIg = document.getElementById("cardChatIg");

        if (cardWa) {
            cardWa.classList.remove("aberto");
        }
        if (cardIg) {
            cardIg.classList.remove("aberto");
        }
    }
}

function initChatTime() {
    const horaSpan = document.getElementById("chatHora");
    const agora = new Date();
    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');
    
    if (horaSpan) {
        horaSpan.textContent = `${horas}:${minutos}`;
    }

    const horaIg = document.querySelector(".balao-hora-ig");
    if (horaIg) {
        horaIg.textContent = `${horas}:${minutos}`;
    }
}

function initChatToggle() {
    document.addEventListener("click", closeChatsOnOutsideClick);
    initChatTime();
}

export { toggleChat, toggleChatIg, initChatToggle };
