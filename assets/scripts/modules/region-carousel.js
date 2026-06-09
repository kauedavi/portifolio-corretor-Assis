/**
 * region-carousel.js
 * Carrossel infinito convergente com suporte a touch/swipe e drag
 */

function initRegionCarousel() {
  "use strict";

  const CONFIG = {
    autoPlayInterval: 3400,
    transitionMs: 560,
    swipeThreshold: 45,
  };

  let currentIndex = 0;
  let cards = [];
  let total = 0;
  let autoTimer = null;
  let isPaused = false;
  let dragStartX = 0;
  let dragDelta = 0;
  let isDragging = false;

  const track   = document.getElementById("locaisTrack");
  const wrapper = document.getElementById("locaisPin");
  
  if (!track || !wrapper) return;

  cards = Array.from(track.querySelectorAll(".regiao-card"));
  total = cards.length;
  if (total === 0) return;

  // Prepara o track para posicionamento absoluto dos cards
  track.style.position = "relative";
  track.style.display  = "block";
  track.style.width    = "100%";
  track.style.height   = "100%";

  // Faz cada card ser absoluto, centralizado no track
  cards.forEach((c) => {
    c.style.position       = "absolute";
    c.style.left           = "50%";
    c.style.top            = "50%";
    c.style.marginLeft     = "";
    c.style.marginRight    = "";
    c.style.transformOrigin = "center center";
    c.style.cursor         = "pointer";
    c.addEventListener("click", (e) => {
      const off = getOffset(cards.indexOf(c));
      if (off !== 0) { goTo(cards.indexOf(c)); restartAuto(); }
    });
  });

  applyLayout(false);
  buildDots();
  buildNavBtns(wrapper);
  bindDrag(track, wrapper);
  startAuto();

  // Animação de entrada
  cards.forEach((c, i) => {
    c.style.opacity = "0";
    c.style.transform += " translateY(50px)";
    setTimeout(() => {
      c.style.transition = `opacity 0.7s ease ${i * 0.08}s, transform 0.7s ease ${i * 0.08}s`;
      c.style.opacity = "";
      applyCardStyle(c, getOffset(i), true);
    }, 60);
  });

  // ── Offset lógico circular
  function getOffset(idx) {
    let off = idx - currentIndex;
    const half = Math.floor(total / 2);
    while (off >  half) off -= total;
    while (off < -half) off += total;
    return off;
  }

  // ── Layout: posiciona todos os cards
  function applyLayout(animate) {
    cards.forEach((c) => applyCardStyle(c, getOffset(cards.indexOf(c)), animate));
    updateDots();
  }

  function applyCardStyle(card, offset, animate) {
    const abs     = Math.abs(offset);
    const visible = abs <= 2;

    card.style.visibility    = visible ? "visible" : "hidden";
    card.style.pointerEvents = offset === 0 ? "auto" : (abs === 1 ? "auto" : "none");
    card.style.zIndex        = String(10 - abs);

    const tx      = offset * 52;
    const ty      = -50;
    const scale   = offset === 0 ? 1 : abs === 1 ? 0.80 : 0.62;
    const opacity = offset === 0 ? 1 : abs === 1 ? 0.65 : 0.28;

    const dur = animate ? CONFIG.transitionMs : 0;
    card.style.transition = dur
      ? `transform ${dur}ms cubic-bezier(0.4,0,0.2,1), opacity ${dur}ms ease, box-shadow ${dur}ms ease`
      : "none";

    card.style.transform = `translateX(calc(-50% + ${tx}%)) translateY(${ty}%) scale(${scale})`;
    card.style.opacity   = String(opacity);

    // Destaque visual no card central
    if (offset === 0) {
      card.classList.add("ativo");
      card.style.boxShadow = "0 20px 60px rgba(0,0,0,0.55)";
      card.querySelector(".regiao-desc") && (card.querySelector(".regiao-desc").style.opacity = "1");
      card.querySelector(".regiao-desc") && (card.querySelector(".regiao-desc").style.transform = "translateY(0)");
      card.querySelector(".regiao-linha") && (card.querySelector(".regiao-linha").style.width = "60px");
      card.querySelector(".regiao-img")  && (card.querySelector(".regiao-img").style.filter  = "brightness(0.35)");
    } else {
      card.classList.remove("ativo");
      card.style.boxShadow = "";
      card.querySelector(".regiao-desc") && (card.querySelector(".regiao-desc").style.opacity = "");
      card.querySelector(".regiao-desc") && (card.querySelector(".regiao-desc").style.transform = "");
      card.querySelector(".regiao-linha") && (card.querySelector(".regiao-linha").style.width = "");
      card.querySelector(".regiao-img")  && (card.querySelector(".regiao-img").style.filter  = "");
    }
  }

  // ── Navegação
  function goTo(idx) {
    currentIndex = ((idx % total) + total) % total;
    applyLayout(true);
  }
  function next() { goTo(currentIndex + 1); }
  function prev() { goTo(currentIndex - 1); }

  // ── Auto-play
  function startAuto() {
    stopAuto();
    autoTimer = setInterval(() => { if (!isPaused) next(); }, CONFIG.autoPlayInterval);
  }
  function stopAuto()    { clearInterval(autoTimer); }
  function restartAuto() { stopAuto(); startAuto(); }

  // ── Dots
  function buildDots() {
    const wrap = document.getElementById("progressDots");
    if (!wrap) return;
    wrap.innerHTML = "";
    cards.forEach((_, i) => {
      const d = document.createElement("button");
      d.className = "progress-dot" + (i === 0 ? " ativo" : "");
      d.setAttribute("aria-label", `Slide ${i + 1}`);
      d.addEventListener("click", () => { goTo(i); restartAuto(); });
      wrap.appendChild(d);
    });

    wrap.style.opacity = "1";
    const progress = document.getElementById("locaisProgress");
    if (progress) progress.style.opacity = "1";
  }

  function updateDots() {
    const wrap = document.getElementById("progressDots");
    if (!wrap) return;
    wrap.querySelectorAll(".progress-dot").forEach((d, i) => {
      d.classList.toggle("ativo", i === currentIndex);
    });
  }

  // ── Botões prev / next
  function buildNavBtns(wrapper) {
    if (wrapper.querySelector(".carousel-nav-btn")) return;

    ["prev", "next"].forEach((dir) => {
      const btn = document.createElement("button");
      btn.className = `carousel-nav-btn carousel-nav-btn--${dir}`;
      btn.setAttribute("aria-label", dir === "prev" ? "Anterior" : "Próximo");
      btn.innerHTML =
        dir === "prev"
          ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round">
               <polyline points="15 18 9 12 15 6"></polyline></svg>`
          : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round">
               <polyline points="9 18 15 12 9 6"></polyline></svg>`;
      btn.addEventListener("click", () => { dir === "prev" ? prev() : next(); restartAuto(); });
      wrapper.appendChild(btn);
    });
  }

  // ── Drag / Touch
  function bindDrag(track, wrapper) {
    wrapper.addEventListener("mouseenter", () => { isPaused = true; });
    wrapper.addEventListener("mouseleave", () => { isPaused = false; });

    const start = (e) => { isDragging = true; dragStartX = getX(e); dragDelta = 0; };
    const move  = (e) => { if (isDragging) dragDelta = getX(e) - dragStartX; };
    const end   = ()  => {
      if (!isDragging) return;
      isDragging = false;
      if (dragDelta < -CONFIG.swipeThreshold) { next(); restartAuto(); }
      else if (dragDelta > CONFIG.swipeThreshold) { prev(); restartAuto(); }
      dragDelta = 0;
    };

    track.addEventListener("touchstart", start, { passive: true });
    track.addEventListener("touchmove",  move,  { passive: true });
    track.addEventListener("touchend",   end);
    track.addEventListener("mousedown",  start);
    track.addEventListener("mousemove",  move);
    track.addEventListener("mouseup",    end);
    track.addEventListener("mouseleave", end);
  }

  function getX(e) { return e.touches ? e.touches[0].clientX : e.clientX; }
}

export { initRegionCarousel };
