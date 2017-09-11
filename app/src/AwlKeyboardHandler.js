let HandlesReturnKey = require("./HandlesReturnKey.js")

class AwlKeyboardHandler
{
    constructor(editor)
    {
        this.$editor = editor

        this.handlesReturnKey = new HandlesReturnKey(editor)
    }

    handleKeyboard(data, hashId, keyString, keyCode, e)
    {
        if (keyString === "return")
            this.handlesReturnKey.handleKeyPress(
                keyString, keyCode, e
            )
    }
}

module.exports = AwlKeyboardHandler