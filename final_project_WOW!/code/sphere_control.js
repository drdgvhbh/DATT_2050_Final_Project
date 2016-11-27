include("include.js");

outlets = 3;
autowatch = 1;
reset.immediate = 1;
checkBounds.immediate = 1;
dyingToTrue.immediate = 1;
bang.immediate = 1;
getPosition.immediate = 1;
outPosition.immediate = 1;
setPosition.immediate = 1;
getScale.immediate = 1;
randomX.immediate = 1;

var util = Util.getInstance(); //Utility class
var screenSizeRatio = 16.0 / 9;
var aLimit = 0.36;

var scale = new Vector( 0.05, 0.05, 0.05 );
var origin = getOrigin();
this.position = new Vector( origin );
var dying = false;

function dyingToTrue() {
	this.dying = true;
}
function getOrigin() {
	return new Vector( util.getRandom( 2 * ( aLimit * screenSizeRatio + this.getScale().x ), -( aLimit * screenSizeRatio + this.getScale().x ) ), 
	(-(Math.abs(jsarguments[1]) * ( aLimit + this.getScale().y) ) ) - (this.getScale().y * 1.1), 
	jsarguments[1] );
}

function bang() {
	/*this.setPosition(this.getPosition().x + util.getRandom( 0.02 * Math.abs(jsarguments[1]), -0.01 * Math.abs(jsarguments[1]) ), 
		this.getPosition().y, 
		this.getPosition().z );
	*/
	checkBounds( this.getPosition());
}

function reset() {
	origin = getOrigin();		
	this.setPosition(origin);
	outlet( 0, new Array( "position", origin.x, origin.y, origin.z ) );
	outlet( 0, new Array( "scale", this.getScale().x, this.getScale().y, this.getScale().z ) );
	outlet( 0, new Array( "drawto", "spheres") );
	outlet( 1, new Array( "ease", 0. ) );
	outlet( 1, new Array( "move", 0., 0., 0. ) );
	outlet( 1, new Array( "ease", 0.5 ) );
	outlet( 2, new Array( "draw_mode", jsarguments[2] ) );
	outlet( 2, new Array( "drawto", "spheres") );
}

function getPosition() {
	return this.position;
}

function setPosition( x, y, z ) {		 
	if (arguments.length === 1) {
		this.getPosition().set( x );
		this.outPosition();
	} else {
		this.getPosition().set( x, y, z );
		this.outPosition();
	}
}

function outPosition() {
	outlet( 0, new Array( "position", this.getPosition().x, this.getPosition().y, this.getPosition().z ) );
}

function getScale() {
	return this.scale;
}

// Check if the object has exceeded the screen on the positive Y-axis or exceed some arbitary value on the negative Y-axis
function checkBounds() {
	if (this.dying == false) {
		var YLimit = (Math.abs(this.getPosition().z) * ( aLimit + this.getScale().y) ); //The upper limit of the screen, changes as the object moves back
		var YLimitLower = (-(Math.abs(jsarguments[1]) * ( aLimit + this.getScale().y) ) ) - (this.getScale().y * 1.1); 
		if ( this.getPosition().y > YLimit ) {
			this.setPosition( this.getPosition().x, YLimitLower, this.getPosition().z );
			this.outPosition();
			outlet( 1, new Array( "move", 0., 0., 0. ) );
		}
		if ( this.getPosition().y < (YLimitLower - 0.01) ) {
			this.setPosition( this.getPosition().x, YLimitLower, this.getPosition().z );
			this.outPosition();
			outlet( 1, new Array( "ease", 0.0 ) );
			outlet( 1, new Array( "move", 0., 0., 0. ) );
			outlet( 1, new Array( "ease", 0.5 ) );

		}
	}
}	

function randomX() {
	if (this.dying == false) {
		this.setPosition( util.getRandom( 2 * ( aLimit * screenSizeRatio + this.getScale().x ), -( aLimit * screenSizeRatio + this.getScale().x ) ),
			this.getPosition().y, 
			this.getPosition().z );	
	}
}