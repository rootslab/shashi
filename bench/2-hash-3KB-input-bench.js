
var log = console.log
    , Brando = require( 'brando' )
    , Shashi = require( '../' )
    // a prime ~ 2^17 elements
    , p = 104729
    // max items to hash in the current range
    , i = 1024
    // how many random hash function to generate
    , h = 2
    , result = Shashi( h, i, p )
    , ufn = result[ 0 ]
    , seed = result[ 1 ]
    // generate random sequence for input with Math.random()
    , seq = Brando.emt( i, p - 1 ).fill()
    , input = seq.result
    , v0 = .1
    , v1 = -1
    , stime = -1
    , etime = -1
    , runs = 1024
    , j = runs
    ;

log();
log( '- calculate %d hash values from input data (%d times)', h, runs );

stime = Date.now();
for ( ; ~j; --j ) {
    vo = ufn( 0, input );
    v1 = ufn( 1, input );
}
etime = ( Date.now() - stime ) / 1000;

log();
log( '- uhash: %d functions', h );
log();
log( '- prime: %d', p );
log( '- range: [0,%d]', p - 2 );
log();
log( '- isize: %d bytes', seq.result.length );
log( '- ssize: %d bytes', seed.result.length );
log();
log( '- truns: %d runs', runs * 2 );
log( '- etime: %d secs', etime );
log();
log( '- hrate: %d hash/sec', ( runs * 2 / etime ).toFixed( 2 ) );