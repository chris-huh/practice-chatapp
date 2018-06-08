var http = require('http');
var fs = require('fs');

var server = http.createServer((req, res) => {
	fs.readFile('./index.html', 'utf-8', (error, content) => {
		res.writeHead(200, {"Content-Type": "text/html"});
		res.end(content);
	});
});

// Loading socket.io
var io = require('socket.io').listen(server);

// When a client connects, we print on console
io.sockets.on('connection', (socket) => {
	console.log('A client is connected!');
	socket.emit('message', 'You are connected!');

	// Manage session for each client
	socket.on('little_newbie', (username) => {
		socket.username = username;
	});
	
	socket.broadcast.emit('message', 'Another client has just connected!');

	socket.on('message', (message) => {
	console.log(socket.username + ' has a message for you: ' + message);
	});
});



server.listen(8888, () => {
	console.log('Server listening on port 8888...');
});