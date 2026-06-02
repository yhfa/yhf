const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

server.on("request", app);

const PORT = 3000;
server.listen(PORT, () => console.log(`running on http://localhost:3000/`));

// process.on("SIGINT", () => {
//   wss.clients.forEach((client) => {
//     client.close();
//   });

//   server.close(() => {
//     shutdownDB();
//   });
// });

// // Begin websocket connection
// const WebSocketServer = require("ws").Server;
// const wss = new WebSocketServer({ server });

// wss.on("connection", function connection(ws) {
//   const numClients = wss.clients.size;
//   console.log(`${numClients} clients connected`);

//   wss.broadcast(`${numClients} clients connected`);

//   if (ws.readyState === ws.OPEN) {
//     ws.send(`Welcome to the server! There are ${numClients} clients connected`);
//   }

//   db.run(
//     `INSERT INTO visitors (count, time) VALUES (${numClients}, datetime('now'))`,
//   );

//   ws.on("close", function close() {
//     console.log(`A client has disconnected`);
//     wss.broadcast(`A client has disconnected.`);
//   });
// });

// wss.broadcast = function broadcast(data) {
//   wss.clients.forEach(function each(client) {
//     client.send(data);
//   });
// };

// // Begin Database
// const sqlite3 = require("sqlite3");
// const db = new sqlite3.Database(":memory:");

// db.serialize(() => {
//   db.run(`
//         CREATE TABLE visitors (
//             count INTEGER,
//             time TEXT
//         )
//     `);
// });

// function getCounts() {
//   db.each("SELECT * from visitors", (err, row) => {
//     console.log(row);
//   });
// }

// function shutdownDB() {
//   getCounts();
//   console.log("shutting down DB...");
//   db.close();
// }
