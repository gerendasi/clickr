var particle = require('spark'),
    $ = require('jquery'),
    DEVICE_ID = '55ff6a065075555341101787',
    ACCESS_TOKEN = '9c0f99363411f0fd2c650ce1bbd8c0a5a3d4cd2e',
    refreshInterval = 1500;

var clickr = {
  init: function() {
    clickr.initParticle();
    clickr.initPosControl();
  },
  initParticle: function() {
    particle.on('login', function(err, body) {
      console.log('Particle Core login callback successful: ', body);
      var deviceList = particle.listDevices();

      deviceList.then(function(devices) {
        particleCore = devices[0];
        console.log('Particle Core device list found: ', devices);

        clickr.pollClickrPos();
      });
    });

    particle.login({
      accessToken: ACCESS_TOKEN
    }, function(err, body) {
      if (!err) console.log('Particle API login successful');
    });
  },
  initPosControl: function() {
    $('#plusbutton').on('click', function() {
      clickr.setClickrPos('8');
      clickr.sleep(320);
    });
    // TODO: Initialising the position control here
  },
  pollClickrPos: function() {
    window.setInterval(function() {
      particleCore.getVariable('position', function(err, data) {
        console.log('Received position ', data.result);

        document.getElementById("curPos").innerHTML = data.result + "&deg;";
        document.getElementById("curPos").style.fontSize = "2vmax";
      });
    }, refreshInterval);
  },
  setClickrPos: function(newPos) {
    particleCore.callFunction('setPos', newPos, function(result) {
      console.log('Moved Clickr to ', newPos);
      //document.getElementById("degBoxId").value = newPos;
    });
  },
  moveClickrPos: function(amount) {
    var currentValue = parseInt(document.getElementById('curPos').innerHTML),
        newValue = amount + currentValue;

    clickr.setClickrPos(newValue);
    document.getElementById("degBoxId").value = newValue;
  },
  sleep: function(ms) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > ms) {
            break;
        }
    }

    clickr.setClickrPos(35);
  }
};

(function($) {
  console.log('Working');
  clickr.init();
}($));
