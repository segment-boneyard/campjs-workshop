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