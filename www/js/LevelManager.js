(function (window) {

    //constructor
	function LevelManager() {
	    this.setGameMode("forward",7,false);
	}

	LevelManager.prototype.tick = function () {

	}
    LevelManager.prototype.setXY = function(x,y) { this.x = x; this.y = y; }
    LevelManager.prototype.createLevel = function(){

        //render the levels to the center of the screen
        this.spacing = 96;
        for (var i=0; i < this.quantity; i++){
            window.Game.bottles.addBottle(i*this.spacing,0,getRandomInt(0,9));
        }
        //realign bottles to center
        window.Game.bottles.setXY((window.Game.getWidth()/2)-(this.spacing*((this.quantity-1)/2)),380);
    }
    LevelManager.prototype.setGameMode = function(direction, quantity, audible){
        this.direction = direction;
        this.quantity = quantity;
        this.audible = audible;
    }
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

	window.LevelManager = new LevelManager();
}(window));
