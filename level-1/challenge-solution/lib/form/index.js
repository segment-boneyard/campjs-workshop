var domify = require('domify');
var template = require('./form');
var emitter = require('emitter');

function Form() {
  this.el = domify(template);
  this.textarea = this.el.querySelector('textarea');
  this.el.addEventListener('submit', this.submit.bind(this));
}

emitter(Form.prototype);

Form.prototype.appendTo = function(target) {
  target.appendChild(this.el);
  return this;
};

Form.prototype.submit = function(event) {
  event.preventDefault();
  this.emit('submit', this.textarea.value);
};

Form.prototype.reset = function() {
  this.textarea.value = "";
};

module.exports = Form;