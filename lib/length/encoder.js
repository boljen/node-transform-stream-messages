"use strict";

var util = require('util');
var Transform = require('stream').Transform;
util.inherits(Encoder, Transform);

function Encoder(options) {
  Transform.call(this, options);
  this._writableState.objectMode = false;
  this._readableState.objectMode = false;
};

Encoder.prototype._transform = function(chunk, encoding, cb) {
  var length = new Buffer(2);
  length.writeUInt16BE(chunk.length, 0);
  this.push(Buffer.concat([length, chunk]));
  cb();
};

module.exports = Encoder;
