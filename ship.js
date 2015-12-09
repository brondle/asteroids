(function() {
  "use strict";
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

	var Ship = Asteroids.Ship = function(){}

	Ship.prototype = Object.create(Asteroids.movingObject.prototype, {
		color: {value: "#00000"},
		sides: {value: [ 25, 20]},
		vel: {value: [0, 0], writable: true},
		pos: {value: [500, 250]},
    angle: {value: 0, writable: true}
	});

	Ship.prototype.constructor = Ship;

	Ship.prototype.draw = function(ctx) {
    this.power();
    // this.pos[0] += this.vel[0];
    // this.pos[1] += this.vel[1];
    var xCoord = this.pos[0];
    var yCoord = this.pos[1]-(this.sides[0]/2);
		ctx.strokeStyle = this.color;
    ctx.translate (xCoord, yCoord);
    this.rotate()
    ctx.rotate(this.angle);
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
		if(key.isPressed("left")) {
      console.log(this.angle);
      this.angle -= .1;
		}
    if(key.isPressed("right")) {
			this.angle += .1;
		}
	}

  Ship.prototype.power = function() {
    if(key.isPressed("up")) {
      this.vel[0] -= .01;
    }
  }

})();
