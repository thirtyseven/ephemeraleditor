var element;
function update() {
  var text = element.value;
  var span = document.createElement('span');
  span.textContent = text;
  span.className = 'fade';
  element.value = '';
  var ps = document.getElementsByTagName('p');
  ps[ps.length-1].appendChild(span);
}
window.onload = function(){ 
  element = document.getElementById('hidden');  
  document.addEventListener('mousedown', function(event) {
    console.log('focus');
    event.stopPropagation();
    event.preventDefault();
    element.focus();
  });
  element.addEventListener('keypress', function(event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      event.stopPropagation();
      var newP = document.createElement('p');
      document.body.appendChild(newP);
    } else {
      update();
    }
  });
  //document.addEventListener('keyup', simulateEvent(eventName, element, false));
}


