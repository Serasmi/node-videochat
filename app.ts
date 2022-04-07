import express from "express";
import bodyParser from "body-parser";

import rootRouter from "@/routes/rootRouter";
import { makeApiRouter } from "@/routes/api/apiRouter";

import DB from "@/db/database";

import { makeSocket } from "@/socket/socket";

const app = express();
const port = 3001;

export const initApp = async () => {
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
