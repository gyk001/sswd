var server = require('../service/server');
var ee = require('../service/ee');
/*
 * GET home page.
 */
var index = function(req, res) {
  if (req.session.user) {
    console.log(req.session.user);
    res.redirect('/room/list');
  } else {
    res.redirect('/login');
  }
};


var filter = function(req, res, next) {
  if (req.session.user) {
    //console.log(req.session.user);
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
exports.index = index;