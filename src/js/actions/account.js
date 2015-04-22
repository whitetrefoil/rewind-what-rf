var Reflux = require('reflux');
var Net = require('../utils/net.js');
var encrypt = require('../utils/encrypt.js');

function encryptAuthInfoAsync(name, pass) {
  var key = require('../stores/session').key;
  return new Reflux.Promise(function(resolve, reject) {
    if (key != null) {
      resolve(encrypt({ name: name, pass: pass }, key));
    } else {
      AccountActions.requestKey().then(function(key) {
        resolve(encrypt({ name: name, pass: pass }, key));
      });
    }
  });
}

var AccountActions = Reflux.createActions({
  'requestKey': { asyncResult: true },
  'signIn'    : { asyncResult: true },
  'logIn'     : { asyncResult: true },
  'logOut'    : { asyncResult: true }
});

AccountActions.requestKey.listenAndPromise(function() {
  return Net.get('/key');
});


AccountActions.signIn.listenAndPromise(function(data) {
  return encryptAuthInfoAsync(data.username, data.password).then(function(encrypted) {
    var requestBody = {
      bio : data.bio,
      auth: encrypted
    };
    return Net.post('/users', requestBody).then(function() {
      return AccountActions.logIn(encrypted);
    });
  })
});


AccountActions.logIn.listenAndPromise(function(name, pass) {
  if (pass == null) {
    return Net.post('/login', name);
  } else {
    return encryptAuthInfoAsync(name, pass).then(function(encrypted) {
      return Net.post('/login', encrypted);
    });
  }
});


module.exports = AccountActions;
