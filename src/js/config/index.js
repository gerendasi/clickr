var config = {
	"host": "192.168.0.1",
	"keep_alive": true,
	"timeout": 2000,
	"no_delay": true,
	"default_channel": 6,
	"default_protocol": "tcp",
	"available_protocols": {
		"tcp": {
			"port": "5609"
		},
		"http": {
			"port": "80"
		}
	}
}

module.exports = config;
