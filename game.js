(function() {
  "use strict";
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
	}

var Game = Asteroids.Game = function() {
	// create game, set "constants" for dimensions and number of asteroids
	this.DIM_X = [0, window.innerWidth];
	this.DIM_Y = [0, window.innerHeight]
  this.ship = new Asteroids.Ship();
  this.ship.game = this;
	this.NUM_ASTEROIDS = 5;
	this.addAsteroids();
  this.hasFired = false;
  this.isPaused = false;
  this.beatLevel = false;
  this.missiles = [];
  this.level = 0;
  this.lives = 4;
  this.justDied = false;
}

Game.prototype.addAsteroids = function() {
	this.asteroids = [];
	var asteroids = this.asteroids;
  var game = this;
	//put asteroids on canvas
	for(var x=0; x<= this.NUM_ASTEROIDS; x++){
		var asteroid = new Asteroids.Asteroid();
		asteroid.pos = assignPosition(game);
    asteroid.radius *= Math.random() + .35;
		asteroid.vel = [randomVel(), randomVel()];
    asteroid.game = game;
		asteroids.push(asteroid);
	}
}

Game.prototype.draw = function(ctx) {
	//clear canvas, then re-draw
  if (this.asteroids.length === 0) {
    this.beatLevel = true;
    this.isPaused = true;
    this.ship.recenter();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.NUM_ASTEROIDS += this.NUM_ASTEROIDS;
    this.addAsteroids();
    this.level++;
  } else {
  	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // var background = new Image();
    // background.src = "img/blackhole.jpg";
    // ctx.drawImage(background, 0, 0);
  	var astArray = this.asteroids
  	for (var x in this.asteroids) {
  		astArray[x].draw(ctx);
  	}
    for (var x in this.missiles) {
      this.missiles[x].draw(ctx);
    }
    this.ship.draw(ctx);
    }
  ctx.fillText("Level " + this.level, 15, 15);

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
  for (var x in this.missiles) {
    this.missiles[x].fly();
  }
}

Game.prototype.wrap = function(object) {
  //ensure that asteroids don't leave screen
  //if position[x] or position[y] is greater or less than screen bounds, send to opposite side of screen
    var t;
    var radius = object.radius
    if (object.pos[0] - radius >= this.DIM_X[1]){
      object.pos[0] = 0;
      t = true
    }
    if (object.pos[0] + radius <= 0) {
      object.pos[0]= this.DIM_X[1];
      t = true
    }
    if (object.pos[1] - radius >= this.DIM_Y[1]) {
      object.pos[1] = 0;
      t = true
    }
    if (object.pos[1] + radius <= 0) {
      object.pos[1] = this.DIM_Y[1];
      t = true
    }
    if (object instanceof Asteroids.Missile && t === true) {
      var index = this.missiles.indexOf(object);
      this.missiles.splice(index, 1);
    }
}

Game.prototype.checkCollisions = function() {
  //compare array to itself for collisions, ensuring that each asteroid is not compared to itself
  for (var x=0;x<(this.asteroids.length);x++) {
    for (var y=1;y<(this.asteroids.length);y++) {
      if (x != y && this.asteroids[x].hasCollidedWith(this.asteroids[y])) {
        console.log("boom!")
        //delete collided asteroids, making sure that their index won't change
        if (this.asteroids[x].radius > 35 && this.asteroids[y].radius > 35) {
          this.asteroids[x].radius *= .5;
          this.asteroids[x].vel[0] *= -1;
          this.asteroids[x].vel[1] *= -1;
          this.asteroids[y].radius *= .5;
          this.asteroids[y].vel[0] *= -1;
          this.asteroids[y].vel[1] *= -1;
        } else if (this.asteroids[x].radius > 35 && this.asteroids[y].radius <= 35) {
          this.asteroids[x].radius *= .5;
          this.asteroids[x].vel[0] *= -1;
          this.asteroids[x].vel[1] *= -1;
          this.asteroids.splice(y, 1);
        } else if ( this.asteroids[y].radius > 35 && this.asteroids[x].radius <= 35) {
          this.asteroids[y].radius *= .5;
          this.asteroids[y].vel[0] *= -1;
          this.asteroids[y].vel[1] *= -1;
          this.asteroids.splice(x, 1);
        } else if (x > y) {
          this.asteroids.splice(x, 1);
          this.asteroids.splice(y, 1);
        } else {
          this.asteroids.splice(y, 1);
          this.asteroids.splice(x, 1);
        }
      }
      if (this.asteroids[x].hasCollidedWith(this.ship)) {
        console.log("dead!")
        this.lives--;
        this.justDied = true;
        this.isPaused = true;
      }
    }
    for (var z=0;z<(this.missiles.length); z++) {
      if (this.asteroids[x].hasCollidedWith(this.missiles[z])) {
        this.asteroids.splice(x, 1);
        this.missiles.splice(z, 1);
      }
    }
  }
}

function assignPosition(game){
	//generate random position for asteroids
	var xPos = (Math.round(Math.random()*window.innerWidth));
	//eventually adapt to screen size
	var yPos = (Math.round(Math.random()*window.innerHeight));
  if ((xPos < game.ship.pos[0] + 100 && xPos > game.ship.pos[0] - 100) && (yPos < game.ship.pos[1] + 100 && yPos > game.ship.pos[1] - 100)) {
    xPos += 200;
    yPos += 200;
  }
	return [xPos, yPos]
}



function randomVel() {
	//generate random velocity between 0.5 and 2.5, randomly assign positive or negative values
 var vel = Math.random() * 2 + 0.5;
 vel *= Math.floor(Math.random()*2) == 1 ? 1: -1;
 return vel
}
})();
