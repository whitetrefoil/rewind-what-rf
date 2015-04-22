var RSAKey = require('node-rsa');

var encrypt = function(data, key) {
  var rsa = new RSAKey();
  rsa.importKey(key, 'public');
  return rsa.encrypt(typeof data === 'string' ? data : JSON.stringify(data), 'base64');
};

module.exports = encrypt;
