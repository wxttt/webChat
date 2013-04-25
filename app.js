var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(3000);

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.use(express.static(__dirname));
	app.use(app.router);
	app.use(express.errorHandler());
});


app.get('/webchat', function(req, res){
	var title = 'nodeJs webChat';
	res.render('webChat.jade', {title: title});
});


var count = 0;

io.sockets.on('connection', function(socket){
	io.sockets.emit('user connect', ++count);

	socket.on('message', function(name, message){
		io.sockets.emit('render message', {name: name,message: message})
	});

	socket.on('disconnect', function(socket){
		io.sockets.emit('user disconnect', --count);
	})
});

