var React = require('react'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    Link = ReactRouter.Link;

var DataStore = require('./dataStore'),

    LoginScreen = require('./screens/loginScreen'),
    SignupScreen = require('./screens/signupScreen'),
    SoftAPScreen = require('./screens/softapScreen'),
    NoMatchScreen = require('./screens/noMatchScreen'),
    ClickrScreen = require('./screens/clickrScreen'),

    Menu = require('./menu');

var App = React.createClass({
  render: function() {
    var recognised = DataStore.get('particleID') ? (<Link to="/clickr" className="btn btn--connect" onClick={this.toggleMenu}>Welcome back! Visit your Clickr.</Link>) : (<Link to="/connect" className="btn btn--connect" onClick={this.toggleMenu}>Connect</Link>);

    return (
      <div>
        <div className="navigator">
          <h1 className="navigator__heading">Clickr</h1>

          <Menu />
        </div>
        <div className="viewer">
          {this.props.children || recognised}
        </div>
      </div>
    )
  }
});

React.render((
  <Router>
    <Route path="/" component={App}>
      <Route path="login" component={LoginScreen}/>
      <Route path="signup" component={SignupScreen}/>
      <Route path="connect" component={SoftAPScreen}/>
      <Route path="clickr" component={ClickrScreen}/>
      <Route path="*" component={NoMatchScreen}/>
    </Route>
  </Router>
), document.getElementById('app'));