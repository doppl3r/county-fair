(function (window) {

    //constructor
	function LevelManager() {
	    //TODO pull scores from database
        this.practiceMode = false;
        this.bottleCount = 7;
        this.bearCount = 0;
        this.toyCount = 0;
        this.candyCount = 0;
        this.prize = "prize-candy"; //default
	}
	LevelManager.prototype.tick = function (delta) {
	    if (this.delay > 0){ //value given after the last bottle is selected
	        this.delay -= delta;
            if (this.delay <= 0){
                //add to score
                if (this.rPoints >= this.quantity) { this.bearCount++; this.prize = "prize-bear"; }
                else if (this.rPoints > (this.quantity/2) && this.rPoints < this.quantity) { this.toyCount++; this.prize = "prize-toy"; }
                else { this.candyCount++; this.prize = "prize-candy"; }
                //change view
                window.Game.screenScore.redraw();
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
            tempBaseball.pitch(1,this.currentBottleIndex == 0);
            tempBottle.hitTarget();
            this.rPoints++;
        }
        else tempBaseball.pitch(-1);
        //adjust the current index

        //check if game is finished
        if (this.currentBottleIndex < this.quantity - 1) this.currentBottleIndex++;
        else { if (this.delay == null || this.delay <= 0) this.delay = 1000; } //game finished

        tempBaseball.setNextX((window.Game.getWidth()/2)-(this.spacing*((this.quantity-1)/2))+(this.spacing*this.currentBottleIndex));
    }
    LevelManager.prototype.requestInput = function(){
        $("body").addClass('hideCancel');
        if (this.practiceMode == false){
            alertify
                .okBtn("Submit").cancelBtn("")
                .prompt("Type what you remembered:",
                    function (val, ev) {
                        window.Game.levelManager.gameString = val;
                        window.Game.setAutoType(true);
                        ev.preventDefault();
                    },
                    function(ev) {
                        window.Game.setScreen(0);
                        window.Game.setStage();
                        ev.preventDefault();
                        alertify.error("Exited...");
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
        //if audio is an option, this will not move
        window.Game.bottles.setVisibleBottles(this.audible ? 0 : -200,this.direction=="reverse");
        //realign bottles to center
        window.Game.bottles.setXY((window.Game.getWidth()/2)-(this.spacing*((this.quantity-1)/2)),380);
        window.Game.baseball.setXY((window.Game.getWidth()/2)-(this.spacing*((this.quantity-1)/2)), null);
    }
    LevelManager.prototype.setGameMode = function(direction, quantity, audible, practiceMode){
        this.rPoints = 0; //reset round points
        this.direction = (direction != null) ? direction : this.direction;
        this.quantity = (quantity != null) ? quantity : this.quantity;
        this.audible = (audible != null) ? audible : this.audible;
        this.practiceMode = practiceMode != null ? practiceMode : this.practiceMode;
        this.currentBottleIndex = 0;
    }
    LevelManager.prototype.hasDelay = function(){ return this.delay != null && this.delay > 0; }
    LevelManager.prototype.getAutoKey = function(){
        var char = this.gameString.charAt(this.currentBottleIndex);
        return this.gameString != null ? parseInt(char)+48 : -1;
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

	window.LevelManager = new LevelManager();
}(window));
3