/*
 * Example for hashing with 2 different universal hash functions,
 * ipv6-like Buffer, made of 16 bytes/octets/items or 128 bits.
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
    // selected range for input values is [0-255]
    , r = 256
    // generate ipv6-like random sequence of 32 octets/bytes, with Math.random()
    , seq = Brando.emt( i, r ).fill()
    , input = seq.result
    // get 2 hash functions, reading only 1 byte at the time from input buffer
    , v0 = ufn( 0, input, 1 )
    , v1 = ufn( 1, input, 1 )
    ;

log();
log( '- %d hash functions generated with data produced by Math.random()', h );
log();
log( '- input buffer:', input, input.length );
log( '  > ipv6-like:', input.toString( 'hex' ) );
log( '  > tot items:', i );
log( '  > val range: [%d,%d]', 0, r -1 );
log( '  > item size: %d bytes', 1 );
log( '  > tot bytes: %d bytes', input.length );
log();
log( '- seed seq buffer:' );
log( '  > tot items: %d ', seed.items );
log( '  > seq prime:', p );
log( '  > val range: [%d,%d]', 0, p -1 );
log( '  > item size: %d bytes', seed.ibytes );
log( '  > tot bytes: %d bytes', seed.result.length );
log();
log( '- h0 result:', v0 );
log( '- h1 result:', v1 );
log();
