class HandlesTabKey
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
    handleKeyPress(e, preventDefault)
    {
        if (!this.ace.isSelectionEmpty())
            return

        if (!this.ace.areAllCursorsAtTheEndOfLines())
            return

        // prevent default for each cursor
        let cursorCount = this.ace.editor.selection.getAllRanges().length
        for (let i = 0; i < cursorCount; i++)
            preventDefault()

        // start the magic
        this.ace.fire("showAlternativeSolution")
    }
}

module.exports = HandlesTabKey