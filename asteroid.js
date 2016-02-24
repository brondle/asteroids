(function() {
  "use strict";
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }


	var Asteroid = Asteroids.Asteroid = function(){
		this.radius = 50;
	}

	Asteroid.prototype = Object.create(Asteroids.movingObject.prototype, {
		//create Asteroid as subclass of moving object, assigning color\
		color: {value : "#00000"},
	});
	Asteroid.prototype.constructor = Asteroid;
})();
