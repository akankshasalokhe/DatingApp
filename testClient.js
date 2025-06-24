console.log("📡 Client starting...");


const { io } = require("socket.io-client");

const socket = io("http://localhost:2000", {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("Connected:", socket.id);

  // Join a conversation room first
  const conversationId = "test-convo-123";

  socket.emit("joinRoom", { conversationId });

  // Send a message (make sure the conversation exists in DB or use dummy for testing)
  socket.emit("sendMessage", {
    conversationId,
    senderId: "user123",
    receiverId: "user456",
    encryptedText: "ENCRYPTED_TEST_MESSAGE"
  });
});

socket.on("receiveMessage", (data) => {
  console.log("Message received:", data);
});

socket.on("disconnect", () => {
  console.log("Disconnected");
});
