(function (window) {

    //constructor
	function Interface() {
		this.Container_constructor();
		this.width = window.Game.getWidth();
		this.height = window.Game.getHeight();
		this.memorize = true;
		this.ready = false;
		this.redraw();
    }

	//instance of class
	var container = new createjs.extend(Interface, createjs.Container);

    //update
	container.tick = function (event) {
		if (this.memorize){
			createjs.Tween.get(this.man).wait(1500).to({x: 90, scaleY: 1}, 1000, createjs.Ease.cubicInOut);
			createjs.Tween.get(this.fadeEffect).wait(1500).to({ alpha:0 }, 500, createjs.Ease.quartIn);
			createjs.Tween.get(this.memorizeText.txt).to({ alpha:0 }, 2000, createjs.Ease.quartIn);
			createjs.Tween.get(this.clock_hand).wait(2000).to({rotation:360}, 5000).call(
			    //DO THINGS WHEN CLOCK IS FINISHED
				function(tween){
					var obj = tween._target;
					createjs.Tween.removeTweens(obj);
					obj.parent.memorize = false; //disable memorizing
					obj.parent.ready = true;
					obj.parent.clock_hand.rotation = 0; //reset clock hand
					window.Game.levelManager.requestInput();
					if (window.Game.levelManager.direction == "reverse") window.Game.bottles.reverse();
					window.Game.bottles.setVisibleBottles(0);
					obj.parent.redraw();
				}
			);
		}
		if (this.ready == true){
			createjs.Tween.get(this.readyText.txt).to({ alpha:0 }, 1000, createjs.Ease.quartIn);
		}
	}
	container.redraw = function(){
		this.removeAllChildren();
		//new display objects
		this.man = new createjs.Bitmap(window.Game.assetManager.preload.getResult("man"));
		this.prize_bear = new createjs.Bitmap(window.Game.assetManager.preload.getResult("prize-bear"));
		this.prize_toy = new createjs.Bitmap(window.Game.assetManager.preload.getResult("prize-toy"));
		this.prize_candy = new createjs.Bitmap(window.Game.assetManager.preload.getResult("prize-candy"));
		this.clock_body = new createjs.Bitmap(window.Game.assetManager.preload.getResult("clock-body"));
		this.clock_hand = new createjs.Bitmap(window.Game.assetManager.preload.getResult("clock-hand"));
		//align
		centerTo(this.man, -200, (this.height/2)+80);
		centerTo(this.prize_bear, this.width - 96, 200);
		centerTo(this.prize_toy, this.width - 96, 400);
		centerTo(this.prize_candy, this.width - 96, 600);
		centerTo(this.clock_body, this.width/2, this.height*0.8);
		centerTo(this.clock_hand, this.width/2, this.height*0.8);
		shiftReg(this.clock_hand,8,56);
		//text prototypes
		this.prize_bear_count = new mText(window.Game.levelManager.bearCount,"coney",36,"#610067",this.prize_bear.x,this.prize_bear.y+80);
		this.prize_toy_count = new mText(window.Game.levelManager.toyCount,"coney",36,"#610067",this.prize_toy.x,this.prize_toy.y+80);
		this.prize_candy_count = new mText(window.Game.levelManager.candyCount,"coney",36,"#610067",this.prize_candy.x,this.prize_candy.y+80);

		//fade
		this.fadeEffect = new createjs.Shape();
		this.fadeEffect.graphics.beginFill("#8b6596").drawRect(-this.x, -this.y, this.width, this.height);
		this.memorizeText = new mText("Start memorizing!","coney",64,"#ffffff",this.width/2, (this.height/2));
		this.readyText = new mText("Start typing!","coney",64,"#610067",(this.width/2), (this.height/2)+128);
		//this.fadeEffect.alpha = 1;

		//add to stage
		this.addChild(this.man);
		if (this.memorize){
			this.addChild(this.clock_body,this.clock_hand);
			this.addChild(this.fadeEffect, this.memorizeText.txt);
		}
		else if (this.ready){
			this.addChild(this.readyText.txt);
		}
		this.addChild(this.prize_bear, this.prize_bear_count.txt);
		this.addChild(this.prize_toy, this.prize_toy_count.txt);
		this.addChild(this.prize_candy, this.prize_candy_count.txt);
	}

	container.start = function(){
		this.memorize = true;
		this.clock_hand.rotation = 0;
	}

	function mText(text, font, fontSize, color, x, y){
		this.txt = new createjs.Text(text, fontSize+"px "+font, color);
		this.txt.textBaseline = "middle";
		this.txt.textAlign = "center";
		this.txt.x = x;
		this.txt.y = y;
	}
	function center(obj){ obj.setTransform(obj.x,obj.y,obj.scaleX,obj.scaleY,obj.rotation,obj.skewX,obj.skewY,obj.getBounds().width/2,obj.getBounds().height/2); }
	function centerTo(obj,x,y){ center(obj); obj.x = x; obj.y = y; }
	function shiftReg(obj,x,y){ obj.regX = x; obj.regY = y; }


	window.Interface = createjs.promote(Interface, "Container");
}(window));
