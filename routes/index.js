var server = require('../service/server');
/*
 * GET home page.
 */
exports.index = function(req, res){
	if(req.session.user){
  		res.render('index.jade', { rooms: server.rooms, abc:'abcdefg' });
  	}else{
  		res.redirect('/login');
  	}
};

exports.logout = function(req, res){
  // destroy the user's session to log them out
  // will be re-created next request
  req.session.destroy(function(){
    res.redirect('/');
  });
};
/*
app.get('/login', function(req, res){
  res.render('login');
});

*/
exports.login = function(req, res){
	if(req.session.user){
		res.redirect('/');
	}else{
 		res.render('login.jade', { title: '请登录'});
	}
};



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

var doLogin = function(req, res){
  var username = req.body.username;
  var pwd = req.body.password;
  auth(username,pwd,function(user){
    if (user) {
      // Regenerate session when signing in
      // to prevent fixation 
      req.session.regenerate(function(){
        // Store the user's primary key 
        // in the session store to be retrieved,
        // or in this case the entire user object
        req.session.user = user;
        req.session.success = 'Authenticated as ' + user.nickname
          + ' click to <a href="/logout">logout</a>. '
          + ' You may now access <a href="/restricted">/restricted</a>.';
        res.redirect('/');
      });
    } else {
      req.session.error = 'Authentication failed, please check your '
        + ' username and password.'
        + ' (use "tj" and "foobar")';
      res.redirect('/login');
    }
  });
};

exports.doLogin = doLogin;

