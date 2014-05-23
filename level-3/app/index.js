// var WebSocketServer = require('websocket').server;
// var http = require('http');

// var server = http.createServer(function(request, response) {
//   console.log((new Date()) + ' Received request for ' + request.url);
//   response.writeHead(404);
//   response.end();
// });

// server.listen(3000, function() {
//   console.log((new Date()) + ' Server is listening on port 3000');
// });

// var socket = new WebSocketServer({
//   httpServer: server,
//   autoAcceptConnections: true
// });

// socket.on('request', function(request) {
//   var connection = request.accept('echo-protocol', request.origin);
//   console.log((new Date()) + ' Connection accepted.');
//   connection.on('message', function(message) {
//     if (message.type === 'utf8') {
//       console.log('Received Message: ' + message.utf8Data);
//       connection.sendUTF(message.utf8Data);
//     }
//     else if (message.type === 'binary') {
//       console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
//       connection.sendBytes(message.binaryData);
//     }
//   });
//   connection.on('close', function(reasonCode, description) {
//     console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
//   });
// });

var WebSocketServer = require('ws').Server
var wss = new WebSocketServer({ port: 3000 });

wss.on('open', function() {
  console.log('connected');
  ws.send(Date.now().toString(), {mask: true});
});

wss.on('close', function() {
  console.log('disconnected');
});

wss.on('connection', function(ws) {
  ws.on('message', function(message) {
    wss.broadcast(message);
  });
});

wss.broadcast = function(data) {
  for(var i in this.clients) {
    this.clients[i].send(data);
  }
};