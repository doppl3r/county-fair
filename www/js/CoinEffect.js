(function (window) {

    //constructor
	function CoinEffect() {
	    this.Container_constructor();
	    this.spriteSheet = new createjs.SpriteSheet({ //generated with Adobe Animate
            framerate: 12,
            images: [window.Game.assetManager.preload.getResult("coin")],
            frames: [[4,4,20,22,0,14,46.25],[28,4,16,23,0,12,47.25],[48,4,10,23,0,9,47.25],
                    [62,4,17,22,0,13,46.25],[83,4,23,18,0,16,44.25]],
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
            animations: {
                spin: { frames: [0,1,2,3] },
                halt: { frames: [4] }
            }
        });
	}

	//instance of class
	var container = new createjs.extend(CoinEffect, createjs.Container);

    //update
	container.tick = function (event) {
        if (this.delay >= 0) {
            this.delay -= 1;
            if (this.delay == 0) this.alpha=1; //make visible
        }
        else {
            for (var i=0; i < this.children.length; i++){
                this.getChildAt(i).tick(event);
            }
        }
    }

	//public functions
    container.addCoins = function (x,y,scaleX,scaleY,amount, delay){
        if (delay > 0){
            this.alpha=0; //make invisible
            this.delay = delay;
        } 
        if (this.children.length > 0) this.removeChild(this.coin);
        for (i = 0; i < amount; i++){
            this.coin = new Coin();
            this.coin.init(this.x,this.y,scaleX,scaleY,this.spriteSheet,"spin");
            this.addChild(this.coin);
        }
    }

	window.CoinEffect = createjs.promote(CoinEffect, "Container");
}(window));
