const ace = require("brace")
require("./theme-awl.js")
require("./mode-awl.js")

const KeyboardHandler = require("./Keyboard/KeyboardHandler.js")
const EventDispatcher = require("../Utilities/EventDispatcher.js")

/**
 * Wrapper for the Ace editor
 */
class Ace
{
    constructor(element)
    {
        this.element = element

        this.editor = ace.edit(this.element)

        this.$setupEditor();

        this.eventDispatcher = new EventDispatcher()
        this.on = this.eventDispatcher.on.bind(this.eventDispatcher)
        this.fire = this.eventDispatcher.fire.bind(this.eventDispatcher)

        // DEBUG
        window.editor = this.editor
    }

    $setupEditor()
    {
        // appearance
        this.editor.setTheme("ace/theme/awl")
        this.editor.session.setMode("ace/mode/awl")
        this.editor.setShowPrintMargin(false)
        this.editor.session.setUseWrapMode(true)

        // create keyboard handler
        this.keyboardHandler = new KeyboardHandler(this)
        this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler)

        // prepare cursor
        this.editor.navigateFileEnd()
        this.editor.focus()

        // disable warning maessage
        this.editor.$blockScrolling = Infinity
    }

    /**
     * Replaces a given row with new content
     */
    replaceRow(row, content)
    {
        let line = this.editor.session.getLine(row)

        this.editor.session.remove({
            start: { row: row, column: 0 },
            end: { row: row, column: line.length}
        })

        this.editor.insert(content)
    }

    /**
     * Returns true if there's nothing selected
     */
    isSelectionEmpty()
    {
        return this.editor.getSelectedText() === ""
    }

    /**
     * Returns true if all curosors are at the end of lines
     */
    areAllCursorsAtTheEndOfLines()
    {
        let ranges = this.editor.selection.getAllRanges()

        for (let i = 0; i < ranges.length; i++)
        {
            let line = this.editor.session.getLine(ranges[i].start.row)

            if (line.length > ranges[i].start.column)
                return false
        }

        return true
    }
}

module.exports = Ace