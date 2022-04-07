const getUserIdFromConnectionURL = (url) => {
  const searchParams = new URLSearchParams(url.split("?")[1]);
  return searchParams.get("userId");
};

const parseSocketDataMessage = (msg) => {
  try {
    return JSON.parse(msg);
  } catch (e) {
    console.log("Can not parse incoming message", e);
  }
};

module.exports = { getUserIdFromConnectionURL, parseSocketDataMessage };
