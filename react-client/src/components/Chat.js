import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import socketIOClient from "socket.io-client";


const socket = socketIOClient("http://localhost:4000");

function useQuery() {
    return new URLSearchParams(useLocation().search);
}


function Chat() {
    const [ newMsg, setNewMsg ] = useState('')
    const [ users, setUsers ] = useState([])
   
    const locationState = useQuery()
    const room = locationState.get('room')
    const username = locationState.get('username')
    
    const handleSendMessage = (e) => {
        e.preventDefault()
        
        socket.emit('chatMessage', newMsg)
        setNewMsg('')
        e.target.elements.msg.focus()
    }

    const handTypeMsg = (e) => {
        setNewMsg(e.target.value)
    }
    
    
    useEffect(()=> {
        socket.emit('joinRoom', { username, room })

        socket.on('message', message => {
            const chatMessages = document.querySelector('.chat-messages')
            addMessage(message, chatMessages)
            // scrollDown
            chatMessages.scrollTop = chatMessages.scrollHeight
        })

        // Get room and users
        socket.on('roomUsers', ({ users }) => {
            setUsers(users)

        })
    }, [])

    function addMessage(message, chatMessages) {
        const div = document.createElement('div')
        div.classList.add('message')
        div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
        <p class="text">
            ${message.text}
        </p>`
        chatMessages.appendChild(div)
    }


    return (
    <div className="chat-container">
        <header className="chat-header">
            <h1><i className="fas fa-smile"></i> ChatCord</h1>
            <Link to="/" className="btn">Leave Room</Link>
        </header>
        <main className="chat-main">
            <div className="chat-sidebar">
                <h3><i className="fas fa-comments"></i> Room Name:</h3>
                <h2 id="room-name">{room}</h2>
                <h3><i className="fas fa-users"></i> Users</h3>
                <ul id="users">
                    {users.map((user, i) => <li key={i}>{user.username}</li>)}
                </ul>
            </div>
            <div className="chat-messages">
            </div>
        </main>
        <div className="chat-form-container">
            <form onSubmit={handleSendMessage}>
                <input
                id="msg"
                type="text"
                placeholder="Enter Message"
                required
                autoComplete="off"
                onChange={handTypeMsg}
                value={newMsg}
                />
                <button className="btn"><i className="fas fa-paper-plane"></i> Send</button>
            </form>
        </div>
    </div>
    )
}

export default Chat