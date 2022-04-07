const httpResponseFactory = (asyncController) => (req, res, next) => {
  asyncController(req)
    .then(({ headers, statusCode, body }) => {
      if (headers) {
        res.set(headers);
      }
      res.type("json");
      res.status(statusCode).send(body);
    })
    .catch(() => {
      res.status(500).send({ error: "An unknown error occurred." });
    });
};

module.exports = { httpResponseFactory };
