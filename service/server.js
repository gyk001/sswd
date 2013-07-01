var room = require('./room');

var GameServer = function(){};

var rooms = {
	'room1':{
		'name':'room1',
		'player':['xx','xx'],
		'status':'playing'
	}
};

GameServer.init = function(){
	console.log('游戏引擎服务器初始化');
}

GameServer.createRoom= function(roomName){
	if(rooms[roomName]){
		return false;
	}
	rooms[roomName]={
		'name': roomName,
		'player':[],
		'status':'empty'
	};
	return rooms[roomName];
};

GameServer.joinRoom= function(user,roomName){
	if(user && room){
		rooms[rootName].player.push(user);
		return true
	}else{
		return false;
	}
}


exports.init=GameServer.init;
exports.rooms=rooms;
exports.createRoom=GameServer.createRoom;