import MediumEditor from 'medium-editor'

module.exports = function(){
this.classList.add('escondido')
 var editorArea = new MediumEditor('.editorArea', {
 toolbar: {
        /* These are the default options for the toolbar,
           if nothing is passed this is what is used */
        allowMultiParagraphSelection: true,
        buttons: ['h2', 'bold', 'italic', 'underline', 'unorderedlist'],
        diffLeft: 0,
        diffTop: -10,
        firstButtonClass: 'medium-editor-button-first',
        lastButtonClass: 'medium-editor-button-last',
        relativeContainer: document.getElementById('editorMenu'),
        standardizeSelectionStart: false,
        static: false,
        /* options which only apply when static is true */
        align: 'center',
        sticky: false,
        updateOnEmptySelection: false
    }
})
 
}