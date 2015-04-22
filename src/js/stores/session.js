var _ = require('lodash');
var Reflux = require('reflux');
var LoginActions = require('../actions/account');
var encrypt = require('../utils/encrypt');
var logger = require('../utils/logger');

var Session = Reflux.createStore({
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
    this.data.tokenObj = tokenObj;
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
