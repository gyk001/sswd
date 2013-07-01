var server = require('../service/server');
var Room = require('../db/Room');

var jade = require('jade');




exports.list = function(req, res){
	Room.list({},function(err,rooms){
        if(err){
          throw new Error('获取房间列表异常',err);
        }
  		res.render('room.jade', { rooms: rooms, abc:'abcdefg' });
    })
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

exports.create = function(req,res){
	var roomName = req.params.roomName;
	var admin = req.session.user.name;
	var room = server.createRoom(roomName);
	res.render('snippets/room.jade', {room:room});
	//var dom = jade.compline()
	//res.json({room:room,success:true});
};