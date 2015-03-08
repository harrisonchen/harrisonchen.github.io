'use strict';

var WIDTH;
var HEIGHT;
var canvas;
var context;
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

  document.getElementsByTagName('body')[0].addEventListener("mousemove", gaze);

  context = canvas.getContext('2d');
};

function randomizeSettings() {
  return {
    x_origin: WIDTH * Math.random(),
    y_origin: HEIGHT * Math.random(),
    radius: 0.75 * Math.random() + 0.25
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
    context.arc(settings.x_origin, settings.y_origin, settings.radius, 0, 2*Math.PI);
    context.closePath()
    context.fill();
  };

  this.move = function(diff) {
    // if(diff.x_diff > 0) {
    //   diff.x_diff += settings.radius * 0.005;
    // }
    // else {
    //   diff.x_diff -= settings.radius * 0.005;
    // }
    // if(diff.y_diff > 0) {
    //   diff.y_diff += settings.radius * 0.005;
    // }
    // else {
    //   diff.y_diff -= settings.radius * 0.005;
    // }
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
    requestAnimationFrame(gazeSky({
      x_diff: (x - e.x) * 0.04,
      y_diff: (y - e.y) * 0.04
    }));
  }
};

function drawSky() {
  for(var i = 0; i < 100; i += 1) {
    stars[i] = new Star(randomizeSettings());
    stars[i].draw();
  }
};

function gazeSky(diff) {
  context.clearRect(0, 0, WIDTH, HEIGHT);

  for(var i = 0; i < 100; i +=1) {
    stars[i].move(diff);
    stars[i].draw();
  }
}

canvasSetup();
drawSky();