(function (window) {

    //constructor
	function LevelManager() {
		this.currentLevel = this.startLevel = 10;
        this.wordCount = 4;
        this.prizeWords = 2;
        this.trickyWords = 0; //words that look correct but are never audibly played
		this.delay = -1; //milliseconds
        this.leftPoints = 0;
        this.rightPoints = 0;
        this.grade = "k"; //k,1,2,3 etc
	}

	LevelManager.prototype.tick = function () {
	    if (this.delay >= 0){
	        this.delay-=1;
	        if (this.delay == 0) {
                this.nextLevel();
                window.Game.setStage();
	        }
	    }
	}
    LevelManager.prototype.setXY = function(x,y) { this.x = x; this.y = y; }
    LevelManager.prototype.nextLevel = function(){
        this.currentLevel-=1;
        if (this.currentLevel <= 0){
            this.currentLevel = this.startLevel;
            window.Game.setScreen(3); //score screen
            window.Game.screenScore.updateScreen();
        }
    }
    LevelManager.prototype.createLevel = function(){
        window.Game.chestManager.removeAllChests(); //remove extra chests
        window.Game.interface.setText("trials: "+this.currentLevel, true); //show remaining trials

        //construct random words
        //words[0][0] = random word string, words[0][1] = ear (-1 or 1), words[0][2] = correct/incorrect
        var words = [];
        var tempWordList = this.getWordList().slice(0);
        var ear = this.getRandomInt(-1,1,true); //pick left or right ear (-1 or 1)
        var cellGroup = tempWordList[this.getRandomInt()].cell; //pick random cell group

        //create new list by group
        var groupList = [];
        var tempWordListLength = tempWordList.length;
        for (var i=tempWordListLength-1; i>=0; i--){
            if (tempWordList[i].cell == cellGroup){
                groupList.push(tempWordList[i]);
                pullWordAt(tempWordList, i); //remove options words
            }
        }

        //shuffle group
        groupList = shuffleArray(groupList.slice(0));

        //set default list properties
        var trickWords = this.trickyWords;
        for (var i=0; i < groupList.length; i++){
            var correct = i < (this.prizeWords);
            if (correct || trickWords > 0){
                words.push([groupList[i].id, ear, correct]);
                if (!correct) trickWords--;
            }
            else{
                var randWord;
                var randInt;
                do {
                    randInt = this.getRandomInt(0, tempWordList.length-1);
                    randWord = getWordAt(tempWordList, randInt);
                }
                while (randWord.cell == cellGroup);
                words.push([randWord.id, ear, correct]);
                pullWordAt(tempWordList, randInt); //remove from optional pics
            }
            ear *= -1; //switch ear
        }

        //shuffle game list
        words = shuffleArray(words.slice(0));

        //play audio files of correct words
        for (var i=0; i < words.length; i++){
            if (words[i][2]){ //if correct
                createjs.Sound.play(words[i][0], {pan: words[i][1]});
            }
        }

        if (this.wordCount == 4){ //four-word layout
            window.Game.chestManager.addChest(640,100,1,1,"topClosed",true);
            window.Game.chestManager.getLastChest(0).updateChest(words[0][0],words[0][1],words[0][2]);
            window.Game.chestManager.addChest(1100,360,-1,1,"sideClosed",true);
            window.Game.chestManager.getLastChest(0).updateChest(words[1][0],words[1][1],words[1][2]);
            window.Game.chestManager.addChest(640,620,1,1,"bottomClosed",true);
            window.Game.chestManager.getLastChest(0).updateChest(words[2][0],words[2][1],words[2][2]);
            window.Game.chestManager.addChest(180,360,1,1,"sideClosed",true);
            window.Game.chestManager.getLastChest(0).updateChest(words[3][0],words[3][1],words[3][2]);
        }
    }
    LevelManager.prototype.setDelay = function(delay){ this.delay = delay; }
    LevelManager.prototype.addPoint = function(ear){
        this.leftPoints += (ear == -1) ? 1 : 0;
        this.rightPoints += (ear == 1) ? 1 : 0;
    }
    LevelManager.prototype.resetScore = function(){ this.leftPoints = this.rightPoints = 0; }
    LevelManager.prototype.getRandomInt = function(min, max, noZero) {
        if (typeof min === 'undefined' || typeof max === 'undefined') {
            min = 0;
            max = this.getWordList().length-1;
        }
        var rand;
        do { rand = Math.floor(Math.random() * (max - min + 1)) + min; }
        while (noZero && rand == 0); //if noZero = true, get new random number
        return rand;
    }
    LevelManager.prototype.getWordList = function(){
        return window.Game.assetManager.getManifest(this.grade);
    }
    LevelManager.prototype.increaseTrickyCount = function(){
        this.trickyWords = (this.prizeWords+this.trickyWords < this.wordCount) ?
        this.trickyWords + 1 : this.wordCount - this.prizeWords;
    }
    LevelManager.prototype.decreaseTrickyCount = function(){
        this.trickyWords = (this.trickyWords > 0) ? this.trickyWords - 1 : 0;
    }
    LevelManager.prototype.maxTrickyWords = function(){ return this.wordCount - this.prizeWords; }
    LevelManager.prototype.increaseTrials = function(){ this.startLevel = this.currentLevel += 1; }
    LevelManager.prototype.decreaseTrials = function(){ if (this.startLevel > 1) this.startLevel = this.currentLevel -= 1; }
    LevelManager.prototype.increasePrizeWords = function() {
        if (this.prizeWords < this.wordCount) {
            this.prizeWords++;
            if (this.prizeWords+this.trickyWords > this.wordCount) this.trickyWords--;
        }
    }
    LevelManager.prototype.decreasePrizeWords = function(){ if (this.prizeWords > 1) this.prizeWords--; }

    //private functions
    function pullWordAt(tempList, index){
        var tempWord = tempList.splice(index,1);
        return tempWord;
    }
    function getWordAt(tempList, index){ return tempList[index]; }

    //http://stackoverflow.com/a/12646864/2510368
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

	window.LevelManager = new LevelManager();
}(window));
