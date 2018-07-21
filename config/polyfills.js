'use strict'

if (typeof Promise === 'undefined') {
  require('promise/lib/rejection-tracking').enable()
  window.Promise = require('promise/lib/es6-extensions.js')
}

require('@babel/polyfill')

// fetch() polyfill for making API calls.
require('whatwg-fetch')

// It will use the native implementation if it's present and isn't buggy.
Object.assign = require('object-assign')

// In tests, polyfill requestAnimationFrame since jsdom doesn't provide it yet.
// We don't polyfill it in the browser--this is user's responsibility.
if (process.env.NODE_ENV === 'test') {
  require('raf').polyfill(global)
}
