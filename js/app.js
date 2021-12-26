// add a voting system
//by default the selection is a note, clicking alt+t will change the selected note to code block, todo list, graph etc
// for now disable switching between notes/block/list with code in them
//look at bookmarks for design inspo

let offsetXStart = 0;
let offsetYStart = 0;
let offsetXCurrent = 0;
let offsetYCurrent = 0;
let offsetXEnd = 0;
let offsetYEnd = 0;

let isMouseDown = false;
let isMovingCard = false;
let isResizingCard = false;

selection = document.getElementById("selection");
board = document.getElementById("board");

document.addEventListener('mousedown', e => {
    isMouseDown = true;

    offsetXStart = e.offsetX;
    offsetYStart = e.offsetY;

    if (!isMovingCard && !isResizingCard) {
        selection.style.top = `${offsetYStart}px`;
        selection.style.left = `${offsetXStart}px`;
        board.style.cursor = 'crosshair';
    }
})


document.addEventListener('mouseup', e => {
    isMouseDown = false;

    offsetXEnd = e.offsetX;
    offsetYEnd = e.offsetY;
    
    let width = offsetXEnd - offsetXStart;
    let height = offsetYEnd - offsetYStart;

    selection.style.width = '0px';
    selection.style.height = '0px';

    board.style.cursor = 'default';

    new Note(1, {x: offsetXStart, y: offsetYStart}, {width: width, height: height}, "...");
})


document.addEventListener('mousemove', e => {
    offsetXCurrent = e.offsetX;
    offsetYCurrent = e.offsetY;

    if (isMouseDown && !isMovingCard && !isResizingCard) {
        selection.style.width = `${offsetXCurrent - offsetXStart}px`
        selection.style.height = `${offsetYCurrent - offsetYStart}px`
    }
})

class Note {
    constructor(id, position, size, content) {
        this.id = id;
        this.top = `${position.y}px`;
        this.left = `${position.x}px`;
        this.height = `${size.height}px`;
        this.width = `${size.width}px`;
        this.content = content;
        this.createNote();
    }

    createNote() {
        this.div = document.createElement('div');
        this.div.classList.add('note');
        
        this.div.style.top = this.top;
        this.div.style.left = this.left;
        this.div.style.height = this.height;
        this.div.style.width = this.width;

        this.menu = document.createElement('div');
        this.menu.classList.add('menu');

        this.close = document.createElement('div');
        this.close.classList.add('close')

        this.icon = document.createElement('i');
        this.icon.classList.add('fas', 'fa-times');
        
        this.close.appendChild(this.icon);
        this.menu.appendChild(this.close);

        this.textarea = document.createElement('textarea');
        this.textarea.classList.add('text');

        this.resize = document.createElement('div');
        this.resize.classList.add('resize');

        this.div.appendChild(this.menu);
        this.div.appendChild(this.textarea);
        this.div.appendChild(this.resize);

        board.appendChild(this.div);
    }
}