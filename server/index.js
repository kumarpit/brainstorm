const http = require('http').createServer();
const io = require('socket.io')(http, {
    cors: {origin: "*"}
});
const { makeId } = require('./utils')

const boards = {} //{ socketId : board# }

io.on('connection', socket => {
    console.log('NEW WS CONNECTION')
    socket.on('joinBoard', handleJoinBoard)
    socket.on('createBoard', handleCreateBoard)

    function handleJoinBoard(code) {
        const room = io.sockets.adapter.rooms.has(code)
        if (room) {
            boards[socket.id] = code
            socket.join(code)
            console.log(`${socket.id} joined board ${code}`)
            console.log(boards)
        } else console.log('board no exist')
    }

    function handleCreateBoard() {
        let boardCode = makeId(7)
        boards[socket.id] = boardCode
        socket.emit('boardCode', boardCode)
        socket.join(boardCode)

        console.log(`board ${boardCode} created`)
        console.log(`${socket.id} joined board ${boardCode}`)
    }
})

http.listen(8080, () => console.log('LISTENING ON http://localhost:8080')) 
