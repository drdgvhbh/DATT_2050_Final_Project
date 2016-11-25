include("include.js");

autowatch = 1;
var paused = false; // Is it paused?

bang.immediate = true;
updateTimer.immediate = true;

var _G = new Global( "global" );
var util = Util.getInstance(); 
var p = this.patcher;

function bang() {
	if (_G.timerOffset == null) {
		_G.timerOffset = 0;
	}
	_G.timer = new Timers();
	_G.timer.start();	
}

function getTime() {
	if (!paused) {
		outlet(0, _G.timer.getTime() );
	} 
}

function updateTimer( time ) {
	_G.timerOffset = time;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function pause() {
	if (paused == true) 
		return;
	paused = true;
	_G.timer.pause();
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function resume() {
	if (paused == false) 
		return;
	paused = false;
	_G.timer.resume();
}

