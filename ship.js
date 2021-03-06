(function() {
  "use strict";
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var RADS = Math.PI/180;
	var Ship = Asteroids.Ship = function(){}
  var flameCounter = 0;

	Ship.prototype = Object.create(Asteroids.movingObject.prototype, {
		color: {value: "#FF000"},
		sides: {value: [ 25, 20]},
		vel: {value: [0, 0], writable: true},
		pos: {value: [500, 250], writable: true},
    angle: {value: 0, writable: true},
    radius: {value: 15} //obviously doesn't actually have one, but necessary for wrapping
	});

	Ship.prototype.constructor = Ship;

  Ship.prototype.recenter = function() {
    this.pos[0] = 500;
    this.pos[1] = 250;
  }

	Ship.prototype.draw = function(ctx) {
    var xCoord = this.pos[0];
    var yCoord = this.pos[1]-(this.sides[0]/2);
    var ship = this;
    var radius = this.radius;
    this.img = new Image();
    this.img.src = "./img/ship.png";
    this.img.onload = function() {
    }
    if (ship.vel[0] > 0 && ship.vel[1] > 0) {
    ship.vel[0] -= .01;
    ship.vel[1] -= .01;
  } else if (ship.vel[0] > 0 && ship.vel[1] < 0) {
    ship.vel[0] -= .01;
    ship.vel[1] += .01;
  } else if (ship.vel[0] < 0 && ship.vel[1] > 0) {
    ship.vel[0] += .01;
    ship.vel[1] -= .01;
  } else if (ship.vel[0] < 0 && ship.vel[1] < 0) {
    ship.vel[0] += .01;
    ship.vel[1] += .01;
  } else {
    ship.vel[0] = 0;
    ship.vel[1] = 0;
  }
    ship.fire();
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
    ctx.drawImage(this.img, -15, -25, radius*2, radius*2);
		ctx.closePath();
    if (flameCounter % 4 === 0 && (key.isPressed("up") || key.isPressed("down"))) {
        this.drawFlame(ctx);
    }
    ctx.rotate(this.angle*(-1));
    ctx.translate(xCoord*(-1), yCoord*(-1));
    flameCounter ++;
	}


	Ship.prototype.rotate = function() {
    var degrees = this.angle / RADS;
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
        this.vel[0] -= Math.sin(this.angle)/12;
        this.vel[1] += Math.cos(this.angle)/12;

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
    var ship = this;
     if (key.isPressed("space") && this.game.hasFired === false) {
      var missile = new Asteroids.Missile(ship.game, [0, 0], [0, 0]);
      var degrees = ship.angle / RADS;
      // console.log(ship.angle);
      var sin = Math.sin(ship.angle);
      var cos = Math.cos(ship.angle);
      var tan = Math.tan(ship.angle);
      console.log(sin + ", " + cos);
      var shipX = ship.pos[0];
      var shipY = ship.pos[1];
      if (degrees > 0 && degrees <= 90) {
        missile.pos[0] += shipX + (35*sin);
        missile.pos[1] += (shipY - (50*cos + 12*sin));
      } else if (degrees > 90 && degrees <= 180) {
        missile.pos[0] += shipX + (30*sin);
        missile.pos[1] += shipY - (25*cos + 12*sin);
      } else if (degrees > 180 && degrees <= 270) {
        missile.pos[0] += shipX + (30*sin);
        missile.pos[1] += shipY - (25*cos - 12*sin);
      } else {
        missile.pos[0] += shipX + (35*sin);
        missile.pos[1] += shipY - (50*cos - 12*sin);
        // console.log(missile.pos[0]  + ", " + missile.pos[1]);

      }
      missile.vel[0] += (sin*20);
      missile.vel[1] -= (cos*20);

      ship.game.missiles.push(missile);
      ship.game.hasFired = true;
    }
  }

  Ship.prototype.drawFlame = function(ctx) {
    ctx.fillStyle = "#990000";
    ctx.beginPath();
    ctx.beginPath();
    ctx.moveTo(-6, 0);
    ctx.lineTo(0, 0 + this.sides[0]);
    ctx.lineTo(6, 0);
    ctx.fill();
    ctx.closePath();

  }
})();
