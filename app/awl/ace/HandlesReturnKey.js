class HandlesReturnKey
{
    constructor(editor)
    {
        this.$editor = editor
    }

    handleKeyPress(keyString, keyCode, e)
    {
        if (e.shiftKey)
            return

        if (!this.$nothingSelected())
            return

        if (!this.$cursorsAtTheEnfOfLine())
            return

        e.preventDefault()

        this.$editor.forEachSelection(
            this.$editor.commands.byName["solveExpression"]
        )
    }

    $nothingSelected()
    {
        return this.$editor.getSelectedText() === ""
    }

    $cursorsAtTheEnfOfLine()
    {
        let ranges = this.$editor.selection.getAllRanges()

        for (let i = 0; i < ranges.length; i++)
        {
            let line = this.$editor.session
                .getLine(ranges[i].start.row)

            if (line.length > ranges[i].start.column)
                return false
        }

        return true
    }
}

module.exports = HandlesReturnKey