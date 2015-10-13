var React = require('react'),
	ReadyScreen = React.createClass({
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
				<div className="btn btn--ready" onClick={this.props.callback}>Ready!</div>
			</div>
		)
	}
});

module.exports = ReadyScreen;