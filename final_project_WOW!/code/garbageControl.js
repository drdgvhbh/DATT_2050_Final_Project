include("include.js");

outlets = 3;
autowatch = 1;
reset.immediate = 1;
checkBounds.immediate = 1;
bang.immediate = 1;
getPosition.immediate = 1;
outPosition.immediate = 1;
setPosition.immediate = 1;
getScale.immediate = 1;
randomX.immediate = 1;

var util = Util.getInstance(); //Utility class
var screenSizeRatio = 16.0 / 9;
var aLimit = 0.36;

var scaleScalar = util.getRandom( 0.05, 0.05 );
var scale = new Vector( scaleScalar, scaleScalar, scaleScalar );
var origin = getOrigin();
this.position = new Vector( origin );

function getOrigin() {
	return new Vector( util.getRandom( 2 * ( aLimit * screenSizeRatio + this.getScale().x ), -( aLimit * screenSizeRatio + this.getScale().x ) ), 
	-((-(Math.abs(jsarguments[1]) * ( aLimit + this.getScale().y) ) ) - (this.getScale().y * 2.)), 
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
	outlet( 0, new Array( "drawto", "projectiles") );
	outlet( 1, new Array( "ease", 0. ) );
	outlet( 1, new Array( "move", 0., 0., 0. ) );
	outlet( 1, new Array( "ease", 0.5 ) );
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

function setScale( x, y , z ) {
	if (arguments.length === 1) {
		this.getScale().set( x );
		this.outScale();
	} else {
		this.getScale().set( x, y, z );
		this.outScale();
	}
}

function outScale() {
	outlet( 0, new Array( "scale", this.getScale().x, this.getScale().y, this.getScale().z ) );
}

// Check if the object has exceeded the screen on the positive Y-axis or exceed some arbitary value on the negative Y-axis
function checkBounds() {
	var YLimit = (Math.abs(this.getPosition().z) * ( aLimit + this.getScale().y) ); //The upper limit of the screen, changes as the object moves back
	var YLimitLower = (-(Math.abs(this.getPosition().z) * ( aLimit + this.getScale().y) ) ) - (this.getScale().y * 1.1); 
	if ( this.getPosition().y < YLimitLower ) {
		this.setPosition( this.getPosition().x, YLimit, this.getPosition().z );
		randomX();
		this.getPosition().z = util.getRandom( 1.5, -2.5);
		var r = util.getRandom( 0.1, 0.1 );
		this.setScale(r, r, r);
		this.outPosition();

		outlet( 1, new Array( "ease", 0.0 ) );
		outlet( 1, new Array( "move", 0., 0., 0. ) );
		outlet( 1, new Array( "ease", 0.5 ) );
	}

}	

function randomX() {
	this.setPosition( (util.getRandom( 2 * ( aLimit * screenSizeRatio + this.getScale().x ), -( aLimit * screenSizeRatio + this.getScale().x ) )) * 2,
		this.getPosition().y, 
		this.getPosition().z );	

}
