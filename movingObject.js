(function() {
  "use strict";
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
		var movingObject = Asteroids.movingObject = function(params) {
		//allows you to pass {pos: [0, 0], vel: [1,1]}, etc.
		for (var field in params) {
			this[field] = params[field];
		}
	}

	movingObject.prototype.draw = function(ctx) {
		//set canvas attributes and draw
		ctx.beginPath();
		ctx.strokeStyle = this.color;
		ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI*2);
		ctx.stroke();
		ctx.closePath();
		// console.log(this.pos);
	}

	movingObject.prototype.fly = function() {
		//increment position by velocity
		this.pos[0] += this.vel[0];
		this.pos[1] += this.vel[1];
	}

})();
