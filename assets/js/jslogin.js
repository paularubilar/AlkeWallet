$(document).ready(function() {
    $('#btnIngresar').click(function() {
        
        // obtener valores, selectores jquery
        const email = $('#exampleInputEmail1').val();
        const password = $('#exampleInputPassword1').val();
        
        //  Seleccionamos el contenedor del mensaje
        const $textoMensaje = $('#Mensaje');

        // Datos de validación
        const emailCorrecto = "admin@gmail.com";
        const passwordCorrecta = "123456admin";

        // Lógica de validación
        if (email === emailCorrecto && password === passwordCorrecta) {
            // Usamos .text() y .css() de jQuery
            $textoMensaje.text("✅ ¡Acceso concedido!").css("color", "green");

            // Pausa antes de redirigir
            setTimeout(() => {
                window.location.href = "Menu.html";
            }, 1500);
            
        } else {
            // Manejo de error con jQuery
            $textoMensaje.text("❌ Datos incorrectos").css("color", "red");
        }
    });
    
});

