'use strict';
// TODO: backspace, mobile ?
var Animations = {
  FAST: 'fade-fast',
  SLOW: 'fade'
};

function Editor(parentElem, animClass) {
  this.parentElem = parentElem;
  this.animClass = animClass;
  this.newLine();
}

Editor.prototype.type = function(char) {
  var span = document.createElement('span');
  span.textContent = char; 
  span.className = this.animClass;
  this.currentP.appendChild(span);
  this.updateCursor();
};

Editor.prototype.addCursor = function() {
  this.cursor = document.createElement('div');
  this.cursor.className = 'cursor';
  this.cursor.style.display = 'absolute';
  this.parentElem.appendChild(this.cursor);
};

Editor.prototype.updateCursor = function() {
  if (!this.cursor) {
    return;
  }
  var lastSpan = this.currentP.lastChild;
  var top, left;
  if (lastSpan) {
    top = lastSpan.offsetTop;
    left = lastSpan.offsetLeft + lastSpan.offsetWidth;
  } else {
    top = this.currentP.offsetTop;
    left = this.currentP.offsetLeft;
  }
  this.cursor.style.top = top + 'px';
  this.cursor.style.left = left + 'px';
};

Editor.prototype.newLine = function() {
  var p = document.createElement('p');
  this.parentElem.appendChild(p);
  this.currentP = p;
  this.updateCursor();
};

function TimeQueue(delay) {
  this.delay = delay;
  this.queue = [];
};

TimeQueue.prototype.enqueue = function(fn) {
  this.queue.push(fn);
};

TimeQueue.prototype.start = function() {
  this.queue.forEach(function(fn, i) {
    setTimeout(fn, i * this.delay);
  }, this);
  this.queue.length = 0;
}

function doSplash() {
  var splashElem = document.getElementsByClassName('splash')[0];
  var ps = splashElem.getElementsByTagName('p');
  var t = 0;
  var texts = Array.prototype.map.call(ps, function(p) {
    return p.textContent;
  });
  while (splashElem.firstChild) {
    splashElem.removeChild(splashElem.firstChild);
  }
  var editor = new Editor(splashElem, Animations.FAST);
  var q = new TimeQueue(100);
  texts.forEach(function(text, i) {
    Array.prototype.forEach.call(text, function(c) {
      q.enqueue(function() {
        editor.type(c);
      });
    });
    q.enqueue(function() {
      editor.newLine();
    });
  });
  q.enqueue(function() {
    splashElem.style.display = 'none';
  });
  q.start();
}

window.onload = function(){ 
  var editor = new Editor(document.getElementById('editor'), Animations.SLOW);
  editor.addCursor();
  document.addEventListener('keypress', function(event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      event.stopPropagation();
      editor.newLine();
    } else {
      editor.type(String.fromCharCode(event.which));
    }
  });
  doSplash();
}
