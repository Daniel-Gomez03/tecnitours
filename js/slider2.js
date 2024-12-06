class SliderController {
    constructor() {
        this.slider = document.querySelector('.slider');
        this.framestrack = document.querySelector('.framestrack');
        this.slides = Array.from(document.querySelectorAll('.slide'));
        this.currentSlideIndex = 0; 
        this.timeInterval = 4000; 
        this.timeIntervalId = null;

        this.cloneSlides();
        this.updatePosition(false);

        this.generateUI();

        this.startAutoSlide();

        window.addEventListener('resize', () => this.updatePosition(false));
    }

    cloneSlides() {
        const firstSlide = this.slides[0].cloneNode(true);
        const lastSlide = this.slides[this.slides.length - 1].cloneNode(true);

        this.framestrack.appendChild(firstSlide);
        this.framestrack.insertBefore(lastSlide, this.slides[0]);

        this.slides = Array.from(document.querySelectorAll('.slide'));
    }

    updatePosition(animate = true) {
        const slideWidth = this.slider.offsetWidth; 
        this.framestrack.style.transition = animate ? 'transform 0.5s ease-in-out' : 'none';
        this.framestrack.style.transform = `translateX(-${this.currentSlideIndex * slideWidth}px)`;

        if (this.currentSlideIndex === 0) {
            setTimeout(() => {
                this.framestrack.style.transition = 'none';
                this.currentSlideIndex = this.slides.length - 2;
                this.framestrack.style.transform = `translateX(-${this.currentSlideIndex * slideWidth}px)`;
            }, 500);
        } else if (this.currentSlideIndex === this.slides.length - 1) {
            setTimeout(() => {
                this.framestrack.style.transition = 'none';
                this.currentSlideIndex = 1;
                this.framestrack.style.transform = `translateX(-${this.currentSlideIndex * slideWidth}px)`;
            }, 500);
        }
    }

    moveSlideTo(index) {
        clearTimeout(this.timeIntervalId); 
        this.currentSlideIndex = index;
        this.updatePosition();
        this.startAutoSlide(); 
    }

    moveNext() {
        this.moveSlideTo(this.currentSlideIndex + 1);
    }

    movePrev() {
        this.moveSlideTo(this.currentSlideIndex - 1);
    }

    startAutoSlide() {
        this.timeIntervalId = setTimeout(() => {
            this.moveNext();
        }, this.timeInterval);
    }

    generateUI() {
        const btnLeft = document.createElement('div');
        const btnRight = document.createElement('div');
        btnLeft.classList.add('btnLeft');
        btnRight.classList.add('btnRight');
        btnLeft.innerHTML = '&lt;';
        btnRight.innerHTML = '&gt;';

        btnLeft.addEventListener('click', () => this.movePrev());
        btnRight.addEventListener('click', () => this.moveNext());
        this.slider.appendChild(btnLeft);
        this.slider.appendChild(btnRight);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SliderController();
});
