var room = require('./room');
var	db = require('../db');
var Room = require('../db/Room')

var GameServer = function(){};

var rooms = {
	'room1':{
		'name':'room1',
		'player':['xx','xx'],
		'status':'playing'
	}
};


GameServer.db = function(){
	return db.db;
};

GameServer.init = function(){
	console.log('游戏引擎服务器初始化');
	
}

/*
GameServer.listRoom = function(){
	Room.list(function(err,rooms,c){
		
	})
}
*/
GameServer.createRoom= function(roomName, admin){
	if(rooms[roomName]){
		return false;
	}
	var room ={
		'name': roomName,
		'player':[admin],
		'status':'empty',
		'lastUpdate':new Date()
	};
	rooms[roomName] = room;
	console.log(typeof Room);
	console.log(typeof Room.create);

	Room.create(room,function(){
		console.log('xxxx');
	})
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