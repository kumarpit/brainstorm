const http = require('http').createServer();
const io = require('socket.io')(http, {
    cors: {origin: "*"}
});

io.on('connection', socket => {
    console.log('NEW WS CONNECTION')
})

http.listen(8080, () => console.log('LISTENING ON http://localhost:8080')) 
