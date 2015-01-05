node-transform-stream-messages
==============================

Some useful stream transforms to encode and decode messages from a bufferstream.

It's assumed that calling write to the encoders is a single message.

## Setup

    npm install transform-stream-messages

    var tsm = require('transform-stream-messages');

## Length

A simple 2-byte BE length-prefix is added in front of every write.


    var lengthEncoder = new tsm.length.Encoder();
    var lengthDecoder = new tsm.length.Decoder();

## Delimiter

By default it delimits the newline character. It escapes occurrences of the
delimiter in the written data.

    var delimiterEncoder = new tsm.delimiter.Encoder("\n");
    var delimiterDecoder = new tsm.delimiter.Decoder("\n");

## Examples

See the examples.js file for basic pipe examples.

### TCP with bounce server

    require('net').createServer(function(socket) {
      socket.pipe(socket);
    }).listen(12345);

    var socket = require('net').connect(12345);
    var encoder = new tsm.length.Encoder();
    var decoder = new tsm.length.Decoder();

    encoder.pipe(socket).pipe(decoder);

    decoder.on('data', function(message){
      console.log(message.toString());
    })
    encoder.write('Hello world');
    socket.unref();
