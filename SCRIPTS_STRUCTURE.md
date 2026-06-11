# Estrutura de Módulos JavaScript

## 📋 Arquitetura

O projeto utiliza **ES Modules** com um ponto de entrada centralizado que orquestra todos os módulos.

## 📦 Módulos

### `app.js` — Orquestrador Central

Carrega e inicializa todos os módulos na sequência correta.

```javascript
window.toggleChat = toggleChat;
window.toggleChatIg = toggleChatIg;
window.initRegionCarousel = initRegionCarousel;
```

**Funções globais exportadas:**
- `toggleChat(event)` — Abre/fecha chat WhatsApp
- `toggleChatIg(event)` — Abre/fecha chat Instagram
- `initRegionCarousel()` — Inicializa carrossel

---

### `modules/regions-loader.js`

Carrega regiões do arquivo `data/regioes.json` e renderiza cards dinamicamente.

**Exporta:** `carregarRegioes()`

**Responsabilidades:**
- Fetch assíncrono de dados
- Renderização em HTML
- Dispara `initRegionCarousel()`

---

### `modules/region-carousel.js`

Carrossel infinito convergente com suporte a touch, swipe e drag.

**Exporta:** `initRegionCarousel()`

**Recursos:**
- Auto-play com intervalo configurável
- Navegação com prev/next
- Indicadores (dots)
- Transformações 3D escaladas
- Pausa ao hover

---

### `modules/chat-toggle.js`

Gerencia abertura e fechamento dos chats flutuantes.

**Exporta:**
- `toggleChat(event)` — WhatsApp
- `toggleChatIg(event)` — Instagram
- `initChatToggle()` — Inicializa listeners

**Recursos:**
- Toggle com mutual exclusion
- Fecha ao clicar fora
- Hora dinâmica

---

### `modules/text-animation.js`

Dispara animações CSS quando elementos entram na viewport.

**Exporta:** `initTextAnimation()`

**Implementação:** IntersectionObserver

---

### `modules/mobile-menu.js`

Drawer responsivo com suporte a teclado (ESC) e focus trap.

**Exporta:** `initMobileMenu()`

**Acessibilidade:**
- `aria-expanded`, `aria-hidden`
- Suporte a ESC
- Gerenciamento de `overflow`

---

### `modules/plants-loader.js`

Carrega propriedades do arquivo `data/plants.json` e renderiza dinamicamente.

**Exporta:**
- `carregarPlantas()` — Fetch e renderização
- `initPlantas(options)` — Observer de animações

**Opções customizáveis:**
```javascript
initPlantas({
  selector: '.planta[data-animate]',
  threshold: 0.18,
  visibleClass: 'planta--visible'
})
```

---

## 🔄 Fluxo de Inicialização

```
DOMContentLoaded
    ↓
initChatToggle() ..................... Listeners de chat
    ↓
initMobileMenu() ..................... Menu mobile
    ↓
await carregarPlantas() .............. Fetch + render JSON
    ↓
initPlantas() ........................ Observer animações
    ↓
await carregarRegioes() .............. Fetch + render JSON
    ├── initRegionCarousel() ......... Carrossel automático
    ↓
initTextAnimation() .................. Animações GSAP
```

## 📡 Integração no HTML

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script type="module" src="assets/scripts/app.js"></script>
```

## ✏️ Adicionar Novo Módulo

1. Crie arquivo em `assets/scripts/modules/novo-modulo.js`:

```javascript
export function meuModulo() {
  // implementação
}
```

2. Importe em `app.js`:

```javascript
import { meuModulo } from './modules/novo-modulo.js';
```

3. Inicialize no `DOMContentLoaded`:

```javascript
document.addEventListener('DOMContentLoaded', async () => {
  // ... código existente
  meuModulo();
});
```

## 🎯 Princípios de Design

✅ **Single Responsibility** — Cada módulo tem uma função clara
✅ **No Global Pollution** — Apenas funções essenciais no escopo global
✅ **Async-First** — Carregamento de dados sem bloquear UI
✅ **Progressive Enhancement** — Funciona sem JS (HTML/CSS válido)
✅ **Acessibilidade** — ARIA attributes e suporte a teclado
