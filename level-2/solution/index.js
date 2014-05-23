var Form = require('form');
var Log = require('log');
var form = new Form();
var log = new Log();
var socket = new WebSocket('ws://anthonyshort.local:3000');

socket.onopen = function(){
  console.log('connected');
};

socket.onmessage = function(event) {
  log.add(JSON.parse(event.data));
};

document.body.appendChild(log.el);
document.body.appendChild(form.el);

form.on('submit', function(data){
  socket.send(JSON.stringify(data));
  form.reset();
});