const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const PORT = process.env.PORT || 3000
const cors = require('cors')
const { userJoin } = require('./utils/users')
const { addRoom, joinRoom } = require('./utils/rooms')

app.use(cors())

io.on('connection', (socket) => {
    socket.on('join-room', (newUser) => {
        const userNew = userJoin(socket.id, newUser.name, newUser.room)
        const roomNew = joinRoom(newUser.name, newUser.room)
        console.log(roomNew)
        socket.join(userNew.room)
        io.to(userNew.room).emit('join', roomNew)
    })
    socket.on('add-room', (newUser) => {
        const userNew = userJoin(socket.id, newUser.name, newUser.room)
        const roomNew = addRoom(newUser.name, newUser.room)
        socket.join(userNew.room)
        io.to(userNew.room).emit('add', roomNew)
    })
})

server.listen(PORT, () => {
    console.log('Socket.id server running on port 3000')
})