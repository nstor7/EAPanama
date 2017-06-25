(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var document = require('global/document')
var hyperx = require('hyperx')
var onload = require('on-load')

var SVGNS = 'http://www.w3.org/2000/svg'
var XLINKNS = 'http://www.w3.org/1999/xlink'

var BOOL_PROPS = {
  autofocus: 1,
  checked: 1,
  defaultchecked: 1,
  disabled: 1,
  formnovalidate: 1,
  indeterminate: 1,
  readonly: 1,
  required: 1,
  selected: 1,
  willvalidate: 1
}
var COMMENT_TAG = '!--'
var SVG_TAGS = [
  'svg',
  'altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor',
  'animateMotion', 'animateTransform', 'circle', 'clipPath', 'color-profile',
  'cursor', 'defs', 'desc', 'ellipse', 'feBlend', 'feColorMatrix',
  'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting',
  'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB',
  'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode',
  'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting',
  'feSpotLight', 'feTile', 'feTurbulence', 'filter', 'font', 'font-face',
  'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri',
  'foreignObject', 'g', 'glyph', 'glyphRef', 'hkern', 'image', 'line',
  'linearGradient', 'marker', 'mask', 'metadata', 'missing-glyph', 'mpath',
  'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect',
  'set', 'stop', 'switch', 'symbol', 'text', 'textPath', 'title', 'tref',
  'tspan', 'use', 'view', 'vkern'
]

function belCreateElement (tag, props, children) {
  var el

  // If an svg tag, it needs a namespace
  if (SVG_TAGS.indexOf(tag) !== -1) {
    props.namespace = SVGNS
  }

  // If we are using a namespace
  var ns = false
  if (props.namespace) {
    ns = props.namespace
    delete props.namespace
  }

  // Create the element
  if (ns) {
    el = document.createElementNS(ns, tag)
  } else if (tag === COMMENT_TAG) {
    return document.createComment(props.comment)
  } else {
    el = document.createElement(tag)
  }

  // If adding onload events
  if (props.onload || props.onunload) {
    var load = props.onload || function () {}
    var unload = props.onunload || function () {}
    onload(el, function belOnload () {
      load(el)
    }, function belOnunload () {
      unload(el)
    },
    // We have to use non-standard `caller` to find who invokes `belCreateElement`
    belCreateElement.caller.caller.caller)
    delete props.onload
    delete props.onunload
  }

  // Create the properties
  for (var p in props) {
    if (props.hasOwnProperty(p)) {
      var key = p.toLowerCase()
      var val = props[p]
      // Normalize className
      if (key === 'classname') {
        key = 'class'
        p = 'class'
      }
      // The for attribute gets transformed to htmlFor, but we just set as for
      if (p === 'htmlFor') {
        p = 'for'
      }
      // If a property is boolean, set itself to the key
      if (BOOL_PROPS[key]) {
        if (val === 'true') val = key
        else if (val === 'false') continue
      }
      // If a property prefers being set directly vs setAttribute
      if (key.slice(0, 2) === 'on') {
        el[p] = val
      } else {
        if (ns) {
          if (p === 'xlink:href') {
            el.setAttributeNS(XLINKNS, p, val)
          } else if (/^xmlns($|:)/i.test(p)) {
            // skip xmlns definitions
          } else {
            el.setAttributeNS(null, p, val)
          }
        } else {
          el.setAttribute(p, val)
        }
      }
    }
  }

  function appendChild (childs) {
    if (!Array.isArray(childs)) return
    for (var i = 0; i < childs.length; i++) {
      var node = childs[i]
      if (Array.isArray(node)) {
        appendChild(node)
        continue
      }

      if (typeof node === 'number' ||
        typeof node === 'boolean' ||
        typeof node === 'function' ||
        node instanceof Date ||
        node instanceof RegExp) {
        node = node.toString()
      }

      if (typeof node === 'string') {
        if (el.lastChild && el.lastChild.nodeName === '#text') {
          el.lastChild.nodeValue += node
          continue
        }
        node = document.createTextNode(node)
      }

      if (node && node.nodeType) {
        el.appendChild(node)
      }
    }
  }
  appendChild(children)

  return el
}

module.exports = hyperx(belCreateElement, {comments: true})
module.exports.default = module.exports
module.exports.createElement = belCreateElement

},{"global/document":5,"hyperx":8,"on-load":11}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],4:[function(require,module,exports){
/* global HTMLElement */

'use strict'

module.exports = function emptyElement (element) {
  if (!(element instanceof HTMLElement)) {
    throw new TypeError('Expected an element')
  }

  var node
  while ((node = element.lastChild)) element.removeChild(node)
  return element
}

},{}],5:[function(require,module,exports){
(function (global){
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = require('min-document');

var doccy;

if (typeof document !== 'undefined') {
    doccy = document;
} else {
    doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }
}

module.exports = doccy;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"min-document":2}],6:[function(require,module,exports){
(function (global){
var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof global !== "undefined") {
    win = global;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],7:[function(require,module,exports){
module.exports = attributeToProperty

var transform = {
  'class': 'className',
  'for': 'htmlFor',
  'http-equiv': 'httpEquiv'
}

function attributeToProperty (h) {
  return function (tagName, attrs, children) {
    for (var attr in attrs) {
      if (attr in transform) {
        attrs[transform[attr]] = attrs[attr]
        delete attrs[attr]
      }
    }
    return h(tagName, attrs, children)
  }
}

},{}],8:[function(require,module,exports){
var attrToProp = require('hyperscript-attribute-to-property')

var VAR = 0, TEXT = 1, OPEN = 2, CLOSE = 3, ATTR = 4
var ATTR_KEY = 5, ATTR_KEY_W = 6
var ATTR_VALUE_W = 7, ATTR_VALUE = 8
var ATTR_VALUE_SQ = 9, ATTR_VALUE_DQ = 10
var ATTR_EQ = 11, ATTR_BREAK = 12
var COMMENT = 13

module.exports = function (h, opts) {
  if (!opts) opts = {}
  var concat = opts.concat || function (a, b) {
    return String(a) + String(b)
  }
  if (opts.attrToProp !== false) {
    h = attrToProp(h)
  }

  return function (strings) {
    var state = TEXT, reg = ''
    var arglen = arguments.length
    var parts = []

    for (var i = 0; i < strings.length; i++) {
      if (i < arglen - 1) {
        var arg = arguments[i+1]
        var p = parse(strings[i])
        var xstate = state
        if (xstate === ATTR_VALUE_DQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_SQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_W) xstate = ATTR_VALUE
        if (xstate === ATTR) xstate = ATTR_KEY
        p.push([ VAR, xstate, arg ])
        parts.push.apply(parts, p)
      } else parts.push.apply(parts, parse(strings[i]))
    }

    var tree = [null,{},[]]
    var stack = [[tree,-1]]
    for (var i = 0; i < parts.length; i++) {
      var cur = stack[stack.length-1][0]
      var p = parts[i], s = p[0]
      if (s === OPEN && /^\//.test(p[1])) {
        var ix = stack[stack.length-1][1]
        if (stack.length > 1) {
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === OPEN) {
        var c = [p[1],{},[]]
        cur[2].push(c)
        stack.push([c,cur[2].length-1])
      } else if (s === ATTR_KEY || (s === VAR && p[1] === ATTR_KEY)) {
        var key = ''
        var copyKey
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_KEY) {
            key = concat(key, parts[i][1])
          } else if (parts[i][0] === VAR && parts[i][1] === ATTR_KEY) {
            if (typeof parts[i][2] === 'object' && !key) {
              for (copyKey in parts[i][2]) {
                if (parts[i][2].hasOwnProperty(copyKey) && !cur[1][copyKey]) {
                  cur[1][copyKey] = parts[i][2][copyKey]
                }
              }
            } else {
              key = concat(key, parts[i][2])
            }
          } else break
        }
        if (parts[i][0] === ATTR_EQ) i++
        var j = i
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_VALUE || parts[i][0] === ATTR_KEY) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][1])
            else cur[1][key] = concat(cur[1][key], parts[i][1])
          } else if (parts[i][0] === VAR
          && (parts[i][1] === ATTR_VALUE || parts[i][1] === ATTR_KEY)) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][2])
            else cur[1][key] = concat(cur[1][key], parts[i][2])
          } else {
            if (key.length && !cur[1][key] && i === j
            && (parts[i][0] === CLOSE || parts[i][0] === ATTR_BREAK)) {
              // https://html.spec.whatwg.org/multipage/infrastructure.html#boolean-attributes
              // empty string is falsy, not well behaved value in browser
              cur[1][key] = key.toLowerCase()
            }
            break
          }
        }
      } else if (s === ATTR_KEY) {
        cur[1][p[1]] = true
      } else if (s === VAR && p[1] === ATTR_KEY) {
        cur[1][p[2]] = true
      } else if (s === CLOSE) {
        if (selfClosing(cur[0]) && stack.length) {
          var ix = stack[stack.length-1][1]
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === VAR && p[1] === TEXT) {
        if (p[2] === undefined || p[2] === null) p[2] = ''
        else if (!p[2]) p[2] = concat('', p[2])
        if (Array.isArray(p[2][0])) {
          cur[2].push.apply(cur[2], p[2])
        } else {
          cur[2].push(p[2])
        }
      } else if (s === TEXT) {
        cur[2].push(p[1])
      } else if (s === ATTR_EQ || s === ATTR_BREAK) {
        // no-op
      } else {
        throw new Error('unhandled: ' + s)
      }
    }

    if (tree[2].length > 1 && /^\s*$/.test(tree[2][0])) {
      tree[2].shift()
    }

    if (tree[2].length > 2
    || (tree[2].length === 2 && /\S/.test(tree[2][1]))) {
      throw new Error(
        'multiple root elements must be wrapped in an enclosing tag'
      )
    }
    if (Array.isArray(tree[2][0]) && typeof tree[2][0][0] === 'string'
    && Array.isArray(tree[2][0][2])) {
      tree[2][0] = h(tree[2][0][0], tree[2][0][1], tree[2][0][2])
    }
    return tree[2][0]

    function parse (str) {
      var res = []
      if (state === ATTR_VALUE_W) state = ATTR
      for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i)
        if (state === TEXT && c === '<') {
          if (reg.length) res.push([TEXT, reg])
          reg = ''
          state = OPEN
        } else if (c === '>' && !quot(state) && state !== COMMENT) {
          if (state === OPEN) {
            res.push([OPEN,reg])
          } else if (state === ATTR_KEY) {
            res.push([ATTR_KEY,reg])
          } else if (state === ATTR_VALUE && reg.length) {
            res.push([ATTR_VALUE,reg])
          }
          res.push([CLOSE])
          reg = ''
          state = TEXT
        } else if (state === COMMENT && /-$/.test(reg) && c === '-') {
          if (opts.comments) {
            res.push([ATTR_VALUE,reg.substr(0, reg.length - 1)],[CLOSE])
          }
          reg = ''
          state = TEXT
        } else if (state === OPEN && /^!--$/.test(reg)) {
          if (opts.comments) {
            res.push([OPEN, reg],[ATTR_KEY,'comment'],[ATTR_EQ])
          }
          reg = c
          state = COMMENT
        } else if (state === TEXT || state === COMMENT) {
          reg += c
        } else if (state === OPEN && /\s/.test(c)) {
          res.push([OPEN, reg])
          reg = ''
          state = ATTR
        } else if (state === OPEN) {
          reg += c
        } else if (state === ATTR && /[^\s"'=/]/.test(c)) {
          state = ATTR_KEY
          reg = c
        } else if (state === ATTR && /\s/.test(c)) {
          if (reg.length) res.push([ATTR_KEY,reg])
          res.push([ATTR_BREAK])
        } else if (state === ATTR_KEY && /\s/.test(c)) {
          res.push([ATTR_KEY,reg])
          reg = ''
          state = ATTR_KEY_W
        } else if (state === ATTR_KEY && c === '=') {
          res.push([ATTR_KEY,reg],[ATTR_EQ])
          reg = ''
          state = ATTR_VALUE_W
        } else if (state === ATTR_KEY) {
          reg += c
        } else if ((state === ATTR_KEY_W || state === ATTR) && c === '=') {
          res.push([ATTR_EQ])
          state = ATTR_VALUE_W
        } else if ((state === ATTR_KEY_W || state === ATTR) && !/\s/.test(c)) {
          res.push([ATTR_BREAK])
          if (/[\w-]/.test(c)) {
            reg += c
            state = ATTR_KEY
          } else state = ATTR
        } else if (state === ATTR_VALUE_W && c === '"') {
          state = ATTR_VALUE_DQ
        } else if (state === ATTR_VALUE_W && c === "'") {
          state = ATTR_VALUE_SQ
        } else if (state === ATTR_VALUE_DQ && c === '"') {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_SQ && c === "'") {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_W && !/\s/.test(c)) {
          state = ATTR_VALUE
          i--
        } else if (state === ATTR_VALUE && /\s/.test(c)) {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE || state === ATTR_VALUE_SQ
        || state === ATTR_VALUE_DQ) {
          reg += c
        }
      }
      if (state === TEXT && reg.length) {
        res.push([TEXT,reg])
        reg = ''
      } else if (state === ATTR_VALUE && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_DQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_SQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_KEY) {
        res.push([ATTR_KEY,reg])
        reg = ''
      }
      return res
    }
  }

  function strfn (x) {
    if (typeof x === 'function') return x
    else if (typeof x === 'string') return x
    else if (x && typeof x === 'object') return x
    else return concat('', x)
  }
}

function quot (state) {
  return state === ATTR_VALUE_SQ || state === ATTR_VALUE_DQ
}

var hasOwn = Object.prototype.hasOwnProperty
function has (obj, key) { return hasOwn.call(obj, key) }

