$(document).ready(function() {
    //  Cargar saldo
    let saldoTotal = parseFloat(localStorage.getItem('saldo'));
    if (isNaN(saldoTotal)) {
        saldoTotal = 5000;
        localStorage.setItem('saldo', saldoTotal);
    }
    $('#mi-saldo').text('$' + saldoTotal.toLocaleString());

    //  CARGAR AGENDA- LOCALSTORAGE 
    
    let agenda = JSON.parse(localStorage.getItem('mis_contactos'));
    if (!agenda) {
        agenda = [
            { nombre: "Ana Pérez", alias: "ana.p" },
            { nombre: "Luis Gómez", alias: "luis.g" },
            { nombre: "Marta Ruiz", alias: "marta.r" }
        ];
        localStorage.setItem('mis_contactos', JSON.stringify(agenda));
    }

    //   LISTA EN EL HTML 
    function renderizarContactos() {
        $('#lista-contactos').empty(); 
        agenda.forEach(function(contacto) {
            $('#lista-contactos').append(`
                <li class="list-group-item contacto" data-nombre="${contacto.nombre}" data-alias="${contacto.alias}">
                    ${contacto.nombre} (${contacto.alias})
                </li>
            `);
        });
    }
    // Se ejecuta al cargar la página
    renderizarContactos(); 

    // Guardar contacto nuevo
    $('#form-nuevo-contacto').on('submit', function(e) {
        e.preventDefault(); // Evita que la página se recargue al darle a "Guardar"

        // Creamos el nuevo objeto con los datos
        const nuevoContacto = {
            nombre: $('#cont-nombre').val(),
            cbu: $('#cont-cbu').val(),
            alias: $('#cont-alias').val(),
            banco: $('#cont-banco').val()
        };

        // se suma a la agenda y se guarda
        agenda.push(nuevoContacto);
        localStorage.setItem('mis_contactos', JSON.stringify(agenda));

        // Actualizamos la vista y cerramos el modal
        renderizarContactos();
        this.reset(); 
        $('#modalContacto').modal('hide');
        alert("¡Contacto guardado con éxito!");
    });

    // 5. Para seleccionar contacto.
    $(document).on('click', '.contacto', function() {
        $('.contacto').removeClass('bg-primary text-white');
        $(this).addClass('bg-primary text-white');
        
        personaSeleccionada = $(this).attr('data-nombre');

        $('#btn-abrir-envio').fadeIn(); 
        $('#nombre-en-modal').text(personaSeleccionada);
    });

    // Buscar
    $('#input-busqueda').on('keyup', function() {
        let valor = $(this).val().toLowerCase();
        $("#lista-contactos li").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(valor) > -1);
        });
    });

    // modal de dinero
    $('#btn-abrir-envio').click(function() {
        $('#modalDinero').modal('show');
    });

    // corfirmación de envio
    $('#btn-enviar').off('click').on('click', function() {
        let monto = parseFloat($('#monto-input').val());

        if (isNaN(monto) || monto <= 0) {
            alert("Escribe una cantidad válida.");
        } 
        else if (monto > saldoTotal) {
            alert("No tienes suficiente dinero.");
        } 
        else {
            saldoTotal -= monto;
            localStorage.setItem('saldo', saldoTotal);
            $('#mi-saldo').text('$' + saldoTotal.toLocaleString());
            
            // Historial
            let historial = JSON.parse(localStorage.getItem('historial_movimientos')) || [];
            historial.push({
                fecha: new Date().toLocaleString(),
                tipo: "Envío",
                detalle: "Enviado a: " + personaSeleccionada,
                monto: monto
            });
            localStorage.setItem('historial_movimientos', JSON.stringify(historial));

            $('#monto-input').val('');
            $('#modalDinero').modal('hide');

            const mensajeHTML = `
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>¡Envío Exitoso!</strong> Has enviado $${monto} a ${personaSeleccionada}.
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `;
            $('#confirmacion-final').html(mensajeHTML);
            $('#btn-abrir-envio').hide();
            $('.contacto').removeClass('bg-primary text-white');
        }
    });
});