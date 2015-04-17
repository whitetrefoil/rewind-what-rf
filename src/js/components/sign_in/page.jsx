var React = require('react');
var Reflux = require('reflux');
var SessionStore = require('../../stores/session.js');
var AccountActions = require('../../actions/account.js');

var SignInPage = React.createClass({
  mixins: [Reflux.ListenerMixin],

  handleSubmit: function(e) {
    var username = e.currentTarget.querySelector('input[name=username]').value;
    var password = e.currentTarget.querySelector('input[name=password]').value;
    AccountActions.signIn({
      username: username,
      password: password
    });
  },

  render: function() {
    return (
      <section class="page">
        <header>
          <h1>注册</h1>
          <form action="javascript:" onSubmit={this.handleSubmit}>
            <dl>
              <dt><label>用户名</label></dt>
              <dd><input type="text" name="username"/></dd>
              <dt><label>密码</label></dt>
              <dd><input type="password" name="password"/></dd>
            </dl>
            <p><button type="submit">注册</button></p>
          </form>
        </header>
      </section>
    )
  }
});

module.exports = SignInPage;
