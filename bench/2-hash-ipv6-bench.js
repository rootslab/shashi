/*
 * Benchmark for hashing ipv6-like Buffers, 32 bytes/octets/items or 128 bits,
 */

var log = console.log
    , Brando = require( 'brando' )
    , Shashi = require( '../' )
    // how many random hash function to generate
    , h = 2
    // items to hash, 16 bytes/octets (16*8 = 128 bits)
    , i = 16
    // a prime to define range for seed sequence values (range = prime - 1)
    , p = 104729
    , result = Shashi( h, i, p )
    , ufn = result[ 0 ]
    , seed = result[ 1 ]
    // generate ipv6-like random sequence of 32 octets/bytes, with Math.random()
    , seq = Brando.emt( i, 256 ).fill()
    , input = seq.result
    , v0 = -1
    , v1 = -1
    , stime = -1
    , etime = -1
    , runs = 64 * 1024
    , j = runs
    // , fn0 = ufn.bind( null, 0 )
    // , fn1 = ufn.bind( null, 1 )
    ;
log();
log( '- calculate %d hash values from input data (%d times)', h, runs );

/* 
 * this loop is trivial, it parses the same values
 * every time from the sequence, it is used only to
 * get an average value.
 */
stime = Date.now();
for ( ; ~j; --j ) {
    // read 1 byte at the time from input (16 items/octets to hash)
    v0 = ufn( 0, input, 1 ); // fn0( input );
    v1 = ufn( 1, input, 1 ); // fn1( input );
}
etime = ( Date.now() - stime ) / 1000;

log();
log( '- uhash: %d functions', h );
log();
log( '- prime: %d', p );
log( '- range: [0,%d]', p - 2 );
log( '- items: %d', i );
log();
log( '- isize: %d bytes', seq.result.length );
log( '- ssize: %d bytes', seed.result.length );
log();
log( '- truns: %d hashes', runs * 2 );
log( '- etime: %d secs', etime );
log();
log( '- hrate: %d hash/sec', ( runs * 2 / etime ).toFixed( 2 ) );
log();