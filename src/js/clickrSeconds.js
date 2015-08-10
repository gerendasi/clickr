var React = require('react'),
	ClickrSeconds = React.createClass({
	getDefaultProps: function() {
		return {
			value: 0,
			whenChanged: function() {console.log('No function set for slider!')}
		}
	},
	render: function() {
		return (
			<div className="form-elem form-elem--seconds">
				<input className="form-elem__input" type="text" value={this.props.value} onChange={this.props.whenChanged} />
				<div className="form-elem__help-text">(seconds)</div>
			</div>
		)
	}
});

module.exports = ClickrSeconds;