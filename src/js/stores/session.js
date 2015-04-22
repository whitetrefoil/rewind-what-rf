var _ = require('lodash');
var Reflux = require('reflux');
var LoginActions = require('../actions/account.js');
var encrypt = require('../utils/encrypt.js');

var SessionStore = Reflux.createStore({
  listenables: LoginActions,

  init: function() {
    this.data = {
      token   : null,
      tokenObj: null
    };
  },

  getToken: function() {
    return this.data.token;
  },

  getTokenObj: function() {
    return this.data.tokenObj;
  },

  onRequestKeyCompleted: function(key) {
    console.log('Got key successfully.');
    this.key = key;
  },

  onRequestKeyFailed: function(jqXHR) {
    console.error('Failed to get key!');
    if (jqXHR.responseJSON != null) {
      console.error(jqXHR.responseJSON.code, ':', jqXHR.responseJSON.message)
    }
  },

  onSignInCompleted: function() {
    console.log('Signed-in successfully.');
  },

  onSignInFailed: function(jqXHR) {
    console.error('Failed to sign-in!');
    if (jqXHR.responseJSON != null) {
      console.error(jqXHR.responseJSON.code, ':', jqXHR.responseJSON.message)
    }
  },

  onLogInCompleted: function(tokenObj) {
    console.log('Logged-in successfully.');
    this.data.token = tokenObj.token;
    this.data.tokenObj = tokenObj;
    this.trigger(this.data);
  },

  onLogInFailed: function(jqXHR) {
    console.error('Failed to log-in!');
    if (jqXHR.responseJSON != null) {
      console.error(jqXHR.responseJSON.code, ':', jqXHR.responseJSON.message)
    }
  }
});


module.exports = SessionStore;
