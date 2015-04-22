var React = require('react');
var Reflux = require('reflux');

var UserListItem = React.createClass({
  propTypes: {
    user: React.PropTypes.object
  },

  render: function() {
    return (
      <tr>
        <td>{this.props.user.name}</td>
        <td>{this.props.user.bio}</td>
      </tr>
    )
  }
});

module.exports = UserListItem;
