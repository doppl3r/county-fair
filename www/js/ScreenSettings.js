(function (window) {

    //constructor
	function ScreenSettings() {
        //container properties
		this.Container_constructor();

        //background color
        this.background = new Background();
        this.background.setBackground("bg-2");
        this.background.center();

        this.updateScreen();
        this.addChild(this.background, this.text1, this.text2, this.text3, this.text4, this.chestManager);
    }

	//instance of class
	var container = new createjs.extend(ScreenSettings, createjs.Container);

    //update
	container.tick = function (event) {
        //createjs.Tween.get(this.chestManager.getChest(2)).wait(500).to({ y: window.Game.getHeight()-200 }, 1000, createjs.Ease.cubicInOut)

        //tick chestManager
        this.chestManager.tick(event);
        if (this.delay >= 0){
            this.delay-=1;
            if (this.delay == 0) { //change screen after delay runs out
                this.updateScreen();
                window.Game.setScreen(2);
                window.Game.setStage();
                window.Game.levelManager.resetScore();
            }
        }
        else {
            var tempChest;
            for (var i=0; i<this.chestManager.children.length; i++){
                tempChest = this.chestManager.getChildAt(i); //get temporary index
                if (tempChest.isClicked()){
                    switch (i){
                        case 0: var id = window.prompt("User ID:", window.Game.userID); if (id != null) window.Game.setID(id); tempChest.reset(); this.updateScreen(); break;
                        case 1: window.Game.levelManager.decreasePrizeWords(); tempChest.reset(); this.updateScreen(); break;
                        case 2: window.Game.levelManager.increasePrizeWords(); tempChest.reset(); this.updateScreen(); break;
                        case 3: window.Game.levelManager.decreaseTrickyCount(); tempChest.reset(); this.updateScreen(); break;
                        case 4: window.Game.levelManager.increaseTrickyCount(); tempChest.reset(); this.updateScreen(); break;
                        case 5: window.Game.levelManager.decreaseTrials(); tempChest.reset(); this.updateScreen(); break;
                        case 6: window.Game.levelManager.increaseTrials(); tempChest.reset(); this.updateScreen(); break;
                        case 7: this.chestManager.setChestFrameAt(i,7); this.delay = 120; break;
                    }
                }
            }
        }
    }
    container.updateScreen = function(text, y){
        this.removeChild(this.text1,this.text2,this.text3,this.chestManager);
        //make chests as clickable buttons
        this.chestManager = new ChestManager(true);
        //user ID
        this.chestManager.addChest(360,100,.75,.75,"topClosed",true);
        this.chestManager.getLastChest().updateChest("Edit",null,true);
        this.chestManager.getLastChest().muteChest();
        this.text1 = new CustomText(450,90,1,1,"User ID: #"+window.Game.userID, false);
        //correct words
        this.chestManager.addChest(260,200,.75,.75,"topClosed",true);
        this.chestManager.getLastChest().updateChest("-",null,true);
        this.chestManager.getLastChest().muteChest();
        this.chestManager.addChest(360,200,.75,.75,"topClosed",true);
        this.chestManager.getLastChest().updateChest("+",null,true);
        this.chestManager.getLastChest().muteChest();
        this.text2 = new CustomText(450,190,1,1,"Correct Words: "+window.Game.levelManager.prizeWords+"/"+window.Game.levelManager.wordCount, false);
        //Difficulty
        this.chestManager.addChest(260,300,.75,.75,"topClosed",true);
        this.chestManager.getLastChest().updateChest("-",null,true);
        this.chestManager.getLastChest().muteChest();
        this.chestManager.addChest(360,300,.75,.75,"topClosed",true);
        this.chestManager.getLastChest().updateChest("+",null,true);
        this.chestManager.getLastChest().muteChest();
        this.text3 = new CustomText(450,290,1,1,"Tricky Words: "+window.Game.levelManager.trickyWords+"/"+window.Game.levelManager.maxTrickyWords(), false);
        //Trials
        this.chestManager.addChest(260,400,.75,.75,"topClosed",true);
        this.chestManager.getLastChest().updateChest("-",null,true);
        this.chestManager.getLastChest().muteChest();
        this.chestManager.addChest(360,400,.75,.75,"topClosed",true);
        this.chestManager.getLastChest().updateChest("+",null,true);
        this.chestManager.getLastChest().muteChest();
        this.text4 = new CustomText(450,390,1,1,"Trials: "+window.Game.levelManager.startLevel, false);
        //start
        this.chestManager.addChest(window.Game.getCenter()[0],600,1,1,"topClosed",true);
        this.chestManager.getLastChest().updateChest("Begin",null,true);
        //update container
        this.addChild(this.background, this.text1, this.text2, this.text3, this.text4, this.chestManager);
    }

	window.ScreenSettings = createjs.promote(ScreenSettings, "Container");
}(window));
