(function (window) {

	//constructor
	function Background() {
		this.Container_constructor();
        this.bg_spritesheet = new createjs.SpriteSheet({ framerate: 1, images: [window.Game.assetManager.preload.getResult("background")], frames: [[0,0,1280,720]], animations: { "bg-1": [0] }});
        this.banner_spritesheet = new createjs.SpriteSheet({ framerate: 1, images: [window.Game.assetManager.preload.getResult("banner")], frames: [[0,0,1248,261]], animations: { "banner-1": [0] }});
        this.bg_sprite = new createjs.Sprite(this.bg_spritesheet,"bg-1");
        this.banner_sprite = new createjs.Sprite(this.banner_spritesheet,"banner-1");
        this.banner_sprite.y = -32;
        this.addChild(this.bg_sprite, this.banner_sprite);
	}

	//instance of class
	var container = createjs.extend(Background, createjs.Container);

    //update
	container.tick = function (event) { }
    container.setBackground = function(bg){
        this.bg_sprite.gotoAndStop(bg);
    }
    container.setXY = function(x,y){ this.x=x; this.y=y; }
    container.center = function(){
        this.x = window.Game.getCenter()[0];
        this.y = window.Game.getCenter()[1];
    }

	window.Background = createjs.promote(Background, "Container");
}(window));
