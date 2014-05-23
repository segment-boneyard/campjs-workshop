var Form = require('form');
var form = new Form();

form.appendTo(document.body);
form.on('submit', function(value){
  console.log(value);
});