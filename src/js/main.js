var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var App = require('./components/app.jsx');
var SignInPage = require('./components/sign_in/page.jsx');

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="signIn" path="signIn" handler={SignInPage}/>
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.body);
});
