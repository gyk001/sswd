var server = require('./server');
var Room = require('../db/Room');

var list = function(con, success, fail) {
	Room.list(con, function(err, rooms) {
		if (err) {
			fail(err);
			return;
		}
		success(rooms);
		//res.render('room.jade', { rooms: rooms, abc:'abcdefg' });
	})
};

var insert = function(roomName, user, fun) {
	var room = {
		'name': roomName,
		'player': user,
		'admin': user,
		'adm': user.loginName,
		'status': 'empty',
		'lastUpdate': new Date()
	};
	console.log(room);
	Room.create(room, fun);
};

var create = function(roomName, user, success, fail) {
	try {
		Room.list({
			name: roomName
		}, function(err, rooms) {
			//console.log(err+rooms);
			if (err) {
				fail(err);
				return;
			}
			if (rooms && rooms.length > 0) {
				fail(new Error('该房间已存在！'));
				return;
			}
			console.log("创建房间");
			insert(roomName, user, function(err, room) {
				//console.log(err);
				if (err) {
					fail(err);
					return;
				}
				console.log(room);
				success(room);
				return;
			});
		});
	} catch (e) {
		fail(e);
	}

};

exports.list = list;
exports.create = create;