let drawColor = '#000';
let drawWidth = 2;
let canDraw = false;
let isDrawing = false;

let history = [];
let index = -1;

const canvas = document.getElementById('canvas');
const drawIcon = document.getElementById('draw');
const undo = document.getElementById('undo');
const clear = document.getElementById('clear');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext('2d');
ctx.fillStyle = '#f7f6f3';
ctx.fillRect(0, 0, canvas.width, canvas.height);

drawIcon.addEventListener('click', e => {
    canDraw = !canDraw
    if (canDraw) { 
        drawIcon.style.opacity = 1
        emptyMsg.style.opacity = 0;
    } else {
        drawIcon.style.opacity = 0.4;
        if (noteList.length == 0) emptyMsg.style.opacity = 1;
    }
    isDrawing = false;
});

clear.addEventListener('click', clearCanvas)
undo.addEventListener('click', e => {
    if (index <= 0) clearCanvas();
    else {
        index -= 1;
        history.pop();
        ctx.putImageData(history[index], 0, 0);
    }
})

board.addEventListener('mousedown', toggleDraw);
board.addEventListener('mouseup', toggleDraw);
board.addEventListener('mousemove', draw);

//todo: prevent canvas clear on resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})

function toggleDraw(e) {
    if (canDraw && !isDrawing) {
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }

    if (canDraw && isDrawing) {
        ctx.closePath();
        history.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        index += 1;
    }

    if (canDraw) {
        isDrawing = !isDrawing;
    }
}

function draw(e) {
    if (isDrawing) {
        ctx.lineTo(e.clientX, e.clientY);
        ctx.strokeStyle = drawColor;
        ctx.lineWidth = drawWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
    }
}

function clearCanvas(e) {
    isDrawing = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#f7f6f3';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    history = [];
    index = -1;
}