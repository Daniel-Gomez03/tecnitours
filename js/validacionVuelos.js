document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formVuelo');

    form.addEventListener('submit', (e) => {
        const origen = document.getElementById('origen').value.trim();
        const destino = document.getElementById('destino').value.trim();
        const personas = parseInt(document.getElementById('personas').value);
        const fechaSalida = new Date(document.getElementById('fecha_salida').value);
        const fechaRetorno = new Date(document.getElementById('fecha_retorno').value);
        const tipoClase = document.getElementById('cmbTipoClase').value;
        const today = new Date(); 

        today.setHours(0, 0, 0, 0);

        let isValid = true;

        if (!origen.match(/^[A-Za-z\s]+$/)) {
            alert("El campo 'Desde' solo puede contener letras y espacios.");
            isValid = false;
        }

        if (!destino.match(/^[A-Za-z\s]+$/)) {
            alert("El campo 'Hacia' solo puede contener letras y espacios.");
            isValid = false;
        }

        if (isNaN(personas) || personas <= 0) {
            alert("Debe ingresar un número válido de pasajeros (al menos 1).");
            isValid = false;
        }

        if (isNaN(fechaSalida.getTime())) {
            alert("Debe ingresar una fecha de salida válida.");
            isValid = false;
        } else if (fechaSalida < today) {
            alert("La fecha de salida no puede estar en el pasado.");
            isValid = false;
        }

        if (isNaN(fechaRetorno.getTime())) {
            alert("Debe ingresar una fecha de retorno válida.");
            isValid = false;
        } else if (fechaRetorno <= fechaSalida) {
            alert("La fecha de retorno debe ser posterior a la fecha de salida.");
            isValid = false;
        }

        if (!tipoClase) {
            alert("Debe seleccionar una clase.");
            isValid = false;
        }

        if (!isValid) {
            e.preventDefault();
        }
    });
});
