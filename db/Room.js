var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.ObjectId;



var roomSchema = new Schema({
	name: String,
	player: {type: String, ref: 'User'},
	admin: {type: String, ref: 'User'},
	adm: String,
	status: String,
	lastUpdate: Date
});

var Room = mongoose.model('Room', roomSchema);

var create = function(room,fun) {
	new Room(room).save(function(err,r,c){
		fun(err,r,c);
	});
}

var list = function(con,fun){
	Room.find(con).exec(fun);
};


exports.Room = Room;
exports.create = create;
exports.list = list;