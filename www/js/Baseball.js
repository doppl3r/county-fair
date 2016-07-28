(function (window) {

    //constructor
	function Baseball() {
		this.Container_constructor();
		this.spriteSheet = new createjs.SpriteSheet({ framerate: 1, images: [window.Game.assetManager.preload.getResult("baseball")], frames: [[0,0,239,245,0,119.5,122.5]], animations: { default: { frames: [0] }}});
        this.sprite = new createjs.Sprite(this.spriteSheet, "default");
        this.addChild(this.sprite);
        this.vel = 10;
        this.forceAllKeysUp();
	}

	//instance of class
	var container = createjs.extend(Baseball, createjs.Container);

    //update
	container.tick = function (event) {
	    //move baseball if target is not in reach
	    if (this.target){
	        if (Math.abs(this.x - this.targetX) >= this.vel ||
                Math.abs(this.y - this.targetY) >= this.vel){
                this.left = this.x >= this.targetX + this.vel * this.directionX;
                this.right = this.x < this.targetX - this.vel * this.directionX;
                this.up = this.y >= this.targetY + this.vel * this.directionY;
                this.down = this.y < this.targetY - this.vel * this.directionY;

                this.enableRunAnimation(true);

                //adjust baseball direction
                if (this.left) this.scaleX = -1;
                else this.scaleX = 1;
            }
            else {
                this.forceAllKeysUp();
                this.enableRunAnimation(false);
            } //reset when reached target
	    }

        //check key input
        if (this.sprite.currentAnimation != "attack" && !this.freeze) { //disable movement while attacking
            if (this.left) this.x += this.vel * this.directionX;
            else if (this.right) this.x += this.vel * this.directionX;
            if (this.up) this.y += this.vel * this.directionY;
            else if (this.down) this.y += this.vel * this.directionY;
        }
        else this.forceAllKeysUp();
	}

	//public variables
    container.moveUp = function(pressed) {
        if (!this.freeze) {
            this.up = pressed;
            this.directionY = -1;
            this.enableRunAnimation(pressed);
        }
    }
    container.moveRight = function(pressed) {
        if (!this.freeze) {
            this.right = pressed;
            this.scaleX = this.directionX = 1;
            this.enableRunAnimation(pressed);
        }
    }
    container.moveDown = function(pressed) {
        if (!this.freeze) {
            this.down = pressed;
            this.directionY = 1;
            this.enableRunAnimation(pressed);
        }
    }
    container.moveLeft = function(pressed) {
        if (!this.freeze){
            this.left = pressed;
            this.scaleX = this.directionX = -1;
            this.enableRunAnimation(pressed);
        }
    }
    container.setXY = function(x,y) { this.x = x; this.y = y; this.freeze = false; }
    container.navigate = function(event) {
        if (!this.freeze){
            this.target = true;
            this.targetX = event.stageX;
            this.targetY = event.stageY;
            this.distance = Math.sqrt(Math.pow(this.targetX - this.x,2)+Math.pow(this.targetY - this.y,2));
            this.directionX = (this.targetX - this.x) / this.distance;
            this.directionY = (this.targetY - this.y) / this.distance;
        }
    }
    container.enableRunAnimation = function(pressed){
        if (pressed){
            if (this.sprite.currentAnimation == "default"){
                this.sprite.gotoAndPlay("run");
            }
        }
        else {
            this.targetX = this.x; //interrupt target
            this.targetY = this.y;
            if (this.sprite.currentAnimation == "run" && this.allKeysUp()) {
                this.sprite.gotoAndPlay("default");
            }
        }
    }
    container.allKeysUp = function() { return this.left==this.right==this.up==this.down; }
    container.forceAllKeysUp = function() { this.left=this.right=this.up=this.down=this.target=false; }
    container.centerToScreen = function() { this.x = window.Game.getCenter()[0]; this.y = window.Game.getCenter()[1]; }
    container.centerToScreenBottom = function() { this.x = window.Game.getWidth()/2; this.y = window.Game.getHeight(); }

	window.Baseball = createjs.promote(Baseball, "Container");
}(window));
