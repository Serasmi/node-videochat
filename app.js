const express = require("express");

const makeSocket = require("./socket/socket");

const app = express();
const port = 3001;

const initApp = async () => {
  makeSocket();

  app.get("/", (req, res) => {
    res.send("API is working");
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

module.exports = initApp;
