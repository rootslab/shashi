/*
 * Shashi, a simple module to generate, using pseudo-randomness,
 * a universal family/set of hash functions, which produce integer
 * values within the selected range (a prime number).
 *
 * Copyright(c) 2015 Guglielmo Ferri <44gatti@gmail.com>
 * MIT Licensed
 */

exports.version = require( '../package' ).version;
exports.Shashi = ( function () {
    var abs = Math.abs
        , emptyFn = function () {}
        , isBuffer = Buffer.isBuffer
        , Brando = require( 'brando' )
        , Nprime = require( 'nprime' )
        , next = Nprime.next
        ;
    return function ( fk, items, p, random_data, callback ) {
        var cback = typeof callback === 'function' ? callback : emptyFn
            , prange = -1
            ;
        try {
            prange = next( p );
        } catch ( e ) {
            if ( cback !== emptyFn ) return cback( e );
            else throw e;
        }
        // generate random seed sequence for requested range
        var  k = abs( fk ) || 1
            , r = prange - 1
            , i = items >>> 0 ? abs( items ) : 1
            , len = k * i
            , seq = Brando.emt( len, r )
            , ibytes = seq.ibytes
            , result = seq.result
            , ruint = seq.ruint
            , rlen = result.length - ibytes
            , slen = i * ibytes
            // universal family/set of hash functions
            , fn = function ( n, buffer, bytes ) {
                var s = ( n % k ) * slen
                    // how many bytes to read/consume from the input buffer [1 to 4]
                    , rbytes = bytes >>> 0 ? abs( bytes ) % 5 : ibytes
                    , blen = buffer.length - rbytes
                    , bruint = null
                    , sum = 0
                    , b = 0
                    ;
                /*
                 * NOTE: js is not capable to handle integers larger than ~2^53,
                 * when the sum exceeds this limit, we expect to get get biased
                 * results, or in other words, more collisions. It will happens
                 * when we are using large primes as range, or with long buffer
                 * in input. If sum === sum + 1, we could break the for cycle.
                 */
                if ( rbytes === 1 ) {
                    // use [] notation when reading input, 1 byte at the time.
                    if ( ibytes === 1 ) {
                        // read input and seed 1 byte at the time
                        for ( ; b <= blen && s <= rlen; ++b, ++s )
                            sum += buffer[ b ] * result[ s ];
                        return sum % prange;
                    }
                    for ( ; b <= blen && s <= rlen; ++b, s += ibytes )
                        sum += buffer[ b ] * result[ ruint ]( s );
                    return sum % prange;
                }
                // build string for read method (16, 24 or 32 bits unsigned integers)
                bruint =  bruint = 'readUInt' + ( rbytes << 3 ) + 'BE';
                for ( ; b <= blen && s <= rlen; b += rbytes, s += ibytes ) {
                    sum += buffer[ bruint ]( b ) * result[ ruint ]( s );
                    sum %= prange;
                }
                return sum;
            }
            ;
        /*
         * When a Buffer is not supplied, it fills the seed sequence through Math.random(),
         * then, it returns an Array composed by the universal hash function and the random
         * seed sequence; otherwise it switches to callback mode.
         */
        if ( ! isBuffer( random_data ) && seq.fill() ) return [ fn, seq ];
        // callback mode, set listeners for sequence
        seq.on( 'fart', function () {
            cback( null, fn, seq );
        } );
        seq.on( 'feed', function ( mbytes ) {
            var emsg = 'there are not enough random data for generating seed sequence! (' + mbytes + ' bytes remaining)'
                ;
            cback( new Error( emsg ) );
        } );
        // parse input data
        return seq.parse( random_data );
    }
    ;

} )();