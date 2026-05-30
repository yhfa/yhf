const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/", (_, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`
    
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
        <div>
        <h1>Hi, I'm Youssif 👋</h1>
        <p>I'm a web developer and UI designer</p>
        </div>
    </body>
    </html>
    `);
  res.end();
});

const PORT = 3000;
app.listen(PORT, () => console.log(`running on port ${PORT}...`));
