class SliderController {
    constructor() {
        this.framestrack = document.querySelector('.main-slider .framestrack'); 
        this.slides = Array.from(document.querySelectorAll('.main-slider .slide')); 
        this.currentSlideIndex = 1;
        this.timeInterval = 4000;

        this.cloneSlides();
        this.framestrack.style.width = `${this.slides.length * 100}%`;
        this.updateSlider(false);

        document.querySelector('.main-slider .btnLeft').addEventListener('click', () => {
            this.moveSlide(-1);
            this.resetAutoplay();
        });

        document.querySelector('.main-slider .btnRight').addEventListener('click', () => {
            this.moveSlide(1);
            this.resetAutoplay();
        });

        this.startAutoplay();
    }

    cloneSlides() {
        const firstSlide = this.slides[0].cloneNode(true);
        const lastSlide = this.slides[this.slides.length - 1].cloneNode(true);

        this.framestrack.appendChild(firstSlide);
        this.framestrack.insertBefore(lastSlide, this.slides[0]);

        this.slides = Array.from(document.querySelectorAll('.main-slider .slide'));
        this.framestrack.style.width = `${this.slides.length * 100}%`;
    }

    moveSlide(direction) {
        this.currentSlideIndex += direction;
        this.updateSlider(true);
    }

    updateSlider(withTransition = true) {
        if (withTransition) {
            this.framestrack.style.transition = 'transform 0.5s ease-in-out';
        } else {
            this.framestrack.style.transition = 'none';
        }
    
        const offset = -this.currentSlideIndex * this.framestrack.clientWidth;
        this.framestrack.style.transform = `translateX(${offset}px)`;
    
        // Manejar clones al final de la transición
        this.framestrack.addEventListener('transitionend', () => {
            if (this.currentSlideIndex === 0) {
                // Salta al último slide original
                this.framestrack.style.transition = 'none';
                this.currentSlideIndex = this.slides.length - 2;
                const offset = -this.currentSlideIndex * this.framestrack.clientWidth;
                this.framestrack.style.transform = `translateX(${offset}px)`;
            } else if (this.currentSlideIndex === this.slides.length - 1) {
                // Salta al primer slide original
                this.framestrack.style.transition = 'none';
                this.currentSlideIndex = 1; 
                const offset = -this.currentSlideIndex * this.framestrack.clientWidth;
                this.framestrack.style.transform = `translateX(${offset}px)`;
            }
        }, { once: true });
    }

    startAutoplay() {
        this.timeIntervalId = setInterval(() => this.moveSlide(1), this.timeInterval);
    }

    resetAutoplay() {
        clearInterval(this.timeIntervalId);
        this.startAutoplay();
    }
}

// Inicializa el slider
document.addEventListener('DOMContentLoaded', () => {
    new SliderController();
});

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const sliderTrack = card.querySelector('.slider-track');
        const btnIzquierda = card.querySelector('.btnIzquierda');
        const btnDerecha = card.querySelector('.btnDerecha');

        let currentSlide = 0;
        const totalSlides = sliderTrack.children.length;

        function moveSlide(index) {
            const slideWidth = sliderTrack.clientWidth;
            sliderTrack.style.transform = `translateX(-${index * slideWidth}px)`;
        }

        btnDerecha.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            moveSlide(currentSlide);
        });

        btnIzquierda.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            moveSlide(currentSlide);
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formHospedaje');
    const fechaIngreso = document.getElementById('fecha_ingreso');
    const fechaSalida = document.getElementById('fecha_salida');

    form.addEventListener('submit', (e) => {
        const destino = document.getElementById('destino').value.trim();
        const tipoHabitacion = document.getElementById('cmbTipoHabitacion').value;
        const fechaIngresoValue = new Date(fechaIngreso.value);
        const fechaSalidaValue = new Date(fechaSalida.value);
        const today = new Date(); 

        // Ajustar el día actual para comparar correctamente (ignorando la hora)
        today.setHours(0, 0, 0, 0);
        let isValid = true;

        if (!destino) {
            alert("Debe ingresar un destino.");
            isValid = false;
        }

        if (fechaIngreso.value === "") {
            alert("Debe ingresar una fecha de ingreso.");
            isValid = false;
        } else if (fechaIngresoValue < today) {
            alert("La fecha de ingreso no puede estar en el pasado.");
            isValid = false;
        }

        if (fechaSalida.value === "") {
            alert("Debe ingresar una fecha de salida.");
            isValid = false;
        } else if (fechaSalidaValue <= fechaIngresoValue) {
            alert("La fecha de salida debe ser posterior a la fecha de ingreso.");
            isValid = false;
        }

        if (!tipoHabitacion) {
            alert("Debe seleccionar un tipo de habitación.");
            isValid = false;
        }

        if (!isValid) {
            e.preventDefault(); // Detiene el envío del formulario
        }
    });
});




