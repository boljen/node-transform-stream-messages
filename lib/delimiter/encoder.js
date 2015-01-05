"use strict";

var util = require('util');
var Transform = require('stream').Transform;
util.inherits(Encoder, Transform);

function Encoder(byteDelimiter, options) {
  if (typeof byteDelimiter === 'string') {
    if (byteDelimiter.length !== 1)
      throw new TypeError('Only single character delimiters supported');
    byteDelimiter = new Buffer(byteDelimiter)[0];
  }
  this.del = byteDelimiter || 10;

  // Here we define a safe chunk with which every single message shall start.
  if (this.del !==0)
    this.safe = 0;
  else
    this.safe = 255;

  Transform.call(this, options);
  this._writableState.objectMode = false;
  this._readableState.objectMode = false;
  this.cache = [];
};

Encoder.prototype._transform = function(chunk, encoding, cb) {
  var data = new Array();

  data.push(this.safe);

  for (var i = 0; i < chunk.length; i++) {
    if (chunk[i] === this.del)
      data.push(this.del);
    data.push(chunk[i]);
  }
  data.push(this.del);
  this.push(new Buffer(data));
  cb();
};

module.exports = Encoder;
