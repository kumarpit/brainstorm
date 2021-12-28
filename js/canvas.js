let drawColor = '#000';
let drawWidth = 2;
let canDraw = false;
let isDrawing = false;

const canvas = document.getElementById('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext('2d');
ctx.fillStyle = '#f2f2f2';
ctx.fillRect(0, 0, canvas.width, canvas.height);

const drawIcon = document.getElementById('draw');
drawIcon.addEventListener('click', e => {
    canDraw = !canDraw
    canDraw ? drawIcon.style.opacity = 1 : drawIcon.style.opacity = 0.4;
    isDrawing = false;
});

document.addEventListener('mousedown', toggleDraw);
document.addEventListener('mousemove', draw);

function toggleDraw(e) {
    if (canDraw && !isDrawing) {
        console.log('starting to draw')
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }

    if (canDraw && isDrawing) {
        console.log('stopping to draw')
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