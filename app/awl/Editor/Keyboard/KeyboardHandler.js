let HandlesReturnKey = require("./HandlesReturnKey.js")
let HandlesTabKey = require("./HandlesTabKey.js")

class KeyboardHandler
{
    constructor(ace)
    {
        this.ace = ace

        this.indentsToBePrevented = 0

        this.handlesReturnKey = new HandlesReturnKey(this.ace)
        this.handlesTabKey = new HandlesTabKey(this.ace)

        this.$makeIndentationPreventable()
    }

    /**
     * Handles keyboard event
     *
     * Called by the Ace editor
     */
    handleKeyboard(data, hashId, keyString, keyCode, e)
    {
        if (keyString === "return")
            this.handlesReturnKey.handleKeyPress(keyString, keyCode, e)

        if (keyString === "tab")
        {
            this.handlesTabKey.handleKeyPress(e, () => {
                this.indentsToBePrevented += 1
            })
        }
    }

    /**
     * When user presses tab, it triggers the "indent" command
     * even if I e.preventDefault() the event. So this is a workaround
     * to prevent the command from being fired
     *
     * Also allow buffering of many prevents since when multiple curosors are
     * involved, they're handled in parallel or something. It just
     * works this way
     */
    $makeIndentationPreventable()
    {
        let command = this.ace.editor.commands.byName["indent"]

        let originalExec = command.exec.bind(command)

        command.exec = (editor) => {
            if (this.indentsToBePrevented > 0)
            {
                this.indentsToBePrevented -= 1
                return
            }

            originalExec(editor)
        }
    }
}

module.exports = KeyboardHandler