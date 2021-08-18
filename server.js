const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const formatMsg = require('./messages');
app.use(express.static(path.join(__dirname, 'public')));
const botName = 'BOT';
io.on('connection', socket => {
    socket.on('USERNAME', ({ Name }) => {
        setInterval(() => {
            let users = io.engine.clientsCount;
            io.emit('totalUsers', users);
        }, 1000);
        console.log('New Connection');
        socket.emit('botmessage', formatMsg(botName, 'Welcome to CHORD'));
        socket.broadcast.emit('botmessage', formatMsg(botName, 'A User joined the chat!'));
        socket.on('chatMessage', msg => {
            io.emit('message', formatMsg(Name, msg));
        });
    })
    socket.on('disconnect', () => {
        io.emit('botmessage', formatMsg(botName, 'A User has left the chat.'));
    })
})
const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => console.log(`server running on port ${PORT}`));