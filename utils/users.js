const users = []

// join user
function userJoin(id, username, room) {
    users.push({id, username, room})

    return users[users.length - 1]
}

// Get current user
function getCurrentUser(id) {
    return users.find(user => user.id === id)
}

// User leave
function userLeave(id) {
    const index = users.findIndex(user => user.id === id)

    if(index !== -1) {
        return users.splice(index, 1)[0]
    }
}

// Get users room 
function getRoomUsers(room) {
    return users.filter(user => user.room === room)
}

module.exports = { userJoin, getCurrentUser, userLeave, getRoomUsers }