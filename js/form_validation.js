document.addEventListener("DOMContentLoaded", function () {
    class FormValidation {
        constructor() {
            this.form = document.querySelector('.contact');
            this.nameInput = document.getElementById('name');
            this.telefonoInput = document.getElementById('telefono');
            this.emailInput = document.getElementById('email');
            this.travelTypeInput = document.getElementById('travel-type');
            this.messageInput = document.getElementById('message');
            
            this.form.addEventListener('submit', (e) => {
                e.preventDefault(); // Evita que el formulario recargue la página
                const isValid = this.validateInputs(); // Realiza validaciones
                
                if (isValid) {
                    this.clearForm(); // Limpia el formulario después del envío
                }
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
            let isValid = true;

            const nameValue = this.nameInput.value.trim();
            const telefonoValue = this.telefonoInput.value.trim();
            const emailValue = this.emailInput.value.trim();
            const travelTypeValue = this.travelTypeInput.value;
            const messageValue = this.messageInput.value.trim();

            if (nameValue === '') {
                this.setError(this.nameInput, 'El nombre es requerido');
                isValid = false;
            } else {
                this.setSuccess(this.nameInput);
            }

            if (telefonoValue === '') {
                this.setError(this.telefonoInput, 'El teléfono es requerido');
                isValid = false;
            } else if (!this.isValidTelefono(telefonoValue)) {
                this.setError(this.telefonoInput, 'El número de teléfono no es válido');
                isValid = false;
            } else {
                this.setSuccess(this.telefonoInput);
            }

            if (emailValue === '') {
                this.setError(this.emailInput, 'El correo electrónico es requerido');
                isValid = false;
            } else if (!this.isValidEmail(emailValue)) {
                this.setError(this.emailInput, 'Proporciona una dirección de correo válida');
                isValid = false;
            } else {
                this.setSuccess(this.emailInput);
            }

            if (travelTypeValue === '') {
                this.setError(this.travelTypeInput, 'Selecciona un tipo de viaje');
                isValid = false;
            } else {
                this.setSuccess(this.travelTypeInput);
            }

            if (messageValue === '') {
                this.setError(this.messageInput, 'El mensaje es requerido');
                isValid = false;
            } else {
                this.setSuccess(this.messageInput);
            }

            return isValid;
        }

        clearForm() {
            this.form.reset(); // Limpia todos los campos del formulario
            document.querySelectorAll('.error').forEach((el) => el.innerText = ''); // Limpia mensajes de error
        }
    }

    const validacion = new FormValidation();
});
