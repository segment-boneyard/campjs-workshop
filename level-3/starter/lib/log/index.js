var domify = require('domify');
var Message = require('message');

function Log() {
  this.el = domify('<div class="Log"></div>');
}

Log.prototype.add = function(data) {
  var message = new Message({
    name: data.name,
    message: data.message
  });
  message.appendTo(this.el);
  this.el.scrollTop = this.el.scrollHeight;
};

module.exports = Log;