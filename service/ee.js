var EventEmitter = require('events').EventEmitter;

var emitter = new EventEmitter();



exports.on = function(e, callback) {
	console.log("订阅事件:"+e);
	emitter.on(e, callback);
};

exports.emit = function(e, data) {
	console.log("触发事件:"+e);
	emitter.emit(e, data);

};


exports.SERVER_START='server.start';
exports.SERVER_READY='server.ready';
exports.USER_LOGIN='user.login';
exports.ROOM_CREATE='room.create';
exports.ROOM_JOIN='room.join';
exports.GAME_START='game.start';
exports.GAME_OVER='game.over';
exports.DB_OPEN='db.open';
exports.DB_OPENED='db.opened';
exports.DB_ERROR='db.error';