document.addEventListener("DOMContentLoaded", function (){
    const miSlider = new SliderController();
});

class SliderController {
    slider;
    framestrack;
    slides = [];
    timeInterval = 3000;
    timeIntervalId;
    currentSlideIndex = -1;
    slideDirection = 1; // -1 1

    constructor() {
        this.slider = document.querySelector('.slider');
        this.framestrack = document.querySelector('.framestrack');
        this.slides = [...document.querySelectorAll('.slide')];
        console.log("Slide Status:", {
            "slides": this.slides,
            "framestrack": this.framestrack,
        });
        this.generateUI();
        this.moveSlideTo(0);
    }

    moveSlideTo(slideIndex) {
        if (this.timeIntervalId) {
            clearTimeout(this.timeIntervalId);
        }
        this.currentSlideIndex = slideIndex;
        this.framestrack.style.left = `-${this.currentSlideIndex * 100}vw`;
        this.tick();

    }

    moveNext() {
        if (this.currentSlideIndex + this.slideDirection >= this.slides.length ||
            this.currentSlideIndex + this.slideDirection < 0) {
            this.slideDirection *= -1;
        }
        this.moveSlideTo(this.currentSlideIndex + this.slideDirection);
    }

    tick() {
        this.timeIntervalId = setTimeout(
            () => {
                this.moveNext();
            }, this.timeInterval
        );
    }

    generateUI() {
        const btnLeft = document.createElement("DIV");
        const btnRight = document.createElement("DIV");
        btnLeft.classList.add('btnLeft');
        btnRight.classList.add('btnRight');
        btnLeft.innerHTML = '&lt;'; // <
        btnRight.innerHTML = '&gt;'; // >

        btnLeft.addEventListener('click', (e) => {
            this.slideDirection = -1;
            this.moveNext();
        });
        btnRight.addEventListener('click', (e) => {
            this.slideDirection = 1;
            this.moveNext();
        });
        this.slider.appendChild(btnLeft);
        this.slider.appendChild(btnRight);

        const navigator = document.createElement("DIV");
        navigator.classList.add("navigator");

        this.slides.forEach((slide, i) => {
            const btnNavigateTo = document.createElement("DIV");
            btnNavigateTo.classList.add("btnNavigateTo");
            btnNavigateTo.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.moveSlideTo(i);
            });
            navigator.appendChild(btnNavigateTo);
        });
        this.slider.appendChild(navigator);
    }
}