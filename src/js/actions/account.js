var Reflux = require('reflux');

var AccountActions = Reflux.createActions({
  'signIn': { asyncResult: true },
  'logIn': { asyncResult: true },
  'logOut': { asyncResult: true }
});

module.exports = AccountActions;
