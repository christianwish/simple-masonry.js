# frontend-prototype
[![Build Status](https://travis-ci.org/christianheyn/static-prototype.svg?branch=master)](https://travis-ci.org/christianheyn/static-prototype)

**Basic repo for frontend prototypes**


### Install
```sh
$ git clone https://github.com/christianheyn/frontend-prototype.git
$ npm install
```

### Work
```sh
$ npm run watch:scss
$ npm run watch:js
$ npm run watch:js:test
```
*or*
```sh
$ npm run watch:all
```

### Test
```sh
$ npm test
```
*or*
```sh
$ npm run lint:js
$ npm run lint:js:test
$ mocha-phantomjs test/index.html
```


### available mixins
```scss
// transition($task, $duration: 150ms, $wait: 0ms, $ease: ease-out)
@include transition(left, 150ms, 0, ease-out);
```



**Author**
[Christian Heyn](https://github.com/christianheyn)