const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const username = require("username-generator");
const path = require("path");
const { AwakeHeroku } = require("awake-heroku");

AwakeHeroku.add({
  url: "https://cuckooapp.herokuapp.com",
});

app.use(express.static("./client/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const users = {};
let messages = [];

io.on("connection", (socket) => {
  const userid = username.generateUsername("-");
  if (!users[userid]) {
    users[userid] = socket.id;
  }
  //send back username
  socket.emit("yourID", userid);
  io.sockets.emit("allUsers", users);

  socket.on("disconnect", () => {
    delete users[userid];
  });

    /*socket.on("addUser", (data) => {
    if (!users[data.username]) {
      users[data.username] = socket.id;
    }
    //send back username
    socket.emit("yourID", data.username);
    io.sockets.emit("allUsers", users);
  });
  //socket.on("disconnect", () => {
  // delete users[userid];
  //});

  socket.on("deleteUser", (data) => {
    delete users[data.username];
    io.sockets.emit("allUsers", {});

  });*/

  socket.on("callUser", (data) => {
    io.to(users[data.userToCall]).emit("hey", {
      signal: data.signalData,
      from: data.from,
    });
  });

  socket.on("setUserTyping", (data) => {
    io.to(users[data.to]).emit("typingPeers" , {
      from: data.from,
      typing: data.typing
    })
  })

  socket.on("getMessages", (data) => {
    let peerMessages = messages.filter(
      (m) =>
        (m.from === data.from && m.to === data.to) ||
        (m.from === data.to && m.to === data.from)
    );
    socket.emit("peerMessages", peerMessages);
    socket.emit("yourPeerId", data.to);
  });

  socket.on("addMessage", (data) => {
    messages.push(data);
    let peerMessages = messages.filter(
      (m) =>
        (m.from === data.from && m.to === data.to) ||
        (m.from === data.to && m.to === data.from)
    );
    socket.emit("peerMessages", peerMessages);
    io.to(users[data.to]).emit("newMessage", {
      from: data.from,
    });
  });

  socket.on("acceptCall", (data) => {
    io.to(users[data.to]).emit("callAccepted", data.signal);
  });

  socket.on("close", (data) => {
    io.to(users[data.to]).emit("close");
  });

  socket.on("rejected", (data) => {
    io.to(users[data.to]).emit("rejected");
  });
});

const port = process.env.PORT || 4003;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
