require('dotenv').config()

const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http").Server(app);
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "<http://localhost:8081>",
  },
});
const { MongoClient, ServerApiVersion } = require("mongodb");

const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING, { serverApi: {
  version: ServerApiVersion.v1,
  strict: true,
  deprecationErrors: true,
}});  // remove this after you've confirmed it working

async function run() {

  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const database = client.db('chat');
    const messages = database.collection('messages');


  } catch(e) {
    console.log(e)
    // Ensures that the client will close when you error
    await client.close();
  }
}

run().catch(console.dir);

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
