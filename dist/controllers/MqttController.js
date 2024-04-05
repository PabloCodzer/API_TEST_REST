"use strict";const aedes = require('aedes')();
const server = require('net').createServer(aedes.handle);
const port = 1883;

server.listen(port, function () {
  console.log('Broker MQTT está rodando na porta ' + port);
});

aedes.on('client', function (client) {
  console.log('Cliente conectado: ', client.id);
});

aedes.on('clientDisconnect', function (client) {
  console.log('Cliente desconectado: ', client.id);
});

aedes.on('publish', function (packet, client) {
  if (client) {
    console.log('Mensagem recebida de ' + client.id + ': ' + packet.payload.toString());
  }
});
