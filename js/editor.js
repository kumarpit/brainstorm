function initTextarea(id) {
    var quill = new Quill(`#${id}`, {
        modules: {
            toolbar: [
              ['bold', 'italic', 'underline'],
              ['image', 'code-block']
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
            // "header",
            "indent", 
            // "list", <-- commented-out to suppress auto bullets
            "align", 
            "direction", 
            "code-block", 
            "formula", 
            "image",
            "video"
        ],
        theme: 'bubble'
    });
}