var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var roomSchema = new Schema({
	name: String,
	player: Array,
	status: String,
	lastUpdate: Date
});

var Room = mongoose.model('Room', roomSchema);


var create = function(room,fun) {
	new Room(room).save(function(err){
		console.log(typeof err);
	});
}

var list = function(fun){
	Room.find().exec(fun);
}


exports.Room = Room;
exports.create = create;
exports.list = list;