import { io } from "socket.io-client";
const socket = io.connect("http://1a31-213-86-15-198.ngrok-free.app", {
  transports: ["websocket"],
});
export default socket;
