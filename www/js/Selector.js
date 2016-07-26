(function (window) {

    //constructor
	function Selector() {
		this.Container_constructor();
		this.spriteSheet = new createjs.SpriteSheet({
            framerate: 8,
            images: [window.Game.assetManager.preload.getResult("selector")],
            frames: [[4,4,53,53,0,26.7,26.15],[61,4,38,37,0,19.7,18.15],
                    [103,4,11,9,0,5.699999999999999,4.149999999999999],
                    [118,4,0,0,0,0.6999999999999993,0.14999999999999858],[4,61,53,53,0,26.7,26.15],
                    [61,61,38,37,0,19.7,18.15],[103,61,11,9,0,5.699999999999999,4.149999999999999],
                    [118,61,0,0,0,0.6999999999999993,0.14999999999999858]],
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
            animations: {
                click: { frames: [0,1,2,3], next: false },
                clickTwo: { frames: [4,5,6,7], next: false },
                hide: [3]
            }
        });
        this.sprite = new createjs.Sprite(this.spriteSheet, "hide");
        this.addChild(this.sprite);
	}

	//instance of class
	var container = createjs.extend(Selector, createjs.Container);

    //update
	container.tick = function () {  }
    container.setXY = function(x,y) { this.x = x; this.y = y; }
    container.animateAt = function(event) {
        this.setXY(event.stageX, event.stageY);
        this.sprite.gotoAndPlay("click");
    }

	window.Selector = createjs.promote(Selector, "Container");
}(window));
