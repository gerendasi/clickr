var React = require('react'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    Link = ReactRouter.Link;

var DataStore = require('./dataStore'),

    WelcomeScreen = require('./screens/welcomeScreen'),
    SoftAPScreen = require('./screens/softapScreen'),
    NoMatchScreen = require('./screens/noMatchScreen'),
    ClickrScreen = require('./screens/clickrScreen'),

    Menu = require('./menu');

var App = React.createClass({
  render: function() {
    return (
      <div>
        <div className="navigator">
          <h1 className="navigator__heading">Clickr</h1>

          <Menu />
        </div>
        <div className="viewer">
          {this.props.children}
        </div>
      </div>
    )
  }
});

React.render((
  <Router>
    <Route path="/" component={App}>
      <Route path="welcome" component={WelcomeScreen}/>
      <Route path="connect" component={SoftAPScreen}/>
      <Route path="clickr" component={ClickrScreen}/>
      <Route path="*" component={NoMatchScreen}/>
    </Route>
  </Router>
), document.getElementById('app'));