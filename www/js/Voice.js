(function (window) {

    //constructor
	function Voice() {
	    //TODO pull scores from database
        this.playlist = [];
        this.audioIndex = 0; //start at beginning
        this.audioLength = 0; //starts empty
        this.audioRate = this.maxAudioRate = 750; //milliseconds

        this.tick = function(delta) {
            if (this.audioIndex < this.audioLength){
                this.audioRate -= delta;
                if (this.audioRate <= 0){
                    this.audioRate = this.maxAudioRate; //reset counter
                    createjs.Sound.play("number_"+this.playlist[this.audioIndex]);
                    this.audioIndex++;
                }
            }
        }
        this.start = function(){
            this.audioIndex = 0;
            this.audioLength = window.Game.bottles.children.length;
            for (var i=0; i < this.audioLength; i++){
                var num = window.Game.bottles.getChildAt(i).number.txt.text;
                this.playlist.push(num);
            }
        }
        this.playNumber = function(numb){

        }
	}

	window.Voice = new Voice();
}(window));
3