var closeRE = RegExp('^(' + [
  'area', 'base', 'basefont', 'bgsound', 'br', 'col', 'command', 'embed',
  'frame', 'hr', 'img', 'input', 'isindex', 'keygen', 'link', 'meta', 'param',
  'source', 'track', 'wbr', '!--',
  // SVG TAGS
  'animate', 'animateTransform', 'circle', 'cursor', 'desc', 'ellipse',
  'feBlend', 'feColorMatrix', 'feComposite',
  'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap',
  'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR',
  'feGaussianBlur', 'feImage', 'feMergeNode', 'feMorphology',
  'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile',
  'feTurbulence', 'font-face-format', 'font-face-name', 'font-face-uri',
  'glyph', 'glyphRef', 'hkern', 'image', 'line', 'missing-glyph', 'mpath',
  'path', 'polygon', 'polyline', 'rect', 'set', 'stop', 'tref', 'use', 'view',
  'vkern'
].join('|') + ')(?:[\.#][a-zA-Z0-9\u007F-\uFFFF_:-]+)*$')
function selfClosing (tag) { return closeRE.test(tag) }

},{"hyperscript-attribute-to-property":7}],9:[function(require,module,exports){
module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

},{}],10:[function(require,module,exports){
'use strict';

var range; // Create a range object for efficently rendering strings to elements.
var NS_XHTML = 'http://www.w3.org/1999/xhtml';

var doc = typeof document === 'undefined' ? undefined : document;

var testEl = doc ?
    doc.body || doc.createElement('div') :
    {};

// Fixes <https://github.com/patrick-steele-idem/morphdom/issues/32>
// (IE7+ support) <=IE7 does not support el.hasAttribute(name)
var actualHasAttributeNS;

if (testEl.hasAttributeNS) {
    actualHasAttributeNS = function(el, namespaceURI, name) {
        return el.hasAttributeNS(namespaceURI, name);
    };
} else if (testEl.hasAttribute) {
    actualHasAttributeNS = function(el, namespaceURI, name) {
        return el.hasAttribute(name);
    };
} else {
    actualHasAttributeNS = function(el, namespaceURI, name) {
        return el.getAttributeNode(namespaceURI, name) != null;
    };
}

var hasAttributeNS = actualHasAttributeNS;


function toElement(str) {
    if (!range && doc.createRange) {
        range = doc.createRange();
        range.selectNode(doc.body);
    }

    var fragment;
    if (range && range.createContextualFragment) {
        fragment = range.createContextualFragment(str);
    } else {
        fragment = doc.createElement('body');
        fragment.innerHTML = str;
    }
    return fragment.childNodes[0];
}

/**
 * Returns true if two node's names are the same.
 *
 * NOTE: We don't bother checking `namespaceURI` because you will never find two HTML elements with the same
 *       nodeName and different namespace URIs.
 *
 * @param {Element} a
 * @param {Element} b The target element
 * @return {boolean}
 */
function compareNodeNames(fromEl, toEl) {
    var fromNodeName = fromEl.nodeName;
    var toNodeName = toEl.nodeName;

    if (fromNodeName === toNodeName) {
        return true;
    }

    if (toEl.actualize &&
        fromNodeName.charCodeAt(0) < 91 && /* from tag name is upper case */
        toNodeName.charCodeAt(0) > 90 /* target tag name is lower case */) {
        // If the target element is a virtual DOM node then we may need to normalize the tag name
        // before comparing. Normal HTML elements that are in the "http://www.w3.org/1999/xhtml"
        // are converted to upper case
        return fromNodeName === toNodeName.toUpperCase();
    } else {
        return false;
    }
}

/**
 * Create an element, optionally with a known namespace URI.
 *
 * @param {string} name the element name, e.g. 'div' or 'svg'
 * @param {string} [namespaceURI] the element's namespace URI, i.e. the value of
 * its `xmlns` attribute or its inferred namespace.
 *
 * @return {Element}
 */
function createElementNS(name, namespaceURI) {
    return !namespaceURI || namespaceURI === NS_XHTML ?
        doc.createElement(name) :
        doc.createElementNS(namespaceURI, name);
}

/**
 * Copies the children of one DOM element to another DOM element
 */
function moveChildren(fromEl, toEl) {
    var curChild = fromEl.firstChild;
    while (curChild) {
        var nextChild = curChild.nextSibling;
        toEl.appendChild(curChild);
        curChild = nextChild;
    }
    return toEl;
}

function morphAttrs(fromNode, toNode) {
    var attrs = toNode.attributes;
    var i;
    var attr;
    var attrName;
    var attrNamespaceURI;
    var attrValue;
    var fromValue;

    for (i = attrs.length - 1; i >= 0; --i) {
        attr = attrs[i];
        attrName = attr.name;
        attrNamespaceURI = attr.namespaceURI;
        attrValue = attr.value;

        if (attrNamespaceURI) {
            attrName = attr.localName || attrName;
            fromValue = fromNode.getAttributeNS(attrNamespaceURI, attrName);

            if (fromValue !== attrValue) {
                fromNode.setAttributeNS(attrNamespaceURI, attrName, attrValue);
            }
        } else {
            fromValue = fromNode.getAttribute(attrName);

            if (fromValue !== attrValue) {
                fromNode.setAttribute(attrName, attrValue);
            }
        }
    }

    // Remove any extra attributes found on the original DOM element that
    // weren't found on the target element.
    attrs = fromNode.attributes;

    for (i = attrs.length - 1; i >= 0; --i) {
        attr = attrs[i];
        if (attr.specified !== false) {
            attrName = attr.name;
            attrNamespaceURI = attr.namespaceURI;

            if (attrNamespaceURI) {
                attrName = attr.localName || attrName;

                if (!hasAttributeNS(toNode, attrNamespaceURI, attrName)) {
                    fromNode.removeAttributeNS(attrNamespaceURI, attrName);
                }
            } else {
                if (!hasAttributeNS(toNode, null, attrName)) {
                    fromNode.removeAttribute(attrName);
                }
            }
        }
    }
}

function syncBooleanAttrProp(fromEl, toEl, name) {
    if (fromEl[name] !== toEl[name]) {
        fromEl[name] = toEl[name];
        if (fromEl[name]) {
            fromEl.setAttribute(name, '');
        } else {
            fromEl.removeAttribute(name, '');
        }
    }
}

var specialElHandlers = {
    /**
     * Needed for IE. Apparently IE doesn't think that "selected" is an
     * attribute when reading over the attributes using selectEl.attributes
     */
    OPTION: function(fromEl, toEl) {
        syncBooleanAttrProp(fromEl, toEl, 'selected');
    },
    /**
     * The "value" attribute is special for the <input> element since it sets
     * the initial value. Changing the "value" attribute without changing the
     * "value" property will have no effect since it is only used to the set the
     * initial value.  Similar for the "checked" attribute, and "disabled".
     */
    INPUT: function(fromEl, toEl) {
        syncBooleanAttrProp(fromEl, toEl, 'checked');
        syncBooleanAttrProp(fromEl, toEl, 'disabled');

        if (fromEl.value !== toEl.value) {
            fromEl.value = toEl.value;
        }

        if (!hasAttributeNS(toEl, null, 'value')) {
            fromEl.removeAttribute('value');
        }
    },

    TEXTAREA: function(fromEl, toEl) {
        var newValue = toEl.value;
        if (fromEl.value !== newValue) {
            fromEl.value = newValue;
        }

        var firstChild = fromEl.firstChild;
        if (firstChild) {
            // Needed for IE. Apparently IE sets the placeholder as the
            // node value and vise versa. This ignores an empty update.
            var oldValue = firstChild.nodeValue;

            if (oldValue == newValue || (!newValue && oldValue == fromEl.placeholder)) {
                return;
            }

            firstChild.nodeValue = newValue;
        }
    },
    SELECT: function(fromEl, toEl) {
        if (!hasAttributeNS(toEl, null, 'multiple')) {
            var selectedIndex = -1;
            var i = 0;
            var curChild = toEl.firstChild;
            while(curChild) {
                var nodeName = curChild.nodeName;
                if (nodeName && nodeName.toUpperCase() === 'OPTION') {
                    if (hasAttributeNS(curChild, null, 'selected')) {
                        selectedIndex = i;
                        break;
                    }
                    i++;
                }
                curChild = curChild.nextSibling;
            }

            fromEl.selectedIndex = i;
        }
    }
};

var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var COMMENT_NODE = 8;

function noop() {}

function defaultGetNodeKey(node) {
    return node.id;
}

function morphdomFactory(morphAttrs) {

    return function morphdom(fromNode, toNode, options) {
        if (!options) {
            options = {};
        }

        if (typeof toNode === 'string') {
            if (fromNode.nodeName === '#document' || fromNode.nodeName === 'HTML') {
                var toNodeHtml = toNode;
                toNode = doc.createElement('html');
                toNode.innerHTML = toNodeHtml;
            } else {
                toNode = toElement(toNode);
            }
        }

        var getNodeKey = options.getNodeKey || defaultGetNodeKey;
        var onBeforeNodeAdded = options.onBeforeNodeAdded || noop;
        var onNodeAdded = options.onNodeAdded || noop;
        var onBeforeElUpdated = options.onBeforeElUpdated || noop;
        var onElUpdated = options.onElUpdated || noop;
        var onBeforeNodeDiscarded = options.onBeforeNodeDiscarded || noop;
        var onNodeDiscarded = options.onNodeDiscarded || noop;
        var onBeforeElChildrenUpdated = options.onBeforeElChildrenUpdated || noop;
        var childrenOnly = options.childrenOnly === true;

        // This object is used as a lookup to quickly find all keyed elements in the original DOM tree.
        var fromNodesLookup = {};
        var keyedRemovalList;

        function addKeyedRemoval(key) {
            if (keyedRemovalList) {
                keyedRemovalList.push(key);
            } else {
                keyedRemovalList = [key];
            }
        }

        function walkDiscardedChildNodes(node, skipKeyedNodes) {
            if (node.nodeType === ELEMENT_NODE) {
                var curChild = node.firstChild;
                while (curChild) {

                    var key = undefined;

                    if (skipKeyedNodes && (key = getNodeKey(curChild))) {
                        // If we are skipping keyed nodes then we add the key
                        // to a list so that it can be handled at the very end.
                        addKeyedRemoval(key);
                    } else {
                        // Only report the node as discarded if it is not keyed. We do this because
                        // at the end we loop through all keyed elements that were unmatched
                        // and then discard them in one final pass.
                        onNodeDiscarded(curChild);
                        if (curChild.firstChild) {
                            walkDiscardedChildNodes(curChild, skipKeyedNodes);
                        }
                    }

                    curChild = curChild.nextSibling;
                }
            }
        }

        /**
         * Removes a DOM node out of the original DOM
         *
         * @param  {Node} node The node to remove
         * @param  {Node} parentNode The nodes parent
         * @param  {Boolean} skipKeyedNodes If true then elements with keys will be skipped and not discarded.
         * @return {undefined}
         */
        function removeNode(node, parentNode, skipKeyedNodes) {
            if (onBeforeNodeDiscarded(node) === false) {
                return;
            }

            if (parentNode) {
                parentNode.removeChild(node);
            }

            onNodeDiscarded(node);
            walkDiscardedChildNodes(node, skipKeyedNodes);
        }

        // // TreeWalker implementation is no faster, but keeping this around in case this changes in the future
        // function indexTree(root) {
        //     var treeWalker = document.createTreeWalker(
        //         root,
        //         NodeFilter.SHOW_ELEMENT);
        //
        //     var el;
        //     while((el = treeWalker.nextNode())) {
        //         var key = getNodeKey(el);
        //         if (key) {
        //             fromNodesLookup[key] = el;
        //         }
        //     }
        // }

        // // NodeIterator implementation is no faster, but keeping this around in case this changes in the future
        //
        // function indexTree(node) {
        //     var nodeIterator = document.createNodeIterator(node, NodeFilter.SHOW_ELEMENT);
        //     var el;
        //     while((el = nodeIterator.nextNode())) {
        //         var key = getNodeKey(el);
        //         if (key) {
        //             fromNodesLookup[key] = el;
        //         }
        //     }
        // }

        function indexTree(node) {
            if (node.nodeType === ELEMENT_NODE) {
                var curChild = node.firstChild;
                while (curChild) {
                    var key = getNodeKey(curChild);
                    if (key) {
                        fromNodesLookup[key] = curChild;
                    }

                    // Walk recursively
                    indexTree(curChild);

                    curChild = curChild.nextSibling;
                }
            }
        }

        indexTree(fromNode);

        function handleNodeAdded(el) {
            onNodeAdded(el);

            var curChild = el.firstChild;
            while (curChild) {
                var nextSibling = curChild.nextSibling;

                var key = getNodeKey(curChild);
                if (key) {
                    var unmatchedFromEl = fromNodesLookup[key];
                    if (unmatchedFromEl && compareNodeNames(curChild, unmatchedFromEl)) {
                        curChild.parentNode.replaceChild(unmatchedFromEl, curChild);
                        morphEl(unmatchedFromEl, curChild);
                    }
                }

                handleNodeAdded(curChild);
                curChild = nextSibling;
            }
        }

        function morphEl(fromEl, toEl, childrenOnly) {
            var toElKey = getNodeKey(toEl);
            var curFromNodeKey;

            if (toElKey) {
                // If an element with an ID is being morphed then it is will be in the final
                // DOM so clear it out of the saved elements collection
                delete fromNodesLookup[toElKey];
            }

            if (toNode.isSameNode && toNode.isSameNode(fromNode)) {
                return;
            }

            if (!childrenOnly) {
                if (onBeforeElUpdated(fromEl, toEl) === false) {
                    return;
                }

                morphAttrs(fromEl, toEl);
                onElUpdated(fromEl);

                if (onBeforeElChildrenUpdated(fromEl, toEl) === false) {
                    return;
                }
            }

            if (fromEl.nodeName !== 'TEXTAREA') {
                var curToNodeChild = toEl.firstChild;
                var curFromNodeChild = fromEl.firstChild;
                var curToNodeKey;

                var fromNextSibling;
                var toNextSibling;
                var matchingFromEl;

                outer: while (curToNodeChild) {
                    toNextSibling = curToNodeChild.nextSibling;
                    curToNodeKey = getNodeKey(curToNodeChild);

                    while (curFromNodeChild) {
                        fromNextSibling = curFromNodeChild.nextSibling;

                        if (curToNodeChild.isSameNode && curToNodeChild.isSameNode(curFromNodeChild)) {
                            curToNodeChild = toNextSibling;
                            curFromNodeChild = fromNextSibling;
                            continue outer;
                        }

                        curFromNodeKey = getNodeKey(curFromNodeChild);

                        var curFromNodeType = curFromNodeChild.nodeType;

                        var isCompatible = undefined;

                        if (curFromNodeType === curToNodeChild.nodeType) {
                            if (curFromNodeType === ELEMENT_NODE) {
                                // Both nodes being compared are Element nodes

                                if (curToNodeKey) {
                                    // The target node has a key so we want to match it up with the correct element
                                    // in the original DOM tree
                                    if (curToNodeKey !== curFromNodeKey) {
                                        // The current element in the original DOM tree does not have a matching key so
                                        // let's check our lookup to see if there is a matching element in the original
                                        // DOM tree
                                        if ((matchingFromEl = fromNodesLookup[curToNodeKey])) {
                                            if (curFromNodeChild.nextSibling === matchingFromEl) {
                                                // Special case for single element removals. To avoid removing the original
                                                // DOM node out of the tree (since that can break CSS transitions, etc.),
                                                // we will instead discard the current node and wait until the next
                                                // iteration to properly match up the keyed target element with its matching
                                                // element in the original tree
                                                isCompatible = false;
                                            } else {
                                                // We found a matching keyed element somewhere in the original DOM tree.
                                                // Let's moving the original DOM node into the current position and morph
                                                // it.

                                                // NOTE: We use insertBefore instead of replaceChild because we want to go through
                                                // the `removeNode()` function for the node that is being discarded so that
                                                // all lifecycle hooks are correctly invoked
                                                fromEl.insertBefore(matchingFromEl, curFromNodeChild);

                                                fromNextSibling = curFromNodeChild.nextSibling;

                                                if (curFromNodeKey) {
                                                    // Since the node is keyed it might be matched up later so we defer
                                                    // the actual removal to later
                                                    addKeyedRemoval(curFromNodeKey);
                                                } else {
                                                    // NOTE: we skip nested keyed nodes from being removed since there is
                                                    //       still a chance they will be matched up later
                                                    removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                                                }

                                                curFromNodeChild = matchingFromEl;
                                            }
                                        } else {
                                            // The nodes are not compatible since the "to" node has a key and there
                                            // is no matching keyed node in the source tree
                                            isCompatible = false;
                                        }
                                    }
                                } else if (curFromNodeKey) {
                                    // The original has a key
                                    isCompatible = false;
                                }

                                isCompatible = isCompatible !== false && compareNodeNames(curFromNodeChild, curToNodeChild);
                                if (isCompatible) {
                                    // We found compatible DOM elements so transform
                                    // the current "from" node to match the current
                                    // target DOM node.
                                    morphEl(curFromNodeChild, curToNodeChild);
                                }

                            } else if (curFromNodeType === TEXT_NODE || curFromNodeType == COMMENT_NODE) {
                                // Both nodes being compared are Text or Comment nodes
                                isCompatible = true;
                                // Simply update nodeValue on the original node to
                                // change the text value
                                curFromNodeChild.nodeValue = curToNodeChild.nodeValue;
                            }
                        }

                        if (isCompatible) {
                            // Advance both the "to" child and the "from" child since we found a match
                            curToNodeChild = toNextSibling;
                            curFromNodeChild = fromNextSibling;
                            continue outer;
                        }

                        // No compatible match so remove the old node from the DOM and continue trying to find a
                        // match in the original DOM. However, we only do this if the from node is not keyed
                        // since it is possible that a keyed node might match up with a node somewhere else in the
                        // target tree and we don't want to discard it just yet since it still might find a
                        // home in the final DOM tree. After everything is done we will remove any keyed nodes
                        // that didn't find a home
                        if (curFromNodeKey) {
                            // Since the node is keyed it might be matched up later so we defer
                            // the actual removal to later
                            addKeyedRemoval(curFromNodeKey);
                        } else {
                            // NOTE: we skip nested keyed nodes from being removed since there is
                            //       still a chance they will be matched up later
                            removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                        }

                        curFromNodeChild = fromNextSibling;
                    }

                    // If we got this far then we did not find a candidate match for
                    // our "to node" and we exhausted all of the children "from"
                    // nodes. Therefore, we will just append the current "to" node
                    // to the end
                    if (curToNodeKey && (matchingFromEl = fromNodesLookup[curToNodeKey]) && compareNodeNames(matchingFromEl, curToNodeChild)) {
                        fromEl.appendChild(matchingFromEl);
                        morphEl(matchingFromEl, curToNodeChild);
                    } else {
                        var onBeforeNodeAddedResult = onBeforeNodeAdded(curToNodeChild);
                        if (onBeforeNodeAddedResult !== false) {
                            if (onBeforeNodeAddedResult) {
                                curToNodeChild = onBeforeNodeAddedResult;
                            }

                            if (curToNodeChild.actualize) {
                                curToNodeChild = curToNodeChild.actualize(fromEl.ownerDocument || doc);
                            }
                            fromEl.appendChild(curToNodeChild);
                            handleNodeAdded(curToNodeChild);
                        }
                    }

                    curToNodeChild = toNextSibling;
                    curFromNodeChild = fromNextSibling;
                }

                // We have processed all of the "to nodes". If curFromNodeChild is
                // non-null then we still have some from nodes left over that need
                // to be removed
                while (curFromNodeChild) {
                    fromNextSibling = curFromNodeChild.nextSibling;
                    if ((curFromNodeKey = getNodeKey(curFromNodeChild))) {
                        // Since the node is keyed it might be matched up later so we defer
                        // the actual removal to later
                        addKeyedRemoval(curFromNodeKey);
                    } else {
                        // NOTE: we skip nested keyed nodes from being removed since there is
                        //       still a chance they will be matched up later
                        removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                    }
                    curFromNodeChild = fromNextSibling;
                }
            }

            var specialElHandler = specialElHandlers[fromEl.nodeName];
            if (specialElHandler) {
                specialElHandler(fromEl, toEl);
            }
        } // END: morphEl(...)

        var morphedNode = fromNode;
        var morphedNodeType = morphedNode.nodeType;
        var toNodeType = toNode.nodeType;

        if (!childrenOnly) {
            // Handle the case where we are given two DOM nodes that are not
            // compatible (e.g. <div> --> <span> or <div> --> TEXT)
            if (morphedNodeType === ELEMENT_NODE) {
                if (toNodeType === ELEMENT_NODE) {
                    if (!compareNodeNames(fromNode, toNode)) {
                        onNodeDiscarded(fromNode);
                        morphedNode = moveChildren(fromNode, createElementNS(toNode.nodeName, toNode.namespaceURI));
                    }
                } else {
                    // Going from an element node to a text node
                    morphedNode = toNode;
                }
            } else if (morphedNodeType === TEXT_NODE || morphedNodeType === COMMENT_NODE) { // Text or comment node
                if (toNodeType === morphedNodeType) {
                    morphedNode.nodeValue = toNode.nodeValue;
                    return morphedNode;
                } else {
                    // Text node to something else
                    morphedNode = toNode;
                }
            }
        }

        if (morphedNode === toNode) {
            // The "to node" was not compatible with the "from node" so we had to
            // toss out the "from node" and use the "to node"
            onNodeDiscarded(fromNode);
        } else {
            morphEl(morphedNode, toNode, childrenOnly);

            // We now need to loop over any keyed nodes that might need to be
            // removed. We only do the removal if we know that the keyed node
            // never found a match. When a keyed node is matched up we remove
            // it out of fromNodesLookup and we use fromNodesLookup to determine
            // if a keyed node has been matched up or not
            if (keyedRemovalList) {
                for (var i=0, len=keyedRemovalList.length; i<len; i++) {
                    var elToRemove = fromNodesLookup[keyedRemovalList[i]];
                    if (elToRemove) {
                        removeNode(elToRemove, elToRemove.parentNode, false);
                    }
                }
            }
        }

        if (!childrenOnly && morphedNode !== fromNode && fromNode.parentNode) {
            if (morphedNode.actualize) {
                morphedNode = morphedNode.actualize(fromNode.ownerDocument || doc);
            }
            // If we had to swap out the from node with a new node because the old
            // node was not compatible with the target node then we need to
            // replace the old DOM node in the original DOM tree. This is only
            // possible if the original DOM node was part of a DOM tree which
            // we know is the case if it has a parent node.
            fromNode.parentNode.replaceChild(morphedNode, fromNode);
        }

        return morphedNode;
    };
}

var morphdom = morphdomFactory(morphAttrs);

module.exports = morphdom;

},{}],11:[function(require,module,exports){
/* global MutationObserver */
var document = require('global/document')
var window = require('global/window')
var watch = Object.create(null)
var KEY_ID = 'onloadid' + (new Date() % 9e6).toString(36)
var KEY_ATTR = 'data-' + KEY_ID
var INDEX = 0

if (window && window.MutationObserver) {
  var observer = new MutationObserver(function (mutations) {
    if (Object.keys(watch).length < 1) return
    for (var i = 0; i < mutations.length; i++) {
      if (mutations[i].attributeName === KEY_ATTR) {
        eachAttr(mutations[i], turnon, turnoff)
        continue
      }
      eachMutation(mutations[i].removedNodes, turnoff)
      eachMutation(mutations[i].addedNodes, turnon)
    }
  })
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeOldValue: true,
    attributeFilter: [KEY_ATTR]
  })
}

module.exports = function onload (el, on, off, caller) {
  on = on || function () {}
  off = off || function () {}
  el.setAttribute(KEY_ATTR, 'o' + INDEX)
  watch['o' + INDEX] = [on, off, 0, caller || onload.caller]
  INDEX += 1
  return el
}

function turnon (index, el) {
  if (watch[index][0] && watch[index][2] === 0) {
    watch[index][0](el)
    watch[index][2] = 1
  }
}

function turnoff (index, el) {
  if (watch[index][1] && watch[index][2] === 1) {
    watch[index][1](el)
    watch[index][2] = 0
  }
}

function eachAttr (mutation, on, off) {
  var newValue = mutation.target.getAttribute(KEY_ATTR)
  if (sameOrigin(mutation.oldValue, newValue)) {
    watch[newValue] = watch[mutation.oldValue]
    return
  }
  if (watch[mutation.oldValue]) {
    off(mutation.oldValue, mutation.target)
  }
  if (watch[newValue]) {
    on(newValue, mutation.target)
  }
}

function sameOrigin (oldValue, newValue) {
  if (!oldValue || !newValue) return false
  return watch[oldValue][3] === watch[newValue][3]
}

