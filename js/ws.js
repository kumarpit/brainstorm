const createBoardButton = document.getElementById('createBoard')
const joinBoardButton = document.getElementById('joinBoard')
const inputVal = document.getElementById('codeInput')

createBoardButton.addEventListener('click', () => {
    socket.emit("createBoard")
    toggleShareIcon();
})

joinBoardButton.addEventListener('click', () => {
    socket.emit("joinBoard", inputVal.value)
    toggleShareIcon();
})

socket.on("boardCode", (code) => {
    console.log(code)
})