import io from "socket.io-client";
const createSocket = (userId) => {
  console.log([process.env.GATSBY_HOST_URL]);
  const socket = io(`${process.env.GATSBY_HOST_URL}`, {
    withCredentials: true,
    transports: ["websocket"],
    query: { userId },
  });
  return socket;
};

export default createSocket;