function eachMutation (nodes, fn) {
  var keys = Object.keys(watch)
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i] && nodes[i].getAttribute && nodes[i].getAttribute(KEY_ATTR)) {
      var onloadid = nodes[i].getAttribute(KEY_ATTR)
      keys.forEach(function (k) {
        if (onloadid === k) {
          fn(k, nodes[i])
        }
      })
    }
    if (nodes[i].childNodes.length > 0) {
      eachMutation(nodes[i].childNodes, fn)
    }
  }
}

},{"global/document":5,"global/window":6}],12:[function(require,module,exports){
(function (process){
  /* globals require, module */

  'use strict';

  /**
   * Module dependencies.
   */

  var pathtoRegexp = require('path-to-regexp');

  /**
   * Module exports.
   */

  module.exports = page;

  /**
   * Detect click event
   */
  var clickEvent = ('undefined' !== typeof document) && document.ontouchstart ? 'touchstart' : 'click';

  /**
   * To work properly with the URL
   * history.location generated polyfill in https://github.com/devote/HTML5-History-API
   */

  var location = ('undefined' !== typeof window) && (window.history.location || window.location);

  /**
   * Perform initial dispatch.
   */

  var dispatch = true;


  /**
   * Decode URL components (query string, pathname, hash).
   * Accommodates both regular percent encoding and x-www-form-urlencoded format.
   */
  var decodeURLComponents = true;

  /**
   * Base path.
   */

  var base = '';

  /**
   * Running flag.
   */

  var running;

  /**
   * HashBang option
   */

  var hashbang = false;

  /**
   * Previous context, for capturing
   * page exit events.
   */

  var prevContext;

  /**
   * Register `path` with callback `fn()`,
   * or route `path`, or redirection,
   * or `page.start()`.
   *
   *   page(fn);
   *   page('*', fn);
   *   page('/user/:id', load, user);
   *   page('/user/' + user.id, { some: 'thing' });
   *   page('/user/' + user.id);
   *   page('/from', '/to')
   *   page();
   *
   * @param {string|!Function|!Object} path
   * @param {Function=} fn
   * @api public
   */

  function page(path, fn) {
    // <callback>
    if ('function' === typeof path) {
      return page('*', path);
    }

    // route <path> to <callback ...>
    if ('function' === typeof fn) {
      var route = new Route(/** @type {string} */ (path));
      for (var i = 1; i < arguments.length; ++i) {
        page.callbacks.push(route.middleware(arguments[i]));
      }
      // show <path> with [state]
    } else if ('string' === typeof path) {
      page['string' === typeof fn ? 'redirect' : 'show'](path, fn);
      // start [options]
    } else {
      page.start(path);
    }
  }

  /**
   * Callback functions.
   */

  page.callbacks = [];
  page.exits = [];

  /**
   * Current path being processed
   * @type {string}
   */
  page.current = '';

  /**
   * Number of pages navigated to.
   * @type {number}
   *
   *     page.len == 0;
   *     page('/login');
   *     page.len == 1;
   */

  page.len = 0;

  /**
   * Get or set basepath to `path`.
   *
   * @param {string} path
   * @api public
   */

  page.base = function(path) {
    if (0 === arguments.length) return base;
    base = path;
  };

  /**
   * Bind with the given `options`.
   *
   * Options:
   *
   *    - `click` bind to click events [true]
   *    - `popstate` bind to popstate [true]
   *    - `dispatch` perform initial dispatch [true]
   *
   * @param {Object} options
   * @api public
   */

  page.start = function(options) {
    options = options || {};
    if (running) return;
    running = true;
    if (false === options.dispatch) dispatch = false;
    if (false === options.decodeURLComponents) decodeURLComponents = false;
    if (false !== options.popstate) window.addEventListener('popstate', onpopstate, false);
    if (false !== options.click) {
      document.addEventListener(clickEvent, onclick, false);
    }
    if (true === options.hashbang) hashbang = true;
    if (!dispatch) return;
    var url = (hashbang && ~location.hash.indexOf('#!')) ? location.hash.substr(2) + location.search : location.pathname + location.search + location.hash;
    page.replace(url, null, true, dispatch);
  };

  /**
   * Unbind click and popstate event handlers.
   *
   * @api public
   */

  page.stop = function() {
    if (!running) return;
    page.current = '';
    page.len = 0;
    running = false;
    document.removeEventListener(clickEvent, onclick, false);
    window.removeEventListener('popstate', onpopstate, false);
  };

  /**
   * Show `path` with optional `state` object.
   *
   * @param {string} path
   * @param {Object=} state
   * @param {boolean=} dispatch
   * @param {boolean=} push
   * @return {!Context}
   * @api public
   */

  page.show = function(path, state, dispatch, push) {
    var ctx = new Context(path, state);
    page.current = ctx.path;
    if (false !== dispatch) page.dispatch(ctx);
    if (false !== ctx.handled && false !== push) ctx.pushState();
    return ctx;
  };

  /**
   * Goes back in the history
   * Back should always let the current route push state and then go back.
   *
   * @param {string} path - fallback path to go back if no more history exists, if undefined defaults to page.base
   * @param {Object=} state
   * @api public
   */

  page.back = function(path, state) {
    if (page.len > 0) {
      // this may need more testing to see if all browsers
      // wait for the next tick to go back in history
      history.back();
      page.len--;
    } else if (path) {
      setTimeout(function() {
        page.show(path, state);
      });
    }else{
      setTimeout(function() {
        page.show(base, state);
      });
    }
  };


  /**
   * Register route to redirect from one path to other
   * or just redirect to another route
   *
   * @param {string} from - if param 'to' is undefined redirects to 'from'
   * @param {string=} to
   * @api public
   */
  page.redirect = function(from, to) {
    // Define route from a path to another
    if ('string' === typeof from && 'string' === typeof to) {
      page(from, function(e) {
        setTimeout(function() {
          page.replace(/** @type {!string} */ (to));
        }, 0);
      });
    }

    // Wait for the push state and replace it with another
    if ('string' === typeof from && 'undefined' === typeof to) {
      setTimeout(function() {
        page.replace(from);
      }, 0);
    }
  };

  /**
   * Replace `path` with optional `state` object.
   *
   * @param {string} path
   * @param {Object=} state
   * @param {boolean=} init
   * @param {boolean=} dispatch
   * @return {!Context}
   * @api public
   */


  page.replace = function(path, state, init, dispatch) {
    var ctx = new Context(path, state);
    page.current = ctx.path;
    ctx.init = init;
    ctx.save(); // save before dispatching, which may redirect
    if (false !== dispatch) page.dispatch(ctx);
    return ctx;
  };

  /**
   * Dispatch the given `ctx`.
   *
   * @param {Context} ctx
   * @api private
   */
  page.dispatch = function(ctx) {
    var prev = prevContext,
      i = 0,
      j = 0;

    prevContext = ctx;

    function nextExit() {
      var fn = page.exits[j++];
      if (!fn) return nextEnter();
      fn(prev, nextExit);
    }

    function nextEnter() {
      var fn = page.callbacks[i++];

      if (ctx.path !== page.current) {
        ctx.handled = false;
        return;
      }
      if (!fn) return unhandled(ctx);
      fn(ctx, nextEnter);
    }

    if (prev) {
      nextExit();
    } else {
      nextEnter();
    }
  };

  /**
   * Unhandled `ctx`. When it's not the initial
   * popstate then redirect. If you wish to handle
   * 404s on your own use `page('*', callback)`.
   *
   * @param {Context} ctx
   * @api private
   */
  function unhandled(ctx) {
    if (ctx.handled) return;
    var current;

    if (hashbang) {
      current = base + location.hash.replace('#!', '');
    } else {
      current = location.pathname + location.search;
    }

    if (current === ctx.canonicalPath) return;
    page.stop();
    ctx.handled = false;
    location.href = ctx.canonicalPath;
  }

  /**
   * Register an exit route on `path` with
   * callback `fn()`, which will be called
   * on the previous context when a new
   * page is visited.
   */
  page.exit = function(path, fn) {
    if (typeof path === 'function') {
      return page.exit('*', path);
    }

    var route = new Route(path);
    for (var i = 1; i < arguments.length; ++i) {
      page.exits.push(route.middleware(arguments[i]));
    }
  };

  /**
   * Remove URL encoding from the given `str`.
   * Accommodates whitespace in both x-www-form-urlencoded
   * and regular percent-encoded form.
   *
   * @param {string} val - URL component to decode
   */
  function decodeURLEncodedURIComponent(val) {
    if (typeof val !== 'string') { return val; }
    return decodeURLComponents ? decodeURIComponent(val.replace(/\+/g, ' ')) : val;
  }

  /**
   * Initialize a new "request" `Context`
   * with the given `path` and optional initial `state`.
   *
   * @constructor
   * @param {string} path
   * @param {Object=} state
   * @api public
   */

  function Context(path, state) {
    if ('/' === path[0] && 0 !== path.indexOf(base)) path = base + (hashbang ? '#!' : '') + path;
    var i = path.indexOf('?');

    this.canonicalPath = path;
    this.path = path.replace(base, '') || '/';
    if (hashbang) this.path = this.path.replace('#!', '') || '/';

    this.title = document.title;
    this.state = state || {};
    this.state.path = path;
    this.querystring = ~i ? decodeURLEncodedURIComponent(path.slice(i + 1)) : '';
    this.pathname = decodeURLEncodedURIComponent(~i ? path.slice(0, i) : path);
    this.params = {};

    // fragment
    this.hash = '';
    if (!hashbang) {
      if (!~this.path.indexOf('#')) return;
      var parts = this.path.split('#');
      this.path = parts[0];
      this.hash = decodeURLEncodedURIComponent(parts[1]) || '';
      this.querystring = this.querystring.split('#')[0];
    }
  }

  /**
   * Expose `Context`.
   */

  page.Context = Context;

  /**
   * Push state.
   *
   * @api private
   */

  Context.prototype.pushState = function() {
    page.len++;
    history.pushState(this.state, this.title, hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);
  };

  /**
   * Save the context state.
   *
   * @api public
   */

  Context.prototype.save = function() {
    history.replaceState(this.state, this.title, hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);
  };

  /**
   * Initialize `Route` with the given HTTP `path`,
   * and an array of `callbacks` and `options`.
   *
   * Options:
   *
   *   - `sensitive`    enable case-sensitive routes
   *   - `strict`       enable strict matching for trailing slashes
   *
   * @constructor
   * @param {string} path
   * @param {Object=} options
   * @api private
   */

  function Route(path, options) {
    options = options || {};
    this.path = (path === '*') ? '(.*)' : path;
    this.method = 'GET';
    this.regexp = pathtoRegexp(this.path,
      this.keys = [],
      options);
  }

  /**
   * Expose `Route`.
   */

  page.Route = Route;

  /**
   * Return route middleware with
   * the given callback `fn()`.
   *
   * @param {Function} fn
   * @return {Function}
   * @api public
   */

  Route.prototype.middleware = function(fn) {
    var self = this;
    return function(ctx, next) {
      if (self.match(ctx.path, ctx.params)) return fn(ctx, next);
      next();
    };
  };

  /**
   * Check if this route matches `path`, if so
   * populate `params`.
   *
   * @param {string} path
   * @param {Object} params
   * @return {boolean}
   * @api private
   */

  Route.prototype.match = function(path, params) {
    var keys = this.keys,
      qsIndex = path.indexOf('?'),
      pathname = ~qsIndex ? path.slice(0, qsIndex) : path,
      m = this.regexp.exec(decodeURIComponent(pathname));

    if (!m) return false;

    for (var i = 1, len = m.length; i < len; ++i) {
      var key = keys[i - 1];
      var val = decodeURLEncodedURIComponent(m[i]);
      if (val !== undefined || !(hasOwnProperty.call(params, key.name))) {
        params[key.name] = val;
      }
    }

    return true;
  };


  /**
   * Handle "populate" events.
   */

  var onpopstate = (function () {
    var loaded = false;
    if ('undefined' === typeof window) {
      return;
    }
    if (document.readyState === 'complete') {
      loaded = true;
    } else {
      window.addEventListener('load', function() {
        setTimeout(function() {
          loaded = true;
        }, 0);
      });
    }
    return function onpopstate(e) {
      if (!loaded) return;
      if (e.state) {
        var path = e.state.path;
        page.replace(path, e.state);
      } else {
        page.show(location.pathname + location.hash, undefined, undefined, false);
      }
    };
  })();
  /**
   * Handle "click" events.
   */

  function onclick(e) {

    if (1 !== which(e)) return;

    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    if (e.defaultPrevented) return;



    // ensure link
    // use shadow dom when available
    var el = e.path ? e.path[0] : e.target;
    while (el && 'A' !== el.nodeName) el = el.parentNode;
    if (!el || 'A' !== el.nodeName) return;



    // Ignore if tag has
    // 1. "download" attribute
    // 2. rel="external" attribute
    if (el.hasAttribute('download') || el.getAttribute('rel') === 'external') return;

    // ensure non-hash for the same path
    var link = el.getAttribute('href');
    if (!hashbang && el.pathname === location.pathname && (el.hash || '#' === link)) return;



    // Check for mailto: in the href
    if (link && link.indexOf('mailto:') > -1) return;

    // check target
    if (el.target) return;

    // x-origin
    if (!sameOrigin(el.href)) return;



    // rebuild path
    var path = el.pathname + el.search + (el.hash || '');

    // strip leading "/[drive letter]:" on NW.js on Windows
    if (typeof process !== 'undefined' && path.match(/^\/[a-zA-Z]:\//)) {
      path = path.replace(/^\/[a-zA-Z]:\//, '/');
    }

    // same page
    var orig = path;

    if (path.indexOf(base) === 0) {
      path = path.substr(base.length);
    }

    if (hashbang) path = path.replace('#!', '');

    if (base && orig === path) return;

    e.preventDefault();
    page.show(orig);
  }

  /**
   * Event button.
   */

  function which(e) {
    e = e || window.event;
    return null === e.which ? e.button : e.which;
  }

  /**
   * Check if `href` is the same origin.
   */

  function sameOrigin(href) {
    var origin = location.protocol + '//' + location.hostname;
    if (location.port) origin += ':' + location.port;
    return (href && (0 === href.indexOf(origin)));
  }

  page.sameOrigin = sameOrigin;

}).call(this,require('_process'))
},{"_process":3,"path-to-regexp":13}],13:[function(require,module,exports){
var isarray = require('isarray')

/**
 * Expose `pathToRegexp`.
 */
module.exports = pathToRegexp
module.exports.parse = parse
module.exports.compile = compile
module.exports.tokensToFunction = tokensToFunction
module.exports.tokensToRegExp = tokensToRegExp

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g')

/**
 * Parse a string for the raw tokens.
 *
 * @param  {String} str
 * @return {Array}
 */
function parse (str) {
  var tokens = []
  var key = 0
  var index = 0
  var path = ''
  var res

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0]
    var escaped = res[1]
    var offset = res.index
    path += str.slice(index, offset)
    index = offset + m.length

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1]
      continue
    }

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path)
      path = ''
    }

    var prefix = res[2]
    var name = res[3]
    var capture = res[4]
    var group = res[5]
    var suffix = res[6]
    var asterisk = res[7]

    var repeat = suffix === '+' || suffix === '*'
    var optional = suffix === '?' || suffix === '*'
    var delimiter = prefix || '/'
    var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?')

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      pattern: escapeGroup(pattern)
    })
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index)
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path)
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {String}   str
 * @return {Function}
 */
function compile (str) {
  return tokensToFunction(parse(str))
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length)

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^' + tokens[i].pattern + '$')
    }
  }

  return function (obj) {
    var path = ''
    var data = obj || {}

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]

      if (typeof token === 'string') {
        path += token

        continue
      }

      var value = data[token.name]
      var segment

      if (value == null) {
        if (token.optional) {
          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received "' + value + '"')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encodeURIComponent(value[j])

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment
        }

        continue
      }

      segment = encodeURIComponent(value)

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {String} str
 * @return {String}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {String} group
 * @return {String}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {RegExp} re
 * @param  {Array}  keys
 * @return {RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {String}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {RegExp} path
 * @param  {Array}  keys
 * @return {RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g)

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        pattern: null
      })
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {Array}  path
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = []

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source)
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {String} path
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
function stringToRegexp (path, keys, options) {
  var tokens = parse(path)
  var re = tokensToRegExp(tokens, options)

  // Attach keys back to the regexp.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] !== 'string') {
      keys.push(tokens[i])
    }
  }

  return attachKeys(re, keys)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {Array}  tokens
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
function tokensToRegExp (tokens, options) {
  options = options || {}

  var strict = options.strict
  var end = options.end !== false
  var route = ''
  var lastToken = tokens[tokens.length - 1]
  var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken)

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]

    if (typeof token === 'string') {
      route += escapeString(token)
    } else {
      var prefix = escapeString(token.prefix)
      var capture = token.pattern

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*'
      }

      if (token.optional) {
        if (prefix) {
          capture = '(?:' + prefix + '(' + capture + '))?'
        } else {
          capture = '(' + capture + ')?'
        }
      } else {
        capture = prefix + '(' + capture + ')'
      }

      route += capture
    }
  }

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?'
  }

  if (end) {
    route += '$'
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithSlash ? '' : '(?=\\/|$)'
  }

  return new RegExp('^' + route, flags(options))
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(String|RegExp|Array)} path
 * @param  {Array}                 [keys]
 * @param  {Object}                [options]
 * @return {RegExp}
 */
