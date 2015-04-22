var _ = require('lodash');
var React = require('react');
var Reflux = require('reflux');
var UserListItem = require('./user_list_item.jsx');

var UserList = React.createClass({
  propTypes: {
    users: React.PropTypes.arrayOf(React.PropTypes.object)
  },

  render: function() {
    var items = _.map(this.props.users, function(user) {
      return <UserListItem user={user}/>
    });

    return (
      <table>
        {items}
      </table>
    )
  }
});

module.exports = UserList;
