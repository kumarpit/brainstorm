function initTextarea(id) {
    var quill = new Quill(`#${id}`, {
        modules: {
            syntax: true,
            toolbar: [
                [{ 'header': [1, 2, 3, false] }, 'bold', 'italic', 'underline', 'strike', 'image', 'video', 'code-block'],
            ],
        },
        formats : [
            "background",
            "bold", 
            "color", 
            "font", 
            "code", 
            "italic", 
            "link", 
            "size", 
            "strike", 
            "script",
            "underline", 
            "blockquote", 
            "header",
            "indent", 
            // "list", <-- commented-out to suppress auto bullets
            "align", 
            "direction", 
            "code-block", 
            "formula", 
            "image",
            "video"
        ],
        // placeholder: 'share your idea...',
        theme: 'bubble'
    });

    quill.focus();
    return quill;
}