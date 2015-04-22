var Reflux = require('reflux');
var Net = require('../utils/net.js');


var UserActions = Reflux.createActions({
  'list'      : { asyncResult: true },
  'get'       : { asyncResult: true },
  'create'    : { asyncResult: true },
  'modify'    : { asyncResult: true },
  'inactivate': { asyncResult: true }
});

UserActions.list.listenAndPromise(function() {
  return Net.get('/users');
});


module.exports = UserActions;
