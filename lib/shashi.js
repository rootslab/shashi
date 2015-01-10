/*
 * Shashi, a simple module to generate, using pseudo-randomness,
 * a universal family/set of hash functions, which produce integer
 * values.
 *
 * Copyright(c) 2015 Guglielmo Ferri <44gatti@gmail.com>
 * MIT Licensed
 */

exports.version = require( '../package' ).version;
exports.Shashi = ( function () {
    var log = console.log
        , abs = Math.abs
        , ceil = Math.ceil
        , sqrt = Math.sqrt
        , emptyFn = function () {}
        , isBuffer = Buffer.isBuffer
        , Brando = require( 'brando' )
        // test primality
        , composite = function ( n ) {
            var p = n >>> 0 ? abs( n ) : 1
                , qx = ceil( sqrt( p ) )
                , i = 2
                ;
            if ( n < 3 ) return 0;
            for ( ; i <= qx; ++i )
                if ( p % i === 0 ) return i;
            return 0;
        }
        ;
    return function ( fk, items, prange, random_data, callback ) {
        var cback = typeof callback === 'function' ? callback : emptyFn
            , div = composite( prange )
            , emsg = div ? + prange + ' is not a prime number! (divisor: ' + div + ')' : null
            ;
        // prange should be a prime number
        if ( div )
            if ( isBuffer( random_data ) ) return cback( new Error( emsg ) );
            else throw new Error( emsg );
        // generate random seed sequence for requested range
        var k = abs( fk ) || 1
            , r = prange - 1
            , i = items >>> 0 ? abs( items ) : 1
            , len = k * i
            , seq = Brando.emt( len, r )
            , ibytes = seq.ibytes
            , result = seq.result
            , ruint = seq.ruint
            , slen = i * ibytes
            // holds a universal family/set of hash functions
            , fn = function ( n, buffer, bytes ) {
                var f = n % k
                    , s = f * slen
                    // how many bytes to read/consume from input buffer
                    , rbytes = bytes > 0 && bytes < 5 ? bytes : ibytes
                    , bruint = 'readUInt' + ( rbytes << 3 ) + ( rbytes > 1 ? 'BE' : '' )
                    , rlen = result.length - ibytes
                    , blen = buffer.length - rbytes
                    , sum = 0
                    , b = 0
                    ;
                for ( ; b < blen && s < rlen; b += rbytes, s += ibytes ) {
                    // log( 'input.%s() : [%d,%d] seed.%s() : [%d,%d]', bruint, b, blen, ruint[ 0 ], s, rlen );
                    sum += buffer[ bruint ]( b ) * result[ ruint ]( s );
                    sum %= prange;
                }
                return sum;
            }
            ;
        // switch to callback mode if a Buffer is available
        if ( isBuffer( random_data ) ) {
            seq.on( 'fart', function ( results ) {
                cback( null, fn, seq );
            } );
            seq.on( 'feed', function ( mbytes ) {
                var emsg = 'there are not enough random data! (' + mbytes + ' bytes remaining to generate)'
                    ;
                cback( new Error( emsg ) );
            } );
            // parse input data
            return seq.parse( random_data );
        }
        // fill seed sequence through Math.random
        seq.fill();
        // return univ hash fn and the random seed sequence
        return [ fn, seq ];
    }
    ;

} )();