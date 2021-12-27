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
        this.colorOptionOpen = false;
        this.colorOptions = [];
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
        this.createColorOptionBar();
        this.createTextArea();
        this.createResize();

        this.div.appendChild(this.menu);
        this.div.appendChild(this.colorOptionBar);
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

        this.options = document.createElement('div');
        this.options.classList.add('options');
        this.options.addEventListener('click', this.toggleOptionsModal.bind(this));

        this.icon = document.createElement('i');
        this.icon.classList.add('fas', 'fa-times');

        this.optionIcon = document.createElement('i');
        this.optionIcon.classList.add('fas', 'fa-chevron-down');
        
        this.options.appendChild(this.optionIcon);
        this.close.appendChild(this.icon);
        this.menu.appendChild(this.close);
        this.menu.appendChild(this.options);
    }

    createColorOptionBar() {
        this.colorOptionBar = document.createElement('div');
        this.colorOptionBar.classList.add('modal');

        let checkIcon = document.createElement('i');
        checkIcon.classList.add('fas', 'fa-check');
        
        for (let i = 0; i <= 5; i++) {
            let color = document.createElement('div');
            color.classList.add('color', 'c'+i.toString());

            if (i == 0) color.appendChild(checkIcon);

            color.addEventListener('click', this.getBgColor.bind(this));
            this.colorOptionBar.appendChild(color);
            this.colorOptions.push(color);
        }
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
        // this.menu.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'

        this.deltaX = e.clientX - this.position.x;
        this.deltaY = e.clientY - this.position.y;
    }

    moveNote(e) {
        this.div.style.top = `${e.clientY - this.deltaY}px`;
        this.div.style.left = `${e.clientX - this.deltaX}px`;
        this.position.x = e.clientX - this.deltaX;
        this.position.y = e.clientY - this.deltaY;
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

    toggleOptionsModal() {
        this.colorOptionOpen ? this.colorOptionBar.style.display = 'none' : 
        this.colorOptionBar.style.display = 'flex';
        this.colorOptionOpen = !this.colorOptionOpen;
    }

    getBgColor(e) {
        this.div.style.backgroundColor = window.getComputedStyle(e.target).backgroundColor;

        for (let i = 0; i < this.colorOptions.length; i++) {
            if (this.colorOptions[i].firstChild) {
                this.colorOptions[i].removeChild(this.colorOptions[i].firstChild);
            }
        }

        let checkIcon = document.createElement('i');
        checkIcon.classList.add('fas', 'fa-check');

        e.target.appendChild(checkIcon);
        this.toggleOptionsModal();
    }
}
