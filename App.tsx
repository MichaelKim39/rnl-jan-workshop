import { StyleSheet, Button, View } from "react-native";
import socket from "./utils/socket";
import { useEffect } from "react";

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

    socket.on("messageSent", (sentMessage) => {
      console.log(
        `New Message: ${sentMessage?.message}`
      );
    });

    return function didUnmount() {
      socket.disconnect();
      socket.removeAllListeners();
    };
  }, [socket]);

  return (
    <View style={styles.container}>
      <Button title="Press to emit web socket" onPress={handleEmitWebSocket} />
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
