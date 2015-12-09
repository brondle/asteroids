(function() {
  "use strict";
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }


	var Asteroid = Asteroids.Asteroid = function(){}

	Asteroid.prototype = Object.create(Asteroids.movingObject.prototype, {
		//create Asteroid as subclass of moving object, assigning color and radius
		color: {value : "#00000"},
		radius: {value : 25}//eventually randomize size
	});
	Asteroid.prototype.constructor = Asteroid;
})();
