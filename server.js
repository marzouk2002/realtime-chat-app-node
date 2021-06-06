const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const formatMessage = require('./utils/messages')

const app = express();
const server = http.createServer(app)
const io = socketio(server)
const botname = 'ChatCorde'
// Set static
app.use(express.static(path.join(__dirname, 'public')))

// Run when client connects
io.on('connection', socket => {

    socket.emit('message', new formatMessage(botname, 'welcome to chat'))

    // broadcast when a user connects
    socket.broadcast.emit('message', new formatMessage(botname, 'A user has joined'))

    // broadcast when a user disconnects
    socket.on('disconnect', ()=> {
        io.emit('message', new formatMessage(botname, 'A user has left chat'))
    })

    socket.on('chatMessage', msg => {
        io.emit('message', new fomatMessage('User', msg))
    })
})

const PORT = 3000 || process.env.PORT

server.listen(PORT, ()=> console.log(`Server runnig on port: ${PORT}`))