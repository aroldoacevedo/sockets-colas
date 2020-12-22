var socket = io();
var label = $('#lblNuevoTicket');

// Comando para establecer la conexion
socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor!!');
});

//Se ejecuta al refrescar la pagina
socket.on('estadoActual', function(resp) {
    label.text(resp.actual);
});

$('button').on('click', function() {
    // Envia el mensaje al servidor
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        // Recibo el mensaje enviado desde el servidor
        label.text(siguienteTicket);
    });
});