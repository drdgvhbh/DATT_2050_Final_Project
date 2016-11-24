include("include.js");

outlets = 2;
autowatch = 1;
reset.immediate = 1;

var scale = new Vector( 0.05, 0.05, 0.05 );
var origin = new Vector( 0., -0.56, -1. );
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
		this.outPosition();
	} else {
		this.position.set( x, y, z );
		this.outPosition();
	}
}

function outPosition() {
	outlet( 0, new Array( "position", this.position.x, this.position.y, this.position.z ) );
}

// Check if the object has exceeded the screen on the positive Y-axis
function checkUpperBounds( position ) {
	var YLimit = (Math.abs(position.z) * ( 0.36 + scale.y) ); //The upper limit of the screen, changes as the object moves back
	if ( position.y > YLimit ) {
		post(-YLimit - (this.scale.y * 3) +"\n");
		this.setPosition( position.x, -YLimit - (this.scale.y *3), position.z );
		this.outPosition();
		outlet( 1, new Array( "move", 0., 0., 0. ) );
	}
}