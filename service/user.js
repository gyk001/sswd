var User = require('../db/User');

var auth = function(username,pwd, callback){
	if(username==pwd){
		callback({
			username:username,
			nickname:'小'+username
		});
	}else{
		callback();
	}
};

var check = function(loginName, password, success, fail){
	User.find({loginName:loginName, password:password},function(err,users){
		if(err){
			fail(err);
			return;
		}
		if(users.length<1){
			fail(new Error('没有匹配的用户'));
			return;
		}
		success(users[0]);
	});
};


var reg = function(user, success, error){
	console.log(user);
	if(!user || !user.loginName || !user.password){
		error(new Error('用户信息不完整！'));
		return;
	}
	
	user.registerTime = new Date();
	User.find({loginName: user.loginName},function(err,existsUsers){
		try{
			if(err){
				error(new Error('检查用户是否存在异常!'));
				return;
			}
			if(existsUsers && existsUsers.length>0){
				error(new Error('账号已被占用！'));
				return;
			}
			User.create(user,function(err,newUser){
		  		if(err){
		  			error(new Error('存储用户信息异常！'));
		  			return ;
		  		}else{
		  			success(newUser);
		  			return;
		  		}
			});
		}catch(e){
			error(e);
			return;				
		}
	})
};

exports.check = check;
exports.reg = reg;