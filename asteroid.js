(function() {
  "use strict";
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var imgArray = ["img/asteroid1.jpeg", "img/asteroid2.jpeg", "img/asteroid3.jpeg", "img/asteroid4.jpg"];
	var Asteroid = Asteroids.Asteroid = function(){
		var rand = imgArray[Math.floor(Math.random() * imgArray.length)];
		this.radius = 50;
		this.img = new Image();
		this.img.src = rand;
	}

	Asteroid.prototype = Object.create(Asteroids.movingObject.prototype, {
		//create Asteroid as subclass of moving object, assigning color\
		color: {value : "#00000"},
	});
	Asteroid.prototype.constructor = Asteroid;
})();
