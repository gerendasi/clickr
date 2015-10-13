var React = require('react'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    Link = ReactRouter.Link,

  	Menu = React.createClass({
      getInitialState: function() {
        return {
          visible: false
        }
      },
      toggleMenu: function() {
        this.setState({
          visible: !this.state.visible
        });
      },
  		render: function() {
  			return (
  				<div className="menu">
            <div className="menu__toggle" onClick={this.toggleMenu}>MENU</div>
            <div className={this.state.visible ? "menu__links is-visible" : "menu__links is-hidden"}>
              <ul>
                <li><Link to="/welcome" onClick={this.toggleMenu}>Welcome</Link></li>
                <li><Link to="/clickr" onClick={this.toggleMenu}>Clickr</Link></li>
                <li><Link to="/connect" onClick={this.toggleMenu}>Connect</Link></li>
              </ul>
            </div>
          </div>
  			)
  		}
  	});

module.exports = Menu;