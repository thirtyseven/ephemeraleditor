var Animations = {
  FAST: 'fade-fast',
  SLOW: 'fade'
};

function typeChar(char, anim, elem) {
  var span = document.createElement('span');
  span.textContent = char; 
  span.className = anim;
  elem.appendChild(span);
}

function doSplash() {
  var splashElem = document.getElementsByClassName('splash')[0];
  var ps = splashElem.getElementsByTagName('p');
  var t = 0;
  var texts = Array.prototype.map.call(ps, function(p) {
    var val = p.textContent;
    p.textContent = '';
    return val;
  });
  texts.forEach(function(text, i) {
    var p = ps[i];
    Array.prototype.forEach.call(text, function(c) {
      setTimeout(function() {
        typeChar(c, Animations.FAST, p);
      }, t*100);
      t++;
    });
  });
}

function newLine() {
  var newP = document.createElement('p');
  document.body.appendChild(newP);
  return newP;
}

window.onload = function(){ 
  var p = newLine();
  document.addEventListener('keypress', function(event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      event.stopPropagation();
      p = newLine();
    } else {
      typeChar(String.fromCharCode(event.which), Animations.SLOW, p);
    }
  });

  doSplash();
}
