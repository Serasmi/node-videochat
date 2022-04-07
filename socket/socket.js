const { formatISO } = require("date-fns");
const { WebSocketServer } = require("ws");
const { v4: uuidv4 } = require("uuid");
const {
  getUserIdFromConnectionURL,
  parseSocketDataMessage,
} = require("./utils");

const makeSocket = () => {
  const wss = new WebSocketServer({ port: 8080 });

  const _broadcast = (msg) => {
    wss.clients.forEach((client) => client.send(msg));
  };

  wss.on("connection", function connection(ws, req) {
    ws.on("message", (msg) => {
      const { type, payload } = parseSocketDataMessage(msg) ?? {};

      if (typeof type !== "string") {
        console.log("received: %s", msg);
      }

      if (type === "message") {
        _broadcast(
          JSON.stringify({
            type,
            payload: {
              ...payload,
              id: uuidv4(),
              timestamp: formatISO(new Date()),
            },
          })
        );
        return;
      }

      if (type === "ping") {
        ws.send(JSON.stringify({ type: "pong" }));
        return;
      }
    });

    const userId = getUserIdFromConnectionURL(req.url);

    _broadcast(
      JSON.stringify({
        type: "connection",
        payload: { id: uuidv4(), timestamp: formatISO(new Date()), userId },
      })
    );
  });
};

module.exports = makeSocket;
