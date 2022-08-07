//express server setup
const express = require('express');
const path = require('path');
const app = express();

//socket io server setup
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);


const formatMessage = require('./utils/formatmessage');
const { userJoin, getCurrentUser,userLeave,getRoomUsers,filteredRoomUsers } = require('./utils/users');

const bodyParser = require("body-parser");


// Set static folder
app.use(express.static(path.join(__dirname, '../public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,"../public/html", "user.html"));
})
app.get('/postuser', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/home.html"));
})

// app.get('/leave', (req, res) => {
//     res.sendFile()
// })

const botname ="WebChat Bot"

io.on('connection', socket => {
    // console.log('New WS Connection...');

    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room);

        socket.join(user.room);
        //welcome current user
        socket.emit("message", formatMessage(botname, "Welcome to WebChat"));
        console.log(username,"joined");

        //Broadcast when a user connects
        socket.broadcast.to(user.room).emit('message', formatMessage(username, ' has joined the chat'));

        //send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room),
            currentuser: getCurrentUser(socket.id)
        });

        //Runs when client disconnects
        socket.on('disconnect', () => {
            const user = userLeave(socket.id);
            if (user) {
                io.to(user.room).emit('message', formatMessage(username, ' has left the chat'));

                io.to(user.room).emit('roomUsers', {
                    room: user.room,
                    users: getRoomUsers(user.room),
                    currentuser: getCurrentUser(socket.id)
                });
            }
        });



        
    });
    

    //listen for chatMessage
    socket.on('chatMessage', (msg, position) => {
        const user = getCurrentUser(socket.id);
    //display message to current user
    socket.emit('send', formatMessage('You',msg), position);
    //display message to other users
    socket.broadcast.to(user.room).emit('send', formatMessage(user.username,msg),'left');
});
    

    
});

const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})