require("ace-builds/src/ace.js")
require("./ace/theme-awl.js")
require("./ace/mode-awl.js")

const solveExpressionCommand = require("./ace/solve-expression-command.js")
const AwlKeyboardHandler = require("./ace/AwlKeyboardHandler.js")

///////////////
// Bootstrap //
///////////////

// create the editor
const editor = ace.edit("editor")

// set editor theme and mode
editor.setTheme("ace/theme/awl")
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
