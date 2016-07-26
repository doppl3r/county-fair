(function (window) {

    //constructor
    function CustomText(x,y,scaleX,scaleY,text,centerText) {
        this.Container_constructor();
        this.spriteSheet = new createjs.SpriteSheet({ //generated with Adobe Animate
            framerate: 0,
            images: [window.Game.assetManager.preload.getResult("text")],
            frames: [[4,4,40,64,0,21.6,29.3],[48,4,40,64,0,21.6,29.3],[92,4,40,64,0,21.6,29.3],
                    [136,4,40,64,0,21.6,29.3],[180,4,40,64,0,21.6,29.3],[224,4,40,64,0,21.6,29.3],
                    [268,4,40,64,0,21.6,29.3],[312,4,40,64,0,21.6,29.3],[356,4,40,64,0,21.6,29.3],
                    [400,4,40,64,0,21.6,29.3],[444,4,40,64,0,21.6,29.3],[4,72,40,64,0,21.6,29.3],
                    [48,72,40,64,0,21.6,29.3],[92,72,40,64,0,21.6,29.3],[136,72,40,64,0,21.6,29.3],
                    [180,72,40,64,0,21.6,29.3],[224,72,40,64,0,21.6,29.3],[268,72,40,64,0,21.6,29.3],
                    [312,72,40,64,0,21.6,29.3],[356,72,40,64,0,21.6,29.3],[400,72,40,64,0,21.6,29.3],
                    [444,72,40,64,0,21.6,29.3],[4,140,40,64,0,21.6,29.3],[48,140,40,64,0,21.6,29.3],
                    [92,140,40,64,0,21.6,29.3],[136,140,40,64,0,21.6,29.3],[180,140,40,64,0,21.6,29.3],
                    [224,140,40,64,0,21.6,29.3],[268,140,40,64,0,21.6,29.3],[312,140,40,64,0,21.6,29.3],
                    [356,140,40,64,0,21.6,29.3],[400,140,40,64,0,21.6,29.3],[444,140,40,64,0,21.6,29.3],
                    [4,208,40,64,0,21.6,29.3],[48,208,40,64,0,21.6,29.3],[92,208,40,64,0,21.6,29.3],
                    [136,208,40,64,0,21.6,29.3],[180,208,40,64,0,21.6,29.3],[224,208,40,64,0,21.6,29.3],
                    [268,208,40,64,0,21.6,29.3],[312,208,40,64,0,21.6,29.3],[356,208,40,64,0,21.6,29.3],
                    [400,208,40,64,0,21.6,29.3],[444,208,40,64,0,21.6,29.3]],
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
            animations: {
                //"run": [0, 1, "run"],
                "_": [0], "a": [1], "b": [2], "c": [3], "d": [4], "e": [5], "f": [6], "g": [7],
                "h": [8], "i": [9], "j": [10], "k": [11], "l": [12], "m": [13], "n": [14],
                "o": [15], "p": [16], "q": [17], "r": [18], "s": [19], "t": [20], "u": [21],
                "v": [22], "w": [23], "x": [24], "y": [25], "z": [26], "/0":[27],
                "/1": [28], "/2": [29], "/3": [30], "/4": [31], "/5": [32], "/6": [33], "/7": [34],
                "/8": [35], "/9": [36], ":": [37], ".": [38], "!": [39], "#": [40], "/": [41],
                "+": [42], "-": [43]
            }
        });
        this.x = x;
        this.y = y;
        this.scaleX = scaleX;
        this.scaleY = scaleY;
        this.kerning = 32;
        this.setText(x,y,scaleX,scaleY,text,centerText);
    }

    //instance of class
    var container = new createjs.extend(CustomText, createjs.Container);

    //update
    container.tick = function (event) { }

    //public functions
    container.setText = function (x,y,scaleX,scaleY,text, centerText){
        //text=text.replace(" ","_");
        for (var i = 0; i < text.length; i++){
            var tempChar = text.charAt(i).toLowerCase(); //only lowercase chars
            tempChar = !isNaN(tempChar) ? "/"+tempChar : tempChar; //allow numbers
            var tempCustomCharacter = new CustomCharacter();
            tempCustomCharacter.init((i*this.kerning*scaleX),0,scaleX,scaleY,this.spriteSheet,tempChar);
            this.addChild(tempCustomCharacter);
        }
        if (centerText) this.centerAlignText();
    }
    container.removeChar = function(i){ this.removeChildAt(i); }
    container.centerAlignText = function() {
        //the first
        this.setBounds((-this.getBounds().width/2)-(this.getBounds().x)+2, //spritesheet was rendered with 4 padding
            -this.getBounds().height/2,
            this.getBounds().width,
            this.getBounds().height);
        this.x+=this.getBounds().x; //set to new bounds
        this.scaleX *= this.scaleX; //mirror if the parent was flipped
    }

    window.CustomText = new createjs.promote(CustomText, "Container");
}(window));