var userService = require('../service/user');
var ee = require('../service/ee');

var loginSuccess = function(user, req, res) {
  req.session.regenerate(function() {
    //server.emit('eve');
    req.session.user = user;
    res.json({
      success: true
    });
    ee.emit(ee.USER_LOGIN, user);
  });
};

var loginFail = function(err, req, res) {
  res.json({
    success: false,
    msg: err.message
  });
};


var login = function(req, res) {
  if (req.session.user) {
    res.redirect('/');
  } else {
    res.render('login.jade', {
      title: '请登录'
    });
  }
};

var doLogin = function(req, res) {
  var user = req.body.user;
  console.log('尝试登录：' + user.loginName);
  if (!user.loginName || !user.password) {
    res.json({
      success: false,
      msg: '账号密码不能为空！'
    });
    return;
  }
  userService.check(user.loginName, user.password, function(user) {
    loginSuccess(user, req, res);
  }, function(err) {
    loginFail(err, req, res);
  });
};

var logout = function(req, res) {
  req.session.destroy(function() {
    res.redirect('/login');
  });
};

exports.login = login;
exports.doLogin = doLogin;
exports.logout = logout;