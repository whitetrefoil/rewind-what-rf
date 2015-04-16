var Reflux = require('reflux');

var LoginActions = Reflux.createActions({
  'logIn': { asyncResult: true },
  'logOut': { asyncResult: true }
});

module.exports = LoginActions;
