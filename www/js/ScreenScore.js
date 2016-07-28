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

        //add to stage
        this.addChild(this.background);
    }

	//instance of class
	var container = new createjs.extend(ScreenScore, createjs.Container);

    //update
	container.tick = function (event) {

    }


	window.ScreenScore = createjs.promote(ScreenScore, "Container");
}(window));
