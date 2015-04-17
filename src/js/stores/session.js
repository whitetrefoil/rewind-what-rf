var _ = require('lodash');
var Reflux = require('reflux');
var LoginActions = require('../actions/account.js');
var Net = require('../utils/net.js');
var encrypt = require('../utils/encrypt.js');

var SessionStore = Reflux.createStore({
  listenables: LoginActions,

  init: function() {
    this.token = null;
  },

  getToken: function() {
    return this.token;
  },

  onSignIn: function(data) {
    var session = this;
    return Net.post('/services/users', { name: data.username }).then(function(res) {
      var id = res['_id'];
      session.token = res.token;
      return Net.put('/services/accounts/' + id, { user: id, password: data.password });
    }, function(jqXHR) {
      try {
        var res = jqXHR.responseJSON;
        console.error('Error:', res._error.code);
        console.error(res._error.message);
        _.forEach(res._issues, function(issue) {
          console.error(issue);
        })
      } catch(e) {}
    });
  },

  onSignInCompleted:  function() {
    console.log(arguments);
  },

  onSignInFailed:  function() {
    console.log(arguments);
  },

  onLogIn: function(data) {
    var str = data.username.trim() + '|' + data.password;
    return Net.get('/services/login').then(function(res) {
      var encrypted = encrypt(str, res.n.replace(/^0x/, ''), res.e.replace(/^0x/, ''));
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
