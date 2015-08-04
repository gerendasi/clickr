var particle = require('spark'),
    $ = require('jquery'),
    React = require('react'),
    DEVICE_ID = '54ff75066678574940470767',
    ACCESS_TOKEN = '9c0f99363411f0fd2c650ce1bbd8c0a5a3d4cd2e',
    refreshInterval = 1500;

var TheClickr = require('./theClickr');

var ClickrView = React.createClass({
  getInitialState: function() {
    return {
      startPos: 0,
      clickPos: 180,
      timeDown: 1000,
      particleCore: {}
    }
  },
  componentDidMount: function() {
    var self = this;
    particle.on('login', function(err, body) {
      console.log('Particle Core login callback successful: ', body);
      
      particle.getDevice(DEVICE_ID, function(err, device) {
        self.setState({particleCore: device});
        console.log('Particle Core device found: ', device);
      });
    });

    particle.login({
      accessToken: ACCESS_TOKEN
    }, function(err, body) {
      if (!err) console.log('Particle API login successful');
    });
  },
  sendNewSettings: function() {
    var values = this.state.startPos+','+this.state.clickPos+','+this.state.timeDown+',';

    this.state.particleCore.callFunction('settings', values, function(result) {
        console.log('Settings changing to ', values);
    });
  },
  handleStartPosChange: function(e) {
    var newPos = e.target.value,
        values;

    this.setState({
      startPos: newPos
    });

    //this.sendNewSettings();
  },
  handleClickPosChange: function(e) {
    var newPos = e.target.value;
    this.setState({
      clickPos: e.target.value
    });

    //this.sendNewSettings();
  },
  handleTimeDownChange: function(e) {
    var newTime = e.target.value;
    this.setState({
      timeDown: e.target.value
    });

    console.log('Timedown changed to ', e.target.value, this.state.timeDown);

    //this.sendNewSettings();
  },
  getClickrValues: function() {
    this.state.particleCore.getVariable('timeDown', function(err, data) {
      console.log(data);
    });
  },
  render: function() {
    return (
      <div>
        <TheClickr startPos={this.state.startPos} clickPos={this.state.clickPos} timeDown={this.state.timeDown} particleCore={this.state.particleCore} />

        <input type="text" value={this.state.startPos} onChange={this.handleStartPosChange} />
        <input type="text" value={this.state.clickPos} onChange={this.handleClickPosChange} />
        <input type="text" value={this.state.timeDown} onChange={this.handleTimeDownChange} />

        <div className="btn-submit" onClick={this.sendNewSettings}>Update options</div>

        <div onClick={this.getClickrValues}>Get Clickr Values</div>
      </div>
    )
  }
});

React.render(<ClickrView />, document.getElementById('app'));
