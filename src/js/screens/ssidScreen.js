var React = require('react'),
	SSIDOption = require('../ssidOption'),
	SSIDScreen = React.createClass({
	getInitialState: function() {
		return {
			inputVisible: false
		}
	},
	getDefaultProps: function() {
		return {
			ssids: [],
			selectNetwork: null
		}
	},
	render: function() {
		var ssids = this.props.ssids.map(function (network) {
            return (
            	<SSIDOption network={network} chooseSSID={this.props.selectNetwork} />
            );
        }, this);
		return (
			<div className="screen screen--ssid softap__ssids">
				<div className="ssids">{ssids}</div>
			</div>
		)
	}
});

module.exports = SSIDScreen;