
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req,res){
	res.render('index.jade', {
		title: 'ChatRoom'		
	});		
});

app.listen(13801);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

var io = require('socket.io').listen(app);
var count=0;
io.sockets.on('connection', function(socket){
	count++;
	io.sockets.emit('message', {message: 100} );
	io.sockets.emit('a', count);

	socket.on('msg', function(msg){
		io.sockets.emit('msg', {name: msg.name, text: msg.text });
	});

	socket.on('disconnect',function(){
		count--;
		io.sockets.emit('a',count);
	});



});
