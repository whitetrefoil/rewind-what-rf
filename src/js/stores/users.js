var _ = require('lodash');
var Reflux = require('reflux');
var UserActions = require('../actions/user');
var logger = require('../utils/logger');

var Users = Reflux.createStore({
  listenables: UserActions,

  init: function() {
    this.data = {
      users: null
    };
  },

  getUsers: function() {
    return this.data.users;
  },

  getUserById: function() {
    // TODO
  },

  getUserByName: function() {
    // TODO
  },

  onListCompleted: function(users) {
    logger.log('Got user list successfully');
    this.data.users = users;
    this.trigger(this.data);
  }
});


module.exports = Users;
