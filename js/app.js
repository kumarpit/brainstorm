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

    if (width > 50 && height > 50 && !isMovingCard && !isResizingCard) {
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

window.addEventListener('mousemove', e => {
    for (let i = 0; i < noteList.length; i++) {
        if (noteList[i].isMoving) {
            noteList[i].moveNote(e);
            break;
        }

        if (noteList[i].isResizing) {
            noteList[i].resizeNote(e);
            break;
        }
    }
})