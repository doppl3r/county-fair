(function (window) {

    //constructor
	function CustomCharacter() {
        this.Container_constructor();
	}

	//instance of class
	var container = new createjs.extend(CustomCharacter, createjs.Container);

    //initialize Character
	container.init = function (x,y,scaleX,scaleY,spriteSheet,frame){
        this.x = x;
        this.y = y;
        this.sprite = new createjs.Sprite(spriteSheet, frame);
        this.sprite.scaleX = scaleX;
        this.sprite.scaleY = scaleY;
        this.sprite.gotoAndStop(frame);
        this.addChild(this.sprite);
	}

	//public functions
    container.isClicked = function(){ return this.clicked; }
    container.click = function() { this.clicked=true; }

	window.CustomCharacter = new createjs.promote(CustomCharacter, "Container");
}(window));
