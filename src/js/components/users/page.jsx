var _ = require('lodash');
var React = require('react');
var Reflux = require('reflux');
var Users = require('../../stores/users');
var UserActions = require('../../actions/user');
var UserList = require('./user_list.jsx');

var UsersPage = React.createClass({
  mixins: [Reflux.listenTo(Users, 'onUsersChange')],

  onSessionChange: function() {
    // TODO
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      users: []
    }
  },

  componentDidMount: function() {
    UserActions.list();
  },

  onUsersChange: function(data) {
    this.setState({ users: data.users.items });
  },

  render: function() {
    return (
      <section className="page">
        <header>
          <h1>用户</h1>
        </header>
        <UserList users={this.state.users}/>
      </section>
    )
  }
});

module.exports = UsersPage;
