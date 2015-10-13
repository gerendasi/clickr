var React = require('react'),
	SSIDOption = require('../ssidOption'),
	PasswordScreen = React.createClass({
	getInitialState: function() {
		return {
			pass: null
		}
	},
	getDefaultProps: function() {
		return {
			ssid: null,
			callback: null
		}
	},
	handleChange: function(e) {
		e.preventDefault();

		var val = e.target.value;
		this.setState({
			pass: val
		});
	},
	render: function() {
		return (
			<div className="screen screen--password">
				<div className="form-elem form-elem--password">
					<p>{this.props.ssid}</p>
					<input className="form-elem__input" type="password" onChange={this.handleChange} />
				</div>

				<div className="btn btn--submit" onClick={this.props.callback.bind(this, this.props.ssid, this.state.pass)}>Connect</div>
			</div>
		)
	}
});

module.exports = PasswordScreen;