const express = require("express");
const SocketServer = require("ws").Server;
//const uuidv4 = require('uuid/v4');
const mysql = require("mysql");

const newDb = "nodemysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password1",
  insecureAuth: true
});

db.connect(function(err) {
  if (err) throw err;
  console.log("CONNECTED!");
});

const PORT = /*process.env.port ||*/ 3001;
const app = express();

const table =
  "CREATE TABLE IF NOT EXISTS posts(id int AUTO_INCREMENT, name VARCHAR(30), email VARCHAR(50), content VARCHAR(500), stamp VARCHAR(40), PRIMARY KEY(id))";

db.query("CREATE DATABASE IF NOT EXISTS ??", newDb, function(err, results) {
  if (err) {
    console.log("error in creating database", err);
    return;
  }

  console.log("created a new database");

  db.changeUser(
    {
      database: newDb
    },
    function(err) {
      if (err) {
        console.log("error in changing database", err);
        return;
      }

      db.query(table, function(err) {
        if (err) {
          console.log("error in creating tables", err);
          return;
        }

        console.log("created a new table");
      });
    }
  );
});

let allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
};

// // create table
// app.get("/createpoststable", (req, res) => {
//   let sql =
//     "CREATE TABLE posts(id int AUTO_INCREMENT, name VARCHAR(30), email VARCHAR(50), content VARCHAR(500), stamp VARCHAR(40), PRIMARY KEY(id))";
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send("Posts table created...");
//   });
// });

// //  Insert post 1
// app.get("/addpost1", (req, res) => {
//   let pname = "Joe Blogs";
//   let pemail = "jblogs@gmail.com";
//   let pcontent =
//     "Interesting post Phil. It's great to see that a blog really can come alive when the comments update in real-time. The commenting system becomes a conversation platform.";
//   let pstamp = "July 30 2019";
//   let sql = `INSERT INTO posts (name, email, content, stamp) VALUES (${pname}, ${pemail}, ${pcontent}, ${pstamp})`;
//   let query = db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send("Post 1 added...");
//   });
// });

// // Insert post 2
// app.get("/addpost2", (req, res) => {
//   let post = {
//     name: "Phil Leggetter",
//     email: "leggeter1981@shaw.ca",
//     content:
//       "Thanks Joe (great name by the way). I'm pleased you see the benefits of adding realtime functionality to a commenting system. It really can draw users in and turn a standard blogpost into a place where conversation takes place. Old style commenting is still great, but real-time comments are really engaging and can make a page much more sticky and engaging.",
//     stamp: "July 30 2019"
//   };
//   let sql = "INSERT INTO posts SET ?";
//   let query = db.query(sql, post, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send("Post 2 added...");
//   });
// });

// // Insert post 3
// app.get("/addpost3", (req, res) => {
//   let post = {
//     name: "Max Williams",
//     email: "maxWill@gmail.com",
//     content: "Phil - great post. Keep up the good work.",
//     stamp: "July 30 2019"
//   };
//   let sql = "INSERT INTO posts SET ?";
//   let query = db.query(sql, post, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send("Post 3 added...");
//   });
// });

// app.get("/api/getposts", (req, res) => {
//   let sql = "SELECT * FROM posts";
//   let query = db.query(sql, (err, results) => {
//     // if (err) throw err;
//     // console.log(results);
//     // res.send("Posts fetched...");
//     if (err) throw err;
//     res.end(JSON.stringify(results));
//   });
// });

//this is where I integrate mySQL

app.get("/api/messages", (req, res) => {
  const dbMessages = [
    {
      name: "Joe Blogs",
      email: "jblogs@gmail.com",
      content:
        "Interesting post Phil. It's great to see that a blog really can come alive when the comments update in real-time. The commenting system becomes a conversation platform.",
      stamp: "July 30 2019"
    },
    {
      id: 2,
      name: "Phil Leggetter",
      email: "leggeter1981@shaw.ca",
      content:
        "Thanks Joe (great name by the way). I'm pleased you see the benefits of adding realtime functionality to a commenting system. It really can draw users in and turn a standard blogpost into a place where conversation takes place. Old style commenting is still great, but real-time comments are really engaging and can make a page much more sticky and engaging.",
      stamp: "July 30 2019"
    },
    {
      id: 3,
      name: "Max Williams",
      email: "maxWill@gmail.com",
      content: "Phil - great post. Keep up the good work.",
      stamp: "July 30 2019"
    }
  ];

  res.json(dbMessages);
});

const server = app.listen(PORT, () => {
  console.log(`WebSocket Server Running on Port: ${PORT}`);
});
const wss = new SocketServer({ server });
wss.broadcast = function broadcast(data) {
  console.log("broadcasting");
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};
const sendConnectedClients = numclients => {
  const clientsconnected = {
    numcon: numclients,
    type: "numclients"
  };
  console.log(clientsconnected);
  wss.broadcast(JSON.stringify(clientsconnected));
};
wss.on("connection", ws => {
  let numconnected = wss.clients.size;
  sendConnectedClients(numconnected);
  ws.on("message", message => {
    const clientMessage = JSON.parse(message);
    switch (clientMessage.type) {
      case "incomingMessage":
        clientMessage.type = "postMessage"; 
        wss.broadcast(JSON.stringify(clientMessage));
        break;
      case "postNotification":
        clientMessage.type = "incomingNotification";
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
