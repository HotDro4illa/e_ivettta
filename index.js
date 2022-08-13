const express = require("express");
const app = express();
const http = require("http");
const fs = require("fs");
const server = http.createServer(app);
const path = require("path");

const PORT = process.env.PORT || 3000;

const log = console.log;

app.use(express.static(path.join(__dirname, "public")));

app.get("/arch", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("*", (req, res) => {
  res.redirect("arch");
});

server.listen(PORT, () => {
  log(`listening on *:${PORT}`);
});
module.exports = app;
