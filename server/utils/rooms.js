const rooms = []

// add room
function addRoom(username, roomname) {
    const newroom = { 
        room: roomname,
        RoomMaster: username,
        opponent: '',
        isFinish: false
    }
    const indexRoom = rooms.findIndex(room => room.room === roomname)
    if (indexRoom !== -1) {
        rooms[indexRoom] = newroom
        rooms.push(newroom)
        return newroom
    } else {
        rooms.push(newroom)
        return newroom
    }
}

// join room
function joinRoom(username, roomname) {
    const newroom = rooms.find(room => room.room === roomname)
    if (newroom !== undefined) {
        newroom.opponent = username
        const indexRoom = rooms.findIndex(room => room.room === roomname)
        rooms[indexRoom] = newroom
        return newroom
    } else {
        const error = {
            name: 'error',
            msg: 'room not found'
        }
        return error
    }
    
}

function getCurrentRoom(roomname) {
    return rooms.find(room => room.room === roomname)
}


module.exports = {
    addRoom,
    joinRoom,
    getCurrentRoom
}