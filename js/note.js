class Note {
    constructor(id, position, size, content, color = "", colorVal = 0) {
        this.id = id;
        this.position = position;
        this.size = size;
        this.content = content;
        this.isMoving = false;
        this.isResizing = false;
        this.colorOptionOpen = false;
        this.colorOptions = [];
        this.currentColor = color;
        this.currentColorVal = colorVal;
        this.createNote();
    }

    createNote() {
        this.div = document.createElement('div');
        this.div.classList.add('note');
        
        this.div.style.top = `${this.position.y}px`;
        this.div.style.left = `${this.position.x}px`;
        this.div.style.height = `${this.size.height}px`;
        this.div.style.width = `${this.size.width}px`;

        if (this.currentColor != "") this.div.style.backgroundColor = this.currentColor;

        window.addEventListener('mouseup', this.mouseUp.bind(this));

        this.createMenu();
        this.createColorOptionBar();
        this.createTextArea();
        this.createResize();

        this.div.appendChild(this.menuContainer);
        this.div.appendChild(this.colorOptionBar);
        this.div.appendChild(this.textarea);
        this.div.appendChild(this.resize);

        board.appendChild(this.div);
    
        this.editor = initTextarea(this.id);
        this.editor.root.innerHTML = this.content;
        this.editor.on('text-change', this.updateText.bind(this));
    }

    createMenu() {
        this.menuContainer = document.createElement('div');
        this.menuContainer.classList.add('menu-container');

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
        this.optionIcon.classList.add('far', 'fa-caret-square-down');
        
        this.options.appendChild(this.optionIcon);
        this.close.appendChild(this.icon);
        this.menuContainer.appendChild(this.close);
        this.menuContainer.appendChild(this.menu);
        this.menuContainer.appendChild(this.options);
    }

    createColorOptionBar() {
        this.colorOptionBar = document.createElement('div');
        this.colorOptionBar.classList.add('modal');

        // if (this.currentColor !== "") {
        //     this.colorOptionBar.style.backgroundColor = this.currentColor;
        //     this.colorOptionBar.style.borderColor = this.currentColor;
        // }

        // let checkIcon = document.createElement('i');
        // checkIcon.classList.add('fas', 'fa-check');
        
        for (let i = 0; i <= 5; i++) {
            let color = document.createElement('div');
            color.classList.add('color', 'c'+i.toString());

            color.addEventListener('click', this.getBgColor.bind(this));
            this.colorOptions.push(color);
            this.colorOptionBar.appendChild(color);
            // if (i !== this.currentColorVal) this.colorOptionBar.appendChild(color);
        }

//         this.currentColorVal != 0 ? this.menuContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.035)' :
//         this.menuContainer.style.backgroundColor = 'transparent';
    }

    createTextArea() {
        this.textarea = document.createElement('div');
        this.textarea.setAttribute('id', `${this.id}`);
        this.textarea.classList.add('text');
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
        this.size.width = e.clientX - this.position.x;
        this.size.height = e.clientY - this.position.y;
        this.div.style.width = `${this.size.width}px`
        this.div.style.height = `${this.size.height}px`
    }

    mouseUp(e) {
        isMovingCard = false;
        isResizingCard = false;
        this.isMoving = false;
        this.isResizing = false;
        this.menu.style.cursor = 'grab';
        updateLocalStorage();
    }

    updateText() {
        this.content = this.editor.root.innerHTML;
        console.log(this.content)
        updateLocalStorage();
    }

    deleteNote() {
        noteList = noteList.filter(note => {
            return note.id != this.id
        })

        updateLocalStorage();
        this.div.remove();
        if (noteList.length == 0) emptyMsg.style.opacity = 1;
    }

    toggleOptionsModal() {
        this.colorOptionOpen ? this.colorOptionBar.style.display = 'none' : 
        this.colorOptionBar.style.display = 'flex';
        this.colorOptionOpen = !this.colorOptionOpen;
        this.optionIcon.classList.toggle('fa-caret-square-up');
    }

    getBgColor(e) {
        this.currentColor = window.getComputedStyle(e.target).backgroundColor;
        this.div.style.backgroundColor = this.currentColor;

        // this.colorOptionBar.style.backgroundColor = this.currentColor;
        // this.colorOptionBar.style.borderColor = this.currentColor;

        // for (let i = 0; i < this.colorOptions.length; i++) {
        //     if (this.colorOptions[i].firstChild) {
        //         this.colorOptions[i].removeChild(this.colorOptions[i].firstChild);
        //     }
        // }

        this.currentColorVal = parseInt(e.target.classList[1].slice(-1));
//         this.currentColorVal != 0 ? this.menuContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.025)' :
//         this.menuContainer.style.backgroundColor = 'transparent';

        // let checkIcon = document.createElement('i');
        // checkIcon.classList.add('fas', 'fa-check');
        // e.target.appendChild(checkIcon);

        updateLocalStorage();
        this.toggleOptionsModal();
    }
}

