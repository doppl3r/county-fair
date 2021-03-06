(function (window) {

    //constructor
    function Bottle(x,y,text){
        this.Container_constructor();
        this.x = x;
        this.y = y;
        this.bottle_hidden = new createjs.Bitmap(window.Game.assetManager.preload.getResult("bottle-hidden"));
        this.bottle_visible = new createjs.Bitmap(window.Game.assetManager.preload.getResult("bottle-visible"));
        this.number = new nText(text,0,24);
        this.playAudio = false;
        center(this.bottle_hidden);
        center(this.bottle_visible);
        //this.revealBottleNumber();
        this.addChild(this.number.txt, this.bottle_visible);
    }

    //instance of class
    var container = new createjs.extend(Bottle, createjs.Container);

	//public functions
    container.tick = function(event){
        if (this.hit == true){
            if (this.playAudio) { createjs.Sound.play("bottle"); this.playAudio = false; }
            this.tween.wait(500).to({
                y: -200,
                rotation: 360*2,
                scaleX: 0,
                scaleY: 0,
                alpha: 0
            }, 1000, createjs.Ease.cubicOut).call(function(tween){
                var obj = tween._target;
                createjs.Tween.removeTweens(obj);
                obj.parent.hit = false;

            });
        }
        if (this.isHidden == true || this.isRevealed == true) {
            createjs.Tween.get(this.bottle_visible).wait(this.delay).to({y: this.newY }, 1000, createjs.Ease.cubicOut).call(
                function (tween) {
                    var obj = tween._target;
                    createjs.Tween.removeTweens(obj);
                    obj.parent.isHidden = false;
                }
            );
        }
        if (this.fade == true){
            createjs.Tween.get(this.number.txt).wait(this.delay+(this.fade?2250:0)).to({alpha: (this.fade?0:1)}, 1000, createjs.Ease.cubicOut).call(
                function (tween) {
                    var obj = tween._target;
                    createjs.Tween.removeTweens(obj);
                    obj.parent.fade = false;
                }
            );
        }
    }

    container.setText = function(text){ this.number.text = text; }
    container.hitTarget = function(){
        this.number.txt.alpha = 1;
        this.hit = true;
        this.playAudio = true;
        this.removeAllChildren();
        this.addChild(this.bottle_hidden, this.number.txt, this.bottle_visible);
        this.bottle_hidden.alpha = 0;
        this.tween = createjs.Tween.get(this.bottle_visible,{override:true});
    }
    container.getNumber = function(){ return parseInt(this.number.txt.text); }
    container.setVisibleBottle = function(delay, newY, fade){
        //this.number.txt.alpha = 1;
        this.delay = delay;
        this.newY = newY;
        this.fade = fade;
        this.isHidden = (newY == 0);
        this.isRevealed = (newY == -200);
        if (this.isRevealed == true) this.number.txt.alpha = 1;
        this.tween = createjs.Tween.get(this.bottle_visible,{override:true});
    }

    function nText(text, x, y){
        this.txt = new createjs.Text(text, "80px coney", "#610067");
        this.txt.textBaseline = "middle";
        this.txt.textAlign = "center";
        this.txt.x = x;
        this.txt.y = y;
    }
    function center(obj){ obj.setTransform(obj.x,obj.y,obj.scaleX,obj.scaleY,obj.rotation,obj.skewX,obj.skewY,obj.getBounds().width/2,obj.getBounds().height/2); }
    function centerTo(obj,x,y){ center(obj); obj.x = x; obj.y = y; }

	window.Bottle = new createjs.promote(Bottle, "Container");
}(window));
