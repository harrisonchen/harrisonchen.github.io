window.addEventListener('scroll', parallax);

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var elementListShow = {
  nameBox: true,
  introBox: false
}

var projectListShow = {};

var body = document.getElementsByTagName('body')[0];
var nameBox = document.getElementById('name-box');
var introBox = document.getElementById('intro-box');
var projectList = document.getElementById('projects');
var projects = document.getElementsByClassName('project');
var contacts = document.getElementById('contacts');
var navie = document.getElementById('navie');

for(var i = 0; i < projects.length; i += 1) {
  projectListShow[i] = false;
}

function parallax(e) {
  var nameBoxDiff = nameBox.offsetTop - body.scrollTop
  if(nameBoxDiff > 0) {
    nameBox.style.opacity = nameBoxDiff * 0.0025;
  }
  if(body.scrollTop >= nameBox.offsetTop / 2) {
    if(!elementListShow.introBox) {
      introBox.className += " full-opacity intro-box-final";
      elementListShow.introBox = true;
    }
  }
  for(var i = 0; i < projects.length; i += 1) {
    if(body.scrollTop >= nameBox.offsetTop / 4 + projects[i].offsetTop) {
      if(!projectListShow[i]) {
        projects[i].className += " project-appear";
        projectListShow[i] = true;
      }
    }
  }
  if(body.scrollTop >= contacts.offsetTop ) {
    navie.className += " rotate-180";
  }
};

