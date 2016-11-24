include("include.js");

outlets = 2;
autowatch = 1;
bang.immediate = 1;

var origin = new Vector( 0., 0., -1. );
var scale = new Vector( 0.05, 0.05, 0.05 );
this.position = new Vector( origin );

function bang() {
	checkUpperBounds( this.position );
}

function reset() {
	this.setPosition(origin);
	outlet( 0, new Array( "position", origin.x, origin.y, origin.z ) );
	outlet( 0, new Array( "scale", scale.x, scale.y, scale.z ) );
}

function getPosition() {
	return this.position;
}

function setPosition( x, y, z ) {		 
	if (arguments.length === 1) {
		this.position.set( x );
	} else {
		this.position.set( x, y, z );
	}
}

// Check if the object has exceeded the screen on the positive Y-axis
function checkUpperBounds( position ) {
	var limit = -0.05 + Math.abs(position.z) * 0.41; //The upper limit of the screen, changes as the object moves back
	if ( position.y > limit ) {
		this.setPosition( position.x, -limit, position.z );
		outlet( 0, new Array( "position", position.x, position.y, position.z ) );
		outlet( 1, new Array( "move", 0., 0., 0. ) );
	}
}