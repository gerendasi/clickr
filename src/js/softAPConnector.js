var React = require('react'),
	SoftAPSetup = require('./softapsetup'),
	config = require('./config'),
	path = require('path'),
	fs = require('browserify-fs'),
	DataStore = require('./dataStore'),

	// Screens
	ReadyScreen = require('./screens/readyScreen'),
	SSIDScreen = require('./screens/ssidScreen'),
	PasswordScreen = require('./screens/passwordScreen'),
	ConnectedScreen = require('./screens/connectedScreen'),

	SoftAPConnector = React.createClass({
		getInitialState: function() {
			return {
				message: "Loading...",
				ssids: [],
				ssid: null,
				network: null,
				particleID: null,
				step: 'loading' // loading, ready, deviceinfo, ssids, password, loggedin
			}
		},
		getDefaultProps: function() {
			return {
				softap: new SoftAPSetup({protocol: 'http', port: 80}),
				loggedIn: false
			}
		},
		componentDidMount: function() {
			if(!config.ssid) {
				console.log("* Please specify the ssid of the AP with which you wish to connect your device...");
				console.log("Example: %s %s --ssid BestWiFiNetworkEver --password SuperSecretPassword --security wpa2_mixed", process.argv[0], path.relative(process.cwd(), __filename));
			}

			this.setState({
				message: "Connect to your 'Photon_XXXX' Wi-Fi network and then click Next!",
				step: "ready"
			});
		},
		findDevice: function() {
			console.log("Obtaining device information...");

			this.setState({
				message: "Obtaining device information...",
				step: "deviceinfo"
			});

			this.props.softap.deviceInfo(this.claim);
		},
		claim: function(err, dat) {
			console.log(dat); // {id: id, claimed: whether it is claimed}
			console.log("-------");
			console.log("Obtained device information. Setting claim code...");

			if (dat.id) {
				this.setState({
					message: "Obtained device information. Setting claim code...",
					particleID: dat.id.toLowerCase()
				});

				this.props.softap.setClaimCode("wat", this.key);
			} else {
				console.log('No device detected');
			}
		},
		key: function(err, dat) {
			if (err) { throw err; }
			console.log(dat);
			console.log("-------");
			console.log("Requesting public key...");

			this.setState({
				message: "Requesting public key..."
			});

			this.props.softap.publicKey(this.scan);
		},
		scan: function(err, dat) {
			if(err) { throw err; }
			console.log(dat);
			console.log("-------");
			console.log("Received public key. Scanning for APs...");

			this.setState({
				message: "Received public key. Scanning for APs..."
			});

			this.props.softap.scan(this.configure);
		},
		configure: function(err, dat) {
			if(err) { throw err; }
			console.log(dat);
			console.log("-------");
			console.log("Scanned APs. Configuring device...");

			this.setState({
				message: "Scanned APs. Configuring device...",
				step: "ssids"
			});

			if (!config.ssid && !this.state.ssid) {
				this.setState({
					ssids: dat.scans,
					step: "ssids"
				});
			} else if (config.ssid) {
				this.setState({
					ssid: config.ssid,
					step: "ssids"
				});

				this.configureToSSID(this.state.ssid);
			} else {
				this.setState({
					message: "Choose your SSID",
					step: "ssids"
				});
			}
		},
		connect: function(err, dat) {
			if(err) { throw err; }
			console.log("Configured device. Issuing connect request...");
			console.log(dat);

			this.setState({
				message: "Configured device. Issuing connect request...",
				step: "connecting",
				ssid: dat.ssid
			});

			this.props.softap.connect(this.done);
		},
		done: function(err, dat) {
			if(err) { throw err; }
			console.log("Successfully sent connect request. Now wait for breathing cyan!");
			console.log("Data was", dat);

			DataStore.set('particleID', this.state.particleID);

			this.setState({
				message: "Successfully sent connect request. Now wait for breathing cyan! Once you've got a breathing cyan Clickr, connect this device back to your Wi-Fi.",
				step: "connected"
			});
		},
		selectNetwork: function(network) {
			console.log("Selecting network", network.ssid);
			this.setState({
				network: network,
				ssid: network.ssid,
				message: "Network of " + network.ssid + " was chosen"
			});
			console.log("Network is now", network.ssid);

			if (!config.password) {
				this.requestPassword();
			} else {
				console.log('Running configure now! ', network, config);

				this.props.softap.configure({
					ssid: network.ssid,
					channel: network.ch || config.channel || 11,
					password: config.password || undefined,
					security: network.sec || config.security || undefined
				}, this.connect);
			}
		},
		requestPassword: function() {
			this.setState({
				message: "Please enter the password for the " + this.state.ssid + " network.",
				step: "password"
			});
		},
		setPassword: function(ssid, pass) {
			console.log(ssid, pass);
			config.ssid = ssid;
			config.password = pass;

			this.selectNetwork(this.state.network);
		},
		render: function() {
			if (this.props.loggedin) {
	            return null;
	        }

	        var currentScreen;

	        switch (this.state.step) {
	        	case "ready":
	        		currentScreen = (<ReadyScreen callback={this.findDevice} />);
	        		break;
	        	case "password":
	        		currentScreen = (<PasswordScreen ssid={this.state.ssid} callback={this.setPassword} />);
	        		break;
	        	case "ssids":
	        		currentScreen = (<SSIDScreen ssids={this.state.ssids} selectNetwork={this.selectNetwork} />);
	        		break;
	        	case "connected":
	        		currentScreen = (<ConnectedScreen callback={this.findDevice} />);
	        		break;
	        }

			return (
				<div className="softap">
					<h2>Let's find your device!</h2>
					<div className="softap__message">{this.state.message}</div>
					{currentScreen}
				</div>
			)
		}
	});

module.exports = SoftAPConnector;