require("ace-builds/src/ace.js")
require("ace-builds/src/theme-monokai.js")
require("./ace/AwlMode.js")

const solveExpressionCommand = require("./ace/solve-expression-command.js")
const AwlKeyboardHandler = require("./ace/AwlKeyboardHandler.js")

///////////////
// Bootstrap //
///////////////

// create the editor
const editor = ace.edit("editor")

// set editor theme and mode
editor.setTheme("ace/theme/monokai")
editor.session.setMode("ace/mode/awl")

// register command for solving expressions
editor.commands.addCommand(solveExpressionCommand)

// register awl keyboard handler
editor.keyBinding.addKeyboardHandler(new AwlKeyboardHandler(editor))

// prepare cursor
editor.navigateFileEnd()
editor.focus()

// access for debugging
window.editor = editor
