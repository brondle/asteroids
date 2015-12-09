;(function() {
  "use strict";
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

	var GameView = Asteroids.GameView = function() {
    //create game, locate canvas
		this.game = new Asteroids.Game();
		this.ctx = document.getElementById("primary").getContext("2d");
	}

	GameView.prototype.start = function() {
		var game = this.game;
		var ctx = this.ctx;
    //redraw canvas every 25 ms
		setInterval(function() {
			game.draw(ctx);
			game.moveObjects();
		}, 25);
	}

})();
