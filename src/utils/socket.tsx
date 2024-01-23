import io from "socket.io-client";
const createSocket = (userId) => {
  const socket = io(`${process.env.HOST_URL}`, {
    withCredentials: true,
    transports: ["websocket"],
    query: { userId },
  });
  return socket;
};

export default createSocket;
