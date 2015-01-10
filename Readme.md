### Shashi

[![NPM VERSION](http://img.shields.io/npm/v/shashi.svg)](https://www.npmjs.org/package/shashi)
[![CODACY BADGE](https://img.shields.io/codacy/b18ed7d95b0a4707a0ff7b88b30d3def.svg)](https://www.codacy.com/public/44gatti/shashi)
[![CODECLIMATE-TEST-COVERAGE](https://codeclimate.com/github/rootslab/shashi/badges/coverage.svg)](https://codeclimate.com/github/rootslab/shashi)
[![LICENSE](http://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/rootslab/shashi#mit-license)

[![TRAVIS CI BUILD](http://img.shields.io/travis/rootslab/shashi.svg)](http://travis-ci.org/rootslab/shashi)
[![BUILD STATUS](http://img.shields.io/david/rootslab/shashi.svg)](https://david-dm.org/rootslab/shashi)
[![DEVDEPENDENCY STATUS](http://img.shields.io/david/dev/rootslab/shashi.svg)](https://david-dm.org/rootslab/shashi#info=devDependencies)

[![status](https://sourcegraph.com/api/repos/github.com/rootslab/shashi/.badges/status.png)](https://sourcegraph.com/github.com/rootslab/shashi)
[![views](https://sourcegraph.com/api/repos/github.com/rootslab/shashi/.counters/views.png)](https://sourcegraph.com/github.com/rootslab/shashi)
[![views 24h](https://sourcegraph.com/api/repos/github.com/rootslab/shashi/.counters/views-24h.png)](https://sourcegraph.com/github.com/rootslab/shashi)
[![NPM DOWNLOADS](http://img.shields.io/npm/dm/shashi.svg)](http://npm-stat.com/charts.html?package=shashi)
[![GITTIP](http://img.shields.io/gittip/rootslab.svg)](https://www.gittip.com/rootslab/)

[![NPM GRAPH1](https://nodei.co/npm-dl/shashi.png)](https://nodei.co/npm/shashi/)

[![NPM GRAPH2](https://nodei.co/npm/shashi.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/shashi/)

> __Shashi__, a simple module to generate, using pseudo-randomness, a universal family/set of hash functions,which produce integer values.

> See also __[Brando](https://github.com/rootslab/brando)__.

###Install

```bash
$ npm install shashi [-g]
```

> __require__:

```javascript
var Shashi  = require( 'shashi' );
```
###Run Tests

> __to run all test files, install devDependecies:__

```bash
 $ cd shashi/
 # install or update devDependecies
 $ npm install --dev
 # run tests
 $ npm test
```
> __to execute a single test file simply do__:

```bash
 $ node test/file-name.js
```

###Constructor - Method

> Arguments within [ ] are optional.

#####Generate seed sequence using Math.random.

> get a method to use a family of hash functions.

```javascript
/*
 * For example, Shashi( 2, 16, 257 ) generates:
 * - 2 hash functions, h0 and h1 (indexes 0, 1)
 * - every hash fn, expects/accepts at most 16 items to encode
 * - the range of items should be: (0,256), then using 2 byte per item
 */
Shashi( Number hash_fn, Number items_to_hash, Number prime_for_seed_range ) : Array
```

> It returns an Array composed by:

```javascript
Array : [ Function uhash, Sequence seed ]
```

> a method used to retrieve and execute a particular hash function, using an index (0-k)

```javascript
uhash : function ( Number hash_fn_index, Buffer input_data [, Number ibytes_per_item ] )
```

> the underlying seed __[Sequence](https://github.com/rootslab/brando)__, used for generating the hashed value (an integer).


#####Generate seed sequence using a random sample.

> When a data Buffer is used to fill the seed sequence, the method automatically switches to the callback mode.

```javascript
Shashi( Number h, Number i, Number p [, Buffer sample [, Function cback ] ] ) : undefined
```
> the callback gets 3 arguments:

```javascript
/*
 * NOTE: when the sample data are not enough to fill the random
 * seed Sequence, an Error was returned, otherwise null.
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