function pathToRegexp (path, keys, options) {
  keys = keys || []

  if (!isarray(keys)) {
    options = keys
    keys = []
  } else if (!options) {
    options = {}
  }

  if (path instanceof RegExp) {
    return regexpToRegexp(path, keys, options)
  }

  if (isarray(path)) {
    return arrayToRegexp(path, keys, options)
  }

  return stringToRegexp(path, keys, options)
}

},{"isarray":9}],14:[function(require,module,exports){
var bel = require('bel') // turns template tag into DOM elements
var morphdom = require('morphdom') // efficiently diffs + morphs two DOM elements
var defaultEvents = require('./update-events.js') // default events to be copied when dom elements update

module.exports = bel

// TODO move this + defaultEvents to a new module once we receive more feedback
module.exports.update = function (fromNode, toNode, opts) {
  if (!opts) opts = {}
  if (opts.events !== false) {
    if (!opts.onBeforeElUpdated) opts.onBeforeElUpdated = copier
  }

  return morphdom(fromNode, toNode, opts)

  // morphdom only copies attributes. we decided we also wanted to copy events
  // that can be set via attributes
  function copier (f, t) {
    // copy events:
    var events = opts.events || defaultEvents
    for (var i = 0; i < events.length; i++) {
      var ev = events[i]
      if (t[ev]) { // if new element has a whitelisted attribute
        f[ev] = t[ev] // update existing element
      } else if (f[ev]) { // if existing element has it and new one doesnt
        f[ev] = undefined // remove it from existing element
      }
    }
    var oldValue = f.value
    var newValue = t.value
    // copy values for form elements
    if ((f.nodeName === 'INPUT' && f.type !== 'file') || f.nodeName === 'SELECT') {
      if (!newValue && !t.hasAttribute('value')) {
        t.value = f.value
      } else if (newValue !== oldValue) {
        f.value = newValue
      }
    } else if (f.nodeName === 'TEXTAREA') {
      if (t.getAttribute('value') === null) f.value = t.value
    }
  }
}

},{"./update-events.js":15,"bel":1,"morphdom":10}],15:[function(require,module,exports){
module.exports = [
  // attribute events (can be set with attributes)
  'onclick',
  'ondblclick',
  'onmousedown',
  'onmouseup',
  'onmouseover',
  'onmousemove',
  'onmouseout',
  'ondragstart',
  'ondrag',
  'ondragenter',
  'ondragleave',
  'ondragover',
  'ondrop',
  'ondragend',
  'onkeydown',
  'onkeypress',
  'onkeyup',
  'onunload',
  'onabort',
  'onerror',
  'onresize',
  'onscroll',
  'onselect',
  'onchange',
  'onsubmit',
  'onreset',
  'onfocus',
  'onblur',
  'oninput',
  // other common events
  'oncontextmenu',
  'onfocusin',
  'onfocusout'
]

},{}],16:[function(require,module,exports){
'use strict';

var _page = require('page');

var _page2 = _interopRequireDefault(_page);

var _header = require('../header');

var _header2 = _interopRequireDefault(_header);

var _footer = require('../footer');

var _footer2 = _interopRequireDefault(_footer);

var _emptyElement = require('empty-element');

var _emptyElement2 = _interopRequireDefault(_emptyElement);

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

var _backTop = require('../backTop');

var _backTop2 = _interopRequireDefault(_backTop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _page2.default)('/about', _header2.default, _footer2.default, _backTop2.default, function () {
  var container = document.getElementById('main-container');
  (0, _emptyElement2.default)(container).appendChild(_template2.default);
});

},{"../backTop":20,"../footer":36,"../header":38,"./template":17,"empty-element":4,"page":12}],17:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n  <main class="aboutUs">\n    ', '\n    <section class="aboutPrimera">\n      <article class="aboutPrimeraLaterales">\n        <div class="lateralesPartes">\n          <hgroup>\n            <h3>Personal Especializado</h3>\n            <p>Ingenieros t\xE9cnicos y Mag\xEDsters en Ac\xFAstica estudiar\xE1n los detalles de su proyecto</p>\n          </hgroup>\n          <i class="fa fa-check" aria-hidden="true"></i>\n        </div>\n        <div class="lateralesPartes">\n          <hgroup>\n            <h3>T\xE9cnicas Novedosas</h3>\n            <p>Software de simulaci\xF3n propio en 2D y 3D para el desarrollo de las soluciones</p>\n          </hgroup>\n          <i class="fa fa-cubes" aria-hidden="true"></i>\n        </div>\n        <div class="lateralesPartes">\n          <hgroup>\n            <h3>Soluciones de calidad</h3>\n            <p>Estudio exhaustivo de las condiciones existentes para diagnosticar la soluci\xF3n ac\xFAstica \xF3ptima</p>\n          </hgroup>\n          <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>\n        </div>\n      </article>\n      <article class="logo"></article>\n      <article class="aboutPrimeraLaterales">\n        <div class="lateralesPartes derecha">\n          <i class="fa fa-pencil" aria-hidden="true"></i>\n          <hgroup>\n            <h3>Dise\xF1o de interiores</h3>\n            <p>Trabajos finales con los acabados profesionales que usted est\xE1 buscando</p>\n          </hgroup>\n        </div>\n        <div class="lateralesPartes derecha">\n          <i class="fa fa-recycle" aria-hidden="true"></i>\n          <hgroup>\n            <h3>Materiales Reciclados</h3>\n            <p>Preocupados por el medio-ambiente nuestros materiales no son nocivos para la salud como la fibra de vidrio</p>\n          </hgroup>\n        </div>\n        <div class="lateralesPartes derecha">\n          <i class="fa fa-clock-o" aria-hidden="true"></i>\n          <hgroup>\n            <h3>Puntualidad y limpieza</h3>\n            <p>Trabajamos con orden y disciplina para que usted no se sienta invadido durante las funciones asignadas</p>\n          </hgroup>\n        </div>\n      </article>\n    </section>\n    <section class="aboutSegunda">\n      <article class="columna">\n        <p>EA Panam\xE1 nace en la Ciudad de Panam\xE1 en el a\xF1o 2014. Formada por un grupo de j\xF3venes emprendedores Europeos y Paname\xF1os que han apostado por ofrecer una soluci\xF3n a los problemas ac\xFAsticos que se presentan en la Ciudad de Panam\xE1. El principal objetivo es brindar una alta calidad en todos nuestros servicios.</p>\n        <p>La corporaci\xF3n se compromete con el medio ambiente, preocup\xE1ndose desde el origen de sus insumos hasta el impacto ambiental de la actividad empresarial.</p>\n      </article>\n      <article class="columna">\n        <p>Esta compa\xF1\xEDa se mantiene a la vanguardia de la tecnolog\xEDa, por esto apuesta por un programa de investigaci\xF3n y desarrollo contando con especialistas con a\xF1os de experiencia dedicados a la investigaci\xF3n en el campo de la ac\xFAstica.</p>\n        <p>Brindamos soluciones de alta calidad, contando con un personal altamente capacitado y relaciones de confianza con nuestrosproveedores. Soluciones con total confidencialidad e imparcialidad, aseguran la entera confianza de nuestros clientes.</p>\n      </article>\n      <article class="columna">\n        <p>La MISI\xD3N de EA Panam\xE1 es proveer a nuestros clientes con Servicios, Productos y Tecnolog\xEDas innovadoras, a trav\xE9s de la investigaci\xF3n y desarrollo, para dar soluciones ac\xFAsticas de calidad a sus necesidades; comprometidos siempre con el medio ambiente, la sociedad y el buen servicio al cliente.</p>\n        <p>Nuestra VISI\xD3N, ser la empresa de soluciones ac\xFAsticas l\xEDder en la regi\xF3n, convirti\xE9ndonos as\xED en una referencia para el desarrollo, investigaci\xF3n, innovaci\xF3n y buen servicio.</p>\n      </article>\n    </section>\n    <section class="aboutInfo">\n      <article class="infoAncho">\n        <span class="dropcap">E</span>\n        <p>voluci\xF3n. Las grandes ciudades avanzan su desarrollo y esto da como resultado inherente un aumento de los niveles de ruido ambiental. La poblaci\xF3n se ve entonces sometida a altos niveles de ruido que dificultan sus tareas diarias y cotidianas tales como estudiar, concentrarse en el trabajo, y lo que es a\xFAn m\xE1s importante, <strong>el descanso</strong>. Partiendo de la base que el descanso es algo primordial y necesario para el ser humano, surge una <strong>necesidad de cambio</strong> en el nivel de vida de los habitantes de la ciudad.</p>\n        <span class="dropcap">A</span>\n        <p>l final del proceso, y el objetivo de la compa\xF1\xEDa, <strong>es ofrecer soluciones efectivas a los problemas de ruido diarios</strong>. Desde ah\xED, la empresa en sus gabinetes de asesor\xEDa ac\xFAstica pueden analizar y estudiar en profundidad cada caso para determinar con exactitud qu\xE9 es lo que el cliente necesita. Por ejemplo, resultar\xEDa insensato colocar una partici\xF3n de aislamiento con un STC de 55 dB si usted s\xF3lo necesita un STC de 35 dB. Este es el pilar de la empresa, soluciones a su medida.</p>\n      </article>\n      <article class="infoCompuesto">\n        <div>\n          <p>Pero no solo el confort ac\xFAstico parte del aislamiento que pueda ofrecer una partici\xF3n, si no que tambi\xE9n hay que tener en cuenta c\xF3mo se comporta el sonido en el interior de una sala, y los siguientes efectos se pueden suceder en su sala:</p>\n          <ul>\n            <li>Ecos</li>\n            <li>Reverberaci\xF3n</li>\n            <li>Reflexiones</li>\n            <li>Focalizaciones</li>\n          </ul>\n          <p>\xC9stos, y muchos otros par\xE1metros, son muy importantes para conseguir el resultado esperado en cualquier tipo de local.</p>\n          <p><strong>No solo existe la ac\xFAstica en teatros</strong>. Imag\xEDnese que est\xE1 usted en su sala de conferencia, de cristal, y a su alrededor no hay m\xE1s que superficies reflectantes; esto perjudicar\xE1 notablemente que usted pueda mantener una conversaci\xF3n normal con sus compa\xF1eros de trabajo, o en la llamada internacional con su cliente. El dise\xF1o ac\xFAstico de interiores es algo determinista para poder conseguir el resultado esperado. Materiales absorbentes, reflectantes, y difusores de sonido han de ser estudiados en profundidad y ser estrat\xE9gicamente colocados para hacer su funci\xF3n correctamente. Si tenemos una mala disposici\xF3n o distribuci\xF3n espacial la afectaci\xF3n puede ser m\xE1xima, por lo que es recomendable siempre analizar las peculiaridades de cada sala.</p>\n      </div>\n          <div class="infoCompuestoImagen"></div>\n      </article>\n      <article class="infoIcons">\n        <div>\n          <i class="fa fa-phone" aria-hidden="true"></i>\n          <h5>Contacta con nosotros y exp\xF3n tu problema</h5>\n        </div>\n        <div>\n          <i class="fa fa-pencil" aria-hidden="true"></i>\n          <h5>An\xE1lisis de campo y estudio de soluciones</h5>\n        </div>\n        <div>\n          <i class="fa fa-lightbulb-o" aria-hidden="true"></i>\n          <h5>Ejecuci\xF3n del proyecto ac\xFAstico</h5>\n        </div>\n      </article>\n    </section>\n  </main>\n'], ['\n  <main class="aboutUs">\n    ', '\n    <section class="aboutPrimera">\n      <article class="aboutPrimeraLaterales">\n        <div class="lateralesPartes">\n          <hgroup>\n            <h3>Personal Especializado</h3>\n            <p>Ingenieros t\xE9cnicos y Mag\xEDsters en Ac\xFAstica estudiar\xE1n los detalles de su proyecto</p>\n          </hgroup>\n          <i class="fa fa-check" aria-hidden="true"></i>\n        </div>\n        <div class="lateralesPartes">\n          <hgroup>\n            <h3>T\xE9cnicas Novedosas</h3>\n            <p>Software de simulaci\xF3n propio en 2D y 3D para el desarrollo de las soluciones</p>\n          </hgroup>\n          <i class="fa fa-cubes" aria-hidden="true"></i>\n        </div>\n        <div class="lateralesPartes">\n          <hgroup>\n            <h3>Soluciones de calidad</h3>\n            <p>Estudio exhaustivo de las condiciones existentes para diagnosticar la soluci\xF3n ac\xFAstica \xF3ptima</p>\n          </hgroup>\n          <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>\n        </div>\n      </article>\n      <article class="logo"></article>\n      <article class="aboutPrimeraLaterales">\n        <div class="lateralesPartes derecha">\n          <i class="fa fa-pencil" aria-hidden="true"></i>\n          <hgroup>\n            <h3>Dise\xF1o de interiores</h3>\n            <p>Trabajos finales con los acabados profesionales que usted est\xE1 buscando</p>\n          </hgroup>\n        </div>\n        <div class="lateralesPartes derecha">\n          <i class="fa fa-recycle" aria-hidden="true"></i>\n          <hgroup>\n            <h3>Materiales Reciclados</h3>\n            <p>Preocupados por el medio-ambiente nuestros materiales no son nocivos para la salud como la fibra de vidrio</p>\n          </hgroup>\n        </div>\n        <div class="lateralesPartes derecha">\n          <i class="fa fa-clock-o" aria-hidden="true"></i>\n          <hgroup>\n            <h3>Puntualidad y limpieza</h3>\n            <p>Trabajamos con orden y disciplina para que usted no se sienta invadido durante las funciones asignadas</p>\n          </hgroup>\n        </div>\n      </article>\n    </section>\n    <section class="aboutSegunda">\n      <article class="columna">\n        <p>EA Panam\xE1 nace en la Ciudad de Panam\xE1 en el a\xF1o 2014. Formada por un grupo de j\xF3venes emprendedores Europeos y Paname\xF1os que han apostado por ofrecer una soluci\xF3n a los problemas ac\xFAsticos que se presentan en la Ciudad de Panam\xE1. El principal objetivo es brindar una alta calidad en todos nuestros servicios.</p>\n        <p>La corporaci\xF3n se compromete con el medio ambiente, preocup\xE1ndose desde el origen de sus insumos hasta el impacto ambiental de la actividad empresarial.</p>\n      </article>\n      <article class="columna">\n        <p>Esta compa\xF1\xEDa se mantiene a la vanguardia de la tecnolog\xEDa, por esto apuesta por un programa de investigaci\xF3n y desarrollo contando con especialistas con a\xF1os de experiencia dedicados a la investigaci\xF3n en el campo de la ac\xFAstica.</p>\n        <p>Brindamos soluciones de alta calidad, contando con un personal altamente capacitado y relaciones de confianza con nuestrosproveedores. Soluciones con total confidencialidad e imparcialidad, aseguran la entera confianza de nuestros clientes.</p>\n      </article>\n      <article class="columna">\n        <p>La MISI\xD3N de EA Panam\xE1 es proveer a nuestros clientes con Servicios, Productos y Tecnolog\xEDas innovadoras, a trav\xE9s de la investigaci\xF3n y desarrollo, para dar soluciones ac\xFAsticas de calidad a sus necesidades; comprometidos siempre con el medio ambiente, la sociedad y el buen servicio al cliente.</p>\n        <p>Nuestra VISI\xD3N, ser la empresa de soluciones ac\xFAsticas l\xEDder en la regi\xF3n, convirti\xE9ndonos as\xED en una referencia para el desarrollo, investigaci\xF3n, innovaci\xF3n y buen servicio.</p>\n      </article>\n    </section>\n    <section class="aboutInfo">\n      <article class="infoAncho">\n        <span class="dropcap">E</span>\n        <p>voluci\xF3n. Las grandes ciudades avanzan su desarrollo y esto da como resultado inherente un aumento de los niveles de ruido ambiental. La poblaci\xF3n se ve entonces sometida a altos niveles de ruido que dificultan sus tareas diarias y cotidianas tales como estudiar, concentrarse en el trabajo, y lo que es a\xFAn m\xE1s importante, <strong>el descanso</strong>. Partiendo de la base que el descanso es algo primordial y necesario para el ser humano, surge una <strong>necesidad de cambio</strong> en el nivel de vida de los habitantes de la ciudad.</p>\n        <span class="dropcap">A</span>\n        <p>l final del proceso, y el objetivo de la compa\xF1\xEDa, <strong>es ofrecer soluciones efectivas a los problemas de ruido diarios</strong>. Desde ah\xED, la empresa en sus gabinetes de asesor\xEDa ac\xFAstica pueden analizar y estudiar en profundidad cada caso para determinar con exactitud qu\xE9 es lo que el cliente necesita. Por ejemplo, resultar\xEDa insensato colocar una partici\xF3n de aislamiento con un STC de 55 dB si usted s\xF3lo necesita un STC de 35 dB. Este es el pilar de la empresa, soluciones a su medida.</p>\n      </article>\n      <article class="infoCompuesto">\n        <div>\n          <p>Pero no solo el confort ac\xFAstico parte del aislamiento que pueda ofrecer una partici\xF3n, si no que tambi\xE9n hay que tener en cuenta c\xF3mo se comporta el sonido en el interior de una sala, y los siguientes efectos se pueden suceder en su sala:</p>\n          <ul>\n            <li>Ecos</li>\n            <li>Reverberaci\xF3n</li>\n            <li>Reflexiones</li>\n            <li>Focalizaciones</li>\n          </ul>\n          <p>\xC9stos, y muchos otros par\xE1metros, son muy importantes para conseguir el resultado esperado en cualquier tipo de local.</p>\n          <p><strong>No solo existe la ac\xFAstica en teatros</strong>. Imag\xEDnese que est\xE1 usted en su sala de conferencia, de cristal, y a su alrededor no hay m\xE1s que superficies reflectantes; esto perjudicar\xE1 notablemente que usted pueda mantener una conversaci\xF3n normal con sus compa\xF1eros de trabajo, o en la llamada internacional con su cliente. El dise\xF1o ac\xFAstico de interiores es algo determinista para poder conseguir el resultado esperado. Materiales absorbentes, reflectantes, y difusores de sonido han de ser estudiados en profundidad y ser estrat\xE9gicamente colocados para hacer su funci\xF3n correctamente. Si tenemos una mala disposici\xF3n o distribuci\xF3n espacial la afectaci\xF3n puede ser m\xE1xima, por lo que es recomendable siempre analizar las peculiaridades de cada sala.</p>\n      </div>\n          <div class="infoCompuestoImagen"></div>\n      </article>\n      <article class="infoIcons">\n        <div>\n          <i class="fa fa-phone" aria-hidden="true"></i>\n          <h5>Contacta con nosotros y exp\xF3n tu problema</h5>\n        </div>\n        <div>\n          <i class="fa fa-pencil" aria-hidden="true"></i>\n          <h5>An\xE1lisis de campo y estudio de soluciones</h5>\n        </div>\n        <div>\n          <i class="fa fa-lightbulb-o" aria-hidden="true"></i>\n          <h5>Ejecuci\xF3n del proyecto ac\xFAstico</h5>\n        </div>\n      </article>\n    </section>\n  </main>\n']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

var _cabecera = require('../cabecera');

var _cabecera2 = _interopRequireDefault(_cabecera);

var _datos = require('../cabecera/datos');

var _datos2 = _interopRequireDefault(_datos);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = (0, _yoYo2.default)(_templateObject, (0, _cabecera2.default)(_datos2.default.about));

},{"../cabecera":29,"../cabecera/datos":28,"yo-yo":14}],18:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n  <div>\n    ', '\n    <section class=\'sectionArticulo\'>\n      <article class="articuloIzquierda">\n        ', '\n        <h5>', '</h5>\n      </article>\n      <article class="articuloContenido">\n        ', '\n      </article>\n    </section>\n    <div class="subMenu" id="subMenu"></div>\n  </div>\n  '], ['\n  <div>\n    ', '\n    <section class=\'sectionArticulo\'>\n      <article class="articuloIzquierda">\n        ', '\n        <h5>', '</h5>\n      </article>\n      <article class="articuloContenido">\n        ', '\n      </article>\n    </section>\n    <div class="subMenu" id="subMenu"></div>\n  </div>\n  ']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

var _cabecera = require('../cabecera');

var _cabecera2 = _interopRequireDefault(_cabecera);

var _datos = require('../cabecera/datos');

var _datos2 = _interopRequireDefault(_datos);

var _social = require('../social');

var _social2 = _interopRequireDefault(_social);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = function (articulo) {
  var el = (0, _yoYo2.default)(_templateObject, (0, _cabecera2.default)(articulo), (0, _social2.default)(), articulo.fecha, articulo.contenido);
  return el;
};

},{"../cabecera":29,"../cabecera/datos":28,"../social":70,"yo-yo":14}],19:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n  <main>\n', '\n  </main>\n  '], ['\n  <main>\n', '\n  </main>\n  ']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

var _articulo = require('./articulo');

var _articulo2 = _interopRequireDefault(_articulo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = function (articulos, ident) {
  var el = (0, _yoYo2.default)(_templateObject, articulos.map(function (articulo) {
    if (articulo.titulo.replace(/ /g, '-') == ident) {
      return (0, _articulo2.default)(articulo);
    }
  }));
  return el;
};

},{"./articulo":18,"yo-yo":14}],20:[function(require,module,exports){
'use strict';

var _emptyElement = require('empty-element');

var _emptyElement2 = _interopRequireDefault(_emptyElement);

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (ctx, next) {
  var container = document.getElementById('backTopContainer');
  (0, _emptyElement2.default)(container).appendChild(_template2.default);
  next();
};

},{"./template":21,"empty-element":4}],21:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n  <a href="" id="backTop" class="backTop" onclick=', '>\n    <i class="fa fa-angle-up" aria-hidden="true"></i>\n    <p>top</p>\n  </a>\n'], ['\n  <a href="" id="backTop" class="backTop" onclick=', '>\n    <i class="fa fa-angle-up" aria-hidden="true"></i>\n    <p>top</p>\n  </a>\n']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var subir = function subir() {
  window.scrollTo(0, 0);
};

