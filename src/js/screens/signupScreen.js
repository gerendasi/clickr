var React = require('react'),
	ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    Link = ReactRouter.Link,
	SignupScreen = React.createClass({
	getInitialState: function() {
		return {
		}
	},
	getDefaultProps: function() {
		callback: null
	},
	render: function() {
		return (
			<div className="box">
				<div className="form-elem form-elem--email">
					<label for="loginEmail" className="form-elem__label">E-mail</label>
					<input id="loginEmail" className="form-elem__input" type="text" onChange={this.handleChange} />
				</div>
				<div className="form-elem form-elem--password">
					<label for="loginPassword" className="form-elem__label">Password</label>
					<input id="loginPassword" className="form-elem__input" type="password" onChange={this.handleChange} />
				</div>

				<div className="btn btn--submit">Signup</div>
			</div>
		)
	}
});

module.exports = SignupScreen;