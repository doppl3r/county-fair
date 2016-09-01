(function (window) {

    //constructor
	function Baseball() {
		this.Container_constructor();
	}

	//instance of class
	var container = createjs.extend(Baseball, createjs.Container);

    //update
	container.tick = function (event) {
        //successful hit
	    if (this.target == 1){
	        this.tween.wait(0).to({
                y: window.Game.getHeight()/2,
                rotation: 180,
                scaleX: 0.25,
                scaleY: 0.25,
                alpha: 0.5
	        }, 750,
            createjs.Ease.backInOut).call(
                function(tween){
                    var obj = tween._target;
                    createjs.Tween.removeTweens(obj);
                    this.reset();
                }
            );
	    }
	    else if (this.target == -1){
            this.tween.wait(0).to({
                y: window.Game.getHeight()*.25,
                rotation: -270,
                scaleX: 0.25,
                scaleY: 0.25,
                alpha: 0.5
            }, 750,
            createjs.Ease.backInOut).call(
                function(tween){
                    var obj = tween._target;
                    createjs.Tween.removeTweens(obj);
                    this.reset();
                }
            );
        }
	}
	container.redraw = function(){
	    this.removeAllChildren();
        this.baseball = new createjs.Bitmap(window.Game.assetManager.preload.getResult("baseball"));
        this.baseball.setTransform(0,0,1,1,0,0,0,this.baseball.getBounds().width/2,this.baseball.getBounds().height/2);
        this.reset();
        this.addChild(this.baseball);
    }
	container.pitch = function(target, firstBottle){
	    if (this.nextX == null || firstBottle == true) this.nextX = this.x;
        this.reset();
	    this.target = target;
        this.tween = createjs.Tween.get(this,{override:true});
	}
    container.setXY = function(x,y) { if (x != null) this.x = x; if (y != null) this.y = y; }
    container.centerToScreen = function() { this.setXY(window.Game.getCenter()[0], window.Game.getCenter()[1]); }
    container.centerToScreenBottom = function() { this.setXY(window.Game.getWidth()/2,window.Game.getHeight()); }
    container.reset = function(){
        if (this.x != this.nextX) this.x = this.nextX;
        this.target = 0;
        this.y = window.Game.getHeight();
        this.rotation = 0;
        this.scaleX = this.scaleY = 1;
        this.alpha = 1;
    }
    container.setNextX = function(nextX){ this.nextX = nextX; }

	window.Baseball = createjs.promote(Baseball, "Container");
}(window));
