(function() {
  "use strict";
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
	}

var Game = Asteroids.Game = function() {
	// create game, set "constants" for dimensions and number of asteroids
	this.DIM_X = [0, window.innerWidth];
	this.DIM_Y = [0, window.innerHeight];
	this.NUM_ASTEROIDS = 5;
	this.addAsteroids();
  this.ship = new Asteroids.Ship();
}

Game.prototype.addAsteroids = function() {
	this.asteroids = [];
	var asteroids = this.asteroids;
  var game = this;
	//put asteroids on canvas
	for(var x=0; x<= this.NUM_ASTEROIDS; x++){
		var asteroid = new Asteroids.Asteroid();
		asteroid.pos = assignPosition();
		asteroid.vel = [randomVel(), randomVel()];
    asteroid.game = game;
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
  this.ship.draw(ctx);
}

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
}

Game.prototype.moveObjects = function() {
	//move asteroids around
	var astArray = this.asteroids
	for (var x in astArray) {
			astArray[x].fly();
	}
}

Game.prototype.wrap = function(object) {
  //ensure that asteroids don't leave screen
  //if position[x] or position[y] is greater or less than screen bounds, send to opposite side of screen
    var radius = object.radius
    if (object.pos[0] - radius >= this.DIM_X[1]){
      object.pos[0] = 0;
    }
    if (object.pos[0] + radius <= 0) {
      object.pos[0]= this.DIM_X[1];
    }
    if (object.pos[1] - radius >= this.DIM_Y[1]) {
      object.pos[1] = 0;
    }
    if (object.pos[1] + radius <= 0) {
      object.pos[1] = this.DIM_Y[1];
    }
}

Game.prototype.checkCollisions = function() {
  //compare array to itself for collisions, ensuring that each asteroid is not compared to itself
  for (var x=0;x<=(this.asteroids.length - 1);x++) {
    for (var y=1;y<=(this.asteroids.length - 1);y++) {
      if (x != y &&   this.asteroids[x].hasCollidedWith(this.asteroids[y])) {
        console.log("boom!")
        //delete collided asteroids, making sure that their index won't change
        if (x > y) {
          this.asteroids.splice(x, 1);
          this.asteroids.splice(y, 1);
        } else {
          this.asteroids.splice(y, 1);
          this.asteroids.splice(x, 1);
        }
      }
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
