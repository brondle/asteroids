(function() {
  "use strict";
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
	}

var Game = Asteroids.Game = function() {
	// create game, set "constants" for dimensions and number of asteroids
	this.DIM_X = [0, window.innerWidth];
	this.DIM_Y = [0, window.innerHeight];
	this.NUM_ASTEROIDS = 3;
	this.addAsteroids();
}

Game.prototype.addAsteroids = function() {
	this.asteroids = [];
	var asteroids = this.asteroids;
	//put asteroids on canvas
	for(var x=0; x<= this.NUM_ASTEROIDS; x++){
		var asteroid = new Asteroids.Asteroid();
		asteroid.pos = assignPosition();
		asteroid.vel = [randomVel(), randomVel()];
		asteroids.push(asteroid);
	}
}

Game.prototype.draw = function(ctx) {
	//clear canvas, then re-draw
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	var astArray = this.asteroids
	for (var x in this.asteroids) {
		astArray[x].draw(ctx);
	}
}

Game.prototype.moveObjects = function() {
	//move asteroids around
	var astArray = this.asteroids
	for (var x in astArray) {
			astArray[x].fly();
	}
}

Game.prototype.wrap = function(ctx) {
  //ensure that asteroids don't leave screen
  var astArray = this.asteroids;
  console.log(this.asteroids);
  //if position[x] or position[y] is greater or less than screen bounds, send to opposite side of screen
  for (var x in astArray) {
    var xCoordinate = astArray[x].pos[0];
    var yCoordinate = astArray[x].pos[1];
    var radius = astArray[x].radius
    if (xCoordinate - radius >= ctx.canvas.width){
      astArray[x].pos[0] = 0 + astArray[x].vel[0];
    }
    if (xCoordinate + radius <= 0) {
      astArray[x].pos[0]= ctx.canvas.width + astArray[x].vel[0];
    }
    if (yCoordinate - radius >= ctx.canvas.height) {
      astArray[x].pos[1] = 0 + astArray[x].vel[1];
    }
    if (yCoordinate + radius <= 0) {
      astArray[x].pos[1] = ctx.canvas.height + astArray[x].vel[1];
    }
  }
}

function assignPosition(){
	//generate random position for asteroids
	var xPos = (Math.round(Math.random()*window.innerWidth));
	//eventually adapt to screen size
	var yPos = (Math.round(Math.random()*window.innerHeight));
	return [xPos, yPos]
}


function randomVel() {
	//generate random velocity between 0.5 and 2.5, randomly assign positive or negative values
 var vel = Math.random() * 2 + 0.5;
 vel *= Math.floor(Math.random()*2) == 1 ? 1: -1;
 return vel
}
})();
