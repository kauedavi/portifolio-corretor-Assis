# Portfólio Imobiliário — Assis

Site responsivo para apresentação profissional, catálogo de propriedades e canais de contato direto.

## 🏗️ Stack Tecnológico

- **HTML5** — Estrutura semântica
- **SCSS** — Estilos com arquitetura modular
- **JavaScript (ES Modules)** — Lógica interativa e carregamento dinâmico
- **GSAP 3.12** — Animações via CDN

## 📁 Estrutura do Projeto

```
├── index.html                 # Página inicial
├── pages/imoveis.html         # Catálogo de propriedades
├── assets/
│   ├── img/                   # Imagens e logos
│   └── scripts/
│       ├── app.js             # Orquestrador de módulos
│       └── modules/           # Módulos isolados
├── data/
│   ├── regioes.json           # Dados de regiões
│   └── plants.json            # Dados de propriedades
└── styles/
    ├── main.scss              # Entrada SCSS
    └── main.css               # Compilado (produção)
```

## 🚀 Como Usar

### Desenvolvimento Local

```bash
# Python 3
python -m http.server 8000

# Ou com Node.js
npx serve .
```

Acesse `http://localhost:8000`

### Compilar SCSS

```bash
sass styles/main.scss styles/main.css --no-source-map --style=compressed
```

## ✨ Funcionalidades

- ✅ Carrossel de regiões com suporte a touch/swipe
- ✅ Chats flutuantes (WhatsApp e Instagram)
- ✅ Menu mobile responsivo
- ✅ Animações de texto ao entrar na viewport
- ✅ Carregamento dinâmico de dados via JSON

## 📝 Editar Conteúdo

| Item | Arquivo |
|------|---------|
| Regiões/Ofertas | `data/regioes.json` |
| Propriedades | `data/plants.json` |
| Textos e HTML | `index.html`, `pages/*.html` |
| Estilos | `styles/*.scss` |

## 📱 Compatibilidade

- ✅ Desktop (1440px+)
- ✅ Tablet (768px - 1023px)
- ✅ Mobile (< 768px)

## ⚡ Performance

- Sem dependências obrigatórias
- Carregamento assíncrono
- CSS minificado
- Imagens otimizadas

---

**Desenvolvido por:** Kaue Davi