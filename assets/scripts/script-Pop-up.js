function toggleChat(event) {
    // Evita comportamentos inesperados de clique
    event.stopPropagation();
    
    const card = document.getElementById("cardChatWa");
    const cardIg = document.getElementById("cardChatIg");

    if (cardIg && cardIg.classList.contains("aberto")) {
        cardIg.classList.remove("aberto");
    }

    card.classList.toggle("aberto");
}

// Atualiza o horário dinamicamente ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
    const horaSpan = document.getElementById("chatHora");
    const agora = new Date();
    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');
    
    if (horaSpan) {
        horaSpan.textContent = `${horas}:${minutos}`;
    }
});

// Toggle Instagram Chat
function toggleChatIg(event) {
    event.stopPropagation();
    const cardIg = document.getElementById("cardChatIg");
    const cardWa = document.getElementById("cardChatWa");

    if (cardWa && cardWa.classList.contains("aberto")) {
        cardWa.classList.remove("aberto");
    }

    cardIg.classList.toggle("aberto");
}

// Fecha os chats ao clicar fora deles
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

document.addEventListener("click", closeChatsOnOutsideClick);

// Atualiza hora do Instagram também
document.addEventListener("DOMContentLoaded", function () {
    const horaIg = document.querySelector(".balao-hora-ig");
    if (horaIg) {
        const agora = new Date();
        const horas = String(agora.getHours()).padStart(2, '0');
        const minutos = String(agora.getMinutes()).padStart(2, '0');
        horaIg.textContent = `${horas}:${minutos}`;
    }
});