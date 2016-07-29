(function (window) {

    //constructor
	function LevelManager() {
	    this.setGameMode("forward",7,false);
	}
	LevelManager.prototype.tick = function () {  }
	LevelManager.prototype.inputKey = function (keyCode) {
        var num = keyCode-48; //get number
        var tempBottle = window.Game.bottles.getBottle(this.currentBottleIndex);
        var tempBaseball = window.Game.baseball;
        //check for matching numbers
        if (num == tempBottle.getNumber()){
            tempBaseball.pitch(1);
            tempBottle.hitTarget();
        }
        else tempBaseball.pitch(-1);
        //adjust the current index
        if (this.currentBottleIndex < this.quantity - 1){
            this.currentBottleIndex++; //adjust index
        }
        tempBaseball.setNextX((window.Game.getWidth()/2)-(this.spacing*((this.quantity-1)/2))+(this.spacing*this.currentBottleIndex));
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
        window.Game.baseball.setXY((window.Game.getWidth()/2)-(this.spacing*((this.quantity-1)/2)), null);
    }
    LevelManager.prototype.setGameMode = function(direction, quantity, audible){
        this.direction = direction;
        this.quantity = quantity;
        this.audible = audible;
        this.currentBottleIndex = 0;
    }
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

	window.LevelManager = new LevelManager();
}(window));
