var _ = require('lodash');
var Reflux = require('reflux');
var LoginActions = require('../actions/login.js');
var Net = require('../utils/net.js');
var encrypt = require('../utils/encrypt.js');

var SessionStore = Reflux.createStore({
  listenables: LoginActions,

  init: function() {
    this.token = null;
  },

  onLogIn: function(data) {
    var str = data.username.trim() + '|' + data.password;
    return Net.get('/services/login').then(function(res) {
      var encrypted = encrypt(str, res.n, res.e);
      return Net.post('/services/login', encrypted);
    });
  },

  onLogInCompleted: function() {
    console.log(arguments);
  },

  onLogInFailed: function() {
    console.log(arguments);
  }
});


module.exports = SessionStore;
