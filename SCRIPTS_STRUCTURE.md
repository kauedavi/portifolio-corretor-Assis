# Estrutura de Scripts Reorganizada

## Overview
Todos os scripts foram convertidos para módulos ES6 e unificados em um único ponto de entrada: `app.js`.

## Estrutura

```
assets/scripts/
├── app.js                    (Entrada principal - orquestra todos os módulos)
└── modules/
    ├── regions-loader.js     (Carrega regiões do JSON e renderiza cards)
    ├── region-carousel.js    (Carrossel infinito convergente)
    ├── chat-toggle.js        (Gerencia chats WhatsApp e Instagram)
    └── text-animation.js     (Animações de texto com GSAP)
```

## Como Funciona

### app.js
- **Responsabilidade**: Orquestra a inicialização de todos os módulos
- **Exporta funções globais**: `toggleChat`, `toggleChatIg`, `initRegionCarousel`
- **Executa na inicialização**: 
  1. Inicializa sistema de chats
  2. Carrega regiões (que dispara o carrossel)
  3. Inicializa animações de texto

### modules/regions-loader.js
- Fetch do arquivo `data/regioes.json`
- Renderização dos cards de regiões
- Chamada automática de `initRegionCarousel()`

### modules/region-carousel.js
- Carrossel infinito com scroll convergente
- Suporte a touch, swipe e drag de mouse
- Auto-play com intervalo configurável
- Sistema de dots de navegação
- Botões prev/next

### modules/chat-toggle.js
- Toggle dos cards de chat (WhatsApp e Instagram)
- Fecha chats ao clicar fora
- Atualiza horário dinamicamente

### modules/text-animation.js
- Animação de letra por letra com GSAP
- Usa ScrollTrigger para efeito de scroll
- Cores e efeitos de brilho customizados

## Integração no HTML

O arquivo `index.html` agora carrega apenas:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script type="module" src="assets/scripts/app.js"></script>
```

## Funções Globais

As seguintes funções continuam acessíveis globalmente (para uso em `onclick` no HTML):

- `toggleChat(event)` - Abre/fecha chat WhatsApp
- `toggleChatIg(event)` - Abre/fecha chat Instagram
- `initRegionCarousel()` - Inicializa o carrossel (chamado automaticamente)

## Benefícios

✅ Código modularizado e bem organizado
✅ Cada módulo tem uma responsabilidade única
✅ Fácil manutenção e expansão
✅ Evita poluição do escopo global
✅ Carregamento mais eficiente
✅ Melhor estrutura para testes e debugging

## Como Adicionar Novos Módulos

1. Crie um novo arquivo em `assets/scripts/modules/`
2. Exporte as funções necessárias com `export`
3. Importe em `app.js`
4. Inicialize no `DOMContentLoaded` se necessário

Exemplo:
```javascript
// novo-modulo.js
export function meuModulo() {
  // sua lógica aqui
}

// No app.js
import { meuModulo } from './modules/novo-modulo.js';
// ...
document.addEventListener('DOMContentLoaded', () => {
  // ... código existente
  meuModulo();
});
```
