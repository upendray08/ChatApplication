const express = require("express");
const app = express();
const http = require("http").createServer(app);

const port = process.env.PORT || 3000;
//middleware
app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
http.listen(port, () => {
  console.log(`listening at port ${port}`);
});

//socket
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("connected...");
  socket.on("message", (msg) => {
    socket.broadcast.emit('message',msg);
  });
});
