var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
	loginName: String,
	nickName: String,
	password: String,
	registerTime: Date,
	lastLoginDate: Date
});

var User = mongoose.model('User', schema);


var create = function(user,fun) {
	user.registerTime= new Date();
	new User(user).save(function(err){
		console.log(typeof err);
	});
}

var list = function(fun){
	User.find().exec(fun);
}

var find = function(con,fun){
	User.find(con).exec(fun);
}

new User({
	loginName:'g',
	pwd:'g',
	nickName:'郭郭'
}).save();

exports.User = User;
exports.create = create;
exports.list = list;
exports.find = find;