var ee = require('./ee');
var room = require('./room');
var db = require('./db');
var Room = require('../db/Room');


var startTime = new Date();

var start=function(){
	ee.emit(ee.DB_OPEN);
};
// 
ee.on(ee.SERVER_START, start);
// 
ee.on(ee.DB_OPENED,function(){
	ee.emit(ee.SERVER_READY);
});

ee.on(ee.DB_ERROR,function(){
	console.log('数据库连接异常，准备重连');
});
// 
ee.on(ee.SERVER_READY, function() {
	console.log('服务器已初始化!');
});






var GameServer = function() {};
/*
GameServer.init = function() {
	ee.emit(ee.SERVER_START);
//	ee.
	ee.emit(ee.SERVER_READY);
};
*/



GameServer.db = function() {
	return db.db;
};

GameServer.createRoom = function(roomName, admin) {
	if (rooms[roomName]) {
		return false;
	}
	var room = {
		'name': roomName,
		'player': [admin],
		'status': 'empty',
		'lastUpdate': new Date()
	};
	rooms[roomName] = room;
	console.log(typeof Room);
	console.log(typeof Room.create);

	Room.create(room, function() {
		console.log('xxxx');
	})
	return rooms[roomName];
};

GameServer.joinRoom = function(user, roomName) {
	if (user && room) {
		rooms[rootName].player.push(user);
		return true
	} else {
		return false;
	}
}


//exports.init = GameServer.init;
exports.createRoom = GameServer.createRoom;
exports.startTime = startTime;