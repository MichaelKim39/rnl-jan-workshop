const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http").Server(app);
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "<http://localhost:8081>",
  },
});

const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

socketIO.on("connection", (socket) => {
  console.log(`🔌: ${socket.id} user just connected!`);

  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("📵: A user disconnected");
  });

  socket.on("emitClient", (emittedObject) => {
    console.log(
      `Received web socket emitted from client with message: ${emittedObject?.message}`
    );
    socket.emit("emitServer", { message: "Test message emitted from server" });
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