module.exports = (0, _yoYo2.default)(_templateObject, subir);

},{"yo-yo":14}],22:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n    <div>\n      <p>Si estuvo expuesto durante los Carnavales al ambiente ruidoso predominante usted podr\xEDa padecer trauma ac\xFAstico.</p>\n      <p>Esta patolog\xEDa, seg\xFAn explic\xF3 el Dr. Rolando Mu\xF1oz, otorrinolaring\xF3logo del Hospital Santo Tom\xE1s, HST, es una alteraci\xF3n irreversible de la audici\xF3n, a consecuencia de la exposici\xF3n prolongada a ambientes ruidosos ya sea debido a una actividad profesional o como en el caso de los carnavales en que en el momento de la diversi\xF3n las personas se olvidan tomar precauciones.</p>\n      <p>\u201CEl ruido ambiental, el ruido de los cohetes y de las bocinas f\xE1cilmente pueden ocasionar un trauma ac\xFAstico\u201D, dijo el especialista.</p>\n      <p>\xBFQuiere saber si usted lo padece? A continuaci\xF3n los s\xEDntomas: lesiones t\xEDmpano-sicular, p\xE9rdida de la audici\xF3n por lesiones en el o\xEDdo interno, zumbidos del o\xEDdo, alteraciones del sistema de equilibrio.El otorrinolaring\xF3logo del HST dijo que el diagn\xF3stico se hace de la siguiente manera: 1. Por antecedentes de exposici\xF3n al ruido., 2. Por estudios funcionales de la audici\xF3n., 3. Por Rayos XTambi\xE9n las personas que suelen asistir con frecuencia a discotecas y otros lugares ruidosos pueden padecer trauma ac\xFAstico. Ellas y quienes por su trabajo se exponen a ambientes ruidosos deben usar protecci\xF3n en sus o\xEDdos para evitar lesiones.</p>\n      <p>El Dr. Mu\xF1oz hace \xE9nfasis en la necesidad de que cada individuo tome conciencia de que por descuido, ignorancia o irresponsabilidad, suya o de otros, puede sufrir trauma ac\xFAstico.Asimismo, insta a continuar las acciones educativas sobre ruido, audici\xF3n y protagonismo social, en una campa\xF1a de prevenci\xF3n de la sordera en Panam\xE1 donde est\xE9n comprometidos todos los sectores.</p>\n      <p>Hay que adoptar medidas de \xEDndole administrativas y preventivas, porque la poblaci\xF3n, especialmente la juventud, que gusta de exponerse de manera negligente al ruido es candidata a sufrir p\xE9rdidas auditivas importantes.</p>\n    </div>'], ['\n    <div>\n      <p>Si estuvo expuesto durante los Carnavales al ambiente ruidoso predominante usted podr\xEDa padecer trauma ac\xFAstico.</p>\n      <p>Esta patolog\xEDa, seg\xFAn explic\xF3 el Dr. Rolando Mu\xF1oz, otorrinolaring\xF3logo del Hospital Santo Tom\xE1s, HST, es una alteraci\xF3n irreversible de la audici\xF3n, a consecuencia de la exposici\xF3n prolongada a ambientes ruidosos ya sea debido a una actividad profesional o como en el caso de los carnavales en que en el momento de la diversi\xF3n las personas se olvidan tomar precauciones.</p>\n      <p>\u201CEl ruido ambiental, el ruido de los cohetes y de las bocinas f\xE1cilmente pueden ocasionar un trauma ac\xFAstico\u201D, dijo el especialista.</p>\n      <p>\xBFQuiere saber si usted lo padece? A continuaci\xF3n los s\xEDntomas: lesiones t\xEDmpano-sicular, p\xE9rdida de la audici\xF3n por lesiones en el o\xEDdo interno, zumbidos del o\xEDdo, alteraciones del sistema de equilibrio.El otorrinolaring\xF3logo del HST dijo que el diagn\xF3stico se hace de la siguiente manera: 1. Por antecedentes de exposici\xF3n al ruido., 2. Por estudios funcionales de la audici\xF3n., 3. Por Rayos XTambi\xE9n las personas que suelen asistir con frecuencia a discotecas y otros lugares ruidosos pueden padecer trauma ac\xFAstico. Ellas y quienes por su trabajo se exponen a ambientes ruidosos deben usar protecci\xF3n en sus o\xEDdos para evitar lesiones.</p>\n      <p>El Dr. Mu\xF1oz hace \xE9nfasis en la necesidad de que cada individuo tome conciencia de que por descuido, ignorancia o irresponsabilidad, suya o de otros, puede sufrir trauma ac\xFAstico.Asimismo, insta a continuar las acciones educativas sobre ruido, audici\xF3n y protagonismo social, en una campa\xF1a de prevenci\xF3n de la sordera en Panam\xE1 donde est\xE9n comprometidos todos los sectores.</p>\n      <p>Hay que adoptar medidas de \xEDndole administrativas y preventivas, porque la poblaci\xF3n, especialmente la juventud, que gusta de exponerse de manera negligente al ruido es candidata a sufrir p\xE9rdidas auditivas importantes.</p>\n    </div>']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = [{
  id: '1',
  titulo: 'Exposición a Ruido en los Carnavales',
  fecha: '10 Febrero 2016',
  descripcion: ' Si estuvo expuesto durante los Carnavales al ambiente ruidoso predominante usted podría padecer trauma acústico.',
  imagen: 'https://static.pexels.com/photos/247135/pexels-photo-247135.jpeg',
  contenido: (0, _yoYo2.default)(_templateObject)
}];

},{"yo-yo":14}],23:[function(require,module,exports){
'use strict';

var _page = require('page');

var _page2 = _interopRequireDefault(_page);

var _header = require('../header');

var _header2 = _interopRequireDefault(_header);

var _footer = require('../footer');

var _footer2 = _interopRequireDefault(_footer);

var _emptyElement = require('empty-element');

var _emptyElement2 = _interopRequireDefault(_emptyElement);

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

var _backTop = require('../backTop');

var _backTop2 = _interopRequireDefault(_backTop);

var _metaData = require('../metaData');

var _metaData2 = _interopRequireDefault(_metaData);

var _metaData3 = require('./metaData');

var _metaData4 = _interopRequireDefault(_metaData3);

var _articulos = require('./articulos');

var _articulos2 = _interopRequireDefault(_articulos);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _page2.default)('/blog', _header2.default, _footer2.default, _backTop2.default, function () {
  var container = document.getElementById('main-container');
  (0, _emptyElement2.default)(container).appendChild((0, _template2.default)(_articulos2.default));
  (0, _metaData2.default)(_metaData4.default.title, _metaData4.default.description, _metaData4.default.keywords);
});

},{"../backTop":20,"../footer":36,"../header":38,"../metaData":54,"./articulos":22,"./metaData":24,"./template":26,"empty-element":4,"page":12}],24:[function(require,module,exports){
'use strict';

module.exports = {
  title: 'EAPanamá-Blog',
  keywords: 'Acondicionamiento acústico, Aislamiento acústico, Control de ruido industrial, Instalaciones de audio, Venta de materiales acústicos.',
  description: 'En EA Panamá ofrecemos todo tipo de soluciones acústicas de calidad en los campos de aislamiento en la edificación, acústica medioambiental, diseño y acondicionamiento de recintos, instalaciones audiovisuales así como venta de materiales acústicos, sonógrafos y equipos de audio.' };

},{}],25:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n    <a class="tarjeta" href="/blog/', '">\n      <div class="tarjetaImagen" style="background: url(\'', '\'); background-size: cover"></div>\n      <div class="tarjetaTexto">\n        <h3>', '</h3>\n        <h5>', '</h5>\n        <p>', '</p>\n        ', '\n      </div>\n    </a>\n  '], ['\n    <a class="tarjeta" href="/blog/', '">\n      <div class="tarjetaImagen" style="background: url(\'', '\'); background-size: cover"></div>\n      <div class="tarjetaTexto">\n        <h3>', '</h3>\n        <h5>', '</h5>\n        <p>', '</p>\n        ', '\n      </div>\n    </a>\n  ']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

var _social = require('../social');

var _social2 = _interopRequireDefault(_social);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = function (articulo) {
  var el = (0, _yoYo2.default)(_templateObject, articulo.titulo.replace(/ /g, '-'), articulo.imagen, articulo.titulo, articulo.fecha, articulo.descripcion, (0, _social2.default)());
  return el;
};

},{"../social":70,"yo-yo":14}],26:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n    <main>\n      ', '\n      <section class="blogSection">\n        ', '\n      </section>\n    </main>\n  '], ['\n    <main>\n      ', '\n      <section class="blogSection">\n        ', '\n      </section>\n    </main>\n  ']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

var _cabecera = require('../cabecera');

var _cabecera2 = _interopRequireDefault(_cabecera);

var _datos = require('../cabecera/datos');

var _datos2 = _interopRequireDefault(_datos);

var _tarjeta = require('./tarjeta');

var _tarjeta2 = _interopRequireDefault(_tarjeta);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = function (articulos) {
  var el = (0, _yoYo2.default)(_templateObject, (0, _cabecera2.default)(_datos2.default.blog), articulos.map(function (articulo) {
    return (0, _tarjeta2.default)(articulo);
  }));
  return el;
};

},{"../cabecera":29,"../cabecera/datos":28,"./tarjeta":25,"yo-yo":14}],27:[function(require,module,exports){
'use strict';

var _page = require('page');

var _page2 = _interopRequireDefault(_page);

var _emptyElement = require('empty-element');

var _emptyElement2 = _interopRequireDefault(_emptyElement);

var _header = require('../header');

var _header2 = _interopRequireDefault(_header);

var _footer = require('../footer');

var _footer2 = _interopRequireDefault(_footer);

var _backTop = require('../backTop');

var _backTop2 = _interopRequireDefault(_backTop);

var _articulos = require('../blog/articulos');

var _articulos2 = _interopRequireDefault(_articulos);

var _template = require('../articulo/template');

var _template2 = _interopRequireDefault(_template);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _page2.default)('/blog/:titulo', _header2.default, _footer2.default, _backTop2.default, function (ctx, next) {
  console.log('uff');
  var container = document.getElementById('main-container');
  (0, _emptyElement2.default)(container).appendChild((0, _template2.default)(_articulos2.default, ctx.params.titulo));
});

},{"../articulo/template":19,"../backTop":20,"../blog/articulos":22,"../footer":36,"../header":38,"empty-element":4,"page":12}],28:[function(require,module,exports){
'use strict';

var cabeceraDatos = {
  about: {
    titulo: 'about',
    subtitulo: 'Conoce cómo es la empresa pionera en acústica de Panamá.',
    imagen: 'imagenes/about-home.png'
  },
  blog: {
    titulo: 'blog',
    subtitulo: 'Las últimas noticias y tendencias acerca del mundo acústico.',
    imagen: 'imagenes/blog-home.png'
  },
  servicios: {
    titulo: 'servicios',
    subtitulo: 'Resolvemos sus problemas acústicos, déjenos saber su caso.',
    imagen: 'imagenes/servicios-home.png'
  },
  productos: {
    titulo: 'productos',
    subtitulo: 'Productos acústicos de calidad al mejor precio de Panamá.',
    imagen: 'imagenes/productos-home.png'
  },
  portafolio: {
    titulo: 'portafolio',
    subtitulo: 'Clientes que han disfrutado de servicios y productos acústicos.',
    imagen: 'imagenes/portfolio-home.png'
  },
  contactar: {
    titulo: 'contactar',
    subtitulo: 'Visita nuestras instalaciones para ver nuestros servicios y productos.',
    imagen: 'imagenes/contactar-home.jpg'
  }
};

module.exports = cabeceraDatos;

},{}],29:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n    <section class="demasPortada">\n      <hgroup>\n        <h2>', '</h2>\n        <p>', '</p>\n      </hgroup>\n      <div class="demasPortadaImagen" style="background: url(\'', '\'); background-size: cover"></div>\n    </section>\n  '], ['\n    <section class="demasPortada">\n      <hgroup>\n        <h2>', '</h2>\n        <p>', '</p>\n      </hgroup>\n      <div class="demasPortadaImagen" style="background: url(\'', '\'); background-size: cover"></div>\n    </section>\n  ']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = function (datos) {
  var el = (0, _yoYo2.default)(_templateObject, datos.titulo, datos.subtitulo, datos.imagen);
  return el;
};

},{"yo-yo":14}],30:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['<script type=\'text/javascript\' src=\'https://maps.googleapis.com/maps/api/js?key=AIzaSyDMAreQT9pdjdYL-mCkj7ixSjdu3oaAxlg\'></script>'], ['<script type=\'text/javascript\' src=\'https://maps.googleapis.com/maps/api/js?key=AIzaSyDMAreQT9pdjdYL-mCkj7ixSjdu3oaAxlg\'></script>']),
    _templateObject2 = _taggedTemplateLiteral(['<script type=\'application/javascript\' src=\'mapa.js\'>initialize()</script>'], ['<script type=\'application/javascript\' src=\'mapa.js\'>initialize()</script>']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = function () {
  var container = document.getElementById('body');
  var script1 = (0, _yoYo2.default)(_templateObject);
  var script2 = (0, _yoYo2.default)(_templateObject2);
  container.appendChild(script1);
  container.appendChild(script2);
};

},{"yo-yo":14}],31:[function(require,module,exports){
'use strict';

var _page = require('page');

var _page2 = _interopRequireDefault(_page);

var _header = require('../header');

var _header2 = _interopRequireDefault(_header);

var _footer = require('../footer');

var _footer2 = _interopRequireDefault(_footer);

var _emptyElement = require('empty-element');

var _emptyElement2 = _interopRequireDefault(_emptyElement);

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

var _backTop = require('../backTop');

var _backTop2 = _interopRequireDefault(_backTop);

var _metaData = require('../metaData');

var _metaData2 = _interopRequireDefault(_metaData);

var _metaData3 = require('./metaData');

var _metaData4 = _interopRequireDefault(_metaData3);

var _googleApi = require('./googleApi');

var _googleApi2 = _interopRequireDefault(_googleApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _page2.default)('/contactar', _header2.default, _footer2.default, _backTop2.default, function (ctx, next) {
  var container = document.getElementById('main-container');
  (0, _emptyElement2.default)(container).appendChild(_template2.default);
  (0, _metaData2.default)(_metaData4.default.title, _metaData4.default.description, _metaData4.default.keywords);
  (0, _googleApi2.default)();
});

},{"../backTop":20,"../footer":36,"../header":38,"../metaData":54,"./googleApi":30,"./metaData":32,"./template":33,"empty-element":4,"page":12}],32:[function(require,module,exports){
'use strict';

module.exports = {
  title: 'EAPanamá-Contacto',
  keywords: 'Panamá Acústica, Panamá ruido, Panamá aislamiento, Panamá eco, Panamá, acústica.',
  description: 'Consulta información, cotizaciones o pide cita con uno de nuestros comerciales para su problema acústico o problema de ruido.' };

},{}],33:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n  <main>\n    ', '\n    <section class="noHomeSection">\n      <article class="mapa">\n        <div id="map_canvas" style="width:100%; height:100%">\n        </div>\n      </article>\n    </section>\n    <section class="noHomeSection arriba">\n      <article class="horarios">\n        <h2>HORARIOS:</h2>\n        <p><i class="fa fa-clock-o" aria-hidden="true"></i> Lunes a Viernes: de 8:00 am a 4:30 pm <br>    S\xE1bados: de 8:00 am a 12:00 pm <br>\n<i class="fa fa-phone" aria-hidden="true"></i> Ll\xE1manos al 390-9933 <br> <i class="fa fa-whatsapp" aria-hidden="true"></i>WhatsApp : 6541-1203</p>\n      </article>\n      <form method="post" action="contactar/send" class="formulario">\n        <h2>ENV\xCDANOS UN MENSAJE:</h2>\n        <div class="formLine">\n          <p>Nombre:</p>\n          <input type="text" name="nombre" value="Nombre">\n        </div>\n        <div class="formLine"><p>Email:</p>\n        <input id="email" type="email" name="email" value="Email"></div>\n        <div class="formLine"><p>Telefono:</p>\n        <input type="text" name="telefono" value="Telefono"></div>\n        <div class="formLine"><p>Mensaje:</p>\n          <textarea name="message" rows="8" cols="80" value="Escriba Un Mensaje"></textarea>\n        </div>\n        <input type="submit" value="Enviar" class="callToAction formButton">\n      </form>\n    </section>\n  </main>\n'], ['\n  <main>\n    ', '\n    <section class="noHomeSection">\n      <article class="mapa">\n        <div id="map_canvas" style="width:100%; height:100%">\n        </div>\n      </article>\n    </section>\n    <section class="noHomeSection arriba">\n      <article class="horarios">\n        <h2>HORARIOS:</h2>\n        <p><i class="fa fa-clock-o" aria-hidden="true"></i> Lunes a Viernes: de 8:00 am a 4:30 pm <br>    S\xE1bados: de 8:00 am a 12:00 pm <br>\n<i class="fa fa-phone" aria-hidden="true"></i> Ll\xE1manos al 390-9933 <br> <i class="fa fa-whatsapp" aria-hidden="true"></i>WhatsApp : 6541-1203</p>\n      </article>\n      <form method="post" action="contactar/send" class="formulario">\n        <h2>ENV\xCDANOS UN MENSAJE:</h2>\n        <div class="formLine">\n          <p>Nombre:</p>\n          <input type="text" name="nombre" value="Nombre">\n        </div>\n        <div class="formLine"><p>Email:</p>\n        <input id="email" type="email" name="email" value="Email"></div>\n        <div class="formLine"><p>Telefono:</p>\n        <input type="text" name="telefono" value="Telefono"></div>\n        <div class="formLine"><p>Mensaje:</p>\n          <textarea name="message" rows="8" cols="80" value="Escriba Un Mensaje"></textarea>\n        </div>\n        <input type="submit" value="Enviar" class="callToAction formButton">\n      </form>\n    </section>\n  </main>\n']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

var _cabecera = require('../cabecera');

var _cabecera2 = _interopRequireDefault(_cabecera);

var _datos = require('../cabecera/datos');

var _datos2 = _interopRequireDefault(_datos);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = (0, _yoYo2.default)(_templateObject, (0, _cabecera2.default)(_datos2.default.contactar));

},{"../cabecera":29,"../cabecera/datos":28,"yo-yo":14}],34:[function(require,module,exports){
'use strict';

var _page = require('page');

var _page2 = _interopRequireDefault(_page);

var _emptyElement = require('empty-element');

var _emptyElement2 = _interopRequireDefault(_emptyElement);

var _header = require('../header');

var _header2 = _interopRequireDefault(_header);

var _footer = require('../footer');

var _footer2 = _interopRequireDefault(_footer);

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _page2.default)('/confirmacion', _header2.default, _footer2.default, function (ctx, next) {
  var container = document.getElementById('main-container');
  (0, _emptyElement2.default)(container).appendChild(_template2.default);
});

},{"../footer":36,"../header":38,"./template":35,"empty-element":4,"page":12}],35:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n<main>\n  ', '\n  <section class="confirmaci\xF3n">\n    <h2>Tu Mensaje ha sido enviado</h2>\n    <h5>Puedes hechar un vistazo a nuestros servicios</h5>\n    <a href="/servicio" class="callToAction">Servicios</a>\n  </section>\n</main>\n'], ['\n<main>\n  ', '\n  <section class="confirmaci\xF3n">\n    <h2>Tu Mensaje ha sido enviado</h2>\n    <h5>Puedes hechar un vistazo a nuestros servicios</h5>\n    <a href="/servicio" class="callToAction">Servicios</a>\n  </section>\n</main>\n']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

var _cabecera = require('../cabecera');

var _cabecera2 = _interopRequireDefault(_cabecera);

var _datos = require('../cabecera/datos');

