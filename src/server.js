const http = require("http");
const express = require("express");
const app = express();

const { config } = require("./configs/index");

require("./loaders/index")(app);

const server = http.createServer(app);

server.listen(config.PORT, () => {
  console.log(`Server is up on port ${config.PORT}`);
});
