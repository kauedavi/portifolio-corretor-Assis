/**
 * text-animation.js
 * Anima o texto do corretor com GSAP ScrollTrigger
 */

function initTextAnimation() {
    const pin = document.getElementById('corretorPin');
    const track = document.getElementById('corretorTrack');
    const headline = document.getElementById('corretorHeadline');

    if (!pin || !track || !headline) return;

    function wrapLetras(element) {
        element.childNodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                const chars = node.textContent.split('');
                const fragment = document.createDocumentFragment();
                chars.forEach((ch) => {
                    const s = document.createElement('span');
                    if (ch === ' ' || ch === '\u00A0') {
                        s.className = 'letra letra-espaco';
                        s.innerHTML = '&nbsp;';
                    } else {
                        s.className = 'letra';
                        s.textContent = ch;
                    }
                    fragment.appendChild(s);
                });
                element.replaceChild(fragment, node);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                wrapLetras(node);
            }
        });
    }

    wrapLetras(headline);

    const letras = headline.querySelectorAll('.letra:not(.letra-espaco)');
    const totalLetras = letras.length;

    const corInicio = 'rgba(250,250,250,0.08)';
    const corBrilho = '#E8D0A9';
    const corFinal  = '#C5A880';

    function getTrackScroll() {
        return track.scrollWidth - pin.offsetWidth;
    }

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: pin,
            pin: true,
            scrub: 0.4,
            start: 'top top',
            end: () => '+=' + (getTrackScroll() * 1.1 + window.innerHeight * 0.25),
            invalidateOnRefresh: true,
        }
    });

    tl.to(track, { x: () => -getTrackScroll(), ease: 'none', duration: 1 }, 0);

    letras.forEach((letra, i) => {
        const start = (i / totalLetras) * 0.78;
        tl.fromTo(letra, { color: corInicio }, { color: corBrilho, duration: 0.03 }, start);
        tl.to(letra, { color: corFinal, duration: 0.045 }, start + 0.04);
    });

    tl.to(headline, { scale: 1.01, duration: 0.05, yoyo: true, repeat: 1 }, 0.85);

    const emLetras = headline.querySelectorAll('em .letra:not(.letra-espaco)');
    emLetras.forEach((letra, i) => {
        tl.to(letra, {
            color: '#E8D0A9',
            textShadow: '0 0 28px rgba(197,168,128,0.55)',
            duration: 0.035,
        }, 0.7 + (i / emLetras.length) * 0.1);
    });

    window.addEventListener('resize', () => ScrollTrigger.refresh());
}

export { initTextAnimation };
