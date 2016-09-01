(function (window) {

    //constructor
	function Bottles() {
		this.Container_constructor();
    }

	//instance of class
	var container = new createjs.extend(Bottles, createjs.Container);

    //update
	container.tick = function (event) {
        for (var i=0; i<this.children.length; i++){
            this.getChildAt(i).tick(event);
        }
    }

    //public functions
    container.addBottle = function (x,y,text){
        var tempBottle = new Bottle(x,y,text);
        this.addChild(tempBottle); //add to stage
    }
    container.removeBottle = function(i){ this.removeChildAt(i); }
    container.removeAllBottles = function(){
        var length = this.children.length;
        for (var i=length-1; i >= 0; i--){ this.removeBottle(i); }
    }
    container.getBottle = function(i){ return this.getChildAt(i); }
    container.getLastBottle = function(){ return this.getBottle(this.children.length-1); }
    container.setVisibleBottles = function(newY, fade){
        for (var i=0; i<this.children.length; i++){
            this.getChildAt(i).setVisibleBottle(i*100*(fade==true?5:1), newY, fade);
        }
    }
    container.reverse = function(){
        this.children.reverse();
        var x = [];
        for (var i=0; i<this.children.length; i++) x.push(this.getChildAt(i).x);
        x.reverse();
        for (var i=0; i<this.children.length; i++) this.getChildAt(i).x = x[i];
    }
    container.setXY = function(x,y){ this.x=x; this.y=y; }

	window.Bottles = createjs.promote(Bottles, "Container");
}(window));
