var domify = require('domify');
var template = require('./form');
var emitter = require('emitter');

function Form() {
  this.el = domify(template);
  this.textarea = this.el.querySelector('textarea');
  this.input = this.el.querySelector('input');
  this.el.addEventListener('submit', this.submit.bind(this));
  this.textarea.addEventListener('keydown', this.onEnter.bind(this));
}

emitter(Form.prototype);

Form.prototype.appendTo = function(target) {
  target.appendChild(this.el);
  return this;
};

Form.prototype.onEnter = function(event) {
  if(event.keyCode !== 13) return;
  this.submit(event);
};

Form.prototype.submit = function(event) {
  event.preventDefault();
  var val = this.textarea.value;
  if(!val) return;
  this.emit('submit', {
    name: this.input.value,
    message: this.textarea.value
  });
};

Form.prototype.reset = function() {
  this.textarea.value = "";
};

module.exports = Form;