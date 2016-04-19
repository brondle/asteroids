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
		game.isPaused = true;
		var ctx = this.ctx;
		var lives = document.getElementById("lives");
		var level = document.getElementById("level");
		var menu = document.getElementById("menu");
		document.getElementById("highscore").innerHTML = game.highScore;
		document.getElementById("gamescore").innerHTML = game.score;
	    ctx.canvas.width = window.innerWidth - 100;
	    ctx.canvas.height = window.innerHeight - 100;
	    //redraw canvas every 25 ms
		setInterval(function() {
			if (!game.isPaused) {
		      	game.step();
				game.draw(ctx);
			} else {
    			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    			ctx.font = "18px Play"
    			ctx.fillStyle = "#00cc00";
    			if (game.justDied === true && game.lives > 0) {
    				console.log('lives: ' + game.lives);
	    			var txt = "You died! Press P to continue";
	    			var txtWidth = ctx.measureText(txt).width/2
	    			ctx.fillText(txt, ctx.canvas.width/2 - txtWidth, ctx.canvas.height/2);
	    			lives.innerHTML = game.lives;
    				game.ship.vel = [0, 0];
    				game.asteroids.forEach(function(asteroid) {
    			 	asteroid.pos = assignPosition(game);
    			 });
    			} else if (game.lives <= 0) {
    				console.log("foo");
    				var txt = "Game over! Press P to restart";
    				var txtWidth = ctx.measureText(txt).width/2
	    			 ctx.fillText(txt, ctx.canvas.width/2 - txtWidth, ctx.canvas.height/2);
	    			 if (key.isPressed("p")) {
		    			game.lives = 4;
		    			game.level = 0;
						if (game.score > game.highScore) {
							game.highScore = game.score;
							document.getElementById("highscore").innerHTML = game.highScore;
						}		    			
		    			game.NUM_ASTEROIDS = 5;
		    			game.addAsteroids();
		    			game.ship.vel = [0, 0];
	    			 	game.asteroids.forEach(function(asteroid) {
	    			 		asteroid.pos = assignPosition(game);
	    				});
	    			}
    			} else if (!game.beatLevel) {
	    			menu.className = " ";
    			 	game.ship.vel = [0, 0];
    			 	game.asteroids.forEach(function(asteroid) {
    			 	asteroid.pos = assignPosition(game);
    			 });
    			} else {
    				var txt = "You win this round! Welcome to level " + game.level + ". Press P to start.";
    				var txtWidth = ctx.measureText(txt).width/2;
    				ctx.fillText(txt, ctx.canvas.width/2 - txtWidth, ctx.canvas.height/2);
    				level.innerHTML = game.level;

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
		var menu = document.getElementById("menu");

	  if (key.isPressed("p")) {
	    if(game.isPaused === false) {
	      game.isPaused = true;
	    } else {
	    	if (game.justDied === true) {
	    		game.justDied = false;
	    		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	    		game.addAsteroids();
	    	}
	    	menu.className = "hidden";
	    	game.beatLevel = false
	    	game.isPaused = false;
	    }
	  }
	}

function assignPosition(game){
  //generate random position for asteroids
  var xPos = (Math.round(Math.random()*window.innerWidth));
  //eventually adapt to screen size
  var yPos = (Math.round(Math.random()*window.innerHeight));
  if ((xPos < game.ship.pos[0] + 100 && xPos > game.ship.pos[0] - 100) && (yPos < game.ship.pos[1] + 100 && yPos > game.ship.pos[1] - 100)) {
    xPos += 200;
    yPos += 200;
  }
  return [xPos, yPos]
}


})();
