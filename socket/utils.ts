export const getUserIdFromConnectionURL = (url: string): string | undefined => {
  const searchParams = new URLSearchParams(url.split("?")[1]);
  return searchParams.get("userId") ?? undefined;
};

export const parseSocketDataMessage = (msg: string) => {
  try {
    return JSON.parse(msg);
  } catch (e) {
    console.log("Can not parse incoming message", e);
  }
};
