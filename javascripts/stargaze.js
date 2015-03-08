'use strict';

var WIDTH;
var HEIGHT;
var canvas;
var context;
var NUMBER_OF_STARS = 700;
var MAX_STAR_RADIUS = 1;
var stars = [];
var prevMouseX;
var prevMouseY;

function canvasSetup() {
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;

  canvas = document.getElementById('sky');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  document.getElementsByTagName('body')[0].addEventListener('mousemove', gaze);

  context = canvas.getContext('2d');
};

function randomizeSettings() {
  return {
    x_origin: WIDTH * Math.random(),
    y_origin: HEIGHT * Math.random(),
    radius: 0.8 * Math.random() + 0.05
  };
};

function Star(init) {
  var settings = {
    x_origin: init.x_origin,
    y_origin: init.y_origin,
    radius: init.radius
  };

  this.draw = function() {
    context.fillStyle = "#FFFFFF";
    context.beginPath();
    context.arc(settings.x_origin, settings.y_origin, settings.radius, 0, 1.5*Math.PI);
    context.closePath()
    context.fill();
  };

  this.move = function(diff) {
    settings.x_origin += diff.x_diff;
    settings.y_origin += diff.y_diff;
  }
};

function gaze(e) {
  if(!prevMouseX || !prevMouseY) {
    prevMouseX = e.x;
    prevMouseY = e.y;
  }
  else {
    var x = prevMouseX;
    var y = prevMouseY;
    prevMouseX = e.x;
    prevMouseY = e.y;
    gazeSky({
      x_diff: (x - e.x) * 0.03,
      y_diff: (y - e.y) * 0.03
    });
    requestAnimationFrame(draw);
  }
};

function drawSky() {
  for(var i = 0; i < NUMBER_OF_STARS; i += 1) {
    stars[i] = new Star(randomizeSettings());
    stars[i].draw();
  }
  // requestAnimationFrame(movingSky);
};

function gazeSky(diff) {
  for(var i = 0; i < NUMBER_OF_STARS; i += 1) {
    stars[i].move(diff);
  }
}

function draw() {
  context.clearRect(0, 0, WIDTH, HEIGHT);

  for(var i = 0; i < NUMBER_OF_STARS; i += 1) {
    stars[i].draw();
  }
}

function movingSky() {
  context.clearRect(0, 0, WIDTH, HEIGHT);

  for(var i = 0; i < NUMBER_OF_STARS; i += 1) {
    stars[i].move({
      x_diff: -1,
      y_diff: 1
    });
    stars[i].draw();
  }

  requestAnimationFrame(movingSky);
}

canvasSetup();
drawSky();