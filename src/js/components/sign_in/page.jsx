var _ = require('lodash');
var React = require('react');
var Reflux = require('reflux');
var SessionStore = require('../../stores/session');
var AccountActions = require('../../actions/account');

var SignInPage = React.createClass({
  mixins: [Reflux.listenTo(SessionStore, 'onSessionChange')],

  onSessionChange: function(data) {
    if (!_.isEmpty(data.token)) {
      this.context.router.transitionTo('/users');
    }
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  handleSubmit: function(e) {
    var username = e.currentTarget.querySelector('input[name=username]').value;
    var password = e.currentTarget.querySelector('input[name=password]').value;
    var password2 = e.currentTarget.querySelector('input[name=password2]').value;
    var bio = e.currentTarget.querySelector('textarea[name=bio]').value;
    if (username !== '' && password !== '' && password === password2) {
      AccountActions.signIn({
        username: username,
        password: password,
        bio     : bio
      });
    }
    e.preventDefault();
    e.stopPropagation();
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
              <dt><label>再次确认</label></dt>
              <dd><input type="password" name="password2"/></dd>
              <dt><label>简介</label></dt>
              <dd><textarea name="bio"/></dd>
            </dl>
            <p>
              <button type="submit">注册</button>
            </p>
          </form>
        </header>
      </section>
    )
  }
});

module.exports = SignInPage;
