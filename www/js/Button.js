(function (window) {

    //constructor
    function Button(text, x, y, width, height, bgColor1, bgColor2, fontColor1, fontColor2) {
        this.Container_constructor();
        this.box16 = window.Game.box16;
        this.x = Math.floor(x);
        this.y = Math.floor(y);
        this.regX = Math.floor(width/2);
        this.regY = Math.floor(height/2);
        this.shape = new createjs.Shape();
        this.width = width;
        this.height = height;
        this.text = this.name = text;
        this.bgColor1 = this.bgColor = (bgColor1 == null) ? "#000000" : bgColor1;
        this.bgColor2 = (bgColor2 == null) ? "#FFFFFF" : bgColor2;
        this.fontSize = this.box16 * (1.5); //em = 16, 16x1.25 = ~20px
        this.fontColor1 = this.fontColor = (fontColor1 == null) ? this.bgColor2 : fontColor1;
        this.fontColor2 = fontColor2 != null ? fontColor2 : this.bgColor1;
        this.fontFamily = "prstart";
        this.redraw();
        this.addListeners();
    }

    //instance of class
    var container = createjs.extend(Button, createjs.Container);

    //update
    container.tick = function (delta) {
        //adjust height to player position
    }
    container.addListeners = function(){
        this.mouseChildren = false; //prevent action on 'content'
        this.on("pressmove", function(evt){ this.pressMove(evt); });
        this.on("click", function(evt){ this.click(evt); });
        this.on("rollover", function(evt){ this.rollOver(evt); });
        this.on("rollout", function(evt){ this.rollOut(evt); });
    }
    container.pressMove = function(evt) { /*console.log("x:"+evt.stageX+", y:"+evt.stageY);*/ }
    container.click = function(evt) { this.toggle(); }
    container.rollOver = function(evt) {
        this.cursor="pointer";
        this.bgColor = this.bgColor2;
        this.fontColor = this.fontColor2;
        this.redraw();
    }
    container.rollOut = function(evt) {
        if (!this.toggled && !this.colorToggled) {
            this.bgColor = this.bgColor1;
            this.fontColor = this.fontColor1;
            this.redraw();
        }
    }

    //styling
    container.redraw = function(){
        this.removeAllChildren();
        //background
        this.shape.graphics.beginFill(this.bgColor).drawRect(0,0,this.width,this.height);
        //content
        if (this.text.charAt(0) == "_"){
            this.fontFamily = "icons";
            this.text = this.text.substring(1);
        }
        this.content = new createjs.Text(this.text, this.fontSize +"px "+this.fontFamily, this.fontColor);
        this.content.textBaseline = "middle";
        this.content.textAlign = "center";
        //stroke
        if (this.sWidth != null) this.addStroke();
        //add children
        this.addChild(this.shape, this.content);
        this.centerButtonContent();
    }
    container.setFontSize = function(fontSize){ this.fontSize = fontSize; this.redraw(); }
    container.setFontColor = function(fontColor){ this.fontColor = fontColor; this.redraw(); }
    container.setFontFamily = function(fontFamily){ this.fontFamily = fontFamily; this.redraw(); }
    container.disable = function(alpha){ if (alpha == null) alpha = 1; this.mouseEnabled = false; this.content.alpha = alpha; }
    container.enable = function(alpha){ if (alpha == null) alpha = 1; this.mouseEnabled = true; this.content.alpha = alpha; }
    container.addStroke = function(sWidth, sColor, sStyle){
        if (sWidth != null) this.sWidth = sWidth;
        if (sColor != null) this.sColor = sColor;
        if (sStyle != null) this.sStyle = sStyle;
        this.sHalf = 0;
        if (this.sStyle == "outer") this.sHalf = (this.sWidth / 2);
        this.shape.graphics.setStrokeStyle(this.sWidth).beginStroke(this.sColor)
            .drawRect(0-this.sHalf,0-this.sHalf,this.width+(this.sHalf*2),this.height+(this.sHalf*2));
    }
    container.centerButtonContent = function(){
        //center content (x,y,scaleX,scaleY,skewX,skewY,regX,regY)
        this.content.setTransform(this.width/2,this.height/2);
    }
    container.isClicked = function(){
        //reset toggle if clicked for instant feedback
        if (this.toggled){ this.toggled = false; this.rollOut(); return true; }
        else { return false; }
    }
    container.isToggled = function(){ return this.toggled; }
    container.toggle = function(){
        if (this.toggled){ this.toggled = false; this.rollOut(); }
        else { this.toggled = true; this.rollOver(); }
    }
    container.toggleOff = function(){ if (this.toggled) { this.toggled = false; this.rollOut(); }}
    container.toggleColor = function(toggleColor){
        if (toggleColor) {
            if (this.colorToggled != true) {
                this.colorToggled = true; //prevent redrawing
                this.rollOver();
            }
        }
        else {
            if (this.colorToggled == true){
                this.colorToggled = false; //prevent redrawing
                this.rollOut();
            }
        }
    }

    window.Button = createjs.promote(Button, "Container");
}(window));