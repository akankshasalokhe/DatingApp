const { io } = require("socket.io-client");

const socket = io("http://localhost:2000", {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("Receiver Connected:", socket.id);

  const conversationId = "test-convo-123";
  socket.emit("joinRoom", { conversationId });
});

socket.on("receiveMessage", (data) => {
  console.log("Message received:", data);
});
