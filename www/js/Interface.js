(function (window) {

    //constructor
	function Interface() {
		this.Container_constructor();
		this.spriteSheet = new createjs.SpriteSheet({
            framerate: 0,
            images: [window.Game.assetManager.preload.getResult("trials-remaining")],
            frames: [[4,4,404,95,0,171.75,47.9]],
            animations: { start: [0] }
        });
        this.sprite = new createjs.Sprite(this.spriteSheet, "start");

        this.width = window.Game.canvas.width;
        this.height = window.Game.canvas.height;
        this.x = (this.sprite.getBounds().width/2) - 36;
        this.y = (this.height - this.sprite.getBounds().height/2) + 12;

        //progress text
        this.trialsText = new CustomText(0,0,1,1,"trials:");
        this.listenText = new CustomText((this.width/2)-this.x,-this.height/2,1,1,"listen...", true);

        //intro fade
        this.fadeEffect = new createjs.Shape();
        this.fadeEffect.graphics.beginFill("#1A101A").drawRect(-this.x, -this.y, this.width, this.height);

        this.addChild(this.fadeEffect);
        this.addChild(this.sprite);
        this.addChild(this.trialsText);
        this.addChild(this.listenText);
    }

	//instance of class
	var container = new createjs.extend(Interface, createjs.Container);

    //update
	container.tick = function (event) {
        if (this.fadeEffect.alpha == 1){
            createjs.Tween.get(this.fadeEffect).to({ alpha:0 }, 2000, createjs.Ease.quartIn);
            createjs.Tween.get(this.listenText).to({ alpha:0 }, 2000, createjs.Ease.quartIn);
        }
    }
    container.setText = function(text, centerText){
        if (this.children.length > 0) this.removeChild(this.trialsText);
        this.trialsText = new CustomText(0,0,this.scaleX,this.scaleY,text, centerText);
        this.addChild(this.trialsText);
    }
    container.resetFade = function(){ this.fadeEffect.alpha = this.listenText.alpha = 1; }

	window.Interface = createjs.promote(Interface, "Container");
}(window));
