module.exports = SoftAPSetup;

var config = require('./config');
var defaults = require('./config/defaults');
var softap = require('./softap');

function SoftAPSetup(opts) {

	if(opts && typeof opts == 'object') {
		Object.keys(opts).forEach(function _loadOpts(key) {
			config[key] = opts[key];
		});
	}

	var opts = {};
	opts.protocol = config.protocol;
	opts.keepAlive = config.keep_alive;
	opts.noDelay = config.no_delay;
	opts.timeout = config.timeout;

	opts.host = config.host;
	opts.port = config.port;

	if(!opts.protocol) {
		opts.protocol = config.default_protocol;
	}
	if(!opts.port) {
		opts.port = defaults.available_protocols[opts.protocol].port;
	}

	return new softap(opts);
};
