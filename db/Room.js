var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.ObjectId;



var roomSchema = new Schema({
	name: String,
	player: [{type: ObjectId, ref: 'User'}],
	admin: {type: ObjectId, ref: 'User'},
	status: String,
	lastUpdate: Date
});

var Room = mongoose.model('Room', roomSchema);


var create = function(room,fun) {
	new Room(room).save(function(err){
		console.log(typeof err);
	});
};
var list = function(con,fun){
	Room.find(con).exec(fun);
};


exports.Room = Room;
exports.create = create;
exports.list = list;