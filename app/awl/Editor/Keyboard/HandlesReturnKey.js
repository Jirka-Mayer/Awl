class HandlesReturnKey
{
    constructor(ace)
    {
        this.ace = ace
    }

    /**
     * Handle "return key" keypress
     *
     * Called from the KeyboardHandler
     */
    handleKeyPress(keyString, keyCode, e)
    {
        if (e.shiftKey)
            return

        if (!this.$nothingSelected())
            return

        if (!this.$cursorsAtTheEnfOfLine())
            return

        e.preventDefault()

        // start the magic
        this.ace.fire("expressionSubmit")
    }
    
    $nothingSelected()
    {
        return this.ace.editor.getSelectedText() === ""
    }

    $cursorsAtTheEnfOfLine()
    {
        let ranges = this.ace.editor.selection.getAllRanges()

        for (let i = 0; i < ranges.length; i++)
        {
            let line = this.ace.editor.session.getLine(ranges[i].start.row)

            if (line.length > ranges[i].start.column)
                return false
        }

        return true
    }
}

module.exports = HandlesReturnKey