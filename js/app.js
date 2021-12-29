let offsetXStart = 0;
let offsetYStart = 0;
let offsetXCurrent = 0;
let offsetYCurrent = 0;
let offsetXEnd = 0;
let offsetYEnd = 0;

let isMouseDown = false;
let isMovingCard = false;
let isResizingCard = false;
// let canDraw = false;
// let isDrawing = false;
// let isDrawing = false;

// let localStorageNotes = JSON.parse(localStorage.getItem('notes')) || [];
let localStorageNotes = [];
let noteList = [];

selection = document.getElementById("selection");
board = document.getElementById("board");
emptyMsg = document.getElementById("empty");

document.addEventListener('mousedown', e => {
    isMouseDown = true;

    offsetXStart = e.offsetX;
    offsetYStart = e.offsetY;

    if (!isMovingCard && !isResizingCard && !canDraw) {
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

    if (width > 50 && height > 50 && !isMovingCard && !isResizingCard && !canDraw) {
        let note = new Note(`note_${Date.now()}`, {x: offsetXStart, y: offsetYStart}, {width: width, height: height}, "");
        noteList.push(note);
        emptyMsg.style.opacity = 0;
        // updateLocalStorage();
    }
})


document.addEventListener('mousemove', e => {
    offsetXCurrent = e.offsetX;
    offsetYCurrent = e.offsetY;

    if (isMouseDown && !isMovingCard && !isResizingCard && !canDraw) {
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

function updateLocalStorage(){  
    if (localStorage.getItem('notes') != JSON.stringify(noteList)) {
        localStorage.setItem('notes', JSON.stringify(noteList)); 
    } 
};


for (const note of localStorageNotes) {
    let storedNote = new Note(note.id, note.position, note.size, note.content, note.currentColor, note.currentColorVal);
    noteList.push(storedNote);
}

if (localStorageNotes.length == 0) emptyMsg.style.opacity = 1;