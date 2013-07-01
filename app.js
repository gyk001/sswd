var http = require('http')
  , path = require('path')
  , express = require('express')
  , MongoStore = require('connect-mongo')(express)
  , app = express()
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

var gameServer= require('./service/server')
  , room = require('./routes/room')
  , routes = require('./routes')
  , user = require('./routes/user')
  , settings = require('./settings.json');

gameServer.init();

// all environments
app.engine('jade', require('jade').__express);
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.cookieParser('guo-sswd'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.logger('dev'));
app.use(express.session({
  secret: settings.cookie_secret,
  store: new MongoStore(settings.db)
}));
//app.use(express.session());

var sessionUser = function(req, res, next) {
    res.locals.user = req.session.user;
    res.locals.aaa='xxxxx';
    next();
}

app.use(sessionUser);
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/login', routes.login);
app.get('/logout', routes.logout);
app.post('/login', routes.doLogin);
app.get('/login', routes.doLogin);
//注册界面
app.get('/user/reg',user.reg);
//注册请求
app.post('/user',user.doReg);
app.get('/room/list', routes.filter, room.list);
app.put('/room/new/:roomName', routes.filter, room.create);
app.get('/room/join/:roomName', routes.filter, room.join);



/*
app.use(function(req, res, next){
  res.locals.csrf = req.session ? req.session._csrf : '';
  res.locals.req = req;
  res.locals.msg = 'msgs01';
  res.locals.session = req.session;
  next();
});
*/

var chat = io
  .of('/chat')
  .on('connection', function (socket) {
    socket.emit('a message', {
        that: 'only'
      , '/chat': 'will get'
    });
    chat.emit('a message', {
        everyone: 'in'
      , '/chat': 'will get'
    });
  });

var news = io
  .of('/news')
  .on('connection', function (socket) {
    socket.emit('item', { news: 'item' });
  });



server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
