var SocketIOFileUpload = require("socketio-file-upload");
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
var fs = require('fs');
const {
    Server
} = require("socket.io");
const io = new Server(server);
const chokidar = require('chokidar');

const PORT = process.env.PORT || 3000;

const log = console.log;

app.use(SocketIOFileUpload.router);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});





io.on('connection', (socket) => {

	material = ((fs.readdirSync('./public/e_ivettta/')).sort()).reverse();
	io.to(socket.id).emit('catalog_upd', material);
	
	var uploader = new SocketIOFileUpload();
	    uploader.dir = "./public/e_ivettta/";
	    uploader.maxFileSize = 50000000;
    uploader.listen(socket);
	
  uploader.on('progress', function(event) {
    var perc = Math.round(((event.file.bytesLoaded / event.file.size) * 100)) + "%";
	io.to(socket.id).emit('upload_perc', perc);
	if ((event.file.bytesLoaded / event.file.size) == 1) {
		io.to(socket.id).emit('upload_perc', "Файлы загружены");
		return;
	};
});
	
});



server.listen(PORT, () => {
	log(`listening on *:${ PORT }`);
});