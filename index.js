const express = require('express')
const app = new express()
const http = new require('http')
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)

let amount = 0;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', ( socket ) => { 
    amount ++;
    io.emit('update users', amount)

    socket.on('disconnect', () => {
        amount--;
        io.emit('update users', amount)
    })

    socket.on('chat message', ({ nickname, msg }) => {
        console.log(`${nickname} says: ${msg}`)
        io.emit('chat message', {user: nickname , msg: msg})
    })
})


server.listen(3000, () => {
    console.log('listening on *:3000')
})
