(function (window) {

    //constructor
	function ScreenIntro() {
        //container properties
		this.Container_constructor();
        this.width = window.Game.canvas.width;
        this.height = window.Game.canvas.height;
        this.x = this.width / 2;
        this.y = this.height / 2;

        this.redraw();
    }

	//instance of class
	var container = new createjs.extend(ScreenIntro, createjs.Container);

    //update
	container.tick = function (event) {
	    if (this.play_button.isClicked()){
	        var practiceMode = this.practice_button.isToggled();
            var quantity = window.Game.levelManager.bottleCount;
            var reverseMode = this.reverse_button.isToggled() ? "reverse" : "forward";
            var voiceMode = this.voice_button.isToggled();
	        //eventually this will grab the user score using AJAX
            window.Game.levelManager.setGameMode(reverseMode,quantity,voiceMode,practiceMode);
            window.Game.interface.start();
	        window.Game.fadeSong();
            window.Game.setScreen(1);
            window.Game.setStage()
        }

        //begin animation
        createjs.Tween.get(this.fadeEffect).to({ alpha:0 }, 3000, createjs.Ease.sineOut);
        createjs.Tween.get(this.man).wait(500).to({scaleX: 1, scaleY: 1, y:64 }, 1000, createjs.Ease.cubicInOut);
    }

    container.redraw = function(){
        //background color
        this.background = new Background();
        this.background.setBackground("bg-1");
        this.background.x = -window.Game.getWidth()/2;
        this.background.y = -window.Game.getHeight()/2;

        //man dude
        this.man = new createjs.Bitmap(window.Game.assetManager.preload.getResult("man"));
        this.man.scaleX = this.man.scaleY = 0;
        centerTo(this.man, -240,640);

        //buttons
        this.practice_button = new Button("Practice Mode", 200, -50, 400, 80, "#fff0e0","#c34e78","#c34e78","#ffffff");
        this.practice_button.setFontSize(36);
        this.practice_button.setFontFamily("coney");
        this.practice_button.addStroke(3,"#610067");

        this.reverse_button = new Button("Reverse Mode", 200, 50, 400, 80, "#fff0e0","#c34e78","#c34e78","#ffffff");
        this.reverse_button.setFontSize(36);
        this.reverse_button.setFontFamily("coney");
        this.reverse_button.addStroke(3,"#610067");

        this.voice_button = new Button("Voice Mode", 200, 150, 400, 80, "#fff0e0","#c34e78","#c34e78","#ffffff");
        this.voice_button.setFontSize(36);
        this.voice_button.setFontFamily("coney");
        this.voice_button.addStroke(3,"#610067");

        this.play_button = new Button("Play", 200, 250, 400, 80, "#610067","#fff0e0","#ffffff","#610067");
        this.play_button.setFontSize(48);
        this.play_button.setFontFamily("coney");
        this.play_button.addStroke(3,"#610067");

        //intro fade
        this.fadeEffect = new createjs.Shape();
        this.fadeEffect.graphics.beginFill("#ffffff").drawRect(-this.x, -this.y, this.width, this.height);

        //add to stage
        this.addChild(this.background, this.sprite, this.man);
        this.addChild(this.practice_button, this.reverse_button, this.voice_button, this.play_button, this.fadeEffect);
    }

    function center(obj){ obj.setTransform(obj.x,obj.y,obj.scaleX,obj.scaleY,obj.rotation,obj.skewX,obj.skewY,obj.getBounds().width/2,obj.getBounds().height/2); }
    function centerTo(obj,x,y){ center(obj); obj.x = x; obj.y = y; }
    function shiftReg(obj,x,y){ obj.regX = x; obj.regY = y; }

	window.ScreenIntro = createjs.promote(ScreenIntro, "Container");
}(window));
