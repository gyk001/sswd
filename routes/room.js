var server = require('../service/server');
var jade = require('jade');
/*
 * GET users listing.
 */

exports.list = function(req, res){
	res.render('room.jade', { title: 'xxxxx' ,username:req.session.success });
};

exports.join = function(req,res){
	var roomName = req.params.roomName;
	var user = req.session.user;
	if(!user){
		req.session.destroy(function(){
	    	res.redirect('/');
	 	});
	}else{
		server.joinRoom(user,);
	}
	res.json({name:roomName,success:true});
};

exports.create = function(req,res){
	var roomName = req.params.roomName;
	var room = server.createRoom(roomName);
	res.render('snippets/room.jade', {room:room});
	//var dom = jade.compline()
	//res.json({room:room,success:true});
};