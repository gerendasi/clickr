var React = require('react'),
	SSIDOption = React.createClass({
		getDefaultProps: function() {
			return {
				network: null,
				chooseSSID: null
			}
		},
		render: function() {
			return (
				<div className="ssids__ssid" onClick={this.props.chooseSSID.bind(this, this.props.network)}>{this.props.network.ssid}</div>
			)
		}
	});

module.exports = SSIDOption;