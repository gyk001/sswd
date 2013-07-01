//var User = require('../db/User');
var userService = require('../service/user');

var reg = function(req,res){
  res.render('register.jade');
};


var doReg = function(req,res){
	var user = req.body.user;
	user.registerTime = new Date();
	userService.reg(user, function(){
		res.json({success:true});
	},function(err){
		res.json({success: false, msg:err.message});
	});
	/*
	//console.log(user);
	User.find({loginName: user.loginName},function(err,existsUsers){
		try{
			if(err){
				throw new Error('检查用户是否存在异常!');
			}
			if(existsUsers && existsUsers.length>0){
				throw new Error('账号已被占用！');
			}
			User.create(user,function(err,newUser){
		  		if(err){
		  			throw new Error('存储用户信息异常！');
		  		}
		  		res.json({success:true});
			});
		}catch(e){
			//console.log(e);
			res.json({success: false, msg:e.message});
		}
	})
*/
};


exports.reg = reg;
exports.doReg = doReg;

