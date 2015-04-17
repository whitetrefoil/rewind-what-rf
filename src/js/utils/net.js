var $ = require('jquery');
var _ = require('lodash');

var Net = {};

var DEFAULT_AJAX_OPTIONS = {
  dataType   : 'json',
  contentType: 'application/json; charset=UTF-8',
  headers: {}
};

Net.get = function get(url, options) {
  var SessionStore = require('../stores/session.js');
  options = _.extend({}, DEFAULT_AJAX_OPTIONS, options);
  options.headers.Authorization = 'Basic ' + btoa((SessionStore.getToken() || '') + ':');
  options.method = 'GET';
  return $.ajax(url, options);
};

Net.post = function post(url, data, options) {
  var SessionStore = require('../stores/session.js');
  options = _.extend({}, DEFAULT_AJAX_OPTIONS, options);
  options.data = JSON.stringify(data);
  options.headers.Authorization = 'Basic ' + btoa((SessionStore.getToken() || '') + ':');
  options.method = 'POST';
  return $.ajax(url, options);
};

Net.put = function put(url, data, options) {
  var SessionStore = require('../stores/session.js');
  options = _.extend({}, DEFAULT_AJAX_OPTIONS, options);
  options.data = JSON.stringify(data);
  options.headers.Authorization = 'Basic ' + btoa((SessionStore.getToken() || '') + ':');
  options.method = 'PUT';
  return $.ajax(url, options);
};

module.exports = Net;
