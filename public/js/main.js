const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const roomName = document.getElementById('room-name')
const userList = document.getElementById('users')

// get user name and room from url
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});


const socket = io()

// join chatroom
socket.emit('joinRoom', { username, room })

// join Chatroom
socket.on('message', message => {
    outputMessage(message)

    // scrollDown
    chatMessages.scrollTop = chatMessages.scrollHeight
})

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room)
    outputRoomUsers(users)
})

// message to server
chatForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const msg = e.target.elements.msg.value

    socket.emit('chatMessage', msg)
    e.target.elements.msg.value=''
    e.target.elements.msg.focus()
})

// Output message to DOM
function outputMessage(message) {
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`
    document.querySelector('.chat-messages').appendChild(div)
}

// add room name to DOM
function outputRoomName(room) {
    roomName.innerHTML = room
}

function outputRoomUsers(users) {
    userList.innerHTML = `
        ${users.map(user => `<li>${user.username}</li>`).join("")}
    `;
}