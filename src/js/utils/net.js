var $ = require('jquery');
var _ = require('lodash');
var SessionStore = require('../stores/session.js');

var Net = {};

var DEFAULT_AJAX_OPTIONS = {
  dataType: 'json',
  contentType: 'application/json; charset=UTF-8'
};

Net.get = function get(url, options) {
  options = _.extend({}, DEFAULT_AJAX_OPTIONS, options);
  options.username = SessionStore.token || void 0;
  options.method = 'GET';
  return $.ajax(url, options);
};

Net.post = function post(url, data, options) {
  options = _.extend({}, DEFAULT_AJAX_OPTIONS, options);
  options.data = JSON.stringify(data);
  options.username = SessionStore.token || void 0;
  options.method = 'POST';
  return $.ajax(url, options);
};

module.exports = Net;
