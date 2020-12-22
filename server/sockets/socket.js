const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {
    // Recibo el mensaje en el servidor
    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguiente();
        console.log(siguiente);
        // Envio el ticket siguiente al cliente
        callback(siguiente);
    });

    // Enviar un evento 'estadoActual'
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimo4()
    })

    // Recibo un mensaje desde el cliente con el nombre 'atenderTicket'
    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        // Envio el resultado al cliente
        callback(atenderTicket);

        //actualizar / notificar cambios en los ultimos 4
        //Reeemite el mensaje a todos los clientes
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimo4()
        });

    });

});