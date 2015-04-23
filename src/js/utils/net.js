var $ = require('jquery');
var _ = require('lodash');

var Net = {};

var API_PREFIX = '/services';

var DEFAULT_AJAX_OPTIONS = {
  dataType   : 'json',
  contentType: 'application/json; charset=UTF-8',
  headers    : {}
};

Net.get = function get(url, options) {
  var SessionStore = require('../stores/session.js');
  options = _.extend({}, DEFAULT_AJAX_OPTIONS, options);
  if (!_.isEmpty(SessionStore.getToken())) {
    options.headers['X-Token'] = btoa(SessionStore.getToken());
  }
  options.method = 'GET';
  return $.ajax(API_PREFIX + url, options);
};

Net.post = function post(url, data, options) {
  var SessionStore = require('../stores/session.js');
  options = _.extend({}, DEFAULT_AJAX_OPTIONS, options);
  options.data = JSON.stringify(data);
  if (!_.isEmpty(SessionStore.getToken())) {
    options.headers['X-Token'] = btoa(SessionStore.getToken());
  }
  options.method = 'POST';
  return $.ajax(API_PREFIX + url, options);
};

Net.put = function put(url, data, options) {
  var SessionStore = require('../stores/session.js');
  options = _.extend({}, DEFAULT_AJAX_OPTIONS, options);
  options.data = JSON.stringify(data);
  if (!_.isEmpty(SessionStore.getToken())) {
    options.headers['X-Token'] = btoa(SessionStore.getToken());
  }
  options.method = 'PUT';
  return $.ajax(API_PREFIX + url, options);
};

module.exports = Net;
