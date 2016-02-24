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
	}

	movingObject.prototype.fly = function() {
		//increment position by velocity
    	this.game.wrap(this);
		this.pos[0] += this.vel[0];
		this.pos[1] += this.vel[1];
	}

  movingObject.prototype.hasCollidedWith = function(otherObject) {
    var radii = this.radius + otherObject.radius;
    if (calculateDistance(this, otherObject) <= radii) {
      return true
    }
  }

  function calculateDistance(obj1, obj2) {
    var x1 = obj1.pos[0];
    var y1 = obj1.pos[1];

    var x2 = obj2.pos[0];
    var y2 = obj2.pos[1];
    return Math.sqrt((Math.pow((x2 - x1), 2)) + (Math.pow((y2 - y1), 2)));
  }

})();
