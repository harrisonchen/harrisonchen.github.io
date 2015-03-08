window.addEventListener('scroll', parallax);

var WIDTH = window.innerWidth;
var HEIGHT = 5000;

var body = document.getElementsByTagName('body')[0];
var introBox = document.getElementById('intro-box');

function parallax(e) {
  var introBoxDiff = introBox.offsetTop - body.scrollTop
  if(introBoxDiff > 0) {
    introBox.style.opacity = introBoxDiff * 0.0025;
  }
};

