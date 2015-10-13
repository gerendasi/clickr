var React = require('react'),
	ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    Link = ReactRouter.Link,
	DataStore = require('../dataStore'),
	WelcomeScreen = React.createClass({
	getInitialState: function() {
		return {
		}
	},
	getDefaultProps: function() {
	},
	render: function() {
		var recognised = DataStore.get('particleID') ? (<Link to="/clickr" className="btn btn--connect" onClick={this.toggleMenu}>Welcome back! Visit your Clickr.</Link>) : (<Link to="/connect" className="btn btn--connect" onClick={this.toggleMenu}>Connect</Link>);
		return (
			<div>
				{recognised}
			</div>
		)
	}
});

module.exports = WelcomeScreen;