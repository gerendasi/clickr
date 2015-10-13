var React = require('react'),
	ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    Link = ReactRouter.Link,
	ConnectedScreen = React.createClass({
	getInitialState: function() {
		return {
		}
	},
	getDefaultProps: function() {
		callback: null
	},
	render: function() {
		return (
			<div>
				<Link className="btn btn--connected" to="/clickr">Get Started!</Link>
			</div>
		)
	}
});

module.exports = ConnectedScreen;