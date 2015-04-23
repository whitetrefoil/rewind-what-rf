var React = require('react');
var RouteHandler = require('react-router').RouteHandler;

var App = React.createClass({
  render: function() {
    return (
      <div id="app">
        <header>
          <h1>Rewind WHAT???</h1>
        </header>
        <div id="app-content">
          <RouteHandler/>
        </div>
      </div>
    )
  }
});

module.exports = App;
