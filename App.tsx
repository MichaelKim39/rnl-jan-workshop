import { StyleSheet, Button, View } from "react-native";
import socket from "./utils/socket";
import { useEffect } from "react";
import { ChatBox } from "./components/ChatBox";

export default function App() {
  const handleEmitWebSocket = () => {
    console.log("EMITTING WEB SOCKET FROM CLIENT...");
    socket.emit("emitClient", { message: "Client has emitted web socket" });
  };

  useEffect(() => {
    socket.on("emitServer", (emittedObject) => {
      console.log(
        `Received web socket emitted from server with message: ${emittedObject?.message}`
      );
    });

    return function didUnmount() {
      socket.disconnect();
      socket.removeAllListeners();
    };
  }, [socket]);

  return (
    <View flex={1}>
      <ChatBox />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
