(function (window) {

    //constructor
	function Bottles(instaClick) {
        if (instaClick != null) this.instaClick = instaClick; //instant click
		this.Container_constructor();
		this.bottle_ss1 = new createjs.SpriteSheet({ framerate: 1, images: [window.Game.assetManager.preload.getResult("bottle-visible")], frames: [[0,0,81,159],0,40.5,79.5], animations: {default: [0]}});
    }

	//instance of class
	var container = new createjs.extend(Bottles, createjs.Container);

    //update
	container.tick = function (event) {
        for (var i=0; i<this.children.length; i++){
            this.getChildAt(i).tick(event);
        }
    }

    //public functions
    container.addBottle = function (x,y,scaleX,scaleY,frame,centerText){
        var tempChest = new Chest(this.instaClick);
        tempChest.add(x,y,scaleX,scaleY,this.bottle_ss1,frame,centerText);
        if (this.instaClick) tempChest.on("click", function(){ tempChest.click(); });
        tempChest.on("mouseover", function(){ tempChest.mouseOver(); });
        tempChest.on("mouseout", function(){ tempChest.mouseOut(); });
        this.addChild(tempChest); //add to stage
    }
    container.removeBottle = function(i){
        this.getChildAt(i).removeEventListener("click");
        this.getChildAt(i).removeEventListener("mouseover");
        this.getChildAt(i).removeEventListener("mouseout");
        this.removeChildAt(i);
    }
    container.removeAllBottles = function(){
        var length = this.children.length;
        for (var i=length-1; i >= 0; i--){ this.removeBottle(i); }
    }
    container.setAllBottles = function(frame){
        var length = this.children.length;
        for (var i=length-1; i >= 0; i--){ this.getChildAt(i).sprite.gotoAndStop(frame); }
    }
    container.setBottleFrameAt = function(i, frame){ this.getChildAt(i).sprite.gotoAndStop(frame); }
    container.getBottle = function(i){ return this.getChildAt(i); }
    container.getLastBottle = function(){ return this.getBottle(this.children.length-1); }
    container.reset = function(){
        for (var i=0; i < this.children.length; i++) this.getChildAt(i).reset();
    }
    container.muteBottle = function(i){ this.getChildAt(i).mute(); }
    container.muteAll = function(){ for (var i=0; i < this.children.length; i++) this.muteBottle(i); }

	window.Bottles = createjs.promote(Bottles, "Container");
}(window));
