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

    }
    container.redraw = function(){
        //background color
        this.background = new Background();
        this.background.setBackground("bg-1");
        this.background.x = -window.Game.getWidth()/2;
        this.background.y = -window.Game.getHeight()/2;

        //add to stage
        this.addChild(this.background);
    }


	window.ScreenScore = createjs.promote(ScreenScore, "Container");
}(window));
