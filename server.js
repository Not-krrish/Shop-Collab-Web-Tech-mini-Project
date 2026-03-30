const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const path = require('path');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Serve all UI files directly from the project directory
app.use(express.static(__dirname));

// Default to landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// A simple in-memory store for global chat messages
// In a real startup, this would be MongoDB or PostgreSQL.
const chatHistory = [];

io.on('connection', (socket) => {
    console.log('A business owner connected:', socket.id);

    // Send the current history to the newly connected user
    socket.emit('chatHistory', chatHistory);

    // When a user sends a message
    socket.on('sendMessage', (data) => {
        // Build a complete message object format
        const msg = {
            id: Date.now(),
            senderId: socket.id,
            chatId: data.chatId || 1,
            text: data.text,
            name: data.name || "Unknown Shop",
            emoji: data.emoji || "🏪",
            time: new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })
        };

        // Save to our array (keep last 100 max)
        chatHistory.push(msg);
        if (chatHistory.length > 100) chatHistory.shift();

        // Broadcast the new message to EVERYONE (including the sender, so they see it)
        io.emit('newMessage', msg);
    });

    socket.on('disconnect', () => {
        console.log('Business owner disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 NexLocal Server is running!`);
    console.log(`🌐 Open http://localhost:${PORT} in your browser.`);
});
