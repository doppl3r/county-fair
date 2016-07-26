(function (window) {

    //constructor
	function ScreenInstructions() {
        //container properties
		this.Container_constructor();
        this.x = window.Game.canvas.width / 2;
        this.y = (window.Game.canvas.height / 2);

        //background color
        this.background = new Background();
        this.background.setBackground("bg-2");

        //make chests as clickable buttons
        this.chestManager = new ChestManager(true);
        this.chestManager.addChest(0,240,1,1,"topClosed");
        this.chestManager.getLastChest().updateChest("begin",null,true);
        this.chestManager.scaleX = this.chestManager.scaleY = 0;

        this.text1 = new CustomText(0,-720,1,1,"Instructions:");
        this.text2 = new CustomText(0,-720,1,1,"Listen and choose a word");
        this.text3 = new CustomText(0,-720,1,1,"that you heard most clearly.");

        //add to stage
        this.addChild(this.background);
        this.addChild(this.chestManager); //add to stage
        this.addChild(this.text1);
        this.addChild(this.text2);
        this.addChild(this.text3);
    }

	//instance of class
	var container = new createjs.extend(ScreenInstructions, createjs.Container);

    //update
	container.tick = function (event) {
        createjs.Tween.get(this.text1).to({ y:-216 }, 1000, createjs.Ease.sineOut);
        createjs.Tween.get(this.text2).to({ y:-72 }, 1000, createjs.Ease.sineOut);
        createjs.Tween.get(this.text3).to({ y:-12 }, 1000, createjs.Ease.sineOut);
        createjs.Tween.get(this.chestManager).wait(1000).to({scaleX: 1, scaleY: 1}, 1000, createjs.Ease.cubicInOut);


        //tick chestManager
        this.chestManager.tick(event);
        if (this.delay >= 0){
            this.delay-=1;
            if (this.delay == 0) { //change screen after delay runs out
                window.Game.setScreen(2);
                window.Game.setStage();
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

	window.ScreenInstructions = createjs.promote(ScreenInstructions, "Container");
}(window));