var _datos2 = _interopRequireDefault(_datos);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = (0, _yoYo2.default)(_templateObject, (0, _cabecera2.default)(_datos2.default.contactar));

},{"../cabecera":29,"../cabecera/datos":28,"yo-yo":14}],36:[function(require,module,exports){
'use strict';

var _emptyElement = require('empty-element');

var _emptyElement2 = _interopRequireDefault(_emptyElement);

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function footer(ctx, next) {
  var footer = document.getElementById('footer');
  (0, _emptyElement2.default)(footer).appendChild(_template2.default);
  next();
};

},{"./template":37,"empty-element":4}],37:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n  <footer>\n    <article class="footerCuerpo">\n      <div>\n        <div class="footerLogo"></div>\n        <div class="footerContacto">\n          <div class="telefono">\n            <i class="fa fa-phone" aria-hidden="true"></i>\n            <span>+507 390-9933</span>\n          </div>\n          <a class="mail" href="mailto:info@eapanama.com">\n            <i class="fa fa-envelope" aria-hidden="true"></i>\n            <span>info@eapanama.com</span>\n          </a>\n        </div>\n      </div>\n      <div>\n        <h3>ACCESO R\xC1PIDO</h3>\n        <ul>\n          <li><a href="/about">About</a></li>\n          <li><a href="/portafolio">Portfolio & Upcoming Work</a></li>\n          <li><a href="/productos">Productos</a></li>\n          <li><a href="/contactar">Contactar</a></li>\n        </ul>\n      </div>\n      <div>\n        <h3>PRODUCTOS POPULARES</h3>\n        <ul>\n          <li><a href="#">MGB Board</a></li>\n          <li><a href="#">Rubber Ac\xFAstico</a></li>\n          <li><a href="#">Lana de Roca</a></li>\n          <li><a href="#">RevCloud</a></li>\n          <li><a href="#">Pyramid PU FOAM</a></li>\n        </ul>\n      </div>\n      <div>\n        <h3>\xDALTIMAS ENTRADAS</h3>\n        <div></div>\n        <div></div>\n      </div>\n    </article>\n    <article class="footerPie">\n      <p class="creditos">\n        2017 EA Panam\xE1 S.A.- Galera TecnoPro, Llano Bonito, Juan D\xEDaz ,Panam\xE1\n      </p>\n      <div class="footerMenu"></div>\n    </article>\n  </footer>\n'], ['\n  <footer>\n    <article class="footerCuerpo">\n      <div>\n        <div class="footerLogo"></div>\n        <div class="footerContacto">\n          <div class="telefono">\n            <i class="fa fa-phone" aria-hidden="true"></i>\n            <span>+507 390-9933</span>\n          </div>\n          <a class="mail" href="mailto:info@eapanama.com">\n            <i class="fa fa-envelope" aria-hidden="true"></i>\n            <span>info@eapanama.com</span>\n          </a>\n        </div>\n      </div>\n      <div>\n        <h3>ACCESO R\xC1PIDO</h3>\n        <ul>\n          <li><a href="/about">About</a></li>\n          <li><a href="/portafolio">Portfolio & Upcoming Work</a></li>\n          <li><a href="/productos">Productos</a></li>\n          <li><a href="/contactar">Contactar</a></li>\n        </ul>\n      </div>\n      <div>\n        <h3>PRODUCTOS POPULARES</h3>\n        <ul>\n          <li><a href="#">MGB Board</a></li>\n          <li><a href="#">Rubber Ac\xFAstico</a></li>\n          <li><a href="#">Lana de Roca</a></li>\n          <li><a href="#">RevCloud</a></li>\n          <li><a href="#">Pyramid PU FOAM</a></li>\n        </ul>\n      </div>\n      <div>\n        <h3>\xDALTIMAS ENTRADAS</h3>\n        <div></div>\n        <div></div>\n      </div>\n    </article>\n    <article class="footerPie">\n      <p class="creditos">\n        2017 EA Panam\xE1 S.A.- Galera TecnoPro, Llano Bonito, Juan D\xEDaz ,Panam\xE1\n      </p>\n      <div class="footerMenu"></div>\n    </article>\n  </footer>\n']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = (0, _yoYo2.default)(_templateObject);

},{"yo-yo":14}],38:[function(require,module,exports){
'use strict';

var _emptyElement = require('empty-element');

var _emptyElement2 = _interopRequireDefault(_emptyElement);

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

var _scrollFunction = require('../header/scrollFunction');

var _scrollFunction2 = _interopRequireDefault(_scrollFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function header(ctx, next) {
  var container = document.getElementById('header');
  (0, _emptyElement2.default)(container).appendChild(_template2.default);
  window.addEventListener("scroll", _scrollFunction2.default);
  next();
};

},{"../header/scrollFunction":40,"./template":41,"empty-element":4}],39:[function(require,module,exports){
'use strict';

module.exports = function () {
  var nav = document.getElementById('nav');
  nav.classList.toggle('hidden');
};

},{}],40:[function(require,module,exports){
'use strict';

module.exports = function () {
  var headerContainer = document.getElementById('cabeza');
  var backTop = document.getElementById('backTop');
  if (window.scrollY > 70) {
    headerContainer.classList.add('blanco');
    backTop.classList.add('visible');
  }if (window.scrollY < 70) {
    headerContainer.classList.remove('blanco');
    backTop.classList.remove('visible');
  }
};

},{}],41:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n<div class="headerContainer" id="cabeza">\n  <header id="headerTag" class="feo">\n   <a href="#" class="navButton" onclick=', '>\n      <i class="fa fa-bars" aria-hidden="true"></i>\n    </a>\n   <a href="/">\n     <div id="logo" class="logo"></div>\n   </a>\n   <nav id="nav" class="nav hidden">\n    <ul>\n     <li><a href="/" id="navHome" onclick=', '>HOME</a></li>\n     <li><a href="/about" onclick=', '>ABOUT</a></li>\n     <li><a href="/servicio" onclick=', '>SERVICIOS</a></li>\n     <li><a href="/productos" onclick=', '>PRODUCTOS</a></li>\n     <li><a href="/contactar" onclick=', '>CONTACTAR</a></li>\n    </ul>\n   </nav>\n   ', '\n  </header>\n</div>\n'], ['\n<div class="headerContainer" id="cabeza">\n  <header id="headerTag" class="feo">\n   <a href="#" class="navButton" onclick=', '>\n      <i class="fa fa-bars" aria-hidden="true"></i>\n    </a>\n   <a href="/">\n     <div id="logo" class="logo"></div>\n   </a>\n   <nav id="nav" class="nav hidden">\n    <ul>\n     <li><a href="/" id="navHome" onclick=', '>HOME</a></li>\n     <li><a href="/about" onclick=', '>ABOUT</a></li>\n     <li><a href="/servicio" onclick=', '>SERVICIOS</a></li>\n     <li><a href="/productos" onclick=', '>PRODUCTOS</a></li>\n     <li><a href="/contactar" onclick=', '>CONTACTAR</a></li>\n    </ul>\n   </nav>\n   ', '\n  </header>\n</div>\n']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

var _navigationFunction = require('./navigationFunction');

var _navigationFunction2 = _interopRequireDefault(_navigationFunction);

var _social = require('../social');

var _social2 = _interopRequireDefault(_social);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = (0, _yoYo2.default)(_templateObject, _navigationFunction2.default, _navigationFunction2.default, _navigationFunction2.default, _navigationFunction2.default, _navigationFunction2.default, _navigationFunction2.default, (0, _social2.default)());

},{"../social":70,"./navigationFunction":39,"yo-yo":14}],42:[function(require,module,exports){
'use strict';

var _page = require('page');

var _page2 = _interopRequireDefault(_page);

var _emptyElement = require('empty-element');

var _emptyElement2 = _interopRequireDefault(_emptyElement);

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

var _header = require('../header');

var _header2 = _interopRequireDefault(_header);

var _footer = require('../footer');

var _footer2 = _interopRequireDefault(_footer);

var _backTop = require('../backTop');

var _backTop2 = _interopRequireDefault(_backTop);

var _criticaMovimientoFunction = require('../porqueCriticas/criticaMovimientoFunction');

var _criticaMovimientoFunction2 = _interopRequireDefault(_criticaMovimientoFunction);

var _metaData = require('../metaData');

var _metaData2 = _interopRequireDefault(_metaData);

var _metaData3 = require('./metaData');

var _metaData4 = _interopRequireDefault(_metaData3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _page2.default)('/', _header2.default, _footer2.default, _backTop2.default, function (ctx, next) {
  var main = document.getElementById('main-container');
  (0, _emptyElement2.default)(main).appendChild(_template2.default);
  (0, _metaData2.default)(_metaData4.default.title, _metaData4.default.description, _metaData4.default.keywords);
  _criticaMovimientoFunction2.default.movimiento();
});

},{"../backTop":20,"../footer":36,"../header":38,"../metaData":54,"../porqueCriticas/criticaMovimientoFunction":55,"./metaData":43,"./template":44,"empty-element":4,"page":12}],43:[function(require,module,exports){
'use strict';

module.exports = {
  title: 'EAPanamá-Home',
  keywords: 'Acondicionamiento acústico, Aislamiento acústico, Control de ruido industrial, Instalaciones de audio, Venta de materiales acústicos.',
  description: 'En EA Panamá ofrecemos todo tipo de soluciones acústicas de calidad en los campos de aislamiento en la edificación, acústica medioambiental, diseño y acondicionamiento de recintos, instalaciones audiovisuales así como venta de materiales acústicos, sonógrafos y equipos de audio.' };

},{}],44:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n  <main>\n    ', '\n    ', '\n    ', '\n    ', '\n    ', '\n  </main>\n'], ['\n  <main>\n    ', '\n    ', '\n    ', '\n    ', '\n    ', '\n  </main>\n']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

var _inicioPortada = require('../inicioPortada');

var _inicioPortada2 = _interopRequireDefault(_inicioPortada);

var _inicioObjetivo = require('../inicioObjetivo');

var _inicioObjetivo2 = _interopRequireDefault(_inicioObjetivo);

var _inicioPorque = require('../inicioPorque');

var _inicioPorque2 = _interopRequireDefault(_inicioPorque);

var _inicioUnicos = require('../inicioUnicos');

var _inicioUnicos2 = _interopRequireDefault(_inicioUnicos);

var _inicioPortafolio = require('../inicioPortafolio');

var _inicioPortafolio2 = _interopRequireDefault(_inicioPortafolio);

var _criticas = require('../porqueCriticas/criticas');

var _criticas2 = _interopRequireDefault(_criticas);

var _secciones = require('../servicio/secciones');

var _secciones2 = _interopRequireDefault(_secciones);

var _proyectos = require('../inicioPortafolio/proyectos');

var _proyectos2 = _interopRequireDefault(_proyectos);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = (0, _yoYo2.default)(_templateObject, _inicioPortada2.default, _inicioObjetivo2.default, (0, _inicioPorque2.default)(_criticas2.default), (0, _inicioUnicos2.default)(_secciones2.default), (0, _inicioPortafolio2.default)(_proyectos2.default));

},{"../inicioObjetivo":46,"../inicioPorque":47,"../inicioPortada":48,"../inicioPortafolio":49,"../inicioPortafolio/proyectos":50,"../inicioUnicos":52,"../porqueCriticas/criticas":56,"../servicio/secciones":67,"yo-yo":14}],45:[function(require,module,exports){
'use strict';

var _page = require('page');

var _page2 = _interopRequireDefault(_page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _page2.default)('*', function (ctx, next) {
  window.scrollTo(0, 0);
  next();
});
require('./home');
require('./about');
require('./blog');
require('./servicio');
require('./productos');
require('./portafolio');
require('./contactar');
require('./blogArticulo');
require('./servicioArticulo');
require('./contactoConfirmacion');
(0, _page2.default)();

},{"./about":16,"./blog":23,"./blogArticulo":27,"./contactar":31,"./contactoConfirmacion":34,"./home":42,"./portafolio":58,"./productos":62,"./servicio":65,"./servicioArticulo":69,"page":12}],46:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n  <section class="objetivo">\n    <article class="objetivoTexto">\n      <h2>\n        Tu Problema Ac\xFAstico <br>\n        <span>Nuestro Objetivo</span>\n      </h2>\n      <p> <strong>EA Panam\xE1 ofrece todo lo que necesita para resolver sus problemas de ruido.</strong>  Asesor\xEDas, productos ac\xFAsticos de calidad y mano de obra especializada con el fin de asegurar el correcto confort seg\xFAn sus necesidades de acondicionamiento ac\xFAstico y aislamiento ac\xFAstico .</p>\n      <p>Adem\xE1s, puede contar con una amplia variedad de opciones de absorbentes ac\xFAsticos complementados con la asesor\xEDa t\xE9cnica de las soluciones. Ideal para para hoteles, restaurantes, colegios, teatros, cualquier sala donde el buen entendimiento y el comfort sea primordial.</p>\n      <p> <strong>No viva con problemas de ruido, cont\xE1ctenos para ofrecerle una soluci\xF3n. Recuerde que vivir sin ruido es vivir mejor.</strong> </p>\n    </article>\n    <div class="imagenObjetivo"></div>\n  </section>\n'], ['\n  <section class="objetivo">\n    <article class="objetivoTexto">\n      <h2>\n        Tu Problema Ac\xFAstico <br>\n        <span>Nuestro Objetivo</span>\n      </h2>\n      <p> <strong>EA Panam\xE1 ofrece todo lo que necesita para resolver sus problemas de ruido.</strong>  Asesor\xEDas, productos ac\xFAsticos de calidad y mano de obra especializada con el fin de asegurar el correcto confort seg\xFAn sus necesidades de acondicionamiento ac\xFAstico y aislamiento ac\xFAstico .</p>\n      <p>Adem\xE1s, puede contar con una amplia variedad de opciones de absorbentes ac\xFAsticos complementados con la asesor\xEDa t\xE9cnica de las soluciones. Ideal para para hoteles, restaurantes, colegios, teatros, cualquier sala donde el buen entendimiento y el comfort sea primordial.</p>\n      <p> <strong>No viva con problemas de ruido, cont\xE1ctenos para ofrecerle una soluci\xF3n. Recuerde que vivir sin ruido es vivir mejor.</strong> </p>\n    </article>\n    <div class="imagenObjetivo"></div>\n  </section>\n']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = (0, _yoYo2.default)(_templateObject);

},{"yo-yo":14}],47:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n    <section class="porque">\n      <article class="porqueTitulo">\n        <h2>\xBF POR QU\xC9 TRABAJAR CON NOSOTROS ?</h2>\n        <p>Como profesionales del sector ofrecemos las soluciones \xF3ptimas para cada ocasi\xF3n. Trabajamos con los \xFAltimos <br> avances tecnol\xF3gicos para ofrecer el mejor servicio a nuestros clientes.</p>\n      </article>\n      <article class="porqueContenido">\n        <div class="porqueLista">\n          <ul>\n            <li> <span>1</span> Contacta con nuestros comerciales y exp\xF3n tu problema</li>\n            <li><span>2</span> Estudio del caso y/o assesoramiento t\xE9cnico especializado</li>\n            <li><span>3</span> Elecci\xF3n de materiales ac\xFAsticos id\xF3neos</li>\n            <li><span>4</span> Ejecuci\xF3n y seguimiento de obra</li>\n            <li><span>5</span> Usted disruta del servicio</li>\n          </ol>\n        </div>\n        <div class="porqueCriticasContainer posicion1" id="criticasContainer">\n          <i class="fa fa-quote-left" aria-hidden="true"></i>\n          <div class="criticaPunto">\n            <a class="punto" onclick=', '></a>\n            <a class="punto" onclick=', '></a>\n            <a class="punto" onclick=', '></a>\n          </div>\n          <article class="porqueCriticas">\n            ', '\n          </article>\n        </div>\n      </article>\n    </section>\n  '], ['\n    <section class="porque">\n      <article class="porqueTitulo">\n        <h2>\xBF POR QU\xC9 TRABAJAR CON NOSOTROS ?</h2>\n        <p>Como profesionales del sector ofrecemos las soluciones \xF3ptimas para cada ocasi\xF3n. Trabajamos con los \xFAltimos <br> avances tecnol\xF3gicos para ofrecer el mejor servicio a nuestros clientes.</p>\n      </article>\n      <article class="porqueContenido">\n        <div class="porqueLista">\n          <ul>\n            <li> <span>1</span> Contacta con nuestros comerciales y exp\xF3n tu problema</li>\n            <li><span>2</span> Estudio del caso y/o assesoramiento t\xE9cnico especializado</li>\n            <li><span>3</span> Elecci\xF3n de materiales ac\xFAsticos id\xF3neos</li>\n            <li><span>4</span> Ejecuci\xF3n y seguimiento de obra</li>\n            <li><span>5</span> Usted disruta del servicio</li>\n          </ol>\n        </div>\n        <div class="porqueCriticasContainer posicion1" id="criticasContainer">\n          <i class="fa fa-quote-left" aria-hidden="true"></i>\n          <div class="criticaPunto">\n            <a class="punto" onclick=', '></a>\n            <a class="punto" onclick=', '></a>\n            <a class="punto" onclick=', '></a>\n          </div>\n          <article class="porqueCriticas">\n            ', '\n          </article>\n        </div>\n      </article>\n    </section>\n  ']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

var _porqueCriticas = require('../porqueCriticas');

var _porqueCriticas2 = _interopRequireDefault(_porqueCriticas);

var _criticaMovimientoFunction = require('../porqueCriticas/criticaMovimientoFunction');

var _criticaMovimientoFunction2 = _interopRequireDefault(_criticaMovimientoFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = function (criticas) {
  var el = (0, _yoYo2.default)(_templateObject, _criticaMovimientoFunction2.default.posicion1, _criticaMovimientoFunction2.default.posicion2, _criticaMovimientoFunction2.default.posicion3, criticas.map(function (critica) {
    return (0, _porqueCriticas2.default)(critica);
  }));
  return el;
};

},{"../porqueCriticas":57,"../porqueCriticas/criticaMovimientoFunction":55,"yo-yo":14}],48:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n<div class="portada">\n  <div id="video-container">\n    <video autoplay loop id="bgvid">\n      <source src="imagenes/web-home-video.webm" type="video/webm">\n      <source src="imagenes/web-home-video.mp4" type="video/mp4">\n      <source src="images-web/web-home-video.ogv" type="video/ogg">\n    </video>\n  </div>\n  <div class="indexPortada">\n    <h1>EA Panam\xE1 S.A.</h1>\n    <h2>Noise controlling & Acoustics Designs</h2>\n    <p> \xBF Necesitas ayuda en acondicionamiento ac\xFAstico o aislamiento ac\xFAstico ? <br>Consulta con los profesionales del sector</p>\n    <a href="/contactar" class="callToAction">Contactar</a>\n  </div>\n</div>\n'], ['\n<div class="portada">\n  <div id="video-container">\n    <video autoplay loop id="bgvid">\n      <source src="imagenes/web-home-video.webm" type="video/webm">\n      <source src="imagenes/web-home-video.mp4" type="video/mp4">\n      <source src="images-web/web-home-video.ogv" type="video/ogg">\n    </video>\n  </div>\n  <div class="indexPortada">\n    <h1>EA Panam\xE1 S.A.</h1>\n    <h2>Noise controlling & Acoustics Designs</h2>\n    <p> \xBF Necesitas ayuda en acondicionamiento ac\xFAstico o aislamiento ac\xFAstico ? <br>Consulta con los profesionales del sector</p>\n    <a href="/contactar" class="callToAction">Contactar</a>\n  </div>\n</div>\n']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = (0, _yoYo2.default)(_templateObject);

},{"yo-yo":14}],49:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n    <section class="inicioPortafolio">\n      <article class="portafolioTitulo">\n        <i class="fa fa-book sectionIcon" aria-hidden="true"></i>\n        <h2>Portafolio</h2>\n        <p>\xC9stos son algunos de nuestros proyectos...</p>\n      </article>\n      <article class="portafolioProyectos">\n        ', '\n      </article>\n    </section>\n  '], ['\n    <section class="inicioPortafolio">\n      <article class="portafolioTitulo">\n        <i class="fa fa-book sectionIcon" aria-hidden="true"></i>\n        <h2>Portafolio</h2>\n        <p>\xC9stos son algunos de nuestros proyectos...</p>\n      </article>\n      <article class="portafolioProyectos">\n        ', '\n      </article>\n    </section>\n  ']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

var _tarjeta = require('./tarjeta');

var _tarjeta2 = _interopRequireDefault(_tarjeta);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = function (proyectos) {
  var el = (0, _yoYo2.default)(_templateObject, proyectos.map(function (proyecto) {
    return (0, _tarjeta2.default)(proyecto);
  }));
  return el;
};

},{"./tarjeta":51,"yo-yo":14}],50:[function(require,module,exports){
'use strict';

module.exports = [{
  nombre: 'SENACYT',
  area: ' SALON COIBA',
  servicio: 'ACONDICIONAMIENTO ACÚSTICO',
  imagen: 'imagenes/portafolio1.jpg'
}, {
  nombre: 'CSS',
  area: ' 5 DE MAYO',
  servicio: 'AISLAMIENTO ACÚSTICO',
  imagen: 'imagenes/portfolio2.jpg'
}, {
  nombre: 'COASSA',
  area: ' OIL TANKING SERVICES',
  servicio: 'CONTROL DE RUIDO INDUSTRIAL',
  imagen: 'imagenes/portfolio4.jpg'
}, {
  nombre: 'XIELO',
  area: ' SALA DE ENSAYOS',
  servicio: 'INTEGRACION DE AUDIO Y VIDEO',
  imagen: 'imagenes/portfolio3.jpg'
}];

},{}],51:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n  <a href="#" class="proyecto">\n    <div class="piko"></div>\n    <div class="proyectoLugar">\n      <h4><strong>', '</strong> ', '</h4>\n    </div>\n    <div class="proyectoImagen" style="background: url(\'', '\'); background-size: cover"></div>\n    <div class="proyectoServicio">\n      <i class="fa fa-circle" aria-hidden="true"></i>\n      <h5>', '</h5>\n    </div>\n  </a>\n  '], ['\n  <a href="#" class="proyecto">\n    <div class="piko"></div>\n    <div class="proyectoLugar">\n      <h4><strong>', '</strong> ', '</h4>\n    </div>\n    <div class="proyectoImagen" style="background: url(\'', '\'); background-size: cover"></div>\n    <div class="proyectoServicio">\n      <i class="fa fa-circle" aria-hidden="true"></i>\n      <h5>', '</h5>\n    </div>\n  </a>\n  ']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = function (proyecto) {
  var el = (0, _yoYo2.default)(_templateObject, proyecto.nombre, proyecto.area, proyecto.imagen, proyecto.servicio);
  return el;
};

},{"yo-yo":14}],52:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n    <section class="unicos">\n      <article class="unicosTitulo">\n        <i class="fa fa-wrench sectionIcon" aria-hidden="true"></i>\n        <h2>Servicios \xDAnicos en Panam\xE1</h2>\n        <p>M\xFAltiples opciones para hacer un proyecto integral</p>\n      </article>\n      <article class="unicosContenido">\n        ', '\n      </article>\n    </section>\n  '], ['\n    <section class="unicos">\n      <article class="unicosTitulo">\n        <i class="fa fa-wrench sectionIcon" aria-hidden="true"></i>\n        <h2>Servicios \xDAnicos en Panam\xE1</h2>\n        <p>M\xFAltiples opciones para hacer un proyecto integral</p>\n      </article>\n      <article class="unicosContenido">\n        ', '\n      </article>\n    </section>\n  ']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

var _tarjeta = require('./tarjeta');

