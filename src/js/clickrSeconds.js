var React = require('react'),
	ClickrSlider = React.createClass({
	getDefaultProps: function() {
		return {
			value: 0,
			min: 0,
			max: 100,
			whenChanged: function() {console.log('No function set for slider!')},
			step: 1
		}
	},
	render: function() {
		return (
			<div className="form-elem form-elem--seconds">
				<input type="text" value={this.props.value} onChange={this.props.whenChanged} />
			</div>
		)
	}
});

module.exports = ClickrSlider;