const express = require("express");
const bodyParser = require("body-parser");

const rootRouter = require("./routes/rootRouter");
const { makeApiRouter } = require("./routes/api/apiRouter");

const DB = require("./db/database");

const makeSocket = require("./socket/socket");

const app = express();
const port = 3001;

const initApp = async () => {
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());

  makeSocket();

  // Routes
  app.use("/", rootRouter);
  app.use("/api", makeApiRouter(DB));

  app.get("/", (req, res) => {
    res.send("API is working");
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

module.exports = initApp;
