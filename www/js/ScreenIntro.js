(function (window) {

    //constructor
	function ScreenIntro() {
        //container properties
		this.Container_constructor();
        this.width = window.Game.canvas.width;
        this.height = window.Game.canvas.height;
        this.x = this.width / 2;
        this.y = this.height / 2;

        //title sprite
		this.spriteSheet = new createjs.SpriteSheet({
            framerate: 8,
            images: [window.Game.assetManager.preload.getResult("hearo-title")],
            frames: [[0,0,858,284,0,433.6,118],[0,284,858,284,0,433.6,118]],
            animations: { start: [0,1] }
        });
        this.sprite = new createjs.Sprite(this.spriteSheet, "start");
        this.sprite.y = -128;
        this.sprite.scaleX = this.sprite.scaleY = 0;

        //background color
        this.background = new Background();
        this.background.setBackground("bg-1");

        //intro fade
        this.fadeEffect = new createjs.Shape();
        this.fadeEffect.graphics.beginFill("#ffffff").drawRect(-this.x, -this.y, this.width, this.height);

        //add to stage
        this.addChild(this.background);
        this.addChild(this.sprite);
        this.addChild(this.fadeEffect); //add to stage
    }

	//instance of class
	var container = new createjs.extend(ScreenIntro, createjs.Container);

    //update
	container.tick = function (event) {
        //begin animation
        createjs.Tween.get(this.fadeEffect).to({ alpha:0 }, 3000, createjs.Ease.sineOut);
        createjs.Tween.get(this.sprite).wait(1500).to({scaleX: 1, scaleY: 1}, 1000, createjs.Ease.cubicInOut);
    }

	window.ScreenIntro = createjs.promote(ScreenIntro, "Container");
}(window));
