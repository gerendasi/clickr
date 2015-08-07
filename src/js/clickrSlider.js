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
			<div className="form-elem form-elem--slider">
				<input
					type="range"
					value={this.props.value}
					min={this.props.min}
					max={this.props.max}
					onChange={this.props.whenChanged}
					step={this.props.step} />
				<input type="text" value={this.props.value} onChange={this.props.whenChanged} />
			</div>
		)
	}
});

module.exports = ClickrSlider;