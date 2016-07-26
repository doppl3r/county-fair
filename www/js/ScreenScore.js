(function (window) {

    //constructor
	function ScreenScore() {
        //container properties
		this.Container_constructor();
        this.x = window.Game.canvas.width / 2;
        this.y = (window.Game.canvas.height / 2);

        //background color
        this.background = new Background();
        this.background.setBackground("bg-2");

        this.updateScreen();

        //add to stage
        this.addChild(this.background);
        this.addChild(this.chestManager); //add to stage
        this.addChild(this.text1);
        this.addChild(this.text2);
        this.addChild(this.text3);
    }

	//instance of class
	var container = new createjs.extend(ScreenScore, createjs.Container);

    //update
	container.tick = function (event) {
        createjs.Tween.get(this.text1).to({ y:-216 }, 1000, createjs.Ease.sineOut);
        createjs.Tween.get(this.text2).to({ y:-72 }, 1000, createjs.Ease.sineOut);
        createjs.Tween.get(this.text3).to({ y:-12 }, 1000, createjs.Ease.sineOut);
        createjs.Tween.get(this.chestManager).wait(1000).to({ y: -220 }, 1000, createjs.Ease.cubicInOut)

        //tick chestManager
        this.chestManager.tick(event);
        if (this.delay >= 0){
            this.delay-=1;
            if (this.delay == 0) { //change screen after delay runs out
                window.Game.setScreen(4);
                window.Game.setStage();
                window.Game.levelManager.resetScore();
            }
        }
        else{
            var tempChest;
            for (var i=0; i<this.chestManager.children.length; i++){
                tempChest = this.chestManager.getChildAt(i); //get temporary index
                if (tempChest.isClicked()){
                    this.chestManager.setChestFrameAt(i,7);
                    this.delay = 120; //delay before screen changes
                }
            }
        }
    }
    container.updateScreen = function(text, y){
        this.removeChild(this.text1,this.text2,this.text3,this.chestManager);
        this.text1 = new CustomText(0,-720,1,1,"score:",true);
        this.text2 = new CustomText(0,-720,1,1,"left ear: "+window.Game.levelManager.leftPoints,true);
        this.text3 = new CustomText(0,-720,1,1,"right ear: "+window.Game.levelManager.rightPoints,true);
        //make chests as clickable buttons
        this.chestManager = new ChestManager(true);
        this.chestManager.addChest(0,480,1,1,"topClosed",true);
        this.chestManager.getLastChest().updateChest("retry",null,true);
        this.addChild(this.text1, this.text2, this.text3, this.chestManager);
    }

	window.ScreenScore = createjs.promote(ScreenScore, "Container");
}(window));
