var React = require('react'),
	SoftAPConnector = require('../softAPConnector'),

	SoftAPScreen = React.createClass({
		getInitialState: function() {
			return {
			}
		},
		getDefaultProps: function() {
		},
		render: function() {
			return (
				<div>
					<SoftAPConnector />
				</div>
			)
		}
	});

module.exports = SoftAPScreen;