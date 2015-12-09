(function() {
  "use strict";
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
	}

var Game = Asteroids.Game = function() {
	// create game, set "constants" for dimensions and number of asteroids
	this.DIM_X = [0, 1000];
	this.DIM_Y = [0, 500];
	this.NUM_ASTEROIDS = 10;
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
	ctx.clearRect(0, 0, 1000, 500);
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

Game.prototype.wrap = function() {
  
}

function assignPosition(){
	//generate random position for asteroids
	var xPos = (Math.round(Math.random()*1000));
	//eventually adapt to screen size
	var yPos = (Math.round(Math.random()*500));
	return [xPos, yPos]
}


function randomVel() {
	//generate random velocity between 0.5 and 2.5, randomly assign positive or negative values
 var vel = Math.random() * 2 + 0.5;
 vel *= Math.floor(Math.random()*2) == 1 ? 1: -1;
 return vel
}
})();
