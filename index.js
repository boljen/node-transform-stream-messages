module.exports = {
  length: {
    Encoder: require('./lib/length/Encoder.js'),
    Decoder: require('./lib/length/Decoder.js'),
  },
  delimiter: {
    Encoder: require('./lib/delimiter/Encoder.js'),
    Decoder: require('./lib/delimiter/Decoder.js'),
  }
}
