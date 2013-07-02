var http = require('http')
  , path = require('path')
  , express = require('express')
//  , MongoStore = require('connect-mongo')(express)
  , app = express()
  , server = http.createServer(app)
  , io = require('socket.io').listen(server)
  , RedisStore = require('connect-redis')(express);
  //, MemoryStore = require('connect').middleware.session.memory;

var room = require('./routes/room')
  , routes = require('./routes')
  , login = require('./routes/login')
  , user = require('./routes/user')
  , settings = require('./settings.json')
  , ee = require('./service/ee');

ee.emit(ee.SERVER_START);

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
  //store: new MemoryStore({
  //  reapInterval: 60000 * 10
  //})
  //new MongoStore(settings.db)
  store: new RedisStore()
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
app.get('/login', login.login);
app.get('/logout', login.logout);
app.post('/login', login.doLogin);
app.get('/login', login.doLogin);
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
/*
//设置session
io.set('authorization', function(handshakeData, callback){
  // 通过客户端的cookie字符串来获取其session数据
  handshakeData.cookie = parseCookie(handshakeData.headers.cookie)
  var connect_sid = handshakeData.cookie['connect.sid'];
  
  if (connect_sid) {
    RedisStore.get(connect_sid, function(error, session){
      if (error) {
        // if we cannot grab a session, turn down the connection
        callback(error.message, false);
      }
      else {
        // save the session data and accept the connection
        handshakeData.session = session;
        callback(null, true);
      }
    });
  }
  else {
    callback('nosession');
  }
});

io.sockets.on('connection', function (socket){
  var session = socket.session;//session
  var name = session.user.loginName;
  console.log(name);
  socket.broadcast.emit('system message', '【'+name + '】回来了，大家赶紧去找TA聊聊~~');  
});
*/

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
