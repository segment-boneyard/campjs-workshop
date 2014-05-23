var Form = require('form');
var notify = require('notification');

var form = new Form();

form.appendTo(document.body);

form.on('submit', function(value){
  if(value) notify(value);
  form.reset();
});