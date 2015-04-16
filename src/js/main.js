var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var App = require('./components/app.jsx');
var LoginPage = require('./components/login/page.jsx');

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="login" path="login" handler={LoginPage}/>
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.body);
});
