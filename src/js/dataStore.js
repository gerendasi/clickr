var DataStore = {
	key: "clickr.app.",
	get: function(data) {
		if (DataStore.supports_html5_storage()) {
			console.log('Getting ', DataStore.key+data, '...', localStorage[DataStore.key+data]);
			return localStorage[DataStore.key+data];
		}
	},
	getObject: function(data) {
		if (DataStore.supports_html5_storage()) {
			console.log('Getting ', DataStore.key+data, '...', JSON.parse(localStorage[DataStore.key+data]));
			return JSON.parse(localStorage[DataStore.key+data]);
		}
	},
	set: function(data, value) {
		if (DataStore.supports_html5_storage()) {
			localStorage[DataStore.key+data] = value;
			console.log('Storing ', DataStore.key+data, value);
			return localStorage[DataStore.key+data];
		}
	},
	setObject: function(data, value) {
		if (DataStore.supports_html5_storage()) {
			localStorage[DataStore.key+data] = JSON.stringify(value);
			return localStorage[DataStore.key+data];
		}
	},
	supports_html5_storage: function() {
		try {
			return 'localStorage' in window && window['localStorage'] !== null;
		} catch (e) {
			return false;
		}
	}
};

module.exports = DataStore;