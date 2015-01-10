/*
 * Shashi example, generate 2 hash functions, 
 * parsing data from a random sample,
 */

var log = console.log
    , fs = require( 'fs' )
    , Shashi = require( '../' )
    // items to hash
    , i = 7
    // how many random hash function to generate
    , h = 2
    // a prime to define range (at least ~i*2) for seed sequence values (range = prime - 1)
    , p = 104729
    // selected range for input values is [0-12]
    , r = 13
    // load a file
    , random_data = fs.readFileSync( './example/sample' )
    ;

Shashi( h, i, p, random_data, function ( err, ufn, seed ) {
    if ( err ) return log( '\n-', err.message, '\n' );
    // use a sequence for input
    var input = new Buffer( [ 0, 0, 0, 0, 12, 12, 12 ] )
        // get the 6 hash functions, reading only 1 byte at the time from input buffer
        , v0 = ufn( 0, input, 1 )
        , v1 = ufn( 1, input, 1 )
        ;

    log();
    log( '- %d hash functions generated with data parsed from a random sample', h );
    log();
    log( '- input buffer:', input );
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
    log( '- hash results:', v0, v1 );
    log();

} );