var tsm = require('./');


var delimiterEncoder = new tsm.delimiter.Encoder("\n");
var delimiterDecoder = new tsm.delimiter.Decoder("\n");
delimiterEncoder.pipe(delimiterDecoder);
delimiterDecoder.on('data', function(d) {
  console.log(d.toString());
})
delimiterEncoder.write('\n\nHello world!\n');



var lengthEncoder = new tsm.length.Encoder();
var lengthDecoder = new tsm.length.Decoder();
lengthEncoder.pipe(lengthDecoder);
lengthDecoder.on('data', function(d) {
  console.log(d.toString());
})
lengthEncoder.write('Hello world!');


var server = require('net').createServer(function(socket) {
  socket.pipe(socket);
  socket.unref();
});
server.listen(12345);
server.unref();

var socket = require('net').connect(12345);
var encoder = new tsm.length.Encoder();
var decoder = new tsm.length.Decoder();
encoder.pipe(socket).pipe(decoder);

decoder.on('data', function(message){
  console.log(message.toString());
})
encoder.write('\nHello world TCP');
socket.unref();
