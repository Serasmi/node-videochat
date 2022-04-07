const { Router } = require("express");

const { httpResponseFactory } = require("../../utils");
const {
  messagesControllerFactory,
} = require("../../../controllers/messages/messagesController");

const makeMessagesRouter = (messagesDb) => {
  const router = Router();
  const { deleteMessage, getMessages, patchMessage, postMessage } =
    messagesControllerFactory(messagesDb);

  router.post("/", httpResponseFactory(postMessage));
  router.get("/", httpResponseFactory(getMessages));
  router.patch("/:id", httpResponseFactory(patchMessage));
  router.delete("/:id", httpResponseFactory(deleteMessage));

  return router;
};

module.exports = { makeMessagesRouter };
