;(function() {
  "use strict";
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

	var GameView = Asteroids.GameView = function() {
    //create game, locate canvas
		this.game = new Asteroids.Game();
		this.game.gameView = this;
		this.ctx = document.getElementById("primary").getContext("2d");

	}

	GameView.prototype.start = function() {
		var game = this.game;
		var ctx = this.ctx;
		var lives = document.getElementById("lives");
		var level = document.getElementById("level");
	    ctx.canvas.width = window.innerWidth - 100;
	    ctx.canvas.height = window.innerHeight - 100;
	    //redraw canvas every 25 ms
		setInterval(function() {
			if (!game.isPaused) {
		      	game.step();
				game.draw(ctx);
			} else {
    			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    			if (game.justDied === true) {
    			 ctx.fillText("You died! Press P to continue", ctx.canvas.width/2, ctx.canvas.height/2);
    			 lives.innerHTML = this.game.lives;
    			} else if (!game.beatLevel) {
    			ctx.fillText("PAUSED, press P to START", ctx.canvas.width/2, ctx.canvas.height/2);
    			} else {
    			ctx.fillText("You beat this level! Welcome to level " + game.level + ". Press P to Start.", ctx.canvas.width/2 - 30, ctx.canvas.height/2);
    			level.innerHTML = this.game.level;

    			}
			}
		}, 25);
		setInterval(function() {
			checkPause(game);
		}, 50);
		setInterval(function() {
	      game.hasFired = false;
	    }, 300);
	}
	function checkPause(game) {
		var ctx = game.gameView.ctx;
	  if (key.isPressed("p")) {
	    if(game.isPaused === false) {
	      game.isPaused = true;
	    } else {
	    	if (game.justDied === true) {
	    		game.justDied = false;
	    		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	    		game.addAsteroids();
	    	}
	    	game.beatLevel = false
	    	game.isPaused = false;
	    }
	  }
	}

})();
