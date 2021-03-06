const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const PORT = process.env.PORT || 3000
const cors = require('cors')
const { userJoin } = require('./utils/users')
const { addRoom, joinRoom, getCurrentRoom } = require('./utils/rooms')

app.use(cors())

io.on('connection', (socket) => {
    socket.on('join-room', (newUser) => {
        const userNew = userJoin(socket.id, newUser.name, newUser.room)
        const roomNew = joinRoom(newUser.name, newUser.room)
        socket.join(userNew.room)
        io.to(userNew.room).emit('join', roomNew)
        socket.on('send-answer', (payload) => {
            io.to(userNew.room).emit('listen-answer', payload)
        })
        socket.on('send-winner', (payload) => {
            io.to(userNew.room).emit('listen-winner', payload)
        })
    })
    socket.on('add-room', (newUser) => {
        const userNew = userJoin(socket.id, newUser.name, newUser.room)
        const roomNew = addRoom(newUser.name, newUser.room)
        socket.join(userNew.room)
        io.to(userNew.room).emit('add', roomNew)
        socket.on('send-answer', (payload) => {
            io.to(userNew.room).emit('listen-answer', payload)
        })
        socket.on('send-winner', (payload) => {
            io.to(userNew.room).emit('listen-winner', payload)
        })
    })
})

server.listen(PORT, () => {
    console.log('Socket.id server running on port 3000')
})

// const express = require('express');
// const cors = require('cors');
// const router = require('./routes/index');

// const app = express();

// const PORT = process.env.PORT || 3000;

// app.use(express.urlencoded({extended: true}));
// app.use(express.json());
// app.use(cors());

// app.use('/', router);

// app.listen(PORT, () => {
//     console.log(`Server is running at PORT ${PORT}`);
// });