
const ace = require("brace")
require("./ace/theme-awl.js")
require("./ace/mode-awl.js")

const solveExpressionCommand = require("./ace/solve-expression-command.js")
const AwlKeyboardHandler = require("./ace/AwlKeyboardHandler.js")

/**
 * Wrapper for the Ace editor
 */
class Ace
{
    constructor(element)
    {
        this.editor = ace.edit(element)

        // set editor appearance
        this.editor.setTheme("ace/theme/awl")
        this.editor.session.setMode("ace/mode/awl")
        this.editor.setShowPrintMargin(false)
        this.editor.session.setUseWrapMode(true)

        // register command for solving expressions
        this.editor.commands.addCommand(solveExpressionCommand)

        // register awl keyboard handler
        this.editor.keyBinding.addKeyboardHandler(
            new AwlKeyboardHandler(this.editor)
        )

        // prepare cursor
        this.editor.navigateFileEnd()
        this.editor.focus()

        // access for debugging
        window.editor = this.editor
    }
}

module.exports = Ace