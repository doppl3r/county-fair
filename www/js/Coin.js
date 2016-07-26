(function (window) {

    //constructor
	function Coin() {
        this.Container_constructor();
	}

	//instance of class
	var container = new createjs.extend(Coin, createjs.Container);

    //initialize Character
	container.init = function (x,y,scaleX,scaleY,spriteSheet,frame){
        this.x = x;
        this.y = y;
        this.xVel = getRandomNum(-2.5,2.5);
        this.yVel = this.startV = getRandomNum(-15,-25);
        this.yDiff = getRandomNum(0,100);
        this.currentBounce = this.bounces = 5;
        this.gravity = 1.2;
        this.sprite = new createjs.Sprite(spriteSheet, getRandomInt(0,3));
        this.sprite.scaleX = scaleX;
        this.sprite.scaleY = scaleY;
        this.sprite.gotoAndPlay(frame);
        this.addChild(this.sprite);
	}

    container.tick = function(event){
        if (this.y + this.yVel < this.yDiff){
            this.yVel += this.gravity;
            this.y += this.yVel;
            this.x += this.xVel;
        }
        else {

            if (this.currentBounce > 0) {
                this.currentBounce -= 1;
                this.yVel = (this.startV)*(this.currentBounce/this.bounces);
            }
            else this.sprite.gotoAndStop("halt");
        }
    }
	//public functions
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function getRandomNum(min, max) {
        return (Math.random() * (max - min)) + min;
    }

	window.Coin = new createjs.promote(Coin, "Container");
}(window));
