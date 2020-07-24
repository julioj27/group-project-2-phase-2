const rooms = []

// join user
function addRoom(username, roomname) {
    const newroom = { 
        room: roomname,
        RoomMaster: username,
        opponent: ''
    }
    const indexRoom = rooms.findIndex(room => room.room === roomname)
    if (indexRoom !== -1) {
        rooms[indexRoom] = newroom
    }
    rooms.push(newroom)
    console.log(rooms, '<<<<<')

    return newroom
}

function joinRoom(username, roomname) {
    const newroom = rooms.find(room => room.room === roomname)
    if (newroom !== undefined) {
        newroom.opponent = username
        const indexRoom = rooms.findIndex(room => room.room === roomname)
        rooms[indexRoom] = newroom
    }
    return newroom
}

function getCurrentRoom(roomname) {
    return rooms.find(room => room.room === roomname)
}


module.exports = {
    addRoom,
    joinRoom,
    getCurrentRoom
}