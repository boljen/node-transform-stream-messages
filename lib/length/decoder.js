
"use strict";

var util = require('util');
var Transform = require('stream').Transform;
util.inherits(Decoder, Transform);
var VirtualBuffer = require('virtual-buffer');

function Decoder(options) {
  Transform.call(this, options);
  this._writableState.objectMode = false;
  this._readableState.objectMode = false;
  this._lengthMode = true;
  this.b = new VirtualBuffer();
  this.expecting = 2;
};

Decoder.prototype._transform = function(chunk, encoding, cb) {

  this.b.push(chunk);

  while (this.b.readable(this.expecting)) {
    var data = this.b.compile(this.expecting);
    if (this._lengthMode) {
      this._lengthMode = false;
      this.expecting = data.readUInt16BE(0);
    } else {
      this.push(data);
      this._lengthMode = true;
      this.expecting = 2;
    }
  }
  cb();
};


module.exports = Decoder;
