var _ = require('lodash');
var React = require('react');
var Reflux = require('reflux');
var SessionStore = require('../../stores/session');

var UsersPage = React.createClass({
  mixins: [Reflux.listenTo(SessionStore, 'onSessionChange')],

  onSessionChange: function() {
    // TODO
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  render: function() {
    return (
      <section class="page">
        <header>
          <h1>用户</h1>
        </header>
      </section>
    )
  }
});

module.exports = UsersPage;
