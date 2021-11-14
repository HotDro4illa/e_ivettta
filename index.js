const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
var fs = require('fs');
const {Server} = require("socket.io");
const io = new Server(server);
const chokidar = require('chokidar');
var wget = require('node-wget');


const PORT = process.env.PORT || 3000;

const log = console.log;


app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});




var bucket_list = [];

async function main() {
	
	wget("https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/list.txt");

	
}

main();

let timerId = setInterval(() => main(), 600000);

io.on('connection', (socket) => {

function update() {
		fs.readFile('list.txt', 'utf8', (err, data) => {
			if(err) throw err;
			bucket_list = data.split("\n").sort().reverse()
		});
		
		if (bucket_list.length < 2) {
			io.to(socket.id).emit('catalog_upd', bucket_list);
			setTimeout(() => { clearInterval(timerId); log('stop'); }, 0);
		}
}

let timerId = setInterval(() => update(), 2000);

});
	




server.listen(PORT, () => {
	log(`listening on *:${ PORT }`);
});