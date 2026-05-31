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
server.listen(PORT, () => console.log(`running on`));

// Begin websocket connection
const WebSocketServer = require("ws").Server;
const wss = new WebSocketServer({ server });

wss.on("connection", function connection(ws) {
  const numClients = wss.clients.size;
  console.log(`${numClients} clients connected`);

  wss.broadcast(`${numClients} clients connected`);

  if (ws.readyState === ws.OPEN) {
    ws.send(`Welcome to the server! There are ${numClients} clients connected`);
  }

  ws.on("close", function close() {
    console.log(`A client has disconnected`);
    wss.broadcast(`A client has disconnected.`);
  });
});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};
