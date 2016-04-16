(function() {
  "use strict";
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

var Missile = Asteroids.Missile = function(game, pos, vel){
	this.game = game;
	this.pos = pos;
	this.vel = vel;

}

Missile.prototype = Object.create(Asteroids.movingObject.prototype, {
	color: {value : "#FF0000"},
	radius: {value: 5}
});

Missile.prototype.constructor = Missile;
})()
