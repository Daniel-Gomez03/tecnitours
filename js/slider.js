document.addEventListener('DOMContentLoaded', () => {
    const tarjetas = document.querySelector('.tarjetas');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    let currentSlide = 0; 
    const tarjetasCount = tarjetas.childElementCount; 
    let tarjetasPerView = 1;

    function updateTarjetasPerView() {
        if (window.innerWidth >= 1024) {
            tarjetasPerView = 4;
        } else if (window.innerWidth >= 720) {
            tarjetasPerView = 2; 
        } else {
            tarjetasPerView = 1; 
        }
        currentSlide = 0; 
        updateSlider();
    }

    function updateSlider() {
        const slideWidth = tarjetas.querySelector('.tarjeta').offsetWidth;
        tarjetas.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }

    nextButton.addEventListener('click', () => {
        const maxSlides = tarjetasCount - tarjetasPerView; 
        if (currentSlide < maxSlides) { 
            currentSlide++;
            updateSlider();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlider();
        }
    });

    window.addEventListener('resize', updateTarjetasPerView);

    updateTarjetasPerView();
});