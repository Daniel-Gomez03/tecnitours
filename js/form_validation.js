document.addEventListener("DOMContentLoaded", function () {
    class FormValidation {
        constructor() {
            this.form = document.querySelector('.contact'); // Selecciona el formulario por su clase
            this.nameInput = document.getElementById('name'); // Campo de nombre
            this.telefonoInput = document.getElementById('telefono'); // Campo de teléfono
            this.emailInput = document.getElementById('email'); // Campo de correo electrónico
            this.travelTypeInput = document.getElementById('travel-type'); // Campo de tipo de viaje
            this.messageInput = document.getElementById('message'); // Campo de mensaje
            
            this.form.addEventListener('submit', (e) => {
                this.validateInputs(); 
            });
        }

        setError(element, message) {
            const inputControl = element.parentElement; 
            const errorDisplay = inputControl.querySelector('.error'); 
            errorDisplay.innerText = message; 
            element.classList.add('error-border'); 
            inputControl.classList.add('error'); 
        }

        setSuccess(element) {
            const inputControl = element.parentElement;
            const errorDisplay = inputControl.querySelector('.error');
            errorDisplay.innerText = ''; 
            element.classList.remove('error-border'); 
            inputControl.classList.remove('error');
        }

        isValidEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

        isValidTelefono(telefono) {
            const re = /^[389][0-9]{7}$/; 
            return re.test(telefono);
        }

        validateInputs() {
            const nameValue = this.nameInput.value.trim();
            const telefonoValue = this.telefonoInput.value.trim();
            const emailValue = this.emailInput.value.trim();
            const travelTypeValue = this.travelTypeInput.value;
            const messageValue = this.messageInput.value.trim();

            // Validación del nombre
            if (nameValue === '') {
                this.setError(this.nameInput, 'El nombre es requerido');
            } else {
                this.setSuccess(this.nameInput);
            }

            // Validación del teléfono
            if (telefonoValue === '') {
                this.setError(this.telefonoInput, 'El teléfono es requerido');
            } else if (!this.isValidTelefono(telefonoValue)) {
                this.setError(this.telefonoInput, 'El número de teléfono no es válido');
            } else {
                this.setSuccess(this.telefonoInput);
            }

            // Validación del correo electrónico
            if (emailValue === '') {
                this.setError(this.emailInput, 'El correo electrónico es requerido');
            } else if (!this.isValidEmail(emailValue)) {
                this.setError(this.emailInput, 'Proporciona una dirección de correo válida');
            } else {
                this.setSuccess(this.emailInput);
            }

            // Validación del tipo de viaje
            if (travelTypeValue === '') {
                this.setError(this.travelTypeInput, 'Selecciona un tipo de viaje');
            } else {
                this.setSuccess(this.travelTypeInput);
            }

            // Validación del mensaje
            if (messageValue === '') {
                this.setError(this.messageInput, 'El mensaje es requerido');
            } else {
                this.setSuccess(this.messageInput);
            }
        }
    }

    const validacion = new FormValidation();
});
