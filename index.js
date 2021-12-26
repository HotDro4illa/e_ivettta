const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
var fs = require('fs');
const {Server} = require("socket.io");
const io = new Server(server);
var wget = require('node-wget');


const PORT = process.env.PORT || 3000;

const log = console.log;


app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});




var bucket_list = [];


io.on('connection', (socket) => {

});
	




server.listen(PORT, () => {
	log(`listening on *:${ PORT }`);
});