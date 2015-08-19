var particle = require('spark'),
    $ = require('jquery'),
    React = require('react'),
    DEVICE_ID = '54ff75066678574940470767',
    ACCESS_TOKEN = '9c0f99363411f0fd2c650ce1bbd8c0a5a3d4cd2e',
    refreshInterval = 1500,
    timeDownConversion = 1000;

var TheClickr = require('./theClickr'),
    ClickrSlider = require('./clickrSlider'),
    ClickrSeconds = require('./clickrSeconds');

var ClickrView = React.createClass({
  getInitialState: function() {
    return {
      startPos: 0,
      clickPos: 180,
      timeDown: 1,
      particleCore: {}
    }
  },
  componentDidMount: function() {
    var self = this;
    particle.on('login', function(err, body) {
      console.log('Particle Core login callback successful: ', body);
      
      particle.getDevice(DEVICE_ID, function(err, device) {
        self.setState({particleCore: device});
        self.getClickrValues();
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
    var values = this.state.startPos+','+this.state.clickPos+','+this.state.timeDown*timeDownConversion+',';

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
    var self = this;

    this.state.particleCore.getVariable('settings', function(err, data) {
      console.log('Settings ', data);
      var values = data.result.split(',');

      self.setState({
        startPos: values[0]
      });
      self.setState({
        clickPos: values[1]
      });
      self.setState({
        timeDown: values[2] / timeDownConversion
      });
    });
    /*this.state.particleCore.getVariable('startPos', function(err, data) {
      console.log('Start ', data);
    });
    this.state.particleCore.getVariable('clickPos', function(err, data) {
      console.log('Click ', data);
    });
    this.state.particleCore.getVariable('timeDown', function(err, data) {
      console.log('Time Down ', data);
    });*/
  },
  render: function() {
    return (
      <div>
        <TheClickr startPos={this.state.startPos} clickPos={this.state.clickPos} timeDown={this.state.timeDown} particleCore={this.state.particleCore} />

        <div className="box">
          <h2 className="title">Starting position</h2>
          <ClickrSlider max="180" value={this.state.startPos} whenChanged={this.handleStartPosChange} />
        </div>

        <div className="box">
          <h2 className="title">Clicked position</h2>
          <ClickrSlider max="180" value={this.state.clickPos} whenChanged={this.handleClickPosChange} />
        </div>

        <div className="box">
          <h2 className="title">Time pressed</h2>
          <ClickrSeconds value={this.state.timeDown} whenChanged={this.handleTimeDownChange} />
        </div>

        <div className="btn btn--submit" onClick={this.sendNewSettings}>Update options</div>

        <div className="btn btn--get-values" onClick={this.getClickrValues}>Get Clickr Values</div>
      </div>
    )
  }
});

React.render(<ClickrView />, document.getElementById('app'));
