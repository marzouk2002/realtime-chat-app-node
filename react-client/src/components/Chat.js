import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Chat() {
    const [ newMsg, setNewMsg ] = useState('') 

    const locationState = useQuery()
    const roomName = locationState.get('room')
    const userName = locationState.get('username')

    const handleSendMessage = (e) => {
        e.preventDefault()
    }

    const handTypeMsg = (e) => {
        setNewMsg(e.target.value)
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
                <h2 id="room-name">{roomName}</h2>
                <h3><i className="fas fa-users"></i> Users</h3>
                <ul id="users">
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