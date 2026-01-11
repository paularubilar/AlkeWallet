$(document).ready(function() {
    // --- 1. LÓGICA DE ACTUALIZACIÓN DE SALDO ---
    
    // Intentamos obtener el saldo del "almacén" (LocalStorage)
    let saldoGuardado = localStorage.getItem('saldo');

    // Si es la primera vez que entra y no hay saldo, le asignamos 60.000
    if (saldoGuardado === null) {
        saldoGuardado = 60000;
        localStorage.setItem('saldo', saldoGuardado);
    }

    // Convertimos a número y lo mostramos en el HTML
    // Buscamos el ID #mi-saldo-menu que agregamos al H3
    let saldoNumerico = parseFloat(saldoGuardado);
    $('#mi-saldo-menu').text('$' + saldoNumerico.toLocaleString());


    // --- 2. TUS FUNCIONES DE NAVEGACIÓN ---
    // (Las dejamos dentro o fuera, pero estar dentro de ready es buena práctica)

    // Función Depositar
    window.irADepositar = function() {
        $("#aviso").text("Redirigiendo a: Depositar");
        
        setTimeout(function() {
            window.location.href = "deposito.html";
        }, 1000); 
    };

    // Función Enviar Dinero
    window.irAEnviar = function() {
        $("#aviso").text("Redirigiendo a: Enviar Dinero");
        
        setTimeout(function() {
            window.location.href = "sendmoney.html";
        }, 1000);
    };

    // Función Últimos Movimientos
    window.irAMovimientos = function() {
        $("#aviso").text("Redirigiendo a: Últimos Movimientos");
        
        setTimeout(function() {
            window.location.href = "transacciones.html";
        }, 1000);
    };
});