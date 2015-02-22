### Shashi

[![NPM VERSION](http://img.shields.io/npm/v/shashi.svg?style=flat)](https://www.npmjs.org/package/shashi)
[![CODACY BADGE](https://img.shields.io/codacy/b18ed7d95b0a4707a0ff7b88b30d3def.svg?style=flat)](https://www.codacy.com/public/44gatti/shashi)
[![CODECLIMATE](http://img.shields.io/codeclimate/github/rootslab/shashi.svg?style=flat)](https://codeclimate.com/github/rootslab/shashi)
[![CODECLIMATE-TEST-COVERAGE](https://img.shields.io/codeclimate/coverage/github/rootslab/shashi.svg?style=flat)](https://codeclimate.com/github/rootslab/shashi)
[![LICENSE](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/rootslab/shashi#mit-license)

[![TRAVIS CI BUILD](http://img.shields.io/travis/rootslab/shashi.svg?style=flat)](http://travis-ci.org/rootslab/shashi)
[![BUILD STATUS](http://img.shields.io/david/rootslab/shashi.svg?style=flat)](https://david-dm.org/rootslab/shashi)
[![DEVDEPENDENCY STATUS](http://img.shields.io/david/dev/rootslab/shashi.svg?style=flat)](https://david-dm.org/rootslab/shashi#info=devDependencies)
[![NPM DOWNLOADS](http://img.shields.io/npm/dm/shashi.svg?style=flat)](http://npm-stat.com/charts.html?package=shashi)

[![NPM GRAPH1](https://nodei.co/npm-dl/shashi.png)](https://nodei.co/npm/shashi/)

[![NPM GRAPH2](https://nodei.co/npm/shashi.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/shashi/)

[![status](https://sourcegraph.com/api/repos/github.com/rootslab/shashi/.badges/status.png)](https://sourcegraph.com/github.com/rootslab/shashi)
[![views](https://sourcegraph.com/api/repos/github.com/rootslab/shashi/.counters/views.png)](https://sourcegraph.com/github.com/rootslab/shashi)
[![views 24h](https://sourcegraph.com/api/repos/github.com/rootslab/shashi/.counters/views-24h.png)](https://sourcegraph.com/github.com/rootslab/shashi)

> __Shashi__, a simple module to generate, using __pseudo-randomness__, a __universal family/set of hash functions__, which produce __integer values__ within the selected range (a __prime__ number).

###A random bit of theory

> A family __H__ of hash functions is __universal__ if, for any two items in the universe, the __probability of collision__ is as small as possible.

> Briefly, assumed that for every input key k ∈ K and for every hash function h ∈ H:

> - h(k) map to { 0, 1, .., m−1 }

> then, __H is universal__ when, for any two items x != y:

> - Prob( h(x) == h(y) ) = __1/m__

> In other words, chosen __h__ uniformly at random, from a __universal set H__ of hash functions, if h is
> used to hash __n__ arbitrary keys into __m__ slots, then, for a given key __k__, we expect that the total
> number of __collisions__ with k is < __n/m__.

> Universal hash functions could also be used to compute __perfect hashing__, for a determined set of keys.

> __Choosing properly a prime p and a constant c__:
> - p > c*|set of keys| (c >= ~2.09)

> We expect to find a perfect hash mapping for values, in a __finite time__ (with __high probability__), interpreting lists of resulting hashed values as edges to insert in a __bipartite__ or __tripartite__ (hyper) __graph G__ = {V,E}:
> - |E| = n (keys)
> - |V| = p

> we set:
> - |V| = c * |E|

> then we choose a prime >= 2*n:
> - |V| = p = c * |E| = c * n > n * 2

> Algo example; we choose |H| = 2, then H = { h0, h1 }:
>
> - while ( true ) :
>  - pick-up at random 2 hash functions from H
>
>  - for every key k ∈ K, add resulting edge and vertices to the 2-graph:
>    - edge = (v0, v1), with v0 = h0(k), v1 = h1(k)
>
>  - now testing the 2-graph acyclicity (it could be performed in linear time).
>  - if 2-graph is acyclic:
>    - break the loop, well done!
>      - from now on, you can build a perfect hashing function for your set of keys,
>        in a deterministic way.
>    - otherwise let's gamble!!
>      - continue loop, picking-up 2 others random hash functions

> See also:
> - __[Universal Hashing](http://en.wikipedia.org/wiki/Universal_hashing)__
> - __[Perfect Hash Function](http://en.wikipedia.org/wiki/Perfect_hash_function)__
> - __[Brando](https://github.com/rootslab/brando)__
> - __[Nprime](https://github.com/rootslab/nprime)__

###Install

```bash
$ npm install shashi [-g]
```
> __require__:

```javascript
var Shashi = require( 'shashi' );
```
###Run Tests

> __to run all test files, install devDependecies:__

```bash
 $ cd shashi/
 # install or update devDependecies
 $ npm install
 # run tests
 $ npm test
```
> __to execute a single test file simply do__:

```bash
 $ node test/file-name.js
```
###Run Benchmarks

> run miscellaneous benchmarks for Shashi:

```bash
 $ cd shashi/
 $ npm run bench
 # or to run a single file
 $ node bench/file-name-bench.js
```
----------------------------------------------------------------------------------------------

###Method

> Arguments within [ ] are optional.

#####Generate seed sequence using Math.random.

> get a method to use a family of hash functions.

```javascript
/*
 * A trivial example, Shashi( 2, 16, 257 ) generates:
 * - 2 hash functions, h0 and h1 (indexes 0, 1)
 * - every hash fn, expects/accepts at most 16 items to encode
 * - the range of items should be: [0,255], then using 1 byte
 *   per item in the seed sequence.
 *
 * NOTE:
 * - if the p number is not a prime, the next greater prime number will be calculated.
 * - if the p number is out of range (> 2^53), you'll get an Error.
 */
Shashi( Number hash_fn, Number items_to_hash, Number prime_for_seed_range ) : Array
```

> It returns an Array composed by:
> - a method used to retrieve and execute a particular hash function, using an index (0-k).
> - the underlying seed __[Sequence](https://github.com/rootslab/brando)__, used for generating the hashed value (an integer).

```javascript
/*
 * When you only need to regenerate random data for seeding your hash functions,
 * you can simply refresh the seed sequence using Sequence#fill or Sequence#parse.
 *
 * See also https://github.com/rootslab/brando.
 */
Array : [ Function uhash, Sequence seed ]

// universal set of hash functions
uhash : function ( Number fn_index, Buffer input_data [, Number bytes_per_item ] )
```

#####Generate seed sequence using a random sample.

> When a data Buffer is used to fill the seed sequence, the method automatically switches to the callback mode.

```javascript
Shashi( Number h, Number i, Number p [, Buffer src [, Function cback ] ] ) : undefined
```
> the callback gets 3 arguments:

```javascript
/*
 * NOTE: an error was returned when:
 * - the number supplied for the seed sequence range is not a prime.
 * - the sample data are not enough to fill the random seed Sequence.
 */
cback : function ( Error e, Function uhash, Sequence seed ) { .. }
```
> See also __[examples](example/)__.

### MIT License

> Copyright (c) 2015 &lt; Guglielmo Ferri : 44gatti@gmail.com &gt;

> Permission is hereby granted, free of charge, to any person obtaining
> a copy of this software and associated documentation files (the
> 'Software'), to deal in the Software without restriction, including
> without limitation the rights to use, copy, modify, merge, publish,
> distribute, sublicense, and/or sell copies of the Software, and to
> permit persons to whom the Software is furnished to do so, subject to
> the following conditions:

> __The above copyright notice and this permission notice shall be
> included in all copies or substantial portions of the Software.__

> THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
> EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
> MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
> IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
> CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
> TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
> SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[![GA](https://ga-beacon.appspot.com/UA-53998692-1/shashi/Readme?pixel)](https://github.com/igrigorik/ga-beacon)