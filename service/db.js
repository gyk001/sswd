var mongoose = require('mongoose');
var db = require('../settings.json').db;
var ee = require('./ee');

var opened = false;
//console.log(conn);
var opts = {
	server: {
		auto_reconnect: true
	},
	user: db.username,
	pass: db.password
};
var conn = mongoose.createConnection();
conn.open(db.host, db.db, db.port, opts);
conn.on('connected', function() {
	ee.emit(ee.DB_OPENED);
	opened = true;
});
conn.on('error', function(e) {
	ee.emit(ee.DB_ERROR, e);
});
conn.on('disconnected', function() {
	console.log('数据库连接中断');
});

var open = function() {
	if (!opened) {
		var url = 'mongodb://' + db.host + '/' + db.db
		mongoose.connect(url);
	}
};

ee.on(ee.DB_OPEN, open);