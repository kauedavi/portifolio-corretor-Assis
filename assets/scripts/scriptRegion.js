(function () {
    gsap.registerPlugin(ScrollTrigger);

    let track, wrapper, dotsWrap, cards, dots = [];

    function initRegionCarousel() {
        track    = document.getElementById('locaisTrack');
        wrapper  = document.getElementById('locaisPin');
        dotsWrap = document.getElementById('progressDots');

        if (!track || !wrapper) return;

        // Limpa dots anteriores
        dotsWrap.innerHTML = '';
        dots = [];

        cards = track.querySelectorAll('.regiao-card');
        const totalCards = cards.length;

        // Cria dots
        for (let i = 0; i < totalCards; i++) {
            const d = document.createElement('div');
            d.className = 'progress-dot' + (i === 0 ? ' ativo' : '');
            dotsWrap.appendChild(d);
            dots.push(d);
        }

        function getTotalScroll() {
            return track.scrollWidth - wrapper.offsetWidth + 40; // + margem extra de segurança
        }

        // Kill triggers anteriores (importante quando recarrega)
        ScrollTrigger.getAll().forEach(st => st.kill());

        // Animação de entrada dos cards
        gsap.from(cards, {
            opacity: 0,
            y: 60,
            stagger: 0.1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: wrapper,
                start: 'top 85%'
            }
        });

        // Scroll horizontal principal
        const scrollTween = gsap.to(track, {
            x: () => -getTotalScroll(),
            ease: 'none',
            scrollTrigger: {
                trigger: wrapper,
                pin: true,
                scrub: 0.4,
                start: 'top top',
                end: () => '+=' + getTotalScroll() * 1.1,
                invalidateOnRefresh: true,
                anticipatePin: 1,
                onUpdate: (self) => {
                    const idx = Math.round(self.progress * (totalCards - 1));
                    dots.forEach((d, i) => d.classList.toggle('ativo', i === idx));
                    wrapper.classList.toggle('ativo', self.progress > 0.03);
                }
            }
        });

        // Parallax suave nas imagens
        cards.forEach((card) => {
            const img = card.querySelector('.regiao-img');
            if (img) {
                gsap.to(img, {
                    x: '-6%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: wrapper,
                        scrub: 0.8,
                        start: 'top top',
                        end: () => '+=' + getTotalScroll() * 1.1,
                    }
                });
            }
        });

        // Efeito de opacidade no número
        cards.forEach((card) => {
            const num = card.querySelector('.regiao-numero');
            if (num) {
                gsap.fromTo(num, 
                    { opacity: 0.25 }, 
                    {
                        opacity: 0.08,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: wrapper,
                            scrub: 0.6,
                            start: 'top top',
                            end: () => '+=' + getTotalScroll() * 1.1,
                        }
                    }
                );
            }
        });

        // Refresh em resize
        const refresh = () => ScrollTrigger.refresh();
        window.removeEventListener('resize', refresh);
        window.addEventListener('resize', refresh);
    }

    // Expõe a função para ser chamada após carregar os cards
    window.initRegionCarousel = initRegionCarousel;

})();