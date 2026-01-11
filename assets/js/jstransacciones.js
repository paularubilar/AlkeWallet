$(document).ready(function() {
    
    // Obtener lista real del LocalStorage
       let listaTransacciones = JSON.parse(localStorage.getItem('historial_movimientos')) || [
        { fecha: "01/01/2024, 10:00:00", tipo: "Depósito", detalle: "Saldo Inicial", monto: 5000 }
    ];

    // Función para obtener tipo de transacción legible (REQUISITO)
    function getTipoTransaccion(tipo) {
        switch(tipo) {
            case "Depósito": return "📥 Depósito Recibido";
            case "Envío": return "💸 Transferencia Enviada";
            default: return tipo;
        }
    }

    // Función mostrar movimientos (REQUISITO)
    function mostrarUltimosMovimientos(filtro = "todos") {
        const $cuerpoTabla = $('#cuerpoTabla');
        $cuerpoTabla.empty(); // Limpiamos la tabla antes de mostrar

        // Filtrar la lista
        const movimientosFiltrados = listaTransacciones.filter(mov => {
            return filtro === "todos" || mov.tipo === filtro;
        });

        // Si no hay movimientos de ese tipo
        if (movimientosFiltrados.length === 0) {
            $cuerpoTabla.append('<tr><td colspan="4" class="text-center">No hay movimientos de este tipo.</td></tr>');
            return;
        }

        //  filas, las ultimas arriba
        movimientosFiltrados.reverse().forEach(mov => {
            const colorMonto = mov.tipo === "Envío" ? "text-danger" : "text-success";
            const signo = mov.tipo === "Envío" ? "-" : "+";

            const fila = `
                <tr>
                    <td>${mov.fecha}</td>
                    <td>${getTipoTransaccion(mov.tipo)}</td>
                    <td>${mov.detalle}</td>
                    <td class="${colorMonto}">${signo} $${mov.monto}</td>
                </tr>
            `;
            $cuerpoTabla.append(fila);
        });
    }

    //  Detectar cambio en el filtro (REQUISITO)
    $('#filtroTipo').on('change', function() {
        const tipoSeleccionado = $(this).val();
        mostrarUltimosMovimientos(tipoSeleccionado);
    });

    // Carga inicial de la tabla
    mostrarUltimosMovimientos();
});
// Ejecutar la función apenas cargue la página
window.onload = cargarMovimientos;