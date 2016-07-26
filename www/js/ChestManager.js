(function (window) {

    //constructor
	function ChestManager(instaClick) {
        if (instaClick != null) this.instaClick = instaClick; //instant click
		this.Container_constructor();
		this.spriteSheet = new createjs.SpriteSheet({
            framerate: 4,
            images: [window.Game.assetManager.preload.getResult("chests")],
            frames: [
                [4,4,157,131,0,78.25,65.65],[4,139,193,106,0,98.25,40.650000000000006],[4,249,193,106,0,98.25,40.650000000000006],
                [4,359,113,147,0,56.5,73.4],[4,510,179,149,0,122.5,75.4],[4,663,179,149,0,122.5,75.4],
                [4,816,115,95,0,57.25,47.75],[123,816,110,93,0,55.25,45.75],[4,915,110,93,0,55.25,45.75]
            ],
            animations: {
                bottomClosed: [0], bottomOpenReward: { frames: [0,1], next: false }, bottomOpenNothing: { frames: [0,2], next: false },
                sideClosed: [3], sideOpenReward: { frames: [3,4], next: false }, sideOpenNothing: { frames: [3,5], next: false },
                topClosed: [6], topOpenReward: { frames: [6,7], next: false }, topOpenNothing: { frames: [6,8], next: false }
            }
        });
    }

	//instance of class
	var container = new createjs.extend(ChestManager, createjs.Container);

    //update
	container.tick = function (event) {
        for (var i=0; i<this.children.length; i++){
            this.getChildAt(i).tick(event);
        }
    }

    //public functions
    container.addChest = function (x,y,scaleX,scaleY,frame,centerText){
        var tempChest = new Chest(this.instaClick);
        tempChest.addChest(x,y,scaleX,scaleY,this.spriteSheet,frame,centerText);
        if (this.instaClick) tempChest.on("click", function(){ tempChest.click(); });
        tempChest.on("mouseover", function(){ tempChest.mouseOver(); });
        tempChest.on("mouseout", function(){ tempChest.mouseOut(); });
        this.addChild(tempChest); //add to stage
    }
    container.removeChest = function(i){
        this.getChildAt(i).removeEventListener("click");
        this.getChildAt(i).removeEventListener("mouseover");
        this.getChildAt(i).removeEventListener("mouseout");
        this.removeChildAt(i);
    }
    container.removeAllChests = function(){
        var length = this.children.length;
        for (var i=length-1; i >= 0; i--){ this.removeChest(i); }
    }
    container.setAllChests = function(frame){
        var length = this.children.length;
        for (var i=length-1; i >= 0; i--){ this.getChildAt(i).sprite.gotoAndStop(frame); }
    }
    container.setChestFrameAt = function(i, frame){ this.getChildAt(i).sprite.gotoAndStop(frame); }
    container.getChest = function(i){ return this.getChildAt(i); }
    container.getLastChest = function(){ return this.getChest(this.children.length-1); }
    container.reset = function(){
        for (var i=0; i < this.children.length; i++) this.getChildAt(i).reset();
    }
    container.muteChest = function(i){ this.getChildAt(i).muteChest(); }
    container.muteAll = function(){ for (var i=0; i < this.children.length; i++) this.muteChest(i); }

	window.ChestManager = createjs.promote(ChestManager, "Container");
}(window));
