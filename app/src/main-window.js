require("ace-builds/src/ace.js")
require("ace-builds/src/theme-monokai.js")

let solveExpressionCommand = require("./solve-expression-command.js")
let AwlKeyboardHandler = require("./AwlKeyboardHandler.js")

///////////////
// Bootstrap //
///////////////

// create the editor
let editor = ace.edit("editor")

// set editor theme
editor.setTheme("ace/theme/monokai")

// register command for solving expressions
editor.commands.addCommand(solveExpressionCommand)

// register awl keyboard handler
editor.keyBinding.addKeyboardHandler(new AwlKeyboardHandler(editor))

// prepare cursor
editor.navigateFileEnd()
editor.focus()

// access for debugging
window.editor = editor
