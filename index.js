const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
var fs = require('fs');
const {Server} = require("socket.io");
const io = new Server(server);
const chokidar = require('chokidar');
var wget = require('node-wget-promise');

var bucket_list = [];

const PORT = process.env.PORT || 3000;

const log = console.log;


app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});



var bucket_list = [];


async function main() {
	
	wget("https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/list.txt");

	fs.readFile('list.txt', 'utf8', (err, data) => {
			if(err) throw err;
			bucket_list = data.split("\n")
		});
	
}
main();


let timerId = setInterval(() => main(), 3600000);

io.on('connection', (socket) => {
	
	io.to(socket.id).emit('catalog_upd', bucket_list.sort().reverse());
	

});
	




server.listen(PORT, () => {
	log(`listening on *:${ PORT }`);
});