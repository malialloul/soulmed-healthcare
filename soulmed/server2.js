var Server = require("ws").Server;
var port = process.env.PORT || 9030;
var ws = new Server({ port: port });
const username = require("username-generator");

let sockets = {};
let users = {};
let messages = [];

ws.on("connection", function (w, req) {
  w.on("message", function (message) {
    var msg = JSON.parse(message);
    switch (msg.type) {

      case "addUser":
        var id = req.headers["sec-websocket-key"];
        if (!sockets[id]) {
          sockets[id] = w;
          users[id] = msg.data.username;
        }
        w.send(JSON.stringify({ type: "yourId", data: id }));
        console.log(users);
        Object.keys(users).map((key, value) => {
          sockets[key].send(JSON.stringify({ type: "allUsers", data: users }));
        });
        break;

      case "deleteUser":
        delete sockets[msg.from];
        break;

      case "setUserTyping":
        sockets[msg.data.to].send(
          JSON.stringify({
            type: "typingPeers",
            data: {
              from: msg.data.from,
              typing: msg.data.typing,
            },
          })
        );
        break;

      case "addMessage":
        messages.push(msg.data);
        let peerMessages = messages.filter(
          (m) =>
            (m.from === msg.data.from && m.to === msg.data.to) ||
            (m.from === msg.data.to && m.to === msg.data.from)
        );
        sockets[msg.data.to].send(
          JSON.stringify({ type: "newMessage", data: { from: msg.data.from } })
        );
        sockets[msg.data.to].send(
          JSON.stringify({
            type: "peerMessages",
            data: { messages: peerMessages },
          })
        );
        sockets[msg.data.from].send(
          JSON.stringify({
            type: "peerMessages",
            data: { messages: peerMessages },
          })
        );
        break;

      case "getMessages":
        let tempPeerMessages = messages.filter(
          (m) =>
            (m.from === msg.data.from && m.to === msg.data.to) ||
            (m.from === msg.data.to && m.to === msg.data.from)
        );
        sockets[msg.data.from].send(
          JSON.stringify({
            type: "peerMessages",
            data: { messages: tempPeerMessages },
          })
        );
        break;

      case "callUser":
        sockets[msg.data.userToCall].send(
          JSON.stringify({
            type: "hey",
            data: {
              signal: msg.data.signalData,
              from: msg.data.from,
              video: msg.data.video
            },
          })
        );
        break;

      case "acceptCall":
        sockets[msg.data.to].send(
          JSON.stringify({
            type: "callAccepted",
            data: msg.data.signal,
          })
        );
        break;

      case "close":
        sockets[msg.data.to].send(JSON.stringify({ type: "close", data: "" }));
        break;

      case "rejected":
        sockets[msg.data.to].send(
          JSON.stringify({ type: "rejected", data: "" })
        );
        break;

      default:
    }
  });
});
