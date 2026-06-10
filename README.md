**Portfólio — Corretor Assis**

Site estático para apresentação profissional do corretor Assis, com catálogo de locais/ofertas, chats de contato e animações. O projeto é modular, sem build obrigatório — basta abrir o site em um servidor estático ou diretamente no navegador.

**Principais Tecnologias**
- **HTML5**: estrutura das páginas ([index.html](index.html)).
- **CSS / SCSS**: estilos em `styles/` (origem em SCSS, arquivo compilado: [styles/main.css](styles/main.css)).
- **JavaScript (ES Modules)**: ponto de entrada [assets/scripts/app.js](assets/scripts/app.js) e módulos em [assets/scripts/modules/](assets/scripts/modules/).
- **GSAP**: bibliotecas de animação carregadas via CDN.

**Estrutura Resumida**
- **[index.html](index.html)** — Página inicial com seções: apresentação, sobre, locais de atuação, contato e chats.
- **[pages/imoveis.html](pages/imoveis.html)** — Página de listagem de imóveis.
- **[assets/img/](assets/img/)** — Imagens e logos usados no site.
- **[assets/scripts/app.js](assets/scripts/app.js)** — Orquestra os módulos e exporta funções globais (`toggleChat`, `toggleChatIg`, `initRegionCarousel`).
- **[assets/scripts/modules/regions-loader.js](assets/scripts/modules/regions-loader.js)** — Carrega `data/regioes.json` e renderiza cards.
- **[assets/scripts/modules/region-carousel.js](assets/scripts/modules/region-carousel.js)** — Lógica do carrossel.
- **[assets/scripts/modules/chat-toggle.js](assets/scripts/modules/chat-toggle.js)** — Toggle dos chats WhatsApp/Instagram.
- **[assets/scripts/modules/text-animation.js](assets/scripts/modules/text-animation.js)** — Animações com GSAP.
- **[data/regioes.json](data/regioes.json)** — Fonte de dados para as regiões exibidas.

**Como usar (local)**
1. Abrir o arquivo `index.html` diretamente no navegador (funcional para uso local simples).
2. Recomendo rodar um servidor estático para evitar restrições de CORS ao carregar JSON:

```bash
# com Python 3
python -m http.server 8000

# ou usando npx serve
npx serve .
```

3. Para recompilar o SCSS (opcional), instale o `sass` (Dart Sass) e rode:

```bash
sass styles/main.scss styles/main.css --no-source-map --style=compressed
```

**Fluxo de dados e pontos de edição**
- Atualize listagens de regiões/locais em [data/regioes.json](data/regioes.json).
- Adicione/atualize imagens em [assets/img/](assets/img/).
- Crie/ajuste módulos JS em [assets/scripts/modules/](assets/scripts/modules/) e importe em [assets/scripts/app.js](assets/scripts/app.js).

**Funcionalidades atuais**
- Carrossel de regiões gerado dinamicamente a partir de `data/regioes.json`.
- Chats flutuantes para WhatsApp e Instagram com toggles (`toggleChat`, `toggleChatIg`).
- Animações de texto e scroll via GSAP.

**Contribuindo / Próximos passos sugeridos**
- Adicionar filtros e paginação na lista de imóveis.
- Preparar pipeline de build (npm + scripts) se desejar automatizar compilação SCSS e minificação.

**Autor**
Desenvolvido por Kaue Davi — mantenha contato para alterações ou dúvidas.

---
Atualizado automaticamente para refletir a estrutura e os scripts atuais do projeto.