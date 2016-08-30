(function (window) {

    //constructor
	function LevelManager() {

	}
	LevelManager.prototype.tick = function (delta) {
	    if (this.delay > 0){ //value given after the last bottle is selected
	        this.delay -= delta;
            if (this.delay <= 0){
                window.Game.setAutoType(false);
                window.Game.setScreen(2);
                window.Game.setStage();
            }
        }
    }
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

        //check if game is finished
        if (this.currentBottleIndex < this.quantity - 1) this.currentBottleIndex++;
        else { if (this.delay == null || this.delay <= 0) this.delay = 1000; } //game finished

        tempBaseball.setNextX((window.Game.getWidth()/2)-(this.spacing*((this.quantity-1)/2))+(this.spacing*this.currentBottleIndex));
    }
    LevelManager.prototype.requestInput = function(){
        if (this.practiceMode == false){
            alertify
                .okBtn("Submit").cancelBtn("Retry")
                .prompt("Type what you remembered:",
                    function (val, ev) {
                        window.Game.levelManager.gameString = val;
                        window.Game.setAutoType(true);
                        ev.preventDefault();
                    },
                    function(ev) {
                        window.Game.setScreen(4);
                        window.Game.setStage();
                        ev.preventDefault();
                        alertify.error("Login Unsuccessful");
                    }
                );
        }
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
    LevelManager.prototype.setGameMode = function(direction, quantity, audible, practiceMode){
        this.direction = direction;
        this.quantity = quantity;
        this.audible = audible;
        this.practiceMode = practiceMode != null ? practiceMode : false;
        this.currentBottleIndex = 0;
    }
    LevelManager.prototype.hasDelay = function(){ return this.delay != null && this.delay > 0; }
    LevelManager.prototype.getAutoKey = function(){
        var char = this.gameString.charAt(this.currentBottleIndex);
        console.log(char);
        return this.gameString != null ? parseInt(char)+48 : -1;
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

	window.LevelManager = new LevelManager();
}(window));
