function MakeSlideShow(selector) {
    const slideWrapper = document.querySelector(selector);
    const slides = Array.from(slideWrapper.querySelectorAll('.slide'));
    const nextBtn = slideWrapper.querySelector('.next-btn');
    const prevBtn = slideWrapper.querySelector('.prev-btn');
    const dotsContainer = slideWrapper.querySelector('.dots-container');

    let currentIndex = 0;

    function createDots() {
        const dotsHTML = slides.map((_, index) => {
            return `<span class="dot ${index === 0 ? 'active' : ''}" data-index="${index}"></span>`;
        }).join('');
        
        dotsContainer.innerHTML = dotsHTML;
        
        const dots = Array.from(dotsContainer.querySelectorAll('.dot'));
        dots.map((dot, index) => {
            dot.addEventListener('click', () => goToSlide(index));
            return dot;
        });
    }

    function showSlide(index) {
        slides.map(slide => {
            slide.classList.remove('active');
            return slide;
        });
        
        const dots = Array.from(dotsContainer.querySelectorAll('.dot'));
        dots.map(dot => {
            dot.classList.remove('active');
            return dot;
        });

        slides[index].classList.add('active');
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        currentIndex = index;
    }

    function goToSlide(index) {
        showSlide(index);
    }

    function nextSlide() {
        const newIndex = (currentIndex + 1) % slides.length;
        showSlide(newIndex);
    }

    function prevSlide() {
        const newIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(newIndex);
    }

    nextBtn.addEventListener('click', () => {
        nextSlide();
    })

    prevBtn.addEventListener('click', () => {
        prevSlide();
    })

    function setAutoPlay() {
        autoPlay = setInterval(nextSlide, 5000);
    }

    function clearAutoPlay() {
        clearInterval(autoPlay);
    }

    document.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === "ArrowRight") {
            nextSlide();
        }
    })

    slideWrapper.addEventListener('mouseenter', () => {
        clearAutoPlay();
    });

    slideWrapper.addEventListener('mouseleave', () => {
        setAutoPlay();
    })


    // Initial
    showSlide(0);
    createDots();
    setAutoPlay();
}

MakeSlideShow('.slider-1');