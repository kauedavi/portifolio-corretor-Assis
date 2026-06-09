function toggleChat(event) {
    // Evita comportamentos inesperados de clique
    event.stopPropagation();
    
    const card = document.getElementById("cardChatWa");
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