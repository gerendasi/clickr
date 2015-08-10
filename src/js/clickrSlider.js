var React = require('react'),
	ClickrSlider = React.createClass({
	getInitialState: function() {
		return {
			inputVisible: false
		}
	},
	getDefaultProps: function() {
		return {
			value: 0,
			min: 0,
			max: 100,
			whenChanged: function() {console.log('No function set for slider!')},
			step: 1
		}
	},
	closeInput: function() {
		this.setState({
	      inputVisible: false
	    });
	},
	openInput: function() {
		this.setState({
	      inputVisible: true
	    });
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

				<div className={!this.state.inputVisible ? "form-elem__currentLabel is-visible" : "form-elem__currentLabel is-hidden"} onClick={this.openInput}>{this.props.value}</div>
				<input className={this.state.inputVisible ? "form-elem__editField is-visible" : "form-elem__editField is-hidden"} type="text" value={this.props.value} onChange={this.props.whenChanged} onBlur={this.closeInput} />
			</div>
		)
	}
});

module.exports = ClickrSlider;