var React = require('react');
var Reflux = require('reflux');
var SessionStore = require('../../stores/session.js');
var LoginActions = require('../../actions/login.js');

var LoginPage = React.createClass({
  mixins: [Reflux.ListenerMixin],

  handleSubmit: function(e) {
    var username = e.currentTarget.querySelector('input[name=username]').value;
    var password = e.currentTarget.querySelector('input[name=password]').value;
    LoginActions.logIn({
      username: username,
      password: password
    })
  },

  render: function() {
    return (
      <section class="page">
        <header>
          <h1>Login</h1>
          <form action="javascript:" onSubmit={this.handleSubmit}>
            <dl>
              <dt><label>用户名</label></dt>
              <dd><input type="text" name="username"/></dd>
              <dt><label>密码</label></dt>
              <dd><input type="password" name="password"/></dd>
            </dl>
            <p><button type="submit">登录</button></p>
          </form>
        </header>
      </section>
    )
  }
});

module.exports = LoginPage;
