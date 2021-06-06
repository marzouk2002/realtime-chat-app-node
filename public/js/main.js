const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')

// get user name and room from url
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});


const socket = io()

socket.emit('joinRoom', { username, room })

socket.on('message', message => {
    outputMessage(message)

    // scrollDown
    chatMessages.scrollTop = chatMessages.scrollHeight
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