(function (window) {

    //constructor
	function Interface() {
		this.Container_constructor();
		this.width = window.Game.getWidth();
		this.height = window.Game.getHeight();
		this.redraw();
    }

	//instance of class
	var container = new createjs.extend(Interface, createjs.Container);

    //update
	container.tick = function (event) {
		createjs.Tween.get(this.man).wait(0).to({x: 90, scaleY: 1}, 500, createjs.Ease.cubicInOut);
	}
	container.redraw = function(){
		this.removeAllChildren();
		this.man = new createjs.Bitmap(window.Game.assetManager.preload.getResult("man"));
		this.prize_bear = new createjs.Bitmap(window.Game.assetManager.preload.getResult("prize-bear"));
		this.prize_toy = new createjs.Bitmap(window.Game.assetManager.preload.getResult("prize-toy"));
		this.prize_candy = new createjs.Bitmap(window.Game.assetManager.preload.getResult("prize-candy"));
		centerTo(this.man, -200, (this.height/2)+80);
		centerTo(this.prize_bear, this.width - 96, 200);
		centerTo(this.prize_toy, this.width - 96, 400);
		centerTo(this.prize_candy, this.width - 96, 600);
		this.prize_bear_count = new mText("0","coney",36,"#610067",this.prize_bear.x,this.prize_bear.y+80);
		this.prize_toy_count = new mText("0","coney",36,"#610067",this.prize_toy.x,this.prize_toy.y+80);
		this.prize_candy_count = new mText("0","coney",36,"#610067",this.prize_candy.x,this.prize_candy.y+80);
		this.addChild(this.man);
		this.addChild(this.prize_bear, this.prize_bear_count.txt);
		this.addChild(this.prize_toy, this.prize_toy_count.txt);
		this.addChild(this.prize_candy, this.prize_candy_count.txt);

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

	window.Interface = createjs.promote(Interface, "Container");
}(window));
