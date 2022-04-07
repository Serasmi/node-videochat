const { Router } = require("express");

const { makeMessagesRouter } = require("./messages/messagesRouter");

const makeApiRouter = (db) => {
  const router = Router();

  router.use("/messages", makeMessagesRouter(db.messagesDb));

  return router;
};

module.exports = { makeApiRouter };
