(function() {
  "use strict";
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var RADS = Math.PI/180;
	var Ship = Asteroids.Ship = function(){}

	Ship.prototype = Object.create(Asteroids.movingObject.prototype, {
		color: {value: "#00000"},
		sides: {value: [ 25, 20]},
		vel: {value: [0, 0]},
		pos: {value: [500, 250]},
    angle: {value: 0, writable: true},
    radius: {value: 15} //obviously doesn't actually have one, but necessary for wrapping
	});

	Ship.prototype.constructor = Ship;

	Ship.prototype.draw = function(ctx) {
    var xCoord = this.pos[0];
    var yCoord = this.pos[1]-(this.sides[0]/2);
    if (key.isPressed("space")) {
      this.fire();
    }
		ctx.strokeStyle = this.color;
    //set ship as center of canvas for rotation
    ctx.translate (xCoord, yCoord);
    //check for rotation/movement
    this.rotate();
    this.power();
    this.fly();
    ctx.rotate(this.angle);
    //draw triangle
		ctx.beginPath();
		ctx.moveTo(-10, 0);
		ctx.lineTo(0, 0 - this.sides[0]);
		ctx.lineTo(10, 0);
		ctx.closePath();
		ctx.stroke();
    ctx.rotate(this.angle*(-1));
    ctx.translate(xCoord*(-1), yCoord*(-1));
	}


	Ship.prototype.rotate = function() {
    var degrees = this.angle / RADS
		if(key.isPressed("left")) {
      //rotate left
      this.angle -= .1;
      if ((degrees) <= 0) {
        //set angle for readability/ease of use with other methods
        this.angle = (360 * RADS);
      }
		}
    if(key.isPressed("right")) {
      //rotate right
			this.angle += .1;
      if ((degrees) >= 360) {
        this.angle = 0;
      }
    }
    if (degrees >= 90 && degrees <= 270) {
      //set direction
      this.direction = "down";
    } else {
      this.direction = "up";
    }
	}

  Ship.prototype.power = function() {
    if (key.isPressed("up")) {
      //calculate added velocity
        this.vel[0] += Math.sin(this.angle)/6;
        this.vel[1] -= Math.cos(this.angle)/6;

    }

    if (key.isPressed("down")) {
      if (this.direction === "down") {
        this.vel[0] -= Math.sin(this.angle)/12;
        this.vel[1] += Math.cos(this.angle)/12;
      } else {
        this.vel[0] -= Math.sin(this.angle)/12;
        this.vel[1] += Math.cos(this.angle)/12;
      }
    }

    //set speed limits
    for (var x in this.vel) {
      if (this.vel[x] >= 5) {
        this.vel[x] = 5;
      }
      if (this.vel[x] <= -5) {
        this.vel[x] = -5;
      }
    }
  }

  Ship.prototype.fire = function() {
    var missile = new Asteroids.Missile(this.game, [0, 0], [0, 0]);
    missile.pos[0] += this.pos[0];
    missile.pos[1] += this.pos[1];
    missile.vel[0] += (Math.sin(this.angle)*3);
    missile.vel[1] -= (Math.cos(this.angle)*3);

    this.game.asteroids.push(missile);
  }
})();
