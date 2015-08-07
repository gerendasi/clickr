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
			<div className="the-clickr">
				<div className="the-clickr__btn btn btn--clickr" onClick={this.clickrClick}>Click</div>
			</div>
		)
	}
});

module.exports = TheClickr;