var _tarjeta2 = _interopRequireDefault(_tarjeta);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = function (secciones) {
  var el = (0, _yoYo2.default)(_templateObject, secciones.map(function (seccion) {
    return (0, _tarjeta2.default)(seccion);
  }));
  return el;
};

},{"./tarjeta":53,"yo-yo":14}],53:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n  <a class="unicosServicios" href="/servicio/', '">\n    ', '\n    <h3>', '</h3>\n    <p>', '</p>\n  </a>\n  '], ['\n  <a class="unicosServicios" href="/servicio/', '">\n    ', '\n    <h3>', '</h3>\n    <p>', '</p>\n  </a>\n  ']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = function (seccion) {
  var el = (0, _yoYo2.default)(_templateObject, seccion.titulo, seccion.icono, seccion.titulo, seccion.descripcion);
  return el;
};

},{"yo-yo":14}],54:[function(require,module,exports){
'use strict';

var _emptyElement = require('empty-element');

var _emptyElement2 = _interopRequireDefault(_emptyElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (title, description, keywords) {
  var metaTitle = document.getElementById('metaTitle');
  var metaDescription = document.getElementById('metaDescription');
  var metaKeywords = document.getElementById('metaKeywords');
  (0, _emptyElement2.default)(metaTitle).innerHTML = title;
  (0, _emptyElement2.default)(metaDescription).content = description;
  (0, _emptyElement2.default)(metaKeywords).content = keywords;
};

},{"empty-element":4}],55:[function(require,module,exports){
'use strict';

var posicion1 = function posicion1() {
  var container = document.getElementById('criticasContainer');
  container.classList.add('posicion1');
  container.classList.remove('posicion2');
  container.classList.remove('posicion3');
};
var posicion2 = function posicion2() {
  var container = document.getElementById('criticasContainer');
  container.classList.add('posicion2');
  container.classList.remove('posicion1');
  container.classList.remove('posicion3');
};
var posicion3 = function posicion3() {
  var container = document.getElementById('criticasContainer');
  container.classList.add('posicion3');
  container.classList.remove('posicion1');
  container.classList.remove('posicion2');
};
var movimiento = function movimiento() {
  setTimeout(posicion2, 5000);
  setTimeout(posicion3, 10000);
  setTimeout(posicion1, 15000);
};

module.exports = { posicion1: posicion1, posicion2: posicion2, posicion3: posicion3, movimiento: movimiento };

},{}],56:[function(require,module,exports){
"use strict";

var criticas = [{
  autor: "Rogelio Romero",
  titulo: "Particular",
  avatar: "",
  mensaje: "Estupendo servicio, muy atentos en todo momento, y muy cuidadosos con sus trabajos. Volvería a contratarles para aislar el ruido"
}, {
  autor: "John Doe",
  titulo: "Empresario",
  avatar: "",
  mensaje: "De las empresas que contactamos, ésta era la mejor cualificada para el trabajo. Nos sorprendieron con el conocimiento de los problemas de ruido"
}, {
  autor: "Patricia",
  titulo: "Doctor",
  avatar: "",
  mensaje: "En mi oficina ya no existe más eco, los chicos de EA Panamá hicieron un estupendo trabajo de análisis y diseño acústico, se los agradecemos."
}];
module.exports = criticas;

},{}],57:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n    <div class="critica">\n      <p>', '</p>\n    </div>\n  '], ['\n    <div class="critica">\n      <p>', '</p>\n    </div>\n  ']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = function (critica) {
  var el = (0, _yoYo2.default)(_templateObject, critica.mensaje);
  return el;
};

},{"yo-yo":14}],58:[function(require,module,exports){
'use strict';

var _page = require('page');

var _page2 = _interopRequireDefault(_page);

var _header = require('../header');

var _header2 = _interopRequireDefault(_header);

var _footer = require('../footer');

var _footer2 = _interopRequireDefault(_footer);

var _emptyElement = require('empty-element');

var _emptyElement2 = _interopRequireDefault(_emptyElement);

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

var _backTop = require('../backTop');

var _backTop2 = _interopRequireDefault(_backTop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _page2.default)('/portafolio', _header2.default, _footer2.default, _backTop2.default, function () {
  var container = document.getElementById('main-container');
  (0, _emptyElement2.default)(container).appendChild(_template2.default);
});

},{"../backTop":20,"../footer":36,"../header":38,"./template":59,"empty-element":4,"page":12}],59:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n  <main>\n    ', '\n  </main>\n'], ['\n  <main>\n    ', '\n  </main>\n']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

var _cabecera = require('../cabecera');

var _cabecera2 = _interopRequireDefault(_cabecera);

var _datos = require('../cabecera/datos');

var _datos2 = _interopRequireDefault(_datos);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = (0, _yoYo2.default)(_templateObject, (0, _cabecera2.default)(_datos2.default.portafolio));

},{"../cabecera":29,"../cabecera/datos":28,"yo-yo":14}],60:[function(require,module,exports){
'use strict';

module.exports = [{
  estante: 'ABSORBENTES ACÚSTICOS',
  productos: [{
    titulo: 'PYRAMID PU FOAM',
    descripcion: 'Material acústico de alto rendimiento compuesto por espuma de poliuretano. Pyramid Pu Foam es utilizado en salas donde se requiere el control acústico de eco y reverberación.',
    interna: 'imagenes/pu-foam-retina.png',
    externa: 'imagenes/pu-foam-install.png'
  }, {
    titulo: 'LANA MINERAL DE ROCA',
    descripcion: 'La lana mineral de roca es un producto a base de rocas basáltica para aplicaciones en aislamiento térmico y aislamiento acústico, tanto en edificación como en industria.',
    interna: 'imagenes/producto-lana.png',
    externa: 'imagenes/rockwool-install.png',
    ficha: 'pdf/rockwool.pdf'
  }, {
    titulo: 'CFAB PANEL DE CELULOSA',
    descripcion: 'Producto reciclado de pasta de papel y periódico. Totalmente inocuo para el trabajador. No es fibra de vidrio. Excelente rendimiento acústico, NRC: 100 %.',
    interna: 'imagenes/producto-cfab.png',
    externa: 'imagenes/producto-cfab-install.jpg',
    ficha: 'pdf/CFAB.pdf'
  }, {
    titulo: 'POLYESTER ACOUSTIC CEILING',
    descripcion: 'Techo acústico modular para estructuras de cielo raso. Totalmente sintético, inocuo para el trabajador. ',
    interna: 'imagenes/producto-pac.png',
    externa: 'imagenes/producto-pac-install.jpg',
    ficha: 'pdf/PAC.pdf'
  }, {
    titulo: 'REVCLOUD',
    descripcion: 'Islas acústicas flotantes de color sólido. Ideal para reducir tiempos de reverberación y otorgar un diseño moderno a su instalación. Posibilidad de instalación en techo y pared. ',
    interna: 'imagenes/producto-revcloud.png',
    externa: 'imagenes/producto-revcloud-install.jpg'
  }, {
    titulo: 'REVCLOUD FP',
    descripcion: 'Isla acústica flotante Full Printed. De igual características que el RevCloud. Ideal para ocultarse bajo un diseño vanguardista de su elección.',
    interna: 'imagenes/revcloudfp-retina.png',
    externa: 'imagenes/revcloudfp-install.png',
    ficha: 'pdf/revcloudfp.pdf'
  }, {
    titulo: 'SONEX ONE',
    descripcion: 'Material absorbente de alto rendimiento acústico en rangos de ruido de media-alta frecuencia. Aplicaciones industriales, oficinas, estudios de radiodifusión y de grabación para control de reverberación y  sonido reflejado.',
    interna: 'imagenes/producto-sonex.png',
    externa: 'imagenes/sonex-one-install.png'
  }]
}, {
  estante: 'AISLANTES ACÚSTICOS',
  productos: [{
    titulo: 'MGB',
    descripcion: 'Placa de magnesio de alta densidad (>1200 kg/m3). En el mismo espesor que un Gypsum corriente se consigue un alto aislamiento, STC = 36 dB. Ideal para dividir recintos y medianeras nuevas.',
    interna: 'imagenes/producto-mgb.png',
    externa: 'imagenes/producto-mgb-install.jpg',
    ficha: 'pdf/MGB.pdf'
  }, {
    titulo: 'RUBBER 2M',
    descripcion: 'Impermeable acústico a base de cauchos reciclados. ',
    interna: 'imagenes/producto-rubber.png',
    externa: 'imagenes/producto-rubber-install.jpg',
    ficha: 'pdf/Rubber3M.pdf'
  }, {
    titulo: 'PROYECTADOS',
    descripcion: 'Material plástico empleado como aislante térmico y acústico y como impermeabilizante tanto en edificación como en la industria. Una vez rociado el producto es totalmente inocuo para el trabajador.',
    interna: 'imagenes/producto-poliuretano.png',
    externa: 'imagenes/producto-proyectados-install.jpg'
  }]
}, {
  estante: 'AISLANTES A VIBRACIONES',
  productos: [{
    titulo: 'ACOUSTIK',
    descripcion: 'Manto aislante de suelos 100 % reciclado de cauchos. Su estructura permite el amortiguamiento de los ruidos de impacto. Ideal para zonas con cargas medias. ',
    interna: 'imagenes/producto-acoustik.png',
    externa: 'imagenes/producto-acoustik-install.jpg'
  }, {
    titulo: 'QUIETFLOORNP',
    descripcion: 'El lado inferior acanalado minimiza el contacto de la base entre los materiales terminados y el subsuelo. Reduce la rotura de la baldosa cerámica causada por el agrietamiento y la fisuración del hormigón. Excelente insonorización a ruido de impacto piso a piso.',
    interna: 'imagenes/producto-quiet.png',
    externa: ''
  }]
}];

},{}],61:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n    <article class="productoEstante">\n      <h2><strong>', '</strong>\n        <span></span>\n      </h2>\n      <div class="productoEstanteria">\n        ', '\n      </div>\n    </article>\n  '], ['\n    <article class="productoEstante">\n      <h2><strong>', '</strong>\n        <span></span>\n      </h2>\n      <div class="productoEstanteria">\n        ', '\n      </div>\n    </article>\n  ']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

var _tarjeta = require('./tarjeta');

var _tarjeta2 = _interopRequireDefault(_tarjeta);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = function (catalogo) {
  var el = (0, _yoYo2.default)(_templateObject, catalogo.estante, catalogo.productos.map(function (producto) {
    return (0, _tarjeta2.default)(producto);
  }));
  return el;
};

},{"./tarjeta":63,"yo-yo":14}],62:[function(require,module,exports){
'use strict';

var _page = require('page');

var _page2 = _interopRequireDefault(_page);

var _header = require('../header');

var _header2 = _interopRequireDefault(_header);

var _footer = require('../footer');

var _footer2 = _interopRequireDefault(_footer);

var _emptyElement = require('empty-element');

var _emptyElement2 = _interopRequireDefault(_emptyElement);

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

var _backTop = require('../backTop');

var _backTop2 = _interopRequireDefault(_backTop);

var _catalogo = require('./catalogo');

var _catalogo2 = _interopRequireDefault(_catalogo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _page2.default)('/productos', _header2.default, _footer2.default, _backTop2.default, function () {
  var container = document.getElementById('main-container');
  (0, _emptyElement2.default)(container).appendChild((0, _template2.default)(_catalogo2.default));
});

},{"../backTop":20,"../footer":36,"../header":38,"./catalogo":60,"./template":64,"empty-element":4,"page":12}],63:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n    <a class="productoTarjeta" style="background: url(\'', '\'); background-size: contain; background-repeat: no-repeat" href="', '">\n      <h4>', '</h4>\n      <div class="productoOver">\n        <div class="productoOverImagen" style="background: url(\'', '\'); background-size: contain; background-repeat: no-repeat"></div>\n        <p>', '</p>\n      </div>\n    </a>\n  '], ['\n    <a class="productoTarjeta" style="background: url(\'', '\'); background-size: contain; background-repeat: no-repeat" href="', '">\n      <h4>', '</h4>\n      <div class="productoOver">\n        <div class="productoOverImagen" style="background: url(\'', '\'); background-size: contain; background-repeat: no-repeat"></div>\n        <p>', '</p>\n      </div>\n    </a>\n  ']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = function (producto) {
  var el = (0, _yoYo2.default)(_templateObject, producto.interna, producto.ficha, producto.titulo, producto.externa, producto.descripcion);
  return el;
};

},{"yo-yo":14}],64:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n    <main>\n      ', '\n      <section class="productosSeccion">\n        <a href="http://www.acousticalsurfaces.com" class="distribuidor"></a>\n        ', '\n      </section>\n    </main>\n  '], ['\n    <main>\n      ', '\n      <section class="productosSeccion">\n        <a href="http://www.acousticalsurfaces.com" class="distribuidor"></a>\n        ', '\n      </section>\n    </main>\n  ']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

var _cabecera = require('../cabecera');

var _cabecera2 = _interopRequireDefault(_cabecera);

var _datos = require('../cabecera/datos');

var _datos2 = _interopRequireDefault(_datos);

var _estante = require('./estante');

var _estante2 = _interopRequireDefault(_estante);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = function (catalogo) {
  var el = (0, _yoYo2.default)(_templateObject, (0, _cabecera2.default)(_datos2.default.productos), catalogo.map(function (productos) {
    return (0, _estante2.default)(productos);
  }));
  return el;
};

},{"../cabecera":29,"../cabecera/datos":28,"./estante":61,"yo-yo":14}],65:[function(require,module,exports){
'use strict';

var _page = require('page');

var _page2 = _interopRequireDefault(_page);

var _header = require('../header');

var _header2 = _interopRequireDefault(_header);

var _footer = require('../footer');

var _footer2 = _interopRequireDefault(_footer);

var _emptyElement = require('empty-element');

var _emptyElement2 = _interopRequireDefault(_emptyElement);

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

var _backTop = require('../backTop');

var _backTop2 = _interopRequireDefault(_backTop);

var _metaData = require('../metaData');

var _metaData2 = _interopRequireDefault(_metaData);

var _metaData3 = require('./metaData');

var _metaData4 = _interopRequireDefault(_metaData3);

var _scrollFunction = require('../subMenu/scrollFunction');

var _scrollFunction2 = _interopRequireDefault(_scrollFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _page2.default)('/servicio', _header2.default, _backTop2.default, _footer2.default, function () {
  var container = document.getElementById('main-container');
  (0, _emptyElement2.default)(container).appendChild(_template2.default);
  (0, _metaData2.default)(_metaData4.default.title, _metaData4.default.description, _metaData4.default.keywords);
});

},{"../backTop":20,"../footer":36,"../header":38,"../metaData":54,"../subMenu/scrollFunction":73,"./metaData":66,"./template":68,"empty-element":4,"page":12}],66:[function(require,module,exports){
'use strict';

module.exports = {
  title: 'EAPanamá-Servicios',
  keywords: 'Acondicionamiento acústico, Aislamiento acústico, Control de ruido industrial, Instalaciones de audio, Venta de materiales acústicos.',
  description: 'Lea nuestros servicios en Acondicionamiento acústico, Aislamiento acústico, Control de ruido industrial, Instalaciones de audio o Venta de materiales acústicos.' };

},{}],67:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['<span class="fa icon-sonometro"></span>'], ['<span class="fa icon-sonometro"></span>']),
    _templateObject2 = _taggedTemplateLiteral(['\n    <div>\n      <p>Los recintos destinados a servicios ac\xFAsticos requieren de una ac\xFAstica interior casi perfecta. Una gran variedad de materiales y elementos ac\xFAsticos junto con las t\xE9cnicas ac\xFAsticas m\xE1s innovadoras en simulaci\xF3n de espacios ac\xFAsticos, ser\xE1n dispuestos para lograr la mejora de la calidad del sonido en el interior de diferentes recintos tales como teatros, salones de conferencia, estudios de grabaci\xF3n, emisoras de radio, salas multiuso,etc.</p>\n      <p>Si requiere asesor\xEDa o dise\xF1o de un espacio dedicado a la ac\xFAstica, EA Panam\xE1 se pondr\xE1 a su servicio para lograr la optimizaci\xF3n de las caracter\xEDsticas de la sala y la calidad del sonido.</p>\n      <p>Se ofrece:</p>\n      <ul>\n        <li>Ac\xFAstica Arquitect\xF3nica: Dise\xF1o interno del espacio</li>\n        <li>Consultor\xEDa ac\xFAstica de los espacios sonoros y materiales a utilizar</li>\n        <li>Modelaci\xF3n ac\xFAstica por software para optimizar el espacio</li>\n        <li>Elaboraci\xF3n de planos constructivos y conceptuales en el tema ac\xFAstico</li>\n        <li>Planos detalle de elementos ac\xFAsticos del proyecto</li>\n      </ul>\n    </div>\n    '], ['\n    <div>\n      <p>Los recintos destinados a servicios ac\xFAsticos requieren de una ac\xFAstica interior casi perfecta. Una gran variedad de materiales y elementos ac\xFAsticos junto con las t\xE9cnicas ac\xFAsticas m\xE1s innovadoras en simulaci\xF3n de espacios ac\xFAsticos, ser\xE1n dispuestos para lograr la mejora de la calidad del sonido en el interior de diferentes recintos tales como teatros, salones de conferencia, estudios de grabaci\xF3n, emisoras de radio, salas multiuso,etc.</p>\n      <p>Si requiere asesor\xEDa o dise\xF1o de un espacio dedicado a la ac\xFAstica, EA Panam\xE1 se pondr\xE1 a su servicio para lograr la optimizaci\xF3n de las caracter\xEDsticas de la sala y la calidad del sonido.</p>\n      <p>Se ofrece:</p>\n      <ul>\n        <li>Ac\xFAstica Arquitect\xF3nica: Dise\xF1o interno del espacio</li>\n        <li>Consultor\xEDa ac\xFAstica de los espacios sonoros y materiales a utilizar</li>\n        <li>Modelaci\xF3n ac\xFAstica por software para optimizar el espacio</li>\n        <li>Elaboraci\xF3n de planos constructivos y conceptuales en el tema ac\xFAstico</li>\n        <li>Planos detalle de elementos ac\xFAsticos del proyecto</li>\n      </ul>\n    </div>\n    ']),
    _templateObject3 = _taggedTemplateLiteral(['<i class="fa fa-headphones" aria-hidden="true"></i>'], ['<i class="fa fa-headphones" aria-hidden="true"></i>']),
    _templateObject4 = _taggedTemplateLiteral(['\n    <div>\n      <p>Convivimos diariamente con focos de ruido y vibraciones que nos impiden realizar nuestra actividad cotidiana. En EA Panam\xE1 somos conscientes de este problema y ofrecemos dise\xF1os y servicios de sistemas de aislamiento ac\xFAstico exclusivos para cada caso.</p>\n      <p>Como expertos en esta \xE1rea, realizamos el asesoramiento ac\xFAstico en proyectos de edificaci\xF3n, obra nueva o rehabilitaci\xF3n a profesionales del sector como arquitectos, arquitectos t\xE9cnicos e ingenieros. Adem\xE1s llevamos a cabo el suministro de los materiales m\xE1s id\xF3neos para evitar transmisi\xF3n de vibraciones y aislamientos.</p>\n      <p>Las acciones correctoras a realizar para atenuaci\xF3n de niveles de ruido son las siguientes:</p>\n      <ul>\n        <li>Acondicionamiento ac\xFAstico.</li>\n        <li>Aislamiento ac\xFAstico.</li>\n        <li>Cerramientos, cabinas y barreras ac\xFAsticas.</li>\n        <li>Puertas y visores ac\xFAsticos.</li>\n        <li>Tratamiento de entradas/salidas de aire, chimeneas, etc.</li>\n        <li>Control de la vibraci\xF3n estructural.</li>\n      </ul>\n    </div>\n    '], ['\n    <div>\n      <p>Convivimos diariamente con focos de ruido y vibraciones que nos impiden realizar nuestra actividad cotidiana. En EA Panam\xE1 somos conscientes de este problema y ofrecemos dise\xF1os y servicios de sistemas de aislamiento ac\xFAstico exclusivos para cada caso.</p>\n      <p>Como expertos en esta \xE1rea, realizamos el asesoramiento ac\xFAstico en proyectos de edificaci\xF3n, obra nueva o rehabilitaci\xF3n a profesionales del sector como arquitectos, arquitectos t\xE9cnicos e ingenieros. Adem\xE1s llevamos a cabo el suministro de los materiales m\xE1s id\xF3neos para evitar transmisi\xF3n de vibraciones y aislamientos.</p>\n      <p>Las acciones correctoras a realizar para atenuaci\xF3n de niveles de ruido son las siguientes:</p>\n      <ul>\n        <li>Acondicionamiento ac\xFAstico.</li>\n        <li>Aislamiento ac\xFAstico.</li>\n        <li>Cerramientos, cabinas y barreras ac\xFAsticas.</li>\n        <li>Puertas y visores ac\xFAsticos.</li>\n        <li>Tratamiento de entradas/salidas de aire, chimeneas, etc.</li>\n        <li>Control de la vibraci\xF3n estructural.</li>\n      </ul>\n    </div>\n    ']),
    _templateObject5 = _taggedTemplateLiteral(['<i class="fa fa-industry" aria-hidden="true"></i>'], ['<i class="fa fa-industry" aria-hidden="true"></i>']),
    _templateObject6 = _taggedTemplateLiteral(['\n    <div>\n      <p>En situaciones, como por ejemplo el ruido industrial, hay varias fuentes de sonido, varios caminos para el sonido, y m\xE1s de un receptor, pero los principios fundamentales del control de ruido en estas situaciones ser\xEDa el mismo que para el de casos simples.</p>\n      <p>El objetivo de los programas de control de ruido es reducir el nivel de sonido indeseado en el receptor. Este puede llevarse a cabo haciendo cambios a la fuente, el camino, o el receptor, o de cualquier combinaci\xF3n de estos elementos.</p>\n      <p>Este tipo de situaciones requiere un estudio exhaustivo de todos los componentes de la maquinaria ruidosa, de modo que al conocer cada fuente individualmente podremos valorar su contribuci\xF3n al ruido total (a\xE9reo + vibraci\xF3n).</p>\n      <p>El camino, para el sonido que viaja de fuente a receptor, puede ser el aire como es el caso del ruido de las m\xE1quinas que transmiten directamente a los o\xEDdos del operador. Pero tambi\xE9n podr\xEDa ser el caso de propagaci\xF3n indirecta, cuando el sonido se refleja en una pared de la habitaci\xF3n y se recibe en los o\xEDdos del operador.</p>\n      <p>Tambi\xE9n sobre superficies s\xF3lidas, tales como tuber\xEDas entre una bomba vibratoria y aquellos elementos de la m\xE1quina que sirven como ruta para que el ruido se propague por las estructuras.</p>\n      <p>Por ello, es importante que un Ingeniero Ac\xFAstico valore todos los posibles caminos de propagaci\xF3n, considerando su contribuci\xF3n al ruido total, dado que de esta manera se puede tener la visi\xF3n total del problema de ruido para dar una soluci\xF3n \xF3ptima al problema de ruido.</p>\n    </div>\n    '], ['\n    <div>\n      <p>En situaciones, como por ejemplo el ruido industrial, hay varias fuentes de sonido, varios caminos para el sonido, y m\xE1s de un receptor, pero los principios fundamentales del control de ruido en estas situaciones ser\xEDa el mismo que para el de casos simples.</p>\n      <p>El objetivo de los programas de control de ruido es reducir el nivel de sonido indeseado en el receptor. Este puede llevarse a cabo haciendo cambios a la fuente, el camino, o el receptor, o de cualquier combinaci\xF3n de estos elementos.</p>\n      <p>Este tipo de situaciones requiere un estudio exhaustivo de todos los componentes de la maquinaria ruidosa, de modo que al conocer cada fuente individualmente podremos valorar su contribuci\xF3n al ruido total (a\xE9reo + vibraci\xF3n).</p>\n      <p>El camino, para el sonido que viaja de fuente a receptor, puede ser el aire como es el caso del ruido de las m\xE1quinas que transmiten directamente a los o\xEDdos del operador. Pero tambi\xE9n podr\xEDa ser el caso de propagaci\xF3n indirecta, cuando el sonido se refleja en una pared de la habitaci\xF3n y se recibe en los o\xEDdos del operador.</p>\n      <p>Tambi\xE9n sobre superficies s\xF3lidas, tales como tuber\xEDas entre una bomba vibratoria y aquellos elementos de la m\xE1quina que sirven como ruta para que el ruido se propague por las estructuras.</p>\n      <p>Por ello, es importante que un Ingeniero Ac\xFAstico valore todos los posibles caminos de propagaci\xF3n, considerando su contribuci\xF3n al ruido total, dado que de esta manera se puede tener la visi\xF3n total del problema de ruido para dar una soluci\xF3n \xF3ptima al problema de ruido.</p>\n    </div>\n    ']),
    _templateObject7 = _taggedTemplateLiteral(['<i class="fa fa-play" aria-hidden="true"></i>'], ['<i class="fa fa-play" aria-hidden="true"></i>']),
    _templateObject8 = _taggedTemplateLiteral(['\n    <div>\n      <p>Realizamos todo tipo de instalaciones de sistemas de sonido, ya sea para particulares o empresa, con los productos de las mejores marcas comerciales, Lynx, Ashly, Bose o Yamaha entre otras.</p>\n      <p>EA Panam\xE1 va m\xE1s all\xE1 de la simple instalaci\xF3n de equipos audiovisuales en un local o vivienda ofreciendo la mayor funcionalidad posible. Control inal\xE1mbrico de la selecci\xF3n musical, distintas zonas con distinta m\xFAsica con control desde tu celular o tablet, acabados bajo selecci\xF3n del cliente, entre muchas otras opciones.</p>\n      <p>Nuestros expertos valorar\xE1n el recinto as\xED como los equipos necesarios para obtener el mayor rendimiento del sistema de sonido instalado y a la sala de escucha.</p>\n    </div>\n    '], ['\n    <div>\n      <p>Realizamos todo tipo de instalaciones de sistemas de sonido, ya sea para particulares o empresa, con los productos de las mejores marcas comerciales, Lynx, Ashly, Bose o Yamaha entre otras.</p>\n      <p>EA Panam\xE1 va m\xE1s all\xE1 de la simple instalaci\xF3n de equipos audiovisuales en un local o vivienda ofreciendo la mayor funcionalidad posible. Control inal\xE1mbrico de la selecci\xF3n musical, distintas zonas con distinta m\xFAsica con control desde tu celular o tablet, acabados bajo selecci\xF3n del cliente, entre muchas otras opciones.</p>\n      <p>Nuestros expertos valorar\xE1n el recinto as\xED como los equipos necesarios para obtener el mayor rendimiento del sistema de sonido instalado y a la sala de escucha.</p>\n    </div>\n    ']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = [{
  titulo: 'ACONDICIONAMIENTO ACÚSTICO',
  icono: (0, _yoYo2.default)(_templateObject),
  posicion: '400',
  imagen: 'https://images.pexels.com/photos/337542/pexels-photo-337542.jpeg',
  ilustracion: 'imagenes/servicios-acondicionamiento-acustico.png',
  descripcion: 'Ajuste, control y optimiazción de teatros, estudios de grabación, bares, restaurantes, salones de conferencias, etc.',
  explicacion: 'Uno de los mayores problemas del audio es la sala dónde se reproduce el mismo. Ofrecemos a cada cliente un diseño personalizado para bares, discotecas, restaurantes, salas de conferencias, casas particulares, teatros, etc… ; con lo que logramos optimizar las características de la sala y la calidad del sonido. Para ello utilizamos las últimas técnicas en simulación que nos permiten valorar previamente la distribución del sonido en la sala.',
  contenido: (0, _yoYo2.default)(_templateObject2)
}, {
  titulo: 'AISLAMIENTO ACÚSTICO',
  icono: (0, _yoYo2.default)(_templateObject3),
  posicion: '800',
  imagen: 'https://images.pexels.com/photos/268362/pexels-photo-268362.jpeg',
  ilustracion: 'imagenes/servicios-aislamiento-acustico.png',
  descripcion: 'Diseño y análisis de estructuras de techo, paredes y suelos para la mejora del aislamiento del ruido en su hogar, oficina, restaurante, salón, teatro, etc.',
  explicacion: 'Convivimos diariamente con focos de ruido y vibraciones que nos impiden realizar nuestra actividad cotidiana. En EA Panamá somos conscientes de este problema y ofrecemos diseños de sistemas de aislamiento acústico exclusivos para cada caso, con objeto de evitar interferencias entre recintos colindantes y de esta forma evitar la trasmisión no deseada de ruidos y vibraciones.',
  contenido: (0, _yoYo2.default)(_templateObject4)
}, {
  titulo: 'CONTROL DE RUIDO INDUSTRIAL',
  icono: (0, _yoYo2.default)(_templateObject5),
  posicion: '1200',
  imagen: 'https://images.pexels.com/photos/208714/pexels-photo-208714.jpeg',
  ilustracion: 'imagenes/servicios-ruido-industrial.png',
  descripcion: 'Estudios y propuestas especializadas para el control de ruido en industria, generadores eléctricos, diseño de filtros, barreras de sonido, sistemas HVAC, maquinaria, etc.',
  explicacion: 'La salud auditiva en el entorno de trabajo es de vital importancia para una buena higiene laboral. EA Panamá elabora informes de medidas del ruido industrial además de ofrecer planes de acciones contra los ruidos generados por las diversas maquinarias dentro de las fábricas. De este modo, la industria puede seguir con los más altos estándares de calidad en higiene laboral estipulados por normativas internacionales así como la Organización Mundial de la Salud (OMS).',
  contenido: (0, _yoYo2.default)(_templateObject6)
}, {
  titulo: 'INTEGRACIÓN DE AUDIO Y VIDEO',
  icono: (0, _yoYo2.default)(_templateObject7),
  posicion: '1600',
  imagen: 'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg',
  ilustracion: 'imagenes/servicios-integracion.png',
  descripcion: 'Estudio de la ubicación de los parlantes, cantidad y características técnicas tanto de los equipos como de la sala, para obtener la perfección del sistema electroacústico.',
  explicacion: 'Dedicamos una división de la empresa de manera exclusiva para la instalación de equipos de audio y vídeo tanto a particulares como a empresas. Nuestros expertos valorarán el recinto así como los equipos necesarios para obtener el mayor rendimiento de la instalación y la sala.',
  contenido: (0, _yoYo2.default)(_templateObject8)
}];

},{"yo-yo":14}],68:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n  <main>\n    ', '\n      <section class="noHomeSection">\n        <div class="serviciosImagen" style="background: url(\'', '\'); background-size: contain; background-repeat: no-repeat"></div>\n        <div class="serviciosTexto">\n          <h2>', '</h2>\n          <p>\n            ', '\n          </p>\n          <a href="/servicio/', '" class="callToAction">M\xC1S INFORMACI\xD3N</a>\n        </div>\n      </section>\n      <section class="noHomeSection servicioGris">\n        <div class="serviciosTexto">\n          <h2>', '</h2>\n          <p>\n            ', '\n          </p>\n          <a href="/servicio/', '" class="callToAction">M\xC1S INFORMACI\xD3N</a>\n        </div>\n        <div class="serviciosImagen" style="background: url(\'', '\'); background-size: contain; background-repeat: no-repeat"></div>\n      </section>\n      <section class="noHomeSection">\n        <div class="serviciosImagen" style="background: url(\'', '\'); background-size: contain; background-repeat: no-repeat"></div>\n        <div class="serviciosTexto">\n          <h2>', '</h2>\n          <p>\n            ', '\n          </p>\n          <a href="/servicio/', '" class="callToAction">M\xC1S INFORMACI\xD3N</a>\n        </div>\n      </section>\n      <section class="noHomeSection servicioGris">\n        <div class="serviciosTexto">\n          <h2>', '</h2>\n          <p>\n            ', '\n          </p>\n          <a href="/servicio/', '" class="callToAction">M\xC1S INFORMACI\xD3N</a>\n        </div>\n        <div class="serviciosImagen" style="background: url(\'', '\'); background-size: contain; background-repeat: no-repeat"></div>\n      </section>\n      <section class="noHomeSection">\n        <span class="serviciosImagen icon-servicios-venta"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span><span class="path13"></span><span class="path14"></span><span class="path15"></span><span class="path16"></span><span class="path17"></span><span class="path18"></span><span class="path19"></span><span class="path20"></span></span>\n        <div class="serviciosTexto">\n          <h2>VENTA DE MATERIALES</h2>\n          <p>\n            Tenemos una amplia variedad de materiales y colores, ya sea que est\xE9 buscando reducir los niveles de ruido internos de la sala por medio de la reducci\xF3n de los tiempos de reverberaci\xF3n o bloquear la transferencia del ruido a\xE9reo o vibraciones. Contamos con packs de materiales para aislamiento ac\xFAstico y acondicionamiento ac\xFAstico seg\xFAn el nivel de sus necesidades. Disponemos de absorbentes de sonido que coincidir\xE1n con el dise\xF1o deseado. Opciones custom donde podr\xE1 elegir formas y colores. Nuestros materiales son reciclados y/o minerales, totalmente inocuos para la salud, adem\xE1s de cr\xE9ditos LEED.\n          </p>\n          <a href="/productos" class="callToAction">VER PRODUCTOS</a>\n        </div>\n      </section>\n  </main>\n'], ['\n  <main>\n    ', '\n      <section class="noHomeSection">\n        <div class="serviciosImagen" style="background: url(\'', '\'); background-size: contain; background-repeat: no-repeat"></div>\n        <div class="serviciosTexto">\n          <h2>', '</h2>\n          <p>\n            ', '\n          </p>\n          <a href="/servicio/', '" class="callToAction">M\xC1S INFORMACI\xD3N</a>\n        </div>\n      </section>\n      <section class="noHomeSection servicioGris">\n        <div class="serviciosTexto">\n          <h2>', '</h2>\n          <p>\n            ', '\n          </p>\n          <a href="/servicio/', '" class="callToAction">M\xC1S INFORMACI\xD3N</a>\n        </div>\n        <div class="serviciosImagen" style="background: url(\'', '\'); background-size: contain; background-repeat: no-repeat"></div>\n      </section>\n      <section class="noHomeSection">\n        <div class="serviciosImagen" style="background: url(\'', '\'); background-size: contain; background-repeat: no-repeat"></div>\n        <div class="serviciosTexto">\n          <h2>', '</h2>\n          <p>\n            ', '\n          </p>\n          <a href="/servicio/', '" class="callToAction">M\xC1S INFORMACI\xD3N</a>\n        </div>\n      </section>\n      <section class="noHomeSection servicioGris">\n        <div class="serviciosTexto">\n          <h2>', '</h2>\n          <p>\n            ', '\n          </p>\n          <a href="/servicio/', '" class="callToAction">M\xC1S INFORMACI\xD3N</a>\n        </div>\n        <div class="serviciosImagen" style="background: url(\'', '\'); background-size: contain; background-repeat: no-repeat"></div>\n      </section>\n      <section class="noHomeSection">\n        <span class="serviciosImagen icon-servicios-venta"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span><span class="path13"></span><span class="path14"></span><span class="path15"></span><span class="path16"></span><span class="path17"></span><span class="path18"></span><span class="path19"></span><span class="path20"></span></span>\n        <div class="serviciosTexto">\n          <h2>VENTA DE MATERIALES</h2>\n          <p>\n            Tenemos una amplia variedad de materiales y colores, ya sea que est\xE9 buscando reducir los niveles de ruido internos de la sala por medio de la reducci\xF3n de los tiempos de reverberaci\xF3n o bloquear la transferencia del ruido a\xE9reo o vibraciones. Contamos con packs de materiales para aislamiento ac\xFAstico y acondicionamiento ac\xFAstico seg\xFAn el nivel de sus necesidades. Disponemos de absorbentes de sonido que coincidir\xE1n con el dise\xF1o deseado. Opciones custom donde podr\xE1 elegir formas y colores. Nuestros materiales son reciclados y/o minerales, totalmente inocuos para la salud, adem\xE1s de cr\xE9ditos LEED.\n          </p>\n          <a href="/productos" class="callToAction">VER PRODUCTOS</a>\n        </div>\n      </section>\n  </main>\n']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

var _cabecera = require('../cabecera');

var _cabecera2 = _interopRequireDefault(_cabecera);

var _datos = require('../cabecera/datos');

var _datos2 = _interopRequireDefault(_datos);

var _subMenu = require('../subMenu');

var _subMenu2 = _interopRequireDefault(_subMenu);

var _secciones = require('./secciones');

var _secciones2 = _interopRequireDefault(_secciones);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = (0, _yoYo2.default)(_templateObject, (0, _cabecera2.default)(_datos2.default.servicios), _secciones2.default[0].ilustracion, _secciones2.default[0].titulo, _secciones2.default[0].explicacion, _secciones2.default[0].titulo.replace(/ /g, '-'), _secciones2.default[1].titulo, _secciones2.default[1].explicacion, _secciones2.default[1].titulo.replace(/ /g, '-'), _secciones2.default[1].ilustracion, _secciones2.default[2].ilustracion, _secciones2.default[2].titulo, _secciones2.default[2].explicacion, _secciones2.default[2].titulo.replace(/ /g, '-'), _secciones2.default[3].titulo, _secciones2.default[3].explicacion, _secciones2.default[3].titulo.replace(/ /g, '-'), _secciones2.default[3].ilustracion);

},{"../cabecera":29,"../cabecera/datos":28,"../subMenu":71,"./secciones":67,"yo-yo":14}],69:[function(require,module,exports){
'use strict';

var _page = require('page');

var _page2 = _interopRequireDefault(_page);

var _emptyElement = require('empty-element');

var _emptyElement2 = _interopRequireDefault(_emptyElement);

var _header = require('../header');

var _header2 = _interopRequireDefault(_header);

var _footer = require('../footer');

var _footer2 = _interopRequireDefault(_footer);

var _backTop = require('../backTop');

var _backTop2 = _interopRequireDefault(_backTop);

var _secciones = require('../servicio/secciones');

var _secciones2 = _interopRequireDefault(_secciones);

var _template = require('../articulo/template');

var _template2 = _interopRequireDefault(_template);

var _subMenu = require('../subMenu');

var _subMenu2 = _interopRequireDefault(_subMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _page2.default)('/servicio/:titulo', _header2.default, _footer2.default, _backTop2.default, function (ctx, next) {
  var container = document.getElementById('main-container');
  (0, _emptyElement2.default)(container).appendChild((0, _template2.default)(_secciones2.default, ctx.params.titulo));
  next();
}, _subMenu2.default);

},{"../articulo/template":19,"../backTop":20,"../footer":36,"../header":38,"../servicio/secciones":67,"../subMenu":71,"empty-element":4,"page":12}],70:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n  <div class="social" id="social">\n    <a target="_blank" href="https://www.facebook.com/EngineeringAcousticsPanama?ref=bookmarks"><i class="fa fa-facebook" aria-hidden="true"></i></a>\n    <a target="_blank" href="https://twitter.com/eapanama"><i class="fa fa-twitter" aria-hidden="true"></i></a>\n    <a target="_blank" href="https://plus.google.com/+Eapanama"><i class="fa fa-google-plus" aria-hidden="true"></i></a>\n    <a target="_blank" href="https://www.linkedin.com/company-beta/3824317/"><i class="fa fa-linkedin" aria-hidden="true"></i></a>\n    <a target="_blank" href="https://www.instagram.com/ea_panama/"><i class="fa fa-instagram" aria-hidden="true"></i></a>\n  </div>\n  '], ['\n  <div class="social" id="social">\n    <a target="_blank" href="https://www.facebook.com/EngineeringAcousticsPanama?ref=bookmarks"><i class="fa fa-facebook" aria-hidden="true"></i></a>\n    <a target="_blank" href="https://twitter.com/eapanama"><i class="fa fa-twitter" aria-hidden="true"></i></a>\n    <a target="_blank" href="https://plus.google.com/+Eapanama"><i class="fa fa-google-plus" aria-hidden="true"></i></a>\n    <a target="_blank" href="https://www.linkedin.com/company-beta/3824317/"><i class="fa fa-linkedin" aria-hidden="true"></i></a>\n    <a target="_blank" href="https://www.instagram.com/ea_panama/"><i class="fa fa-instagram" aria-hidden="true"></i></a>\n  </div>\n  ']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = function () {
  var el = (0, _yoYo2.default)(_templateObject);
  return el;
};

},{"yo-yo":14}],71:[function(require,module,exports){
'use strict';

var _emptyElement = require('empty-element');

var _emptyElement2 = _interopRequireDefault(_emptyElement);

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

var _secciones = require('../servicio/secciones');

var _secciones2 = _interopRequireDefault(_secciones);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (ctx, next) {
  var container = document.getElementById('subMenu');
  (0, _emptyElement2.default)(container).appendChild((0, _template2.default)(_secciones2.default));
};

},{"../servicio/secciones":67,"./template":74,"empty-element":4}],72:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n    <a class="subMenuSeccion" id="subMenuSeccion" href="/servicio/', '">\n      ', '\n      <h4>', '</h4>\n    </a>\n  '], ['\n    <a class="subMenuSeccion" id="subMenuSeccion" href="/servicio/', '">\n      ', '\n      <h4>', '</h4>\n    </a>\n  ']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = function (seccion) {
  var el = (0, _yoYo2.default)(_templateObject, seccion.titulo.replace(/ /g, '-'), seccion.icono, seccion.titulo);
  return el;
};

},{"yo-yo":14}],73:[function(require,module,exports){
"use strict";

},{}],74:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n  <div class="subMenu" id="subMenu">\n    ', '\n  </div>\n  '], ['\n  <div class="subMenu" id="subMenu">\n    ', '\n  </div>\n  ']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

var _plantilla = require('./plantilla');

var _plantilla2 = _interopRequireDefault(_plantilla);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = function (secciones) {
  var el = (0, _yoYo2.default)(_templateObject, secciones.map(function (seccion) {
    return (0, _plantilla2.default)(seccion);
  }));
  return el;
  next();
};

},{"./plantilla":72,"yo-yo":14}]},{},[45]);
