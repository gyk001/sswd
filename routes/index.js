var server = require('../service/server');
var Room = require('../db/Room');
var userService = require('../service/user');
/*
 * GET home page.
 */
exports.index = function(req, res) {
  if (req.session.user) {
    console.log(req.session.user);
    res.redirect('/room/list');
  } else {
    res.redirect('/login');
  }
};

exports.logout = function(req, res) {
  // destroy the user's session to log them out
  // will be re-created next request
  req.session.destroy(function() {
    res.redirect('/login');
  });
};
/*
app.get('/login', function(req, res){
  res.render('login');
});

*/
exports.login = function(req, res) {
  if (req.session.user) {
    res.redirect('/');
  } else {
    res.render('login.jade', {
      title: '请登录'
    });
  }
};



var doLogin = function(req, res) {
  var loginSuccess = function( user) {
    req.session.regenerate(function() {
      req.session.user = user;
      res.json({
        success: true
      });
    });
  };

  var loginFail = function( err) {
    res.json({
      success: false,
      msg: err.message
    });
  };
  var user = req.body.user;
  try {
    if (!user.loginName || !user.password) {
      throw new Error('账号密码不能为空！');
    }
    userService.check(user.loginName, user.password, loginSuccess, loginFail);
  } catch (e) {
    res.json({
      success: false,
      msg: e.message + '用户名密码错误！'
    });
  }

};

exports.doLogin = doLogin;

var filter = function(req, res, next) {
  if (req.session.user) {
    console.log(req.session.user);
    next();
  } else {
    if (req.xhr) {
      res.send(403, '需要登录！');
    } else {
      res.redirect('/login');
    }
  }
};

exports.filter = filter;