const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Redis = require('ioredis');
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

server = http.createServer(app);

const PORT = process.env.PORT || 8080;

io = new Server(server, {
  cors: {
    origin: "http://localhost:3000"
  }
});

// redisConnection = new Redis({
//   port: 6379,
//   host: "127.0.0.1",
//   password: "my-top-secret",
// });

io.on("connection", (socket) => {
  console.log("Client connected: " + `${socket.id}`);
  socket.on("send_message", (message) => {
    console.log(message);
  });
});

app.use(bodyParser.urlencoded({ extended: true }));
  
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/lost", function(req, res) {
    const userName = req.body.userName;
    console.log("User completed form");
    res.json({ userName : `User Name: ${userName}`});
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}` + `\nVisit http://localhost:${PORT}/`);
});