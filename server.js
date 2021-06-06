const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')

const app = express();
const server = http.createServer(app)
const io = socketio(server)
// Set static
app.use(express.static(path.join(__dirname, 'public')))

// Run when client connects
io.on('connection', socket => {
    console.log("new user connected")

    socket.emit('message', 'welcome to chat')

    // broadcast when a user connects
    socket.broadcast.emit('message', 'A user has joined')

    // broadcast when a user disconnects
    socket.on('disconnect', ()=> {
        io.emit('message', 'A user has left chat')
    })

    socket.on('chatMessage', msg => {
        console.log(msg)
    })
})

const PORT = 3000 || process.env.PORT

server.listen(PORT, ()=> console.log(`Server runnig on port: ${PORT}`))