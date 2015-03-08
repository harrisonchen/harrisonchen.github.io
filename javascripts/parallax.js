window.addEventListener('scroll', parallax);

var WIDTH = window.innerWidth;
var HEIGHT = 2000;

var body = document.getElementsByTagName('body')[0];
var nameBox = document.getElementById('name-box');

function parallax(e) {
  var nameBoxDiff = nameBox.offsetTop - body.scrollTop
  if(nameBoxDiff > 0) {
    nameBox.style.opacity = nameBoxDiff * 0.0025;
  }
};

