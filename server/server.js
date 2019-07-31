const express = require("express");
const SocketServer = require("ws").Server;
//const uuidv4 = require('uuid/v4');
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password1",
  insecureAuth: true,
  database: "nodemysql"
});

db.connect(function(err) {
  if (err) throw err;
  console.log("CONNECTED!");
});

const PORT = /*process.env.port ||*/ 3001;
const app = express();

//create DB
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE nodemysql";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("DATABASE CREATED!");
  });
});

//create table
app.get("/createpoststable", (req, res) => {
  let sql =
    "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Posts table created...");
  });
});

// // Insert post 1
// app.get("/addpost1", (req, res) => {
//   let post = { title: "Post One", body: "This is post number one" };
//   let sql = "INSERT INTO posts SET ?";
//   let query = db.query(sql, post, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send("Post 1 added...");
//   });
// });

// app.get('/api/customers', (req, res) => {
//     const customers = [
//       {id: 1, name: 'Joe Blogs', email: 'jblogs@gmail.com', content: "Interesting post Phil. It's great to see that a blog really can come alive when the comments update in real-time. The commenting system becomes a conversation platform.", stamp: "July 30 2019" },
//       {id: 2, name: 'Phil Leggetter', email: 'leggeter1981@shaw.ca', content: "Thanks Joe (great name by the way). I'm pleased you see the benefits of adding realtime functionality to a commenting system. It really can draw users in and turn a standard blogpost into a place where conversation takes place. Old style commenting is still great, but real-time comments are really engaging and can make a page much more sticky and engaging.", stamp: July 30 2019 },
//       {id: 3, name: 'Max Williams', email: 'maxWill@gmail.com', content: "Phil - great post. Keep up the good work.", stamp: July 30 2019 },
//     ];

//     res.json(customers);
//   });

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
