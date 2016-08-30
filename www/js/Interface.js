(function (window) {

    //constructor
	function Interface() {
		this.Container_constructor();
		this.width = window.Game.getWidth();
		this.height = window.Game.getHeight();
		this.memorize = true;
		this.redraw();
    }

	//instance of class
	var container = new createjs.extend(Interface, createjs.Container);

    //update
	container.tick = function (event) {
		createjs.Tween.get(this.man).wait(0).to({x: 90, scaleY: 1}, 1000, createjs.Ease.cubicInOut);
		if (this.memorize){
			createjs.Tween.get(this.clock_hand).wait(0).to({rotation:360}, 5000).call(
				function(tween){
					var obj = tween._target;
					createjs.Tween.removeTweens(obj);
					obj.parent.memorize = false;
					window.Game.bottles.hideBottleNumbers();
					window.Game.levelManager.requestInput();
					obj.parent.redraw();
				}
			);
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
		this.prize_bear_count = new mText("0","coney",36,"#610067",this.prize_bear.x,this.prize_bear.y+80);
		this.prize_toy_count = new mText("0","coney",36,"#610067",this.prize_toy.x,this.prize_toy.y+80);
		this.prize_candy_count = new mText("0","coney",36,"#610067",this.prize_candy.x,this.prize_candy.y+80);

		//add to stage
		this.addChild(this.man);
		this.addChild(this.prize_bear, this.prize_bear_count.txt);
		this.addChild(this.prize_toy, this.prize_toy_count.txt);
		this.addChild(this.prize_candy, this.prize_candy_count.txt);
		if (this.memorize){ this.addChild(this.clock_body,this.clock_hand); }
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
