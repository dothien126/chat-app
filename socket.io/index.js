require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const server = http.createServer(app);

const { Server } = require('socket.io');

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_HOST,
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('join_conversation', (conversationId) => {
    socket.join(conversationId);
    console.log(`User with ID: ${socket.id} joined room: ${conversationId}`);
  });

  // Listen typing events
  socket.on('start_typing_message', (data) => {
    io.to(data.conversationId).emit('start_typing_message', data);
  });

  socket.on('stop_typing_message', (data) => {
    io.to(data.conversationId).emit('stop_typing_message', data);
  });

  socket.on('send_message', async (data) => {
    io.to(data.conversationId).emit('receive_message', data);
  });

  socket.on('send_unread', (data) => {
    io.to(data.conversationId).emit('receiver_unread', data);
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});

const PORT = 1111;

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
