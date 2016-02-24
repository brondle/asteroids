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
	    ctx.canvas.width = window.innerWidth;
	    ctx.canvas.height = window.innerHeight;
	    //redraw canvas every 25 ms
		setInterval(function() {
			checkPause(game);
			if (!game.isPaused) {
		      	game.step();
				game.draw(ctx);
			} else {
    			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    			if (!game.beatLevel) {
    			ctx.fillText("PAUSED", ctx.canvas.width/2, ctx.canvas.height/2);
    			} else {
    			ctx.fillText("You beat this level! Welcome to level " + game.level, ctx.canvas.width/2 - 30, ctx.canvas.height/2);

    			}
			}
		}, 25);
		setInterval(function() {
	      game.hasFired = false;
	    }, 300);
	}
	function checkPause(game) {
	  if (key.isPressed("p")) {
	    if(game.isPaused === false) {
	      game.isPaused = true;
	    } else {
	    	game.beatLevel = false
	    	game.isPaused = false;
	    }
	  }
	}

})();
