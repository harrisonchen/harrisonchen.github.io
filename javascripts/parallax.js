window.addEventListener('scroll', parallax);

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var elementListShow = {
  nameBox: true,
  introBox: false
}

var body = document.getElementsByTagName('body')[0];
var nameBox = document.getElementById('name-box');
var introBox = document.getElementById('intro-box');

function parallax(e) {
  var nameBoxDiff = nameBox.offsetTop - body.scrollTop
  if(nameBoxDiff > 0) {
    nameBox.style.opacity = nameBoxDiff * 0.0025;
  }
  if(body.scrollTop >= nameBox.offsetTop) {
    if(!elementListShow.introBox) {
      introBox.className += " full-opacity intro-box-final";
      elementListShow.introBox = true;
    }
  }
  console.log(nameBox.offsetTop);
  console.log(body.scrollTop);
};

