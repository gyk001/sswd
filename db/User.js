var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
	loginName: String,
	nickname: String,
	password: String,
	registerTime: Date,
	lastLoginDate: Date
});

var User = mongoose.model('User', schema);


var create = function(user,fun) {
	new User(user).save(function(err,u,c){
		fun(err,u,c);
	});
}

var list = function(fun){
	User.find().exec(fun);
}

var find = function(con,fun){
	User.find(con).exec(fun);
}

exports.User = User;
exports.create = create;
exports.list = list;
exports.find = find;
