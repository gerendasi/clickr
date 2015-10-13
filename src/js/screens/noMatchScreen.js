var React = require('react'),
	NoMatchScreen = React.createClass({
	getInitialState: function() {
		return {
		}
	},
	getDefaultProps: function() {
	},
	render: function() {
		return (
			<div>
				404!
			</div>
		)
	}
});

module.exports = NoMatchScreen;