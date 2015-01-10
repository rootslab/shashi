/*
 * Shashi re-fill seed sequence example,
 */

var log = console.log
    , Shashi = require( '../' )
    // items to hash
    , i = 7
    // how many random hash function to generate
    , h = 2
    // a prime to define range (at least ~i*2) for seed sequence values (range = prime - 1)
    , p = 104729
    , result = Shashi( h, i, p )
    , ufn = result[ 0 ]
    , seed = result[ 1 ]
    // selected range for input values is [0-12]
    , r = 13
    // use a sequence for input
    , input = new Buffer( [ 0, 0, 0, 0, 12, 12, 12 ] )
    // get 2 hash functions, reading only 1 byte at the time from input buffer
    , v0 = ufn( 0, input, 1 )
    , v1 = ufn( 1, input, 1 )
    ;

log();
log( '- %d hash functions generated with data produced by Math.random()', h );
log();
log( '- input buffer:', input );
log();
log( '- seed sequence result:', seed.result );
log();
log( '- hash results:', v0, v1 );
log();
log( '- re-fill seed sequence with Math.random()' );
log();
log( '- seed sequence result:', seed.fill().result );
log();
log( '- hash results:', ufn( 0, input, 1 ), ufn( 1, input, 1 ) );
log();