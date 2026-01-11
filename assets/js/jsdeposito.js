$(document).ready(function() {
    // --- MOSTRAR SALDO ACTUAL AL CARGAR ---
      let saldoActual = parseFloat(localStorage.getItem('saldo')) || 0;
    
    // Mostramos el saldo en el elemento correspondiente
    $('#saldo-pantalla').text(saldoActual.toLocaleString());

    // Evento en botón depositar
    $('#btn-depositar').on('click', function() {
        const montoADepositar = parseFloat($('#monto-deposito').val());

        // Validación
        if (!isNaN(montoADepositar) && montoADepositar > 0) {
            
            // Actualizar la lógica del saldo
            saldoActual += montoADepositar;
            localStorage.setItem('saldo', saldoActual);
            $('#saldo-pantalla').text(saldoActual.toLocaleString());

            let historial = JSON.parse(localStorage.getItem('historial_movimientos')) || [];
            historial.push({
        fecha: new Date().toLocaleString(),
        tipo: "Depósito",
        detalle: "Depósito de dinero",
        monto: montoADepositar
    });
    localStorage.setItem('historial_movimientos', JSON.stringify(historial))
            // ---  AGREGAR LEYENDA CON EL MONTO DEPOSITADO ---
            $('#leyenda-confirmacion').text("Último depósito realizado: $" + montoADepositar);

            // Alerta  mensaje de exito con bootstrap
            const alertaHTML = `
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>¡Éxito!</strong> Has depositado $${montoADepositar} correctamente.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `;
            // La agregamos al contenedor
            $('#alert-container').html(alertaHTML);

            // Limpiar el input
            $('#monto-deposito').val("");

            // ---  redirigir 2 segundos ---
            setTimeout(function() {
                window.location.href = "menu.html"; 
            }, 2000);

        } else {
            // Alerta de error si el monto no es válido
            $('#alert-container').html(`
                <div class="alert alert-danger" role="alert">
                    Por favor, ingresa un monto válido.
                </div>
            `);
        }
    });
});