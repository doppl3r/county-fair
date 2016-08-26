(function (window) {
    //private variables
    var KEYCODE_UP = 38; //useful keycode
    var KEYCODE_LEFT = 37; //useful keycode
    var KEYCODE_RIGHT = 39; //useful keycode
    var KEYCODE_DOWN = 40;
    var KEYCODE_W = 87; //useful keycode
    var KEYCODE_A = 65; //useful keycode
    var KEYCODE_D = 68; //useful keycode
    var KEYCODE_S = 83; //useful keycode
    var VIEW = 0; //current stage assets

    //register key functions
    document.onkeydown = handleKeyDown;

    //private functions
    function Game(){ Game.prototype.init(); } //constructor
    function tick(event) {
        if (window.Game.hearoThemeFade) {
            if (window.Game.hearoTheme.volume > 0) window.Game.hearoTheme.volume -= 0.01;
            else { window.Game.hearoThemeFade = false; window.Game.hearoTheme.stop(); }
        }

        //call sub ticks
        switch(VIEW) {
            case 0: //intro screen
                window.Game.screenIntro.tick(event);
            break;
            case 1: //game screen
                //window.Game.screenInstructions.tick(event);
                window.Game.background.tick(event);
                window.Game.baseball.tick(event);
                window.Game.bottles.tick(event);
                window.Game.levelManager.tick(event);
                window.Game.interface.tick(event);
            break;
            case 2: //game screen
                window.Game.screenScore.tick(event);
            break;
        }
        window.Game.stage.update(event);
    }
    //allow for WASD and arrow control scheme
    function handleKeyDown(e) { Game.prototype.levelManager.inputKey(e.keyCode); }

    //public functions
    Game.prototype.init = function() {
        //phonegap presets
        document.addEventListener('deviceready', function(){ StatusBar.hide(); }, false);
        document.addEventListener('resume', function(){ StatusBar.hide(); }, false);
        window.addEventListener('resize', function(){ Game.prototype.resizeCanvas(); });

        this.canvas = document.getElementById("gameCanvas");
        this.resizeCanvas();
        this.stage = new createjs.Stage(this.canvas);
        this.stage.enableMouseOver(60);

        this.assetManager = new AssetManager(document.getElementById("gameCanvas"));
        this.assetManager.init(document.getElementById("gameCanvas"));
        this.stage.addChild(this.assetManager);
        this.stage.on("stagemousedown", function(event){ Game.prototype.clickScreen(event); });

        this.userID = "65500170";

        //create level manager prototype from window object
        this.levelManager = Object.create(LevelManager);

        this.assetManager.preload.on("complete", function(){
            Game.prototype.setStage();
            //Game.prototype.hearoTheme = createjs.Sound.play("hearo-theme", {interrupt: createjs.Sound.INTERRUPT_NONE, loop: -1});
        });
        this.assetManager.preload.on("progress", function(){ Game.prototype.assetManager.updateLoading(); window.Game.stage.update(); });
    }
    Game.prototype.setStage = function() {
        //this.requestUsername();
        //clean up stage
        this.stage.removeAllChildren();

        //initialize game objects
        if (this.background == null) {  this.background = new Background(); }
        if (this.baseball == null) { this.baseball = new Baseball(); this.baseball.centerToScreenBottom(); }
        if (this.bottles == null) { this.bottles = new Bottles(); }
        if (this.interface == null) this.interface = new Interface();
        if (this.screenIntro == null) this.screenIntro = new ScreenIntro();
        if (this.screenScore == null) this.screenScore = new ScreenScore();

        //ensure stage is blank and add the baseball
        this.stage.clear();

        switch(VIEW) {
            case 0:
                this.stage.addChild(this.screenIntro);
            break;
            case 1:
                this.stage.addChild(this.background);
                this.stage.addChild(this.bottles);
                this.stage.addChild(this.baseball);
                this.stage.addChild(this.interface);
                this.levelManager.createLevel();
            break;
            case 2:
                this.stage.addChild(this.screenScore);
            break;
        }

        //start game timer
        if (!createjs.Ticker.hasEventListener("tick")) {
            createjs.Ticker.addEventListener("tick", tick);
            createjs.Ticker.setFPS(60);
        }
    }
    Game.prototype.clickScreen = function(event){
        switch(VIEW){
            case 0: break;
            case 1: break;
            case 2:
                this.baseball.navigate(event);
                this.selector.animateAt(event);
            break;
            case 3: break;
        }
    }
    Game.prototype.getWidth = function(){ return this.canvas.width; }
    Game.prototype.getHeight = function(){ return this.canvas.height; }
    Game.prototype.getCenter = function(){ return [this.canvas.width/2, this.canvas.height/2]; }
    Game.prototype.setScreen = function(view){ VIEW = view; console.log(VIEW); }
    Game.prototype.fadeSong = function() { this.hearoThemeFade = true; }
    Game.prototype.resizeCanvas = function(){
        var content = document.getElementById("content");
        content.style.height = window.innerHeight+"px";
        content.style.width = (this.canvas.width/this.canvas.height)*parseInt(content.style.height)+"px";
        if (parseInt(content.style.width) > window.innerWidth) content.style.width = window.innerWidth + "px";
    }
    Game.prototype.setID = function(id){ this.userID = id; }
    Game.prototype.centerToStage = function(obj){ obj.x = this.getWidth()/2; obj.y = this.getHeight()/2; }
    Game.prototype.requestUsername = function(){
        $("body").removeClass('pw'); //ensure no password styling
        alertify
            .okBtn("Submit").cancelBtn("Offline Mode")
            .defaultValue("jdoe")
            .prompt("Please enter your user ID",
                function (val, ev) {
                    window.Game.setID(val);
                    window.Game.requestPassword();
                    alertify.success("User ID: #" + val);
                    ev.preventDefault();
                }, function(ev) {
                    window.Game.setScreen(4);
                    window.Game.setStage();
                    ev.preventDefault();
                    alertify.error("Login Unsuccessful");
                }
            );
    }
    Game.prototype.requestPassword = function(){
        $("body").addClass('pw');
        alertify.logPosition("bottom right");
        alertify
            .okBtn("Login").cancelBtn("Cancel")
            .defaultValue('pass')
            .prompt("Please enter your password",
                function (val, ev) {
                    window.Game.login(val);
                    ev.preventDefault();
                    alertify.success("Checking credentials...");
                }, function(ev) {
                    window.Game.requestUsername(); //go back to username dialog window
                    alertify.error("Cancelled");
                }
            );
    }
    Game.prototype.login = function(val){
        $.ajax({
            url: 'https://dashboard.myhealthybrain.net/rest/auth-check?username='+this.userID+'&password='+val,
            // url: 'https://local.ntldashboard.com/rest/auth-check?username='+username+'&pin='+pin+'&password='+password+'&computer_code='+Globals.macAddress,
            success: function(response) {
                if (response.success) {
                    alertify.success("Login Successful!");
                    window.Game.setScreen(2);
                    window.Game.setStage();
                }else {
                    alertify.success("Login Failed!");
                    window.Game.requestPassword();
                }
            }
        })
    }

    //create prototype of self
    window.Game = new Game();
}(window));