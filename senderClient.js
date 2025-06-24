const { io } = require("socket.io-client");

const socket = io("http://localhost:2000", {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("Sender Connected:", socket.id);

  const conversationId = "test-convo-123";
  socket.emit("joinRoom", { conversationId });

  setTimeout(() => {
    socket.emit("sendMessage", {
      conversationId,
      senderId: "user123",
      receiverId: "user456",
      encryptedText: "ENCRYPTED_TEST_MESSAGE"
    });
    console.log("Message sent.");
  }, 1000); // Delay to ensure joinRoom is processed
});
