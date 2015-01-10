/*
 * Shashi example, generate 6 hash functions, 
 * parsing data from a random sample,
 */

var log = console.log
    , fs = require( 'fs' )
    , Brando = require( 'brando' )
    , Shashi = require( '../' )
    // items to hash
    , i = 64 * 1024
    // how many random hash function to generate
    , h = 6
    // a prime to define range (at least ~i*2) for seed sequence values (range = prime - 1)
    , p = 104729
    // selected range for input values is [0-12]
    , r = 13
    // load a file
    , random_data = fs.readFileSync( './example/sample' )
    ;

Shashi( h, i, p, random_data, function ( err, ufn, seed ) {
    if ( err ) return log( '\n-', err.message, '\n' );
    // generate random sequence for input
    var seq = Brando.emt( i, r ).fill()
        , input = seq.result
        // get the 6 hash functions, reading only 1 byte at the time from input buffer
        , v0 = ufn( 0, input, seq.ibytes )
        , v1 = ufn( 1, input, seq.ibytes )
        , v2 = ufn( 2, input, seq.ibytes )
        , v3 = ufn( 3, input, seq.ibytes )
        , v4 = ufn( 4, input, seq.ibytes )
        , v5 = ufn( 5, input, seq.ibytes )
        ;

    log();
    log( '- %d hash functions generated with data parsed from a random sample', h );
    log();
    log( '- input buffer:' );
    log( '  > tot items:', i );
    log( '  > val range: [%d,%d]', 0, r -1 );
    log( '  > item size: %d bytes', seq.ibytes );
    log( '  > tot bytes: %d bytes', input.length );
    log();
    log( '- seed seq buffer:' );
    log( '  > tot items: %d ', seed.items );
    log( '  > seq prime:', p );
    log( '  > val range: [%d,%d]', 0, p -1 );
    log( '  > item size: %d bytes', seed.ibytes );
    log( '  > tot bytes: %d bytes', seed.result.length );
    log();
    log( '- hash results:', v0, v1, v2, v3, v4, v5 );
    log();

} );