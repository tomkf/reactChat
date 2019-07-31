const express = require("express");
const SocketServer = require("ws").Server;
//const uuidv4 = require('uuid/v4');

const PORT = /*process.env.port ||*/ 3001;
const app = express();
const server = app.listen(PORT, () => {
  console.log(`WebSocket Server Running on Port: ${PORT}`);
});
const wss = new SocketServer({ server });
wss.broadcast = function broadcast(data) {
  console.log("broadcasting");
  wss.clients.forEach(function each(client) {
    client.send(data);
    //for every client send full object data
  });
};
const sendConnectedClients = numclients => {
  const clientsconnected = {
    numcon: numclients,
    type: "numclients"
  };
  console.log(clientsconnected);
  wss.broadcast(JSON.stringify(clientsconnected));
  //everything sent by the client was put in an object via json.parse - and to send back the data it must be converted to a string -- which was then rendered
};
wss.on("connection", ws => {
  //wss.clients.size auto gathers the number of connected users. to function needs to be created for this. this number could then be sent back to the client to render in header
  let numconnected = wss.clients.size;
  sendConnectedClients(numconnected);
  ws.on("message", message => {
    const clientMessage = JSON.parse(message);
    switch (clientMessage.type) {
      case "incomingMessage":
        clientMessage.type = "postMessage"; //this overwrites the 'type' sent by user and sends back a new type for the client to read/parse
        wss.broadcast(JSON.stringify(clientMessage));
        break;
      case "postNotification":
        clientMessage.type = "incomingNotification";
        //clientMessage.key = uuidv4(); //here did nothing to get rid of error
        clientMessage.content = `${
          clientMessage.oldname
        } changed their name to ${clientMessage.newname} `;
        wss.broadcast(JSON.stringify(clientMessage));
        break;
      default:
        console.log("no known type");
    }
  });
  ws.on("close", () => console.log("Client disconnected"));
});
