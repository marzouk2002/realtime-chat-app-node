const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const formatMessage = require('./utils/messages')
const  { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users')
const app = express();
const server = http.createServer(app)
const io = socketio(server)
const botname = 'ChatCorde'
// Set static
app.use(express.static(path.join(__dirname, 'public')))

// Run when client connects
io.on('connection', socket => {
    console.log(socket.id)
    // join room
    socket.on('joinRoom', ({username, room }) => {
        const user = userJoin(socket.id, username, room)

        socket.join(user.room)
        // welcomming
        socket.emit('message', new formatMessage(botname, 'welcome to chat'))
        
        // broadcast when a user connects
        socket.broadcast.to(user.room).emit('message', new formatMessage(botname, `${user.username} has joined`))

        // chat
        socket.on('chatMessage', msg => {
            io.emit('message', new formatMessage(user.username, msg))
        })

        // Send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })

        // broadcast when a user disconnects
        socket.on('disconnect', ()=> {
            const user = userLeave(socket.id)

            if(user) {
                io.to(user.room).emit('message', new formatMessage(botname, `${user.username} has left chat`))

                io.to(user.room).emit('roomUsers', {
                    room: user.room,
                    users: getRoomUsers(user.room)
                })
            }
        })
    })
})

const PORT = 4000 || process.env.PORT

server.listen(PORT, ()=> console.log(`Server runnig on port: ${PORT}`))