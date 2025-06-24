const Message = require('./models/messageModel');
const Conversation = require('./models/conversationModel');
const User = require('./models/userModel');

function initSocket(server) {
  const io = require('socket.io')(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

    // Join a conversation room
    socket.on('joinRoom', ({ conversationId }) => {
      socket.join(conversationId);
    console.log(`User joined room: ${conversationId}`);
    });

    // Handle encrypted message
    socket.on('sendMessage', async ({ conversationId, senderId, receiverId, encryptedText }) => {
      try {
        // Store encrypted message
        const msg = await Message.create({ conversationId, sender: senderId, receiver: receiverId, encryptedText });

        // Emit to receiver
        io.to(conversationId).emit('receiveMessage', {
          conversationId,
          senderId,
          encryptedText,
          timestamp: msg.timestamp,
        });
      } catch (error) {
        console.error('Send message failed:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected:', socket.id);
    });
  });
}

module.exports = initSocket;
