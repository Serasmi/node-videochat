const handleError = (error, { headers = {}, statusCode = 400 } = {}) => {
  // TODO: implement error handler depending on error type
  // TODO: Error logging
  console.log(error);

  return {
    headers: { "Content-Type": "application/json", ...headers },
    statusCode,
    body: {
      error: error.message,
    },
  };
};

module.exports = { handleError };
