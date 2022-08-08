const express = require("express");
const app = express();
const http = require("http");
const fs = require("fs");
const options = {
  key: fs.readFileSync(__dirname + "/secure/key.pem"),
  cert: fs.readFileSync(__dirname + "/secure/cert.pem"),
};
const server = http.createServer(options, app);
const { Server } = require("socket.io");
const io = new Server(server);

const PORT = process.env.PORT || 3000;

const log = console.log;

app.use(express.static("public"));

app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

server.listen(PORT, () => {
  log(`listening on *:${PORT}`);
});
