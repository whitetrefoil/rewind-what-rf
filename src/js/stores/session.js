var _ = require('lodash');
var Reflux = require('reflux');
var cookie = require('cookie-monster');
var LoginActions = require('../actions/account');
var encrypt = require('../utils/encrypt');
var logger = require('../utils/logger');

var Session = Reflux.createStore({
  listenables: LoginActions,

  init: function() {
    var tokenInCookie = cookie.get('token');
    this.data = {
      token: tokenInCookie == null ? null : atob(tokenInCookie)
    };
  },

  getToken: function() {
    return this.data.token;
  },

  onRequestKeyCompleted: function(key) {
    logger.log('Got key successfully.');
    this.key = key;
  },

  onRequestKeyFailed: function(jqXHR) {
    logger.error('Failed to get key!');
    if (jqXHR.responseJSON != null) {
      logger.error(jqXHR.responseJSON.code, ':', jqXHR.responseJSON.message)
    }
  },

  onSignInCompleted: function() {
    logger.log('Signed-in successfully.');
  },

  onSignInFailed: function(jqXHR) {
    logger.error('Failed to sign-in!');
    if (jqXHR.responseJSON != null) {
      logger.error(jqXHR.responseJSON.code, ':', jqXHR.responseJSON.message)
    }
  },

  onLogInCompleted: function(tokenObj) {
    logger.log('Logged-in successfully.');
    this.data.token = tokenObj.token;
    cookie.set('token', btoa(tokenObj.token));
    this.trigger(this.data);
  },

  onLogInFailed: function(jqXHR) {
    logger.error('Failed to log-in!');
    if (jqXHR.responseJSON != null) {
      logger.error(jqXHR.responseJSON.code, ':', jqXHR.responseJSON.message)
    }
  }
});


module.exports = Session;
