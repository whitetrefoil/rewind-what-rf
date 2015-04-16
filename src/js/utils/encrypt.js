var RSAKey = require('./rsa.js');

var encrypt = function(data, n, e) {
  e || (e = '10001');

  var rsa = new RSAKey();
  rsa.setPublic(n, e);
  return rsa.encrypt(data);
};

module.exports = encrypt;
