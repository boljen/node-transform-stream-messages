"use strict";

var util = require('util');
var Transform = require('stream').Transform;
util.inherits(Decoder, Transform);

function Decoder(byteDelimiter, options) {
  if (typeof byteDelimiter === 'string') {
    if (byteDelimiter.length !== 1)
      throw new TypeError('Only single character delimiters supported');
    byteDelimiter = new Buffer(byteDelimiter)[0];
  }
  this.del = byteDelimiter || 10;
  Transform.call(this, options);
  this._writableState.objectMode = false;
  this._readableState.objectMode = false;
  this.cache = [];

  // The first time is always skipped.
  this.skip = true;
};

Decoder.prototype._transform = function(chunk, encoding, cb) {

  for (var i = 0; i < chunk.length; i++) {

    if (this.skip) {
      this.skip=false;
    } else if (chunk[i] === this.del) {
      // If the current piece contains a delimiter, look to the next piece. If
      // it also is a delimiter, it's an escaped delimiter.
      if (chunk[i+1] === this.del) {
        this.cache.push(this.del);
        this.skip = true;
      } else {
        this.push(new Buffer(this.cache));
        this.cache = new Array();
        this.skip = true;
      }
    } else {
      this.cache.push(chunk[i]);
    }
  }

  cb();
};


module.exports = Decoder;
