var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var App = require('./components/app.jsx');
var SignInPage = require('./components/sign_in/page.jsx');
var LogInPage = require('./components/log_in/page.jsx');
var UsersPage = require('./components/users/page.jsx');

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="signIn" path="sign-in" handler={SignInPage}/>
    <Route name="logIn" path="log-in" handler={LogInPage}/>
    <Route name="users" path="users" handler={UsersPage}/>
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.body);
});
