var server = require('../service/server');
var roomService = require('../service/room');
var Room = require('../db/Room');
var jade = require('jade');
var fs = require("fs");


exports.list = function(req, res){
	roomService.list({}, function(rooms){
		res.render('room.jade', { rooms: rooms, abc:'abcdefg' });
	},function(err){
		res.render('err.jad',err);
	});
};

exports.my = function(req, res){
	var user = user;
	Room.list({},function(err,rooms){
        if(err){
          throw new Error('获取房间列表异常',err);
        }
  		res.render('room.jade', { rooms: rooms, abc:'abcdefg' });
    })
};

exports.join = function(req,res){
	var roomName = req.params.roomName;
	var user = req.session.user;
	if(!user){
		req.session.destroy(function(){
	    	res.redirect('/');
	 	});
	}else{
		server.joinRoom(user,roomName);
	}
	res.json({name:roomName,success:true});
};

var roomTpl = jade.compile(fs.readFileSync("./views/snippets/room.jade", "utf8"));


exports.create = function(req,res){
	var roomName = req.params.roomName;
	console.log('尝试创建房间'+roomName);
	var admin = req.session.user;
	var room = roomService.create(roomName, admin, function(room){
		console.log(room);
		//console.log(roomTpl({room:room}));
		res.render('snippets/room.jade', {room:room});
	},function(err){
		console.log(err);
		res.json({a:err});;
		//res.render('snippets/room.jade', {room:err});
	});

};