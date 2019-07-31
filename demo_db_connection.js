// alias:
// alias mysql=/usr/local/mysql/bin/mysql
// alias mysqladmin=/usr/local/mysql/bin/mysqladmin
// Welcome to the MySQL monitor.  Commands end with ; or \g.
// Your MySQL connection id is 13
// Server version: 8.0.17-commercial MySQL Enterprise Server - Commercial

var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password1",
  insecureAuth: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//DOCKER notes:

// FROM node:10

// # Create app directory
// WORKDIR /usr/src/app

// # Install app dependencies
// # A wildcard is used to ensure both package.json AND package-lock.json are copied
// # where available (npm@5+)
// COPY package*.json ./

// RUN npm install
// # If you are building your code for production
// # RUN npm ci --only=production

// # Bundle app source
// COPY . .

// EXPOSE 8080
// CMD [ "node", "server.js" ]

// You will also want a .dockerignore file
// with:
// node_modules
// npm-debug.log

////////////////////////////////////////////////////////////////////////////

// const mysql = require("mysql");
// const connection = mysql.createConnection({
//   host: "127.0.0.1",
//   user: "user",
//   password: "willSQL1",
//   database: "database name"
// });
// connection.connect(err => {
//   if (err) throw err;
//   console.log("Connected!");
// });
