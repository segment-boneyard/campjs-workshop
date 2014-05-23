var template = require('./index.html');
var ripple = require('ripple');
var Message = ripple(template);

module.exports = function(data) {
  return new Message({
    data: {
      name: data.name,
      message: data.message
    }
  });
};