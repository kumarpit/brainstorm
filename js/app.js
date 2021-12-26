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

let noteList = [];


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

    if (!isMovingCard && !isResizingCard) {
        let note = new Note(Date.now(), {x: offsetXStart, y: offsetYStart}, {width: width, height: height}, "");
        noteList.push(note);
    }
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
        this.position = position;
        this.top = `${position.y}px`;
        this.left = `${position.x}px`;
        this.height = `${size.height}px`;
        this.width = `${size.width}px`;
        this.content = content;
        this.isMoving = false;
        this.isResizing = false;
        this.createNote();
    }

    createNote() {
        this.div = document.createElement('div');
        this.div.classList.add('note');
        
        this.div.style.top = this.top;
        this.div.style.left = this.left;
        this.div.style.height = this.height;
        this.div.style.width = this.width;

        window.addEventListener('mouseup', this.mouseUp.bind(this));

        this.createMenu();
        this.createTextArea();
        this.createResize();

        this.div.appendChild(this.menu);
        this.div.appendChild(this.textarea);
        this.div.appendChild(this.resize);

        board.appendChild(this.div);
    }

    createMenu() {
        this.menu = document.createElement('div');
        this.menu.classList.add('menu');
        this.menu.addEventListener('mousedown', this.moveNoteInit.bind(this));

        this.close = document.createElement('div');
        this.close.classList.add('close')
        this.close.addEventListener('click', this.deleteNote.bind(this));

        this.icon = document.createElement('i');
        this.icon.classList.add('fas', 'fa-times');
        
        this.close.appendChild(this.icon);
        this.menu.appendChild(this.close);
    }

    createTextArea() {
        this.textarea = document.createElement('textarea');
        this.textarea.classList.add('text');
        this.textarea.value = this.content;
        this.textarea.addEventListener('keyup', this.updateText.bind(this));
    }

    createResize() {
        this.resize = document.createElement('div');
        this.resize.classList.add('resize');
        this.resize.addEventListener('mousedown', this.resizeNoteInit.bind(this));
    }

    moveNoteInit(e) {
        isMovingCard = true;
        this.isMoving = true;

        this.menu.style.cursor = 'grabbing';
        this.menu.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'

        this.deltaX = e.clientX - this.position.x;
        this.deltaY = e.clientY - this.position.y;
    }

    moveNote(e) {
        this.div.style.top = `${e.clientY - this.deltaY}px`;
        this.div.style.left = `${e.clientX - this.deltaX}px`;
    }

    resizeNoteInit(e) {
        isResizingCard = true;
        this.isResizing = true;
    }

    resizeNote(e) {
        let nWidth = e.clientX - this.position.x;
        let nHeight = e.clientY - this.position.y;

        this.div.style.width = `${nWidth}px`
        this.div.style.height = `${nHeight}px`
    }

    mouseUp(e) {
        isMovingCard = false;
        isResizingCard = false;
        this.isMoving = false;
        this.isResizing = false;

        this.menu.style.backgroundColor = 'transparent';
        this.menu.style.cursor = 'grab';
    }

    updateText() {
        this.content = this.textarea.value;
    }

    deleteNote() {
        this.div.remove();
    }
}

window.addEventListener('mousemove', e => {
    for (let i = 0; i < noteList.length; i++) {
        if (noteList[i].isMoving) {
            noteList[i].moveNote(e);
        }

        if (noteList[i].isResizing) {
            noteList[i].resizeNote(e);
        }
    }
})