var React = require('react'),
	TheClickr = React.createClass({
	clickrClick: function() {
		console.log('CLICKRING');
		this.props.particleCore.callFunction('press', '', function(result) {
	      console.log('PRESSED ', result);
	      // Potentially have animation set up for clickr app
	    });
	},
	render: function() {
		return (
			<div className="btn-clickr" onClick={this.clickrClick}>Click</div>
		)
	}
});

module.exports = TheClickr;