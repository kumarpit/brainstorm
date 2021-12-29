let drawColor = '#000';
let drawWidth = 2;
let canDraw = false;
let isDrawing = false;

const canvas = document.getElementById('canvas');
const drawIcon = document.getElementById('draw');
const undo = document.getElementById('undo');
const clear = document.getElementById('clear');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext('2d');
ctx.fillStyle = '#f2f2f2';
ctx.fillRect(0, 0, canvas.width, canvas.height);

drawIcon.addEventListener('click', e => {
    canDraw = !canDraw
    canDraw ? drawIcon.style.opacity = 1 : drawIcon.style.opacity = 0.4;
    isDrawing = false;
});

clear.addEventListener('click', e => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#f2f2f2';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    isDrawing = false;
})

document.addEventListener('mousedown', toggleDraw);
document.addEventListener('mousemove', draw);

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
    }

    if (canDraw) isDrawing = !isDrawing;
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