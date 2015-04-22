var _ = require('lodash');
var React = require('react');
var Reflux = require('reflux');
var Users = require('../../stores/users');
var UserActions = require('../../actions/user')
var UserList = require('./user_list.jsx');

var UsersPage = React.createClass({
  mixins: [Reflux.listenTo(Users, 'onUsersChange')],

  onSessionChange: function() {
    // TODO
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  propTypes: {
    users: React.PropTypes.arrayOf(React.PropTypes.object)
  },

  getDefaultProps: function() {
    this.users = Users.getUsers();
  },

  componentDidMount: function() {
    UserActions.list();
  },

  onUsersChange: function(data) {
    this.replaceProps('users', data.users);
  },

  render: function() {
    return (
      <section class="page">
        <header>
          <h1>用户</h1>
          <UserList users={this.props.users}/>
        </header>
      </section>
    )
  }
});

module.exports = UsersPage;
