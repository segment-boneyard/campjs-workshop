/**
 * Require the module at `name`.
 *
 * @param {String} name
 * @return {Object} exports
 * @api public
 */

function require(name) {
  var module = require.modules[name];
  if (!module) throw new Error('failed to require "' + name + '"');

  if (!('exports' in module) && typeof module.definition === 'function') {
    module.client = module.component = true;
    module.definition.call(this, module.exports = {}, module);
    delete module.definition;
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Register module at `name` with callback `definition`.
 *
 * @param {String} name
 * @param {Function} definition
 * @api private
 */

require.register = function (name, definition) {
  require.modules[name] = {
    definition: definition
  };
};

/**
 * Define a module's exports immediately with `exports`.
 *
 * @param {String} name
 * @param {Generic} exports
 * @api private
 */

require.define = function (name, exports) {
  require.modules[name] = {
    exports: exports
  };
};
require.register("component~domify@1.2.2", Function("exports, module",
"\n\
/**\n\
 * Expose `parse`.\n\
 */\n\
\n\
module.exports = parse;\n\
\n\
/**\n\
 * Wrap map from jquery.\n\
 */\n\
\n\
var map = {\n\
  legend: [1, '<fieldset>', '</fieldset>'],\n\
  tr: [2, '<table><tbody>', '</tbody></table>'],\n\
  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],\n\
  _default: [0, '', '']\n\
};\n\
\n\
map.td =\n\
map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];\n\
\n\
map.option =\n\
map.optgroup = [1, '<select multiple=\"multiple\">', '</select>'];\n\
\n\
map.thead =\n\
map.tbody =\n\
map.colgroup =\n\
map.caption =\n\
map.tfoot = [1, '<table>', '</table>'];\n\
\n\
map.text =\n\
map.circle =\n\
map.ellipse =\n\
map.line =\n\
map.path =\n\
map.polygon =\n\
map.polyline =\n\
map.rect = [1, '<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\">','</svg>'];\n\
\n\
/**\n\
 * Parse `html` and return the children.\n\
 *\n\
 * @param {String} html\n\
 * @return {Array}\n\
 * @api private\n\
 */\n\
\n\
function parse(html) {\n\
  if ('string' != typeof html) throw new TypeError('String expected');\n\
  \n\
  // tag name\n\
  var m = /<([\\w:]+)/.exec(html);\n\
  if (!m) return document.createTextNode(html);\n\
\n\
  html = html.replace(/^\\s+|\\s+$/g, ''); // Remove leading/trailing whitespace\n\
\n\
  var tag = m[1];\n\
\n\
  // body support\n\
  if (tag == 'body') {\n\
    var el = document.createElement('html');\n\
    el.innerHTML = html;\n\
    return el.removeChild(el.lastChild);\n\
  }\n\
\n\
  // wrap map\n\
  var wrap = map[tag] || map._default;\n\
  var depth = wrap[0];\n\
  var prefix = wrap[1];\n\
  var suffix = wrap[2];\n\
  var el = document.createElement('div');\n\
  el.innerHTML = prefix + html + suffix;\n\
  while (depth--) el = el.lastChild;\n\
\n\
  // one element\n\
  if (el.firstChild == el.lastChild) {\n\
    return el.removeChild(el.firstChild);\n\
  }\n\
\n\
  // several elements\n\
  var fragment = document.createDocumentFragment();\n\
  while (el.firstChild) {\n\
    fragment.appendChild(el.removeChild(el.firstChild));\n\
  }\n\
\n\
  return fragment;\n\
}\n\
\n\
//# sourceURL=components/component/domify/1.2.2/index.js"
));

require.modules["component-domify"] = require.modules["component~domify@1.2.2"];
require.modules["component~domify"] = require.modules["component~domify@1.2.2"];
require.modules["domify"] = require.modules["component~domify@1.2.2"];


require.register("component~emitter@1.1.2", Function("exports, module",
"\n\
/**\n\
 * Expose `Emitter`.\n\
 */\n\
\n\
module.exports = Emitter;\n\
\n\
/**\n\
 * Initialize a new `Emitter`.\n\
 *\n\
 * @api public\n\
 */\n\
\n\
function Emitter(obj) {\n\
  if (obj) return mixin(obj);\n\
};\n\
\n\
/**\n\
 * Mixin the emitter properties.\n\
 *\n\
 * @param {Object} obj\n\
 * @return {Object}\n\
 * @api private\n\
 */\n\
\n\
function mixin(obj) {\n\
  for (var key in Emitter.prototype) {\n\
    obj[key] = Emitter.prototype[key];\n\
  }\n\
  return obj;\n\
}\n\
\n\
/**\n\
 * Listen on the given `event` with `fn`.\n\
 *\n\
 * @param {String} event\n\
 * @param {Function} fn\n\
 * @return {Emitter}\n\
 * @api public\n\
 */\n\
\n\
Emitter.prototype.on =\n\
Emitter.prototype.addEventListener = function(event, fn){\n\
  this._callbacks = this._callbacks || {};\n\
  (this._callbacks[event] = this._callbacks[event] || [])\n\
    .push(fn);\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Adds an `event` listener that will be invoked a single\n\
 * time then automatically removed.\n\
 *\n\
 * @param {String} event\n\
 * @param {Function} fn\n\
 * @return {Emitter}\n\
 * @api public\n\
 */\n\
\n\
Emitter.prototype.once = function(event, fn){\n\
  var self = this;\n\
  this._callbacks = this._callbacks || {};\n\
\n\
  function on() {\n\
    self.off(event, on);\n\
    fn.apply(this, arguments);\n\
  }\n\
\n\
  on.fn = fn;\n\
  this.on(event, on);\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Remove the given callback for `event` or all\n\
 * registered callbacks.\n\
 *\n\
 * @param {String} event\n\
 * @param {Function} fn\n\
 * @return {Emitter}\n\
 * @api public\n\
 */\n\
\n\
Emitter.prototype.off =\n\
Emitter.prototype.removeListener =\n\
Emitter.prototype.removeAllListeners =\n\
Emitter.prototype.removeEventListener = function(event, fn){\n\
  this._callbacks = this._callbacks || {};\n\
\n\
  // all\n\
  if (0 == arguments.length) {\n\
    this._callbacks = {};\n\
    return this;\n\
  }\n\
\n\
  // specific event\n\
  var callbacks = this._callbacks[event];\n\
  if (!callbacks) return this;\n\
\n\
  // remove all handlers\n\
  if (1 == arguments.length) {\n\
    delete this._callbacks[event];\n\
    return this;\n\
  }\n\
\n\
  // remove specific handler\n\
  var cb;\n\
  for (var i = 0; i < callbacks.length; i++) {\n\
    cb = callbacks[i];\n\
    if (cb === fn || cb.fn === fn) {\n\
      callbacks.splice(i, 1);\n\
      break;\n\
    }\n\
  }\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Emit `event` with the given args.\n\
 *\n\
 * @param {String} event\n\
 * @param {Mixed} ...\n\
 * @return {Emitter}\n\
 */\n\
\n\
Emitter.prototype.emit = function(event){\n\
  this._callbacks = this._callbacks || {};\n\
  var args = [].slice.call(arguments, 1)\n\
    , callbacks = this._callbacks[event];\n\
\n\
  if (callbacks) {\n\
    callbacks = callbacks.slice(0);\n\
    for (var i = 0, len = callbacks.length; i < len; ++i) {\n\
      callbacks[i].apply(this, args);\n\
    }\n\
  }\n\
\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Return array of callbacks for `event`.\n\
 *\n\
 * @param {String} event\n\
 * @return {Array}\n\
 * @api public\n\
 */\n\
\n\
Emitter.prototype.listeners = function(event){\n\
  this._callbacks = this._callbacks || {};\n\
  return this._callbacks[event] || [];\n\
};\n\
\n\
/**\n\
 * Check if this emitter has `event` handlers.\n\
 *\n\
 * @param {String} event\n\
 * @return {Boolean}\n\
 * @api public\n\
 */\n\
\n\
Emitter.prototype.hasListeners = function(event){\n\
  return !! this.listeners(event).length;\n\
};\n\
\n\
//# sourceURL=components/component/emitter/1.1.2/index.js"
));

require.modules["component-emitter"] = require.modules["component~emitter@1.1.2"];
require.modules["component~emitter"] = require.modules["component~emitter@1.1.2"];
require.modules["emitter"] = require.modules["component~emitter@1.1.2"];


require.register("timoxley~to-array@0.2.1", Function("exports, module",
"/**\n\
 * Convert an array-like object into an `Array`.\n\
 * If `collection` is already an `Array`, then will return a clone of `collection`.\n\
 *\n\
 * @param {Array | Mixed} collection An `Array` or array-like object to convert e.g. `arguments` or `NodeList`\n\
 * @return {Array} Naive conversion of `collection` to a new `Array`.\n\
 * @api public\n\
 */\n\
\n\
module.exports = function toArray(collection) {\n\
  if (typeof collection === 'undefined') return []\n\
  if (collection === null) return [null]\n\
  if (collection === window) return [window]\n\
  if (typeof collection === 'string') return [collection]\n\
  if (isArray(collection)) return collection\n\
  if (typeof collection.length != 'number') return [collection]\n\
  if (typeof collection === 'function' && collection instanceof Function) return [collection]\n\
\n\
  var arr = []\n\
  for (var i = 0; i < collection.length; i++) {\n\
    if (Object.prototype.hasOwnProperty.call(collection, i) || i in collection) {\n\
      arr.push(collection[i])\n\
    }\n\
  }\n\
  if (!arr.length) return []\n\
  return arr\n\
}\n\
\n\
function isArray(arr) {\n\
  return Object.prototype.toString.call(arr) === \"[object Array]\";\n\
}\n\
\n\
//# sourceURL=components/timoxley/to-array/0.2.1/index.js"
));

require.modules["timoxley-to-array"] = require.modules["timoxley~to-array@0.2.1"];
require.modules["timoxley~to-array"] = require.modules["timoxley~to-array@0.2.1"];
require.modules["to-array"] = require.modules["timoxley~to-array@0.2.1"];


require.register("jaycetde~dom-contains@master", Function("exports, module",
"'use strict';\n\
\n\
var containsFn\n\
\t, node = window.Node\n\
;\n\
\n\
if (node && node.prototype) {\n\
\tif (node.prototype.contains) {\n\
\t\tcontainsFn = node.prototype.contains;\n\
\t} else if (node.prototype.compareDocumentPosition) {\n\
\t\tcontainsFn = function (arg) {\n\
\t\t\treturn !!(node.prototype.compareDocumentPosition.call(this, arg) & 16);\n\
\t\t};\n\
\t}\n\
}\n\
\n\
if (!containsFn) {\n\
\tcontainsFn = function (arg) {\n\
\t\tif (arg) {\n\
\t\t\twhile ((arg = arg.parentNode)) {\n\
\t\t\t\tif (arg === this) {\n\
\t\t\t\t\treturn true;\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t}\n\
\t\treturn false;\n\
\t};\n\
}\n\
\n\
module.exports = function (a, b) {\n\
\tvar adown = a.nodeType === 9 ? a.documentElement : a\n\
\t\t, bup = b && b.parentNode\n\
\t;\n\
\n\
\treturn a === bup || !!(bup && bup.nodeType === 1 && containsFn.call(adown, bup));\n\
};\n\
\n\
//# sourceURL=components/jaycetde/dom-contains/master/index.js"
));

require.modules["jaycetde-dom-contains"] = require.modules["jaycetde~dom-contains@master"];
require.modules["jaycetde~dom-contains"] = require.modules["jaycetde~dom-contains@master"];
require.modules["dom-contains"] = require.modules["jaycetde~dom-contains@master"];


require.register("anthonyshort~dom-walk@0.1.0", Function("exports, module",
"var array = require(\"timoxley~to-array@0.2.1\");\n\
var contains = require(\"jaycetde~dom-contains@master\");\n\
\n\
function walk(el, process, done, root) {\n\
  root = root || el;\n\
  var end = done || function(){};\n\
  var nodes = array(el.childNodes);\n\
\n\
  function next(){\n\
    if(nodes.length === 0) return end();\n\
    var nextNode = nodes.shift();\n\
    if(!contains(root, nextNode)) return next();\n\
    walk(nextNode, process, next, root);\n\
  }\n\
\n\
  process(el, next);\n\
}\n\
\n\
module.exports = walk;\n\
//# sourceURL=components/anthonyshort/dom-walk/0.1.0/index.js"
));

require.modules["anthonyshort-dom-walk"] = require.modules["anthonyshort~dom-walk@0.1.0"];
require.modules["anthonyshort~dom-walk"] = require.modules["anthonyshort~dom-walk@0.1.0"];
require.modules["dom-walk"] = require.modules["anthonyshort~dom-walk@0.1.0"];


require.register("component~raf@1.1.3", Function("exports, module",
"/**\n\
 * Expose `requestAnimationFrame()`.\n\
 */\n\
\n\
exports = module.exports = window.requestAnimationFrame\n\
  || window.webkitRequestAnimationFrame\n\
  || window.mozRequestAnimationFrame\n\
  || window.oRequestAnimationFrame\n\
  || window.msRequestAnimationFrame\n\
  || fallback;\n\
\n\
/**\n\
 * Fallback implementation.\n\
 */\n\
\n\
var prev = new Date().getTime();\n\
function fallback(fn) {\n\
  var curr = new Date().getTime();\n\
  var ms = Math.max(0, 16 - (curr - prev));\n\
  var req = setTimeout(fn, ms);\n\
  prev = curr;\n\
  return req;\n\
}\n\
\n\
/**\n\
 * Cancel.\n\
 */\n\
\n\
var cancel = window.cancelAnimationFrame\n\
  || window.webkitCancelAnimationFrame\n\
  || window.mozCancelAnimationFrame\n\
  || window.oCancelAnimationFrame\n\
  || window.msCancelAnimationFrame\n\
  || window.clearTimeout;\n\
\n\
exports.cancel = function(id){\n\
  cancel.call(window, id);\n\
};\n\
\n\
//# sourceURL=components/component/raf/1.1.3/index.js"
));

require.modules["component-raf"] = require.modules["component~raf@1.1.3"];
require.modules["component~raf"] = require.modules["component~raf@1.1.3"];
require.modules["raf"] = require.modules["component~raf@1.1.3"];


require.register("anthonyshort~raf-queue@0.2.0", Function("exports, module",
"var raf = require(\"component~raf@1.1.3\");\n\
var queue = [];\n\
var requestId;\n\
var id = 0;\n\
\n\
/**\n\
 * Add a job to the queue passing in\n\
 * an optional context to call the function in\n\
 *\n\
 * @param {Function} fn\n\
 * @param {Object} cxt\n\
 */\n\
\n\
function frame (fn, cxt) {\n\
  var frameId = id++;\n\
  var length = queue.push({\n\
    id: frameId,\n\
    fn: fn,\n\
    cxt: cxt\n\
  });\n\
  if(!requestId) requestId = raf(flush);\n\
  return frameId;\n\
};\n\
\n\
/**\n\
 * Remove a job from the queue using the\n\
 * frameId returned when it was added\n\
 *\n\
 * @param {Number} id\n\
 */\n\
\n\
frame.cancel = function (id) {\n\
  for (var i = queue.length - 1; i >= 0; i--) {\n\
    if(queue[i].id === id) {\n\
      queue.splice(i, 1);\n\
      break;\n\
    }\n\
  }\n\
};\n\
\n\
/**\n\
 * Add a function to the queue, but only once\n\
 *\n\
 * @param {Function} fn\n\
 * @param {Object} cxt\n\
 */\n\
\n\
frame.once = function (fn, cxt) {\n\
  for (var i = queue.length - 1; i >= 0; i--) {\n\
    if(queue[i].fn === fn) return;\n\
  }\n\
  frame(fn, cxt);\n\
};\n\
\n\
/**\n\
 * Get the current queue length\n\
 */\n\
\n\
frame.queued = function () {\n\
  return queue.length;\n\
};\n\
\n\
/**\n\
 * Clear the queue and remove all pending jobs\n\
 */\n\
\n\
frame.clear = function () {\n\
  queue = [];\n\
  if(requestId) raf.cancel(requestId);\n\
  requestId = null;\n\
};\n\
\n\
/**\n\
 * Fire a function after all of the jobs in the\n\
 * current queue have fired. This is usually used\n\
 * in testing.\n\
 */\n\
\n\
frame.defer = function (fn) {\n\
  raf(raf.bind(null, fn));\n\
};\n\
\n\
/**\n\
 * Flushes the queue and runs each job\n\
 */\n\
\n\
function flush () {\n\
  while(queue.length) {\n\
    var job = queue.shift();\n\
    job.fn.call(job.cxt);\n\
  }\n\
  requestId = null;\n\
}\n\
\n\
module.exports = frame;\n\
//# sourceURL=components/anthonyshort/raf-queue/0.2.0/index.js"
));

require.modules["anthonyshort-raf-queue"] = require.modules["anthonyshort~raf-queue@0.2.0"];
require.modules["anthonyshort~raf-queue"] = require.modules["anthonyshort~raf-queue@0.2.0"];
require.modules["raf-queue"] = require.modules["anthonyshort~raf-queue@0.2.0"];


require.register("anthonyshort~is-boolean-attribute@0.0.1", Function("exports, module",
"\n\
/**\n\
 * https://github.com/kangax/html-minifier/issues/63#issuecomment-18634279\n\
 */\n\
\n\
var attrs = [\n\
  \"allowfullscreen\",\n\
  \"async\",\n\
  \"autofocus\",\n\
  \"checked\",\n\
  \"compact\",\n\
  \"declare\",\n\
  \"default\",\n\
  \"defer\",\n\
  \"disabled\",\n\
  \"formnovalidate\",\n\
  \"hidden\",\n\
  \"inert\",\n\
  \"ismap\",\n\
  \"itemscope\",\n\
  \"multiple\",\n\
  \"multiple\",\n\
  \"muted\",\n\
  \"nohref\",\n\
  \"noresize\",\n\
  \"noshade\",\n\
  \"novalidate\",\n\
  \"nowrap\",\n\
  \"open\",\n\
  \"readonly\",\n\
  \"required\",\n\
  \"reversed\",\n\
  \"seamless\",\n\
  \"selected\",\n\
  \"sortable\",\n\
  \"truespeed\",\n\
  \"typemustmatch\",\n\
  \"contenteditable\",\n\
  \"spellcheck\"\n\
];\n\
\n\
module.exports = function(attr){\n\
  return attrs.indexOf(attr) > -1;\n\
};\n\
//# sourceURL=components/anthonyshort/is-boolean-attribute/0.0.1/index.js"
));

require.modules["anthonyshort-is-boolean-attribute"] = require.modules["anthonyshort~is-boolean-attribute@0.0.1"];
require.modules["anthonyshort~is-boolean-attribute"] = require.modules["anthonyshort~is-boolean-attribute@0.0.1"];
require.modules["is-boolean-attribute"] = require.modules["anthonyshort~is-boolean-attribute@0.0.1"];


require.register("anthonyshort~attributes@0.0.1", Function("exports, module",
"module.exports = function(el) {\r\n\
  var attrs = el.attributes,\r\n\
      ret = {},\r\n\
      attr,\r\n\
      i;\r\n\
\r\n\
  for (i = attrs.length - 1; i >= 0; i--) {\r\n\
    attr = attrs.item(i);\r\n\
    ret[attr.nodeName] = attr.nodeValue;\r\n\
  }\r\n\
\r\n\
  return ret;\r\n\
};\n\
//# sourceURL=components/anthonyshort/attributes/0.0.1/index.js"
));

require.modules["anthonyshort-attributes"] = require.modules["anthonyshort~attributes@0.0.1"];
require.modules["anthonyshort~attributes"] = require.modules["anthonyshort~attributes@0.0.1"];
require.modules["attributes"] = require.modules["anthonyshort~attributes@0.0.1"];


require.register("component~props@1.1.2", Function("exports, module",
"/**\n\
 * Global Names\n\
 */\n\
\n\
var globals = /\\b(this|Array|Date|Object|Math|JSON)\\b/g;\n\
\n\
/**\n\
 * Return immediate identifiers parsed from `str`.\n\
 *\n\
 * @param {String} str\n\
 * @param {String|Function} map function or prefix\n\
 * @return {Array}\n\
 * @api public\n\
 */\n\
\n\
module.exports = function(str, fn){\n\
  var p = unique(props(str));\n\
  if (fn && 'string' == typeof fn) fn = prefixed(fn);\n\
  if (fn) return map(str, p, fn);\n\
  return p;\n\
};\n\
\n\
/**\n\
 * Return immediate identifiers in `str`.\n\
 *\n\
 * @param {String} str\n\
 * @return {Array}\n\
 * @api private\n\
 */\n\
\n\
function props(str) {\n\
  return str\n\
    .replace(/\\.\\w+|\\w+ *\\(|\"[^\"]*\"|'[^']*'|\\/([^/]+)\\//g, '')\n\
    .replace(globals, '')\n\
    .match(/[$a-zA-Z_]\\w*/g)\n\
    || [];\n\
}\n\
\n\
/**\n\
 * Return `str` with `props` mapped with `fn`.\n\
 *\n\
 * @param {String} str\n\
 * @param {Array} props\n\
 * @param {Function} fn\n\
 * @return {String}\n\
 * @api private\n\
 */\n\
\n\
function map(str, props, fn) {\n\
  var re = /\\.\\w+|\\w+ *\\(|\"[^\"]*\"|'[^']*'|\\/([^/]+)\\/|[a-zA-Z_]\\w*/g;\n\
  return str.replace(re, function(_){\n\
    if ('(' == _[_.length - 1]) return fn(_);\n\
    if (!~props.indexOf(_)) return _;\n\
    return fn(_);\n\
  });\n\
}\n\
\n\
/**\n\
 * Return unique array.\n\
 *\n\
 * @param {Array} arr\n\
 * @return {Array}\n\
 * @api private\n\
 */\n\
\n\
function unique(arr) {\n\
  var ret = [];\n\
\n\
  for (var i = 0; i < arr.length; i++) {\n\
    if (~ret.indexOf(arr[i])) continue;\n\
    ret.push(arr[i]);\n\
  }\n\
\n\
  return ret;\n\
}\n\
\n\
/**\n\
 * Map with prefix `str`.\n\
 */\n\
\n\
function prefixed(str) {\n\
  return function(_){\n\
    return str + _;\n\
  };\n\
}\n\
\n\
//# sourceURL=components/component/props/1.1.2/index.js"
));

require.modules["component-props"] = require.modules["component~props@1.1.2"];
require.modules["component~props"] = require.modules["component~props@1.1.2"];
require.modules["props"] = require.modules["component~props@1.1.2"];


require.register("component~to-function@2.0.0", Function("exports, module",
"/**\n\
 * Module Dependencies\n\
 */\n\
\n\
var expr = require(\"component~props@1.1.2\");\n\
\n\
/**\n\
 * Expose `toFunction()`.\n\
 */\n\
\n\
module.exports = toFunction;\n\
\n\
/**\n\
 * Convert `obj` to a `Function`.\n\
 *\n\
 * @param {Mixed} obj\n\
 * @return {Function}\n\
 * @api private\n\
 */\n\
\n\
function toFunction(obj) {\n\
  switch ({}.toString.call(obj)) {\n\
    case '[object Object]':\n\
      return objectToFunction(obj);\n\
    case '[object Function]':\n\
      return obj;\n\
    case '[object String]':\n\
      return stringToFunction(obj);\n\
    case '[object RegExp]':\n\
      return regexpToFunction(obj);\n\
    default:\n\
      return defaultToFunction(obj);\n\
  }\n\
}\n\
\n\
/**\n\
 * Default to strict equality.\n\
 *\n\
 * @param {Mixed} val\n\
 * @return {Function}\n\
 * @api private\n\
 */\n\
\n\
function defaultToFunction(val) {\n\
  return function(obj){\n\
    return val === obj;\n\
  }\n\
}\n\
\n\
/**\n\
 * Convert `re` to a function.\n\
 *\n\
 * @param {RegExp} re\n\
 * @return {Function}\n\
 * @api private\n\
 */\n\
\n\
function regexpToFunction(re) {\n\
  return function(obj){\n\
    return re.test(obj);\n\
  }\n\
}\n\
\n\
/**\n\
 * Convert property `str` to a function.\n\
 *\n\
 * @param {String} str\n\
 * @return {Function}\n\
 * @api private\n\
 */\n\
\n\
function stringToFunction(str) {\n\
  // immediate such as \"> 20\"\n\
  if (/^ *\\W+/.test(str)) return new Function('_', 'return _ ' + str);\n\
\n\
  // properties such as \"name.first\" or \"age > 18\" or \"age > 18 && age < 36\"\n\
  return new Function('_', 'return ' + get(str));\n\
}\n\
\n\
/**\n\
 * Convert `object` to a function.\n\
 *\n\
 * @param {Object} object\n\
 * @return {Function}\n\
 * @api private\n\
 */\n\
\n\
function objectToFunction(obj) {\n\
  var match = {}\n\
  for (var key in obj) {\n\
    match[key] = typeof obj[key] === 'string'\n\
      ? defaultToFunction(obj[key])\n\
      : toFunction(obj[key])\n\
  }\n\
  return function(val){\n\
    if (typeof val !== 'object') return false;\n\
    for (var key in match) {\n\
      if (!(key in val)) return false;\n\
      if (!match[key](val[key])) return false;\n\
    }\n\
    return true;\n\
  }\n\
}\n\
\n\
/**\n\
 * Built the getter function. Supports getter style functions\n\
 *\n\
 * @param {String} str\n\
 * @return {String}\n\
 * @api private\n\
 */\n\
\n\
function get(str) {\n\
  var props = expr(str);\n\
  if (!props.length) return '_.' + str;\n\
\n\
  var val;\n\
  for(var i = 0, prop; prop = props[i]; i++) {\n\
    val = '_.' + prop;\n\
    val = \"('function' == typeof \" + val + \" ? \" + val + \"() : \" + val + \")\";\n\
    str = str.replace(new RegExp(prop, 'g'), val);\n\
  }\n\
\n\
  return str;\n\
}\n\
\n\
//# sourceURL=components/component/to-function/2.0.0/index.js"
));

require.modules["component-to-function"] = require.modules["component~to-function@2.0.0"];
require.modules["component~to-function"] = require.modules["component~to-function@2.0.0"];
require.modules["to-function"] = require.modules["component~to-function@2.0.0"];


require.register("component~type@1.0.0", Function("exports, module",
"\n\
/**\n\
 * toString ref.\n\
 */\n\
\n\
var toString = Object.prototype.toString;\n\
\n\
/**\n\
 * Return the type of `val`.\n\
 *\n\
 * @param {Mixed} val\n\
 * @return {String}\n\
 * @api public\n\
 */\n\
\n\
module.exports = function(val){\n\
  switch (toString.call(val)) {\n\
    case '[object Function]': return 'function';\n\
    case '[object Date]': return 'date';\n\
    case '[object RegExp]': return 'regexp';\n\
    case '[object Arguments]': return 'arguments';\n\
    case '[object Array]': return 'array';\n\
    case '[object String]': return 'string';\n\
  }\n\
\n\
  if (val === null) return 'null';\n\
  if (val === undefined) return 'undefined';\n\
  if (val && val.nodeType === 1) return 'element';\n\
  if (val === Object(val)) return 'object';\n\
\n\
  return typeof val;\n\
};\n\
\n\
\n\
//# sourceURL=components/component/type/1.0.0/index.js"
));

require.modules["component-type"] = require.modules["component~type@1.0.0"];
require.modules["component~type"] = require.modules["component~type@1.0.0"];
require.modules["type"] = require.modules["component~type@1.0.0"];


require.register("component~each@0.2.2", Function("exports, module",
"\n\
/**\n\
 * Module dependencies.\n\
 */\n\
\n\
var type = require(\"component~type@1.0.0\");\n\
var toFunction = require(\"component~to-function@2.0.0\");\n\
\n\
/**\n\
 * HOP reference.\n\
 */\n\
\n\
var has = Object.prototype.hasOwnProperty;\n\
\n\
/**\n\
 * Iterate the given `obj` and invoke `fn(val, i)`\n\
 * in optional context `ctx`.\n\
 *\n\
 * @param {String|Array|Object} obj\n\
 * @param {Function} fn\n\
 * @param {Object} [ctx]\n\
 * @api public\n\
 */\n\
\n\
module.exports = function(obj, fn, ctx){\n\
  fn = toFunction(fn);\n\
  ctx = ctx || this;\n\
  switch (type(obj)) {\n\
    case 'array':\n\
      return array(obj, fn, ctx);\n\
    case 'object':\n\
      if ('number' == typeof obj.length) return array(obj, fn, ctx);\n\
      return object(obj, fn, ctx);\n\
    case 'string':\n\
      return string(obj, fn, ctx);\n\
  }\n\
};\n\
\n\
/**\n\
 * Iterate string chars.\n\
 *\n\
 * @param {String} obj\n\
 * @param {Function} fn\n\
 * @param {Object} ctx\n\
 * @api private\n\
 */\n\
\n\
function string(obj, fn, ctx) {\n\
  for (var i = 0; i < obj.length; ++i) {\n\
    fn.call(ctx, obj.charAt(i), i);\n\
  }\n\
}\n\
\n\
/**\n\
 * Iterate object keys.\n\
 *\n\
 * @param {Object} obj\n\
 * @param {Function} fn\n\
 * @param {Object} ctx\n\
 * @api private\n\
 */\n\
\n\
function object(obj, fn, ctx) {\n\
  for (var key in obj) {\n\
    if (has.call(obj, key)) {\n\
      fn.call(ctx, key, obj[key]);\n\
    }\n\
  }\n\
}\n\
\n\
/**\n\
 * Iterate array-ish.\n\
 *\n\
 * @param {Array|Object} obj\n\
 * @param {Function} fn\n\
 * @param {Object} ctx\n\
 * @api private\n\
 */\n\
\n\
function array(obj, fn, ctx) {\n\
  for (var i = 0; i < obj.length; ++i) {\n\
    fn.call(ctx, obj[i], i);\n\
  }\n\
}\n\
\n\
//# sourceURL=components/component/each/0.2.2/index.js"
));

require.modules["component-each"] = require.modules["component~each@0.2.2"];
require.modules["component~each"] = require.modules["component~each@0.2.2"];
require.modules["each"] = require.modules["component~each@0.2.2"];


require.register("component~indexof@0.0.1", Function("exports, module",
"\n\
var indexOf = [].indexOf;\n\
\n\
module.exports = function(arr, obj){\n\
  if (indexOf) return arr.indexOf(obj);\n\
  for (var i = 0; i < arr.length; ++i) {\n\
    if (arr[i] === obj) return i;\n\
  }\n\
  return -1;\n\
};\n\
//# sourceURL=components/component/indexof/0.0.1/index.js"
));

require.modules["component-indexof"] = require.modules["component~indexof@0.0.1"];
require.modules["component~indexof"] = require.modules["component~indexof@0.0.1"];
require.modules["indexof"] = require.modules["component~indexof@0.0.1"];


require.register("yields~uniq@master", Function("exports, module",
"\n\
/**\n\
 * dependencies\n\
 */\n\
\n\
try {\n\
  var indexOf = require(\"component~indexof@0.0.1\");\n\
} catch(e){\n\
  var indexOf = require(\"indexof-component\");\n\
}\n\
\n\
/**\n\
 * Create duplicate free array\n\
 * from the provided `arr`.\n\
 *\n\
 * @param {Array} arr\n\
 * @param {Array} select\n\
 * @return {Array}\n\
 */\n\
\n\
module.exports = function (arr, select) {\n\
  var len = arr.length, ret = [], v;\n\
  select = select ? (select instanceof Array ? select : [select]) : false;\n\
\n\
  for (var i = 0; i < len; i++) {\n\
    v = arr[i];\n\
    if (select && !~indexOf(select, v)) {\n\
      ret.push(v);\n\
    } else if (!~indexOf(ret, v)) {\n\
      ret.push(v);\n\
    }\n\
  }\n\
  return ret;\n\
};\n\
\n\
//# sourceURL=components/yields/uniq/master/index.js"
));

require.modules["yields-uniq"] = require.modules["yields~uniq@master"];
require.modules["yields~uniq"] = require.modules["yields~uniq@master"];
require.modules["uniq"] = require.modules["yields~uniq@master"];


require.register("ripplejs~expression@0.2.0", Function("exports, module",
"var props = require(\"component~props@1.1.2\");\n\
var unique = require(\"yields~uniq@master\");\n\
var cache = {};\n\
\n\
function Expression(str) {\n\
  this.str = str;\n\
  this.props = unique(props(str));\n\
  this.fn = compile(str, this.props);\n\
}\n\
\n\
Expression.prototype.exec = function(scope, context){\n\
  scope = scope || {};\n\
  var args = scope ? values(scope, this.props) : [];\n\
  return this.fn.apply(context, args);\n\
};\n\
\n\
Expression.prototype.toString = function(){\n\
  return this.str;\n\
};\n\
\n\
function values(obj, keys) {\n\
  return keys.map(function(key){\n\
    return obj[key];\n\
  });\n\
}\n\
\n\
function compile(str, props){\n\
  if(cache[str]) return cache[str];\n\
  var args = props.slice();\n\
  args.push('return ' + str);\n\
  var fn = Function.apply(null, args);\n\
  cache[str] = fn;\n\
  return fn;\n\
}\n\
\n\
module.exports = Expression;\n\
//# sourceURL=components/ripplejs/expression/0.2.0/index.js"
));

require.modules["ripplejs-expression"] = require.modules["ripplejs~expression@0.2.0"];
require.modules["ripplejs~expression"] = require.modules["ripplejs~expression@0.2.0"];
require.modules["expression"] = require.modules["ripplejs~expression@0.2.0"];


require.register("component~format-parser@0.0.2", Function("exports, module",
"\n\
/**\n\
 * Parse the given format `str`.\n\
 *\n\
 * @param {String} str\n\
 * @return {Array}\n\
 * @api public\n\
 */\n\
\n\
module.exports = function(str){\n\
\treturn str.split(/ *\\| */).map(function(call){\n\
\t\tvar parts = call.split(':');\n\
\t\tvar name = parts.shift();\n\
\t\tvar args = parseArgs(parts.join(':'));\n\
\n\
\t\treturn {\n\
\t\t\tname: name,\n\
\t\t\targs: args\n\
\t\t};\n\
\t});\n\
};\n\
\n\
/**\n\
 * Parse args `str`.\n\
 *\n\
 * @param {String} str\n\
 * @return {Array}\n\
 * @api private\n\
 */\n\
\n\
function parseArgs(str) {\n\
\tvar args = [];\n\
\tvar re = /\"([^\"]*)\"|'([^']*)'|([^ \\t,]+)/g;\n\
\tvar m;\n\
\t\n\
\twhile (m = re.exec(str)) {\n\
\t\targs.push(m[2] || m[1] || m[0]);\n\
\t}\n\
\t\n\
\treturn args;\n\
}\n\
\n\
//# sourceURL=components/component/format-parser/0.0.2/index.js"
));

require.modules["component-format-parser"] = require.modules["component~format-parser@0.0.2"];
require.modules["component~format-parser"] = require.modules["component~format-parser@0.0.2"];
require.modules["format-parser"] = require.modules["component~format-parser@0.0.2"];


require.register("ripplejs~interpolate@0.4.3", Function("exports, module",
"var Expression = require(\"ripplejs~expression@0.2.0\");\n\
var parse = require(\"component~format-parser@0.0.2\");\n\
var unique = require(\"yields~uniq@master\");\n\
\n\
/**\n\
 * Run a value through all filters\n\
 *\n\
 * @param  {Mixed}  val    Any value returned from an expression\n\
 * @param  {Array}  types  The filters eg. currency | float | floor\n\
 * @param  {Object} fns     Mapping of filter names, eg. currency, to functions\n\
 * @return {Mixed}\n\
 */\n\
function filter(val, types, fns) {\n\
  fns = fns || {};\n\
  var filters = parse(types.join('|'));\n\
  filters.forEach(function(f){\n\
    var name = f.name.trim();\n\
    var fn = fns[name];\n\
    var args = f.args.slice();\n\
    args.unshift(val);\n\
    if(!fn) throw new Error('Missing filter named \"' + name + '\"');\n\
    val = fn.apply(null, args);\n\
  });\n\
  return val;\n\
}\n\
\n\
/**\n\
 * Create a new interpolator\n\
 */\n\
function Interpolate() {\n\
  this.match = /\\{\\{([^}]+)\\}\\}/g;\n\
  this.filters = {};\n\
}\n\
\n\
/**\n\
 * Hook for plugins\n\
 *\n\
 * @param {Function} fn\n\
 *\n\
 * @return {Interpolate}\n\
 */\n\
Interpolate.prototype.use = function(fn) {\n\
  fn(this);\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Set the delimiters\n\
 *\n\
 * @param {Regex} match\n\
 *\n\
 * @return {Interpolate}\n\
 */\n\
Interpolate.prototype.delimiters = function(match) {\n\
  this.match = match;\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Check if a string matches the delimiters\n\
 *\n\
 * @param {String} input\n\
 *\n\
 * @return {Array}\n\
 */\n\
Interpolate.prototype.matches = function(input) {\n\
  var test = new RegExp(this.match.source);\n\
  var matches = test.exec(input);\n\
  if(!matches) return [];\n\
  return matches;\n\
};\n\
\n\
/**\n\
 * Add a new filter\n\
 *\n\
 * @param {String} name\n\
 * @param {Function} fn\n\
 *\n\
 * @return {Interpolate}\n\
 */\n\
Interpolate.prototype.filter = function(name, fn){\n\
  this.filters[name] = fn;\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Interpolate a string using the contents\n\
 * inside of the delimiters\n\
 *\n\
 * @param  {String} input\n\
 * @param  {Object} options\n\
 * @return {String}\n\
 */\n\
Interpolate.prototype.exec = function(input, options){\n\
  options = options || {};\n\
  var parts = input.split('|');\n\
  var expr = parts.shift();\n\
  var fn = new Expression(expr);\n\
  var val = fn.exec(options.scope, options.context);\n\
  if(parts.length) {\n\
    val = filter(val, parts, options.filters || this.filters);\n\
  }\n\
  return val;\n\
};\n\
\n\
\n\
/**\n\
 * Check if a string has interpolation\n\
 *\n\
 * @param {String} input\n\
 *\n\
 * @return {Boolean}\n\
 */\n\
Interpolate.prototype.has = function(input) {\n\
  return input.search(this.match) > -1;\n\
};\n\
\n\
\n\
/**\n\
 * Interpolate as a string and replace each\n\
 * match with the interpolated value\n\
 *\n\
 * @return {String}\n\
 */\n\
Interpolate.prototype.replace = function(input, options){\n\
  var self = this;\n\
  return input.replace(this.match, function(_, match){\n\
    var val = self.exec(match, options);\n\
    return (val == null) ? '' : val;\n\
  });\n\
};\n\
\n\
\n\
/**\n\
 * Get the interpolated value from a string\n\
 */\n\
Interpolate.prototype.value = function(input, options){\n\
  var matches = this.matches(input);\n\
  if( matches.length === 0 ) return input;\n\
  if( matches[0].length !== input.length ) return this.replace(input, options);\n\
  return this.exec(matches[1], options);\n\
};\n\
\n\
\n\
/**\n\
 * Get all the interpolated values from a string\n\
 *\n\
 * @return {Array} Array of values\n\
 */\n\
Interpolate.prototype.values = function(input, options){\n\
  var self = this;\n\
  return this.map(input, function(match){\n\
    return self.value(match, options);\n\
  });\n\
};\n\
\n\
\n\
/**\n\
 * Find all the properties used in all expressions in a string\n\
 * @param  {String} str\n\
 * @return {Array}\n\
 */\n\
Interpolate.prototype.props = function(str) {\n\
  var arr = [];\n\
  this.each(str, function(match, expr, filters){\n\
    var fn = new Expression(expr);\n\
    arr = arr.concat(fn.props);\n\
  });\n\
  return unique(arr);\n\
};\n\
\n\
\n\
/**\n\
 * Loop through each matched expression in a string\n\
 *\n\
 * @param {String} str\n\
 *\n\
 * @return {void}\n\
 */\n\
Interpolate.prototype.each = function(str, callback) {\n\
  var m;\n\
  var index = 0;\n\
  var re = this.match;\n\
  while (m = re.exec(str)) {\n\
    var parts = m[1].split('|');\n\
    var expr = parts.shift();\n\
    var filters = parts.join('|');\n\
    callback(m[0], expr, filters, index);\n\
    index++;\n\
  }\n\
};\n\
\n\
\n\
/**\n\
 * Map the string\n\
 *\n\
 * @param {String} str\n\
 * @param {Function} callback\n\
 *\n\
 * @return {Array}\n\
 */\n\
Interpolate.prototype.map = function(str, callback) {\n\
  var ret = [];\n\
  this.each(str, function(){\n\
    ret.push(callback.apply(null, arguments));\n\
  });\n\
  return ret;\n\
};\n\
\n\
\n\
module.exports = Interpolate;\n\
//# sourceURL=components/ripplejs/interpolate/0.4.3/index.js"
));

require.modules["ripplejs-interpolate"] = require.modules["ripplejs~interpolate@0.4.3"];
require.modules["ripplejs~interpolate"] = require.modules["ripplejs~interpolate@0.4.3"];
require.modules["interpolate"] = require.modules["ripplejs~interpolate@0.4.3"];


require.register("ripplejs~keypath@0.0.1", Function("exports, module",
"exports.get = function(obj, path) {\n\
  var parts = path.split('.');\n\
  var value = obj;\n\
  while(parts.length) {\n\
    var part = parts.shift();\n\
    value = value[part];\n\
    if(value === undefined) parts.length = 0;\n\
  }\n\
  return value;\n\
};\n\
\n\
exports.set = function(obj, path, value) {\n\
  var parts = path.split('.');\n\
  var target = obj;\n\
  var last = parts.pop();\n\
  while(parts.length) {\n\
    part = parts.shift();\n\
    if(!target[part]) target[part] = {};\n\
    target = target[part];\n\
  }\n\
  target[last] = value;\n\
};\n\
//# sourceURL=components/ripplejs/keypath/0.0.1/index.js"
));

require.modules["ripplejs-keypath"] = require.modules["ripplejs~keypath@0.0.1"];
require.modules["ripplejs~keypath"] = require.modules["ripplejs~keypath@0.0.1"];
require.modules["keypath"] = require.modules["ripplejs~keypath@0.0.1"];


require.register("ripplejs~path-observer@0.2.0", Function("exports, module",
"var emitter = require(\"component~emitter@1.1.2\");\n\
var keypath = require(\"ripplejs~keypath@0.0.1\");\n\
var type = require(\"component~type@1.0.0\");\n\
var raf = require(\"anthonyshort~raf-queue@0.2.0\");\n\
\n\
module.exports = function(obj) {\n\
\n\
  /**\n\
   * Stores each observer created for each\n\
   * path so they're singletons. This allows us to\n\
   * fire change events on all related paths.\n\
   *\n\
   * @type {Object}\n\
   */\n\
  var cache = {};\n\
\n\
  /**\n\
   * Takes a path and announces whenever\n\
   * the value at that path changes.\n\
   *\n\
   * @param {String} path The keypath to the value 'foo.bar.baz'\n\
   */\n\
  function PathObserver(path) {\n\
    if(!(this instanceof PathObserver)) return new PathObserver(path);\n\
    if(cache[path]) return cache[path];\n\
    this.path = path;\n\
    Object.defineProperty(this, 'value', {\n\
      get: function() {\n\
        return keypath.get(obj, this.path);\n\
      },\n\
      set: function(val) {\n\
        keypath.set(obj, this.path, val);\n\
      }\n\
    });\n\
    cache[path] = this;\n\
  }\n\
\n\
  /**\n\
   * Remove all path observers\n\
   */\n\
  PathObserver.dispose = function() {\n\
    for(var path in cache) {\n\
      cache[path].dispose();\n\
    }\n\
    this.off();\n\
  };\n\
\n\
  /**\n\
   * Emit a change event next tick\n\
   */\n\
  PathObserver.change = function() {\n\
    raf.once(this.notify, this);\n\
  };\n\
\n\
  /**\n\
   * Notify observers of a change\n\
   */\n\
  PathObserver.notify = function() {\n\
    this.emit('change');\n\
  };\n\
\n\
  /**\n\
   * Mixin\n\
   */\n\
  emitter(PathObserver);\n\
  emitter(PathObserver.prototype);\n\
\n\
  /**\n\
   * Get the value of the path.\n\
   *\n\
   * @return {Mixed}\n\
   */\n\
  PathObserver.prototype.get = function() {\n\
    return this.value;\n\
  };\n\
\n\
  /**\n\
   * Set the value of the keypath\n\
   *\n\
   * @return {PathObserver}\n\
   */\n\
  PathObserver.prototype.set = function(val) {\n\
    var current = this.value;\n\
\n\
    if (type(val) === 'object') {\n\
      var changes = 0;\n\
      for (var key in val) {\n\
        var path = new PathObserver(this.path + '.' + key);\n\
        path.once('change', function(){\n\
          changes += 1;\n\
        });\n\
        path.set(val[key]);\n\
      }\n\
      if (changes > 0) {\n\
        this.emit('change', this.value, current);\n\
      }\n\
      return;\n\
    }\n\
\n\
    // no change\n\
    if(current === val) return this;\n\
\n\
    this.value = val;\n\
    this.emit('change', this.value, current);\n\
    PathObserver.change();\n\
    return this;\n\
  };\n\
\n\
  /**\n\
   * Bind to changes on this path\n\
   *\n\
   * @param {Function} fn\n\
   *\n\
   * @return {Function}\n\
   */\n\
  PathObserver.prototype.change = function(fn){\n\
    var self = this;\n\
    self.on('change', fn);\n\
    return function(){\n\
      self.off('change', fn);\n\
    };\n\
  };\n\
\n\
  /**\n\
   * Clean up and remove all event bindings\n\
   */\n\
  PathObserver.prototype.dispose = function(){\n\
    this.off('change');\n\
    delete cache[this.path];\n\
  };\n\
\n\
  return PathObserver;\n\
};\n\
//# sourceURL=components/ripplejs/path-observer/0.2.0/index.js"
));

require.modules["ripplejs-path-observer"] = require.modules["ripplejs~path-observer@0.2.0"];
require.modules["ripplejs~path-observer"] = require.modules["ripplejs~path-observer@0.2.0"];
require.modules["path-observer"] = require.modules["ripplejs~path-observer@0.2.0"];


require.register("ripplejs~ripple@0.4.0", Function("exports, module",
"var view = require(\"ripplejs~ripple@0.4.0/lib/view.js\");\n\
\n\
module.exports = function(template) {\n\
  if(template.indexOf('#') === 0 || template.indexOf('.') === 0) {\n\
    template = document.querySelector(template);\n\
  }\n\
  if(typeof template.innerHTML === 'string') {\n\
    template = template.innerHTML;\n\
  }\n\
  return view(template);\n\
};\n\
//# sourceURL=components/ripplejs/ripple/0.4.0/lib/index.js"
));

require.register("ripplejs~ripple@0.4.0/lib/view.js", Function("exports, module",
"var emitter = require(\"component~emitter@1.1.2\");\n\
var each = require(\"component~each@0.2.2\");\n\
var model = require(\"ripplejs~ripple@0.4.0/lib/model.js\");\n\
var Bindings = require(\"ripplejs~ripple@0.4.0/lib/bindings.js\");\n\
var render = require(\"ripplejs~ripple@0.4.0/lib/render.js\");\n\
\n\
/**\n\
 * Each of the events that are called on the view\n\
 * and have helper methods created for them.\n\
 */\n\
\n\
var lifecycleEvents = [\n\
  'construct',\n\
  'created',\n\
  'ready',\n\
  'mounted',\n\
  'unmounted',\n\
  'destroying',\n\
  'destroyed'\n\
];\n\
\n\
/**\n\
 * Get a node using element the element itself\n\
 * or a CSS selector\n\
 *\n\
 * @param {Element|String} node\n\
 *\n\
 * @return {Element}\n\
 */\n\
\n\
function getNode(node) {\n\
  if (typeof node === 'string') {\n\
    node = document.querySelector(node);\n\
    if (!node) throw new Error('DOM node doesn\\'t exist');\n\
  }\n\
  return node;\n\
}\n\
\n\
/**\n\
 * Create a new view from a template string\n\
 *\n\
 * @param {String} template\n\
 *\n\
 * @return {View}\n\
 */\n\
\n\
function createView(template) {\n\
\n\
  /**\n\
   * The view controls the lifecycle of the\n\
   * element that it creates from a template.\n\
   * Each element can only have one view and\n\
   * each view can only have one element.\n\
   */\n\
\n\
  function View(options) {\n\
    options = options || {};\n\
    View.emit('construct', this, [options]);\n\
    this.options = options;\n\
    this.children = [];\n\
    this.owner = options.owner;\n\
    this.template = options.template || template;\n\
    this.root = this;\n\
    if (this.owner) {\n\
      this.owner.children.push(this);\n\
      this.root = this.owner.root;\n\
    }\n\
    this.scope = options.scope;\n\
    this.scopeWatchers = {};\n\
    this.model = new View.Model(View.parse(options));\n\
    this.data = this.model.props;\n\
    View.emit('created', this);\n\
    this.el = this.render();\n\
    View.emit('ready', this);\n\
  }\n\
\n\
  /**\n\
   * Mixins\n\
   */\n\
\n\
  emitter(View);\n\
  emitter(View.prototype);\n\
\n\
  /**\n\
   * Stores all of the directives, views,\n\
   * filters etc. that we might want to share\n\
   * between views.\n\
   *\n\
   * @type {Bindings}\n\
   */\n\
\n\
  View.bindings = new Bindings();\n\
\n\
  /**\n\
   * Stores the state of the view.\n\
   *\n\
   * @type {Function}\n\
   */\n\
\n\
  View.Model = model();\n\
\n\
  /**\n\
   * Add a directive\n\
   *\n\
   * @param {String|Regex} match\n\
   * @param {Function} fn\n\
   *\n\
   * @return {View}\n\
   */\n\
\n\
  View.directive = function(match, fn) {\n\
    this.bindings.directive(match, fn);\n\
    return this;\n\
  };\n\
\n\
  /**\n\
   * Add a component\n\
   *\n\
   * @param {String} match\n\
   * @param {Function} fn\n\
   *\n\
   * @return {View}\n\
   */\n\
\n\
  View.compose = function(name, Child) {\n\
    this.bindings.component(name, Child);\n\
    return this;\n\
  };\n\
\n\
  /**\n\
   * Add interpolation filter\n\
   *\n\
   * @param {String} name\n\
   * @param {Function} fn\n\
   *\n\
   * @return {View}\n\
   */\n\
\n\
  View.filter = function(name, fn) {\n\
    if (typeof name !== 'string') {\n\
      for(var key in name) {\n\
        View.filter(key, name[key]);\n\
      }\n\
      return;\n\
    }\n\
    this.bindings.filter(name, fn);\n\
    return this;\n\
  };\n\
\n\
  /**\n\
   * Use a plugin\n\
   *\n\
   * @return {View}\n\
   */\n\
\n\
  View.use = function(fn, options) {\n\
    fn(View, options);\n\
    return this;\n\
  };\n\
\n\
  /**\n\
   * Create a new view from a template that shares\n\
   * all of the same Bindings\n\
   *\n\
   * @param {String} template\n\
   *\n\
   * @return {View}\n\
   */\n\
\n\
  View.create = function(template) {\n\
    var Child = createView(template);\n\
    Child.bindings = this.bindings;\n\
    return Child;\n\
  };\n\
\n\
  /**\n\
   * Create helper methods for binding to events\n\
   */\n\
\n\
  lifecycleEvents.forEach(function(name) {\n\
    View[name] = function(fn){\n\
      View.on(name, function(view, args){\n\
        fn.apply(view, args);\n\
      });\n\
    };\n\
  });\n\
\n\
  /**\n\
   * Parse the options for the initial data\n\
   */\n\
\n\
  View.parse = function(options) {\n\
    return options.data;\n\
  };\n\
\n\
  /**\n\
   * Set the state off the view. This will trigger\n\
   * refreshes to the UI. If we were previously\n\
   * watching the parent scope for changes to this\n\
   * property, we will remove all of those watchers\n\
   * and then bind them to our model instead.\n\
   *\n\
   * @param {Object} obj\n\
   */\n\
\n\
  View.prototype.set = function(key, value) {\n\
    if ( typeof key !== 'string' ) {\n\
      for(var name in key) this.set(name, key[name]);\n\
      return this;\n\
    }\n\
    if (this.scope && this.scopeWatchers[key]) {\n\
      var self = this;\n\
      this.scopeWatchers[key].forEach(function(callback){\n\
        self.scope.unwatch(key, callback);\n\
        self.model.watch(key, callback);\n\
      });\n\
      delete this.scopeWatchers[key];\n\
    }\n\
    this.model.set(key, value);\n\
    return this;\n\
  };\n\
\n\
  /**\n\
   * Get some data\n\
   *\n\
   * @param {String} key\n\
   */\n\
\n\
  View.prototype.get = function(key) {\n\
    var value = this.model.get(key);\n\
    if (value === undefined && this.scope) {\n\
      return this.scope.get(key);\n\
    }\n\
    return value;\n\
  };\n\
\n\
  /**\n\
   * Get all the properties used in a string\n\
   *\n\
   * @param {String} str\n\
   *\n\
   * @return {Array}\n\
   */\n\
\n\
  View.prototype.props = function(str) {\n\
    return View.bindings.interpolator.props(str);\n\
  };\n\
\n\
  /**\n\
   * Remove the element from the DOM\n\
   */\n\
\n\
  View.prototype.destroy = function() {\n\
    var self = this;\n\
    this.emit('destroying');\n\
    View.emit('destroying', this);\n\
    this.remove();\n\
    this.model.destroy();\n\
    this.off();\n\
    this.children.forEach(function(child){\n\
      child.destroy();\n\
    });\n\
    if (this.owner) {\n\
      var index = this.owner.children.indexOf(this);\n\
      this.owner.children.splice(index, 1);\n\
    }\n\
    each(this.scopeWatchers, function(key, callbacks){\n\
      callbacks.forEach(function(callback){\n\
        self.scope.unwatch(key, callback);\n\
      });\n\
    });\n\
    this.scopeWatchers = null;\n\
    this.scope = null;\n\
    this.el = null;\n\
    this.owner = null;\n\
    this.root = null;\n\
    this.data = null;\n\
    this.emit('destroyed');\n\
    View.emit('destroyed', this);\n\
  };\n\
\n\
  /**\n\
   * Is the view mounted in the DOM\n\
   *\n\
   * @return {Boolean}\n\
   */\n\
\n\
  View.prototype.isMounted = function() {\n\
    return this.el != null && this.el.parentNode != null;\n\
  };\n\
\n\
  /**\n\
   * Render the view to an element. This should\n\
   * only ever render the element once.\n\
   */\n\
\n\
  View.prototype.render = function() {\n\
    return render({\n\
      view: this,\n\
      template: this.template,\n\
      bindings: View.bindings\n\
    });\n\
  };\n\
\n\
  /**\n\
   * Mount the view onto a node\n\
   *\n\
   * @param {Element|String} node An element or CSS selector\n\
   *\n\
   * @return {View}\n\
   */\n\
\n\
  View.prototype.appendTo = function(node) {\n\
    getNode(node).appendChild(this.el);\n\
    this.emit('mounted');\n\
    View.emit('mounted', this);\n\
    return this;\n\
  };\n\
\n\
  /**\n\
   * Replace an element in the DOM with this view\n\
   *\n\
   * @param {Element|String} node An element or CSS selector\n\
   *\n\
   * @return {View}\n\
   */\n\
\n\
  View.prototype.replace = function(node) {\n\
    var target = getNode(node);\n\
    target.parentNode.replaceChild(this.el, target);\n\
    this.emit('mounted');\n\
    View.emit('mounted', this);\n\
    return this;\n\
  };\n\
\n\
  /**\n\
   * Insert the view before a node\n\
   *\n\
   * @param {Element|String} node\n\
   *\n\
   * @return {View}\n\
   */\n\
\n\
  View.prototype.before = function(node) {\n\
    var target = getNode(node);\n\
    target.parentNode.insertBefore(this.el, target);\n\
    this.emit('mounted');\n\
    View.emit('mounted', this);\n\
    return this;\n\
  };\n\
\n\
  /**\n\
   * Insert the view after a node\n\
   *\n\
   * @param {Element|String} node\n\
   *\n\
   * @return {View}\n\
   */\n\
\n\
  View.prototype.after = function(node) {\n\
    var target = getNode(node);\n\
    target.parentNode.insertBefore(this.el, target.nextSibling);\n\
    this.emit('mounted');\n\
    View.emit('mounted', this);\n\
    return this;\n\
  };\n\
\n\
  /**\n\
   * Remove the view from the DOM\n\
   *\n\
   * @return {View}\n\
   */\n\
\n\
  View.prototype.remove = function() {\n\
    if (this.isMounted() === false) return this;\n\
    this.el.parentNode.removeChild(this.el);\n\
    this.emit('unmounted');\n\
    View.emit('unmounted', this);\n\
    return this;\n\
  };\n\
\n\
  /**\n\
   * Interpolate a string\n\
   *\n\
   * @param {String} str\n\
   */\n\
\n\
  View.prototype.interpolate = function(str) {\n\
    var self = this;\n\
    var data = {};\n\
    var props = this.props(str);\n\
    props.forEach(function(prop){\n\
      data[prop] = self.get(prop);\n\
    });\n\
    return View.bindings.interpolator.value(str, {\n\
      context: this.scope || this,\n\
      scope: data\n\
    });\n\
  };\n\
\n\
  /**\n\
   * Watch a property for changes\n\
   *\n\
   * @param {Strign} prop\n\
   * @param {Function} callback\n\
   */\n\
\n\
  View.prototype.watch = function(prop, callback) {\n\
    var self = this;\n\
    if (Array.isArray(prop)) {\n\
      return prop.forEach(function(name){\n\
        self.watch(name, callback);\n\
      });\n\
    }\n\
    var value = this.model.get(prop);\n\
    if (value === undefined && this.scope) {\n\
      this.scope.watch(prop, callback);\n\
      if (!this.scopeWatchers[prop]) {\n\
        this.scopeWatchers[prop] = [];\n\
      }\n\
      this.scopeWatchers[prop].push(callback);\n\
      return;\n\
    }\n\
    return this.model.watch(prop, callback);\n\
  };\n\
\n\
  /**\n\
   * Stop watching a property\n\
   *\n\
   * @param {Strign} prop\n\
   * @param {Function} callback\n\
   */\n\
\n\
  View.prototype.unwatch = function(prop, callback) {\n\
    var self = this;\n\
    if (Array.isArray(prop)) {\n\
      return prop.forEach(function(name){\n\
        self.unwatch(name, callback);\n\
      });\n\
    }\n\
    var value = this.model.get(prop);\n\
    if (value === undefined && this.scope) {\n\
      this.scope.unwatch(prop, callback);\n\
      if (!this.scopeWatchers[prop]) return;\n\
      var index = this.scopeWatchers[prop].indexOf(callback);\n\
      this.scopeWatchers[prop].splice(index, 1);\n\
      return;\n\
    }\n\
    return this.model.unwatch(prop, callback);\n\
  };\n\
\n\
  return View;\n\
}\n\
\n\
\n\
/**\n\
 * Exports\n\
 */\n\
\n\
module.exports = createView;\n\
//# sourceURL=components/ripplejs/ripple/0.4.0/lib/view.js"
));

require.register("ripplejs~ripple@0.4.0/lib/bindings.js", Function("exports, module",
"var Interpolator = require(\"ripplejs~interpolate@0.4.3\");\n\
\n\
/**\n\
 * The compiler will take a set of views, an element and\n\
 * a scope and process each node going down the tree. Whenever\n\
 * it finds a node matching a directive it will process it.\n\
 */\n\
function Bindings() {\n\
  this.components = {};\n\
  this.directives = {};\n\
  this.interpolator = new Interpolator();\n\
}\n\
\n\
/**\n\
 * Add a component binding. This will be rendered as a separate\n\
 * view and have it's own scope.\n\
 *\n\
 * @param {String|Regex} matches String or regex to match an element name\n\
 * @param {Function} View\n\
 * @param {Object} options\n\
 */\n\
Bindings.prototype.component = function(name, fn) {\n\
  if(!fn) {\n\
    return this.components[name.nodeName.toLowerCase()];\n\
  }\n\
  this.components[name.toLowerCase()] = fn;\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Add an attribute binding. Whenever this attribute is matched\n\
 * in the DOM the function will be code with the current view\n\
 * and the element.\n\
 *\n\
 * @param {String|Regex} matches String or regex to match an attribute name\n\
 * @param {Function} process\n\
 * @param {Object} options\n\
 */\n\
Bindings.prototype.directive = function(attr, fn) {\n\
  if(!fn) {\n\
    return this.directives[attr];\n\
  }\n\
  this.directives[attr] = fn;\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Add an interpolation filter\n\
 *\n\
 * @param {String} name\n\
 * @param {Function} fn\n\
 *\n\
 * @return {Bindings}\n\
 */\n\
Bindings.prototype.filter = function(name, fn) {\n\
  if(!fn) {\n\
    return this.interpolator.filters[name];\n\
  }\n\
  this.interpolator.filter(name, fn);\n\
  return this;\n\
};\n\
\n\
module.exports = Bindings;\n\
//# sourceURL=components/ripplejs/ripple/0.4.0/lib/bindings.js"
));

require.register("ripplejs~ripple@0.4.0/lib/model.js", Function("exports, module",
"var observer = require(\"ripplejs~path-observer@0.2.0\");\n\
var emitter = require(\"component~emitter@1.1.2\");\n\
\n\
module.exports = function(){\n\
\n\
  /**\n\
   * Model.\n\
   *\n\
   * Watch an objects properties for changes.\n\
   *\n\
   * Properties must be set using the `set` method for\n\
   * changes to fire events.\n\
   *\n\
   * @param {Object}\n\
   */\n\
  function Model(props){\n\
    if(!(this instanceof Model)) return new Model(props);\n\
    this.props = props || {};\n\
    this.observer = observer(this.props);\n\
    Model.emit('construct', this);\n\
  }\n\
\n\
  /**\n\
   * Mixins\n\
   */\n\
  emitter(Model);\n\
\n\
  /**\n\
   * Use a plugin\n\
   *\n\
   * @return {Model}\n\
   */\n\
  Model.use = function(fn, options){\n\
    fn(this, options);\n\
    return this;\n\
  };\n\
\n\
  /**\n\
   * Add a function to fire whenever a keypath changes.\n\
   *\n\
   * @param {String} key\n\
   * @param {Function} fn Function to call on event\n\
   *\n\
   * @return {Model}\n\
   */\n\
  Model.prototype.watch = function(key, callback) {\n\
    if(arguments.length === 1) {\n\
      callback = key;\n\
      this.observer.on('change', callback);\n\
    }\n\
    else {\n\
      this.observer(key).on('change', callback);\n\
    }\n\
    return this;\n\
  };\n\
\n\
  /**\n\
   * Stop watching a property for changes\n\
   *\n\
   * @param {String} key\n\
   * @param {Function} fn\n\
   *\n\
   * @return {Model}\n\
   */\n\
  Model.prototype.unwatch = function(key, callback) {\n\
    if(arguments.length === 1) {\n\
      callback = key;\n\
      this.observer.off('change', callback);\n\
    }\n\
    else {\n\
      this.observer(key).off('change', callback);\n\
    }\n\
    return this;\n\
  };\n\
\n\
  /**\n\
   * Set a property using a keypath\n\
   *\n\
   * @param {String} key eg. 'foo.bar'\n\
   * @param {Mixed} val\n\
   */\n\
  Model.prototype.set = function(key, val) {\n\
    this.observer(key).set(val);\n\
    return this;\n\
  };\n\
\n\
  /**\n\
   * Get an attribute using a keypath. If an array\n\
   * of keys is passed in an object is returned with\n\
   * those keys\n\
   *\n\
   * @param {String|Array} key\n\
   *\n\
   * @api public\n\
   * @return {Mixed}\n\
   */\n\
  Model.prototype.get = function(keypath) {\n\
    return this.observer(keypath).get();\n\
  };\n\
\n\
  /**\n\
   * Destroy all observers\n\
   *\n\
   * @return {Model}\n\
   */\n\
  Model.prototype.destroy = function(){\n\
    this.observer.dispose();\n\
    return this;\n\
  };\n\
\n\
  return Model;\n\
};\n\
//# sourceURL=components/ripplejs/ripple/0.4.0/lib/model.js"
));

require.register("ripplejs~ripple@0.4.0/lib/render.js", Function("exports, module",
"var walk = require(\"anthonyshort~dom-walk@0.1.0\");\n\
var each = require(\"component~each@0.2.2\");\n\
var attrs = require(\"anthonyshort~attributes@0.0.1\");\n\
var domify = require(\"component~domify@1.2.2\");\n\
var TextBinding = require(\"ripplejs~ripple@0.4.0/lib/text-binding.js\");\n\
var AttrBinding = require(\"ripplejs~ripple@0.4.0/lib/attr-binding.js\");\n\
var ChildBinding = require(\"ripplejs~ripple@0.4.0/lib/child-binding.js\");\n\
var Directive = require(\"ripplejs~ripple@0.4.0/lib/directive.js\");\n\
\n\
module.exports = function(options) {\n\
  var view = options.view;\n\
  var bindings = options.bindings;\n\
  var el = domify(options.template);\n\
  var fragment = document.createDocumentFragment();\n\
  fragment.appendChild(el);\n\
\n\
  var activeBindings = [];\n\
\n\
  // Walk down the newly created view element\n\
  // and bind everything to the model\n\
  walk(el, function(node, next){\n\
    if(node.nodeType === 3) {\n\
      activeBindings.push(new TextBinding(view, node));\n\
    }\n\
    else if(node.nodeType === 1) {\n\
      var View = bindings.component(node);\n\
      if(View) {\n\
        activeBindings.push(new ChildBinding(view, node, View));\n\
        return next();\n\
      }\n\
      each(attrs(node), function(attr){\n\
        var binding = bindings.directive(attr);\n\
        if(binding) {\n\
          activeBindings.push(new Directive(view, node, attr, binding));\n\
        }\n\
        else {\n\
          activeBindings.push(new AttrBinding(view, node, attr));\n\
        }\n\
      });\n\
    }\n\
    next();\n\
  });\n\
\n\
  view.once('destroying', function(){\n\
    while(activeBindings.length) {\n\
      activeBindings.shift().unbind();\n\
    }\n\
  });\n\
\n\
  view.activeBindings = activeBindings;\n\
\n\
  return fragment.firstChild;\n\
};\n\
\n\
//# sourceURL=components/ripplejs/ripple/0.4.0/lib/render.js"
));

require.register("ripplejs~ripple@0.4.0/lib/directive.js", Function("exports, module",
"var raf = require(\"anthonyshort~raf-queue@0.2.0\");\n\
\n\
/**\n\
 * Creates a new directive using a binding object.\n\
 *\n\
 * @param {View} view\n\
 * @param {Element} node\n\
 * @param {String} attr\n\
 * @param {Object} binding\n\
 */\n\
function Directive(view, node, attr, binding) {\n\
  this.queue = this.queue.bind(this);\n\
  this.view = view;\n\
  if(typeof binding === 'function') {\n\
    this.binding = { update: binding };\n\
  }\n\
  else {\n\
    this.binding = binding;\n\
  }\n\
  this.text = node.getAttribute(attr);\n\
  this.node = node;\n\
  this.attr = attr;\n\
  this.props = view.props(this.text);\n\
  this.bind();\n\
}\n\
\n\
/**\n\
 * Start watching the view for changes\n\
 */\n\
Directive.prototype.bind = function(){\n\
  var view = this.view;\n\
  var queue = this.queue;\n\
\n\
  if(this.binding.bind) {\n\
    this.binding.bind.call(this, this.node, this.view);\n\
  }\n\
\n\
  this.props.forEach(function(prop){\n\
    view.watch(prop, queue);\n\
  });\n\
\n\
  this.update();\n\
};\n\
\n\
/**\n\
 * Stop watching the view for changes\n\
 */\n\
Directive.prototype.unbind = function(){\n\
  var view = this.view;\n\
  var queue = this.queue;\n\
\n\
  this.props.forEach(function(prop){\n\
    view.unwatch(prop, queue);\n\
  });\n\
\n\
  if(this.job) {\n\
    raf.cancel(this.job);\n\
  }\n\
\n\
  if(this.binding.unbind) {\n\
    this.binding.unbind.call(this, this.node, this.view);\n\
  }\n\
};\n\
\n\
/**\n\
 * Update the attribute.\n\
 */\n\
Directive.prototype.update = function(){\n\
  var value = this.view.interpolate(this.text);\n\
  this.binding.update.call(this, value, this.node, this.view);\n\
};\n\
\n\
/**\n\
 * Queue an update\n\
 */\n\
Directive.prototype.queue = function(){\n\
  if(this.job) {\n\
    raf.cancel(this.job);\n\
  }\n\
  this.job = raf(this.update, this);\n\
};\n\
\n\
module.exports = Directive;\n\
//# sourceURL=components/ripplejs/ripple/0.4.0/lib/directive.js"
));

require.register("ripplejs~ripple@0.4.0/lib/text-binding.js", Function("exports, module",
"var raf = require(\"anthonyshort~raf-queue@0.2.0\");\n\
\n\
function TextBinding(view, node) {\n\
  this.update = this.update.bind(this);\n\
  this.view = view;\n\
  this.text = node.data;\n\
  this.node = node;\n\
  this.props = view.props(this.text);\n\
  this.render = this.render.bind(this);\n\
  if(this.props.length) {\n\
    this.bind();\n\
  }\n\
}\n\
\n\
TextBinding.prototype.bind = function(){\n\
  var view = this.view;\n\
  var update = this.update;\n\
\n\
  this.props.forEach(function(prop){\n\
    view.watch(prop, update);\n\
  });\n\
\n\
  this.render();\n\
};\n\
\n\
TextBinding.prototype.unbind = function(){\n\
  var view = this.view;\n\
  var update = this.update;\n\
\n\
  this.props.forEach(function(prop){\n\
    view.unwatch(prop, update);\n\
  });\n\
\n\
  if(this.job) {\n\
    raf.cancel(this.job);\n\
  }\n\
};\n\
\n\
TextBinding.prototype.render = function(){\n\
  var node = this.node;\n\
  var val = this.view.interpolate(this.text);\n\
\n\
  if(val == null) {\n\
    this.node.data = '';\n\
  }\n\
  else if(val instanceof Element) {\n\
    node.parentNode.replaceChild(val, node);\n\
    this.node = val;\n\
  }\n\
  else {\n\
    var newNode = document.createTextNode(val);\n\
    node.parentNode.replaceChild(newNode, node);\n\
    this.node = newNode;\n\
  }\n\
};\n\
\n\
TextBinding.prototype.update = function(){\n\
  if(this.job) {\n\
    raf.cancel(this.job);\n\
  }\n\
  this.job = raf(this.render, this);\n\
};\n\
\n\
module.exports = TextBinding;\n\
\n\
//# sourceURL=components/ripplejs/ripple/0.4.0/lib/text-binding.js"
));

require.register("ripplejs~ripple@0.4.0/lib/attr-binding.js", Function("exports, module",
"var isBoolean = require(\"anthonyshort~is-boolean-attribute@0.0.1\");\n\
var raf = require(\"anthonyshort~raf-queue@0.2.0\");\n\
\n\
/**\n\
 * Creates a new attribute text binding for a view.\n\
 * If the view attribute contains interpolation, the\n\
 * attribute will be automatically updated whenever the\n\
 * result of the expression changes.\n\
 *\n\
 * Updating will be called once per tick. So if there\n\
 * are multiple changes to the view in a single tick,\n\
 * this will only touch the DOM once.\n\
 *\n\
 * @param {View} view\n\
 * @param {Element} node\n\
 * @param {String} attr\n\
 */\n\
function AttrBinding(view, node, attr) {\n\
  this.update = this.update.bind(this);\n\
  this.view = view;\n\
  this.text = node.getAttribute(attr);\n\
  this.node = node;\n\
  this.attr = attr;\n\
  this.props = view.props(this.text);\n\
  this.bind();\n\
}\n\
\n\
/**\n\
 * Start watching the view for changes\n\
 */\n\
AttrBinding.prototype.bind = function(){\n\
  if(!this.props.length) return;\n\
  var view = this.view;\n\
  var update = this.update;\n\
\n\
  this.props.forEach(function(prop){\n\
    view.watch(prop, update);\n\
  });\n\
\n\
  this.render();\n\
};\n\
\n\
/**\n\
 * Stop watching the view for changes\n\
 */\n\
AttrBinding.prototype.unbind = function(){\n\
  if(!this.props.length) return;\n\
  var view = this.view;\n\
  var update = this.update;\n\
\n\
  this.props.forEach(function(prop){\n\
    view.unwatch(prop, update);\n\
  });\n\
\n\
  if(this.job) {\n\
    raf.cancel(this.job);\n\
  }\n\
};\n\
\n\
/**\n\
 * Update the attribute\n\
 *\n\
 * @return {[type]}\n\
 */\n\
AttrBinding.prototype.render = function(){\n\
  var val = this.view.interpolate(this.text);\n\
  if(val == null) val = '';\n\
  if(isBoolean(this.attr) && !val) {\n\
    this.node.removeAttribute(this.attr);\n\
  }\n\
  else {\n\
    this.node.setAttribute(this.attr, val);\n\
  }\n\
};\n\
\n\
/**\n\
 * Update the attribute.\n\
 */\n\
AttrBinding.prototype.update = function(){\n\
  if(this.job) {\n\
    raf.cancel(this.job);\n\
  }\n\
  this.job = raf(this.render, this);\n\
};\n\
\n\
module.exports = AttrBinding;\n\
//# sourceURL=components/ripplejs/ripple/0.4.0/lib/attr-binding.js"
));

require.register("ripplejs~ripple@0.4.0/lib/child-binding.js", Function("exports, module",
"var attrs = require(\"anthonyshort~attributes@0.0.1\");\n\
var each = require(\"component~each@0.2.2\");\n\
var unique = require(\"yields~uniq@master\");\n\
var raf = require(\"anthonyshort~raf-queue@0.2.0\");\n\
\n\
/**\n\
 * Creates a new sub-view at a node and binds\n\
 * it to the parent\n\
 *\n\
 * @param {View} view\n\
 * @param {Element} node\n\
 * @param {Function} View\n\
 */\n\
function ChildBinding(view, node, View) {\n\
  this.update = this.update.bind(this);\n\
  this.view = view;\n\
  this.attrs = attrs(node);\n\
  this.props = this.getProps();\n\
  var data = this.values();\n\
  data.yield = node.innerHTML;\n\
  this.child = new View({\n\
    owner: view,\n\
    data: data\n\
  });\n\
  this.child.replace(node);\n\
  this.child.on('destroyed', this.unbind.bind(this));\n\
  this.node = this.child.el;\n\
  this.bind();\n\
}\n\
\n\
/**\n\
 * Get all of the properties used in all of the attributes\n\
 *\n\
 * @return {Array}\n\
 */\n\
ChildBinding.prototype.getProps = function(){\n\
  var ret = [];\n\
  var view = this.view;\n\
  each(this.attrs, function(name, value){\n\
    ret = ret.concat(view.props(value));\n\
  });\n\
  return unique(ret);\n\
};\n\
\n\
/**\n\
 * Bind to changes on the view. Whenever a property\n\
 * changes we'll update the child with the new values.\n\
 */\n\
ChildBinding.prototype.bind = function(){\n\
  var self = this;\n\
  var view = this.view;\n\
\n\
  this.props.forEach(function(prop){\n\
    view.watch(prop, self.update);\n\
  });\n\
\n\
  this.send();\n\
};\n\
\n\
/**\n\
 * Get all the data from the node\n\
 *\n\
 * @return {Object}\n\
 */\n\
ChildBinding.prototype.values = function(){\n\
  var view = this.view;\n\
  var ret = {};\n\
  each(this.attrs, function(name, value){\n\
    ret[name] = view.interpolate(value);\n\
  });\n\
  return ret;\n\
};\n\
\n\
/**\n\
 * Send the data to the child\n\
 */\n\
ChildBinding.prototype.send = function(){\n\
  this.child.set(this.values());\n\
};\n\
\n\
/**\n\
 * Unbind this view from the parent\n\
 */\n\
ChildBinding.prototype.unbind = function(){\n\
  var view = this.view;\n\
  var update = this.update;\n\
\n\
  this.props.forEach(function(prop){\n\
    view.unwatch(prop, update);\n\
  });\n\
\n\
  if(this.job) {\n\
    raf.cancel(this.job);\n\
  }\n\
};\n\
\n\
/**\n\
 * Update the child view will updated values from\n\
 * the parent. This will batch changes together\n\
 * and only fire once per tick.\n\
 */\n\
ChildBinding.prototype.update = function(){\n\
  if(this.job) {\n\
    raf.cancel(this.job);\n\
  }\n\
  this.job = raf(this.send, this);\n\
};\n\
\n\
module.exports = ChildBinding;\n\
\n\
//# sourceURL=components/ripplejs/ripple/0.4.0/lib/child-binding.js"
));

require.modules["ripplejs-ripple"] = require.modules["ripplejs~ripple@0.4.0"];
require.modules["ripplejs~ripple"] = require.modules["ripplejs~ripple@0.4.0"];
require.modules["ripple"] = require.modules["ripplejs~ripple@0.4.0"];


require.register("./lib/form", Function("exports, module",
"var domify = require(\"component~domify@1.2.2\");\n\
var template = require(\"./lib/form/form.html\");\n\
var emitter = require(\"component~emitter@1.1.2\");\n\
\n\
function Form() {\n\
  this.el = domify(template);\n\
  this.textarea = this.el.querySelector('textarea');\n\
  this.input = this.el.querySelector('input');\n\
  this.el.addEventListener('submit', this.submit.bind(this));\n\
  this.textarea.addEventListener('keydown', this.onEnter.bind(this));\n\
}\n\
\n\
emitter(Form.prototype);\n\
\n\
Form.prototype.appendTo = function(target) {\n\
  target.appendChild(this.el);\n\
  return this;\n\
};\n\
\n\
Form.prototype.onEnter = function(event) {\n\
  if(event.keyCode !== 13) return;\n\
  this.submit(event);\n\
};\n\
\n\
Form.prototype.submit = function(event) {\n\
  event.preventDefault();\n\
  var val = this.textarea.value;\n\
  if(!val) return;\n\
  this.emit('submit', {\n\
    name: this.input.value,\n\
    message: this.textarea.value\n\
  });\n\
};\n\
\n\
Form.prototype.reset = function() {\n\
  this.textarea.value = \"\";\n\
};\n\
\n\
module.exports = Form;\n\
//# sourceURL=lib/form/index.js"
));

require.define("./lib/form/form.html", "<form class=\"Form\">\n  <div class=\"Form-control\">\n    <input type=\"text\" class=\"Form-name\" name=\"name\" placeholder=\"Enter your name\" />\n  </div>\n  <div class=\"Form-control\">\n    <textarea name=\"content\" class=\"Form-message\" placeholder=\"Message here...\"></textarea>\n  </div>\n</form>");

require.modules["form"] = require.modules["./lib/form"];


require.register("./lib/message", Function("exports, module",
"var template = require(\"./lib/message/index.html\");\n\
var ripple = require(\"ripplejs~ripple@0.4.0\");\n\
var Message = ripple(template);\n\
\n\
module.exports = function(data) {\n\
  return new Message({\n\
    data: {\n\
      name: data.name,\n\
      message: data.message\n\
    }\n\
  });\n\
};\n\
//# sourceURL=lib/message/index.js"
));

require.define("./lib/message/index.html", "<div class=\"Message\">\n  <span class=\"Message-author\">{{name}}: </span>\n  <span class=\"Message-content\">{{message}}</span>\n</div>");

require.modules["message"] = require.modules["./lib/message"];


require.register("./lib/log", Function("exports, module",
"var domify = require(\"component~domify@1.2.2\");\n\
var Message = require(\"./lib/message\");\n\
\n\
function Log() {\n\
  this.el = domify('<div class=\"Log\"></div>');\n\
}\n\
\n\
Log.prototype.add = function(data) {\n\
  var message = new Message({\n\
    name: data.name,\n\
    message: data.message\n\
  });\n\
  message.appendTo(this.el);\n\
  this.el.scrollTop = this.el.scrollHeight;\n\
};\n\
\n\
module.exports = Log;\n\
//# sourceURL=lib/log/index.js"
));

require.modules["log"] = require.modules["./lib/log"];


require.register("page", Function("exports, module",
"var Form = require(\"./lib/form\");\n\
var Log = require(\"./lib/log\");\n\
var Message = require(\"./lib/message\");\n\
var form = new Form();\n\
var log = new Log();\n\
var socket = new WebSocket('ws://anthonyshort.local:3000');\n\
\n\
socket.onopen = function(){\n\
  console.log('connected');\n\
};\n\
\n\
socket.onmessage = function(event) {\n\
  log.add(JSON.parse(event.data));\n\
};\n\
\n\
document.body.appendChild(log.el);\n\
document.body.appendChild(form.el);\n\
\n\
form.on('submit', function(data){\n\
  socket.send(JSON.stringify(data));\n\
  form.reset();\n\
});\n\
//# sourceURL=index.js"
));

require.modules["page"] = require.modules["page"];


require("page")
