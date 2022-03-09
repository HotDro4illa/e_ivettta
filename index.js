const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);

const PORT = process.env.PORT || 3000;

const log = console.log;


app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});



server.listen(PORT, () => {
	log(`listening on *:${ PORT }`);
});