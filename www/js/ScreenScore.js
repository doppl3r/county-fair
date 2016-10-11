(function (window) {

    //constructor
	function ScreenScore() {
        //container properties
		this.Container_constructor();
        this.x = window.Game.canvas.width / 2;
        this.y = (window.Game.canvas.height / 2);
        this.redraw();
    }

	//instance of class
	var container = new createjs.extend(ScreenScore, createjs.Container);

    //update
	container.tick = function (event) {
        createjs.Tween.get(this.prize).wait(0).to({scaleX: 1, scaleY: 1, y:64 }, 1000, createjs.Ease.backOut);
        if (this.quit_button.isClicked()){
            window.Game.setScreen(0);
            window.Game.setStage();
        }
        else if (this.continue_button.isClicked()){
            //TODO needs to properly reset game
            window.Game.levelManager.setGameMode();
            window.Game.interface.start();
            window.Game.fadeSong();
            window.Game.setScreen(1);
            window.Game.setStage();
            if (window.Game.levelManager.audible) window.Game.voice.start();
        }
    }
    container.redraw = function(){
        //background color
        this.background = new Background();
        this.background.setBackground("bg-1");
        this.background.x = -window.Game.getWidth()/2;
        this.background.y = -window.Game.getHeight()/2;

        //prize
        var prizeString = window.Game.levelManager.prize;
        this.prize = new createjs.Bitmap(window.Game.assetManager.preload.getResult(prizeString));
        this.prize.scaleX = this.prize.scaleY = 0;
        centerTo(this.prize, 0, 0);
        this.prizeText = new mText("You won a prize!","coney",64,"#610067",0, -64);

        //quit
        this.quit_button = new Button("Quit", -200, 256, 250, 80, "#c34e78","#fff0e0","#ffffff","#c34e78");
        this.quit_button.setFontSize(48);
        this.quit_button.setFontFamily("coney");
        this.quit_button.addStroke(3,"#610067");

        //buttons
        this.continue_button = new Button("Next Round", 140, 256, 400, 80, "#610067","#fff0e0","#ffffff","#610067");
        this.continue_button.setFontSize(48);
        this.continue_button.setFontFamily("coney");
        this.continue_button.addStroke(3,"#610067");

        //add to stage
        this.addChild(this.background);
        this.addChild(this.prize);
        this.addChild(this.prizeText.txt);
        this.addChild(this.quit_button, this.continue_button);
    }

    function center(obj){ obj.setTransform(obj.x,obj.y,obj.scaleX,obj.scaleY,obj.rotation,obj.skewX,obj.skewY,obj.getBounds().width/2,obj.getBounds().height/2); }
    function centerTo(obj,x,y){ center(obj); obj.x = x; obj.y = y; }
    function mText(text, font, fontSize, color, x, y){
        this.txt = new createjs.Text(text, fontSize+"px "+font, color);
        this.txt.textBaseline = "middle";
        this.txt.textAlign = "center";
        this.txt.x = x;
        this.txt.y = y;
    }

	window.ScreenScore = createjs.promote(ScreenScore, "Container");
}(window));
