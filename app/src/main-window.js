require("ace-builds/src/ace.js")
require("ace-builds/src/theme-monokai.js")

var math = require("mathjs")
var awlParser = require("../compiled/parser.js")

/////////////
// Testing //
/////////////

//var expression = awlParser.parse("1 + -3x3 + x")
//expression = math.simplify(expression)
//console.log(expression.toString())
//console.log(expression.eval())
//console.log(expression)


//////////////////
// Editor stuff //
//////////////////

var editor = ace.edit("editor")
editor.setTheme("ace/theme/monokai")
var editorSession = editor.getSession()

;+function() {
    var row = editorSession.getLength() - 1
    var column = editorSession.getLine(row).length // or simply Infinity
    editor.gotoLine(row + 1, column)

    editor.focus()
}()

function lineSubmitted(lineNumber)
{
    var original = awlParser.parse(editorSession.getLine(lineNumber))
    var simplified = math.simplify(original)

    if (original.toString() == simplified.toString())
        return

    editorSession.insert({
        row: lineNumber + 1,
        column: 0
    }, simplified.toString())

    // go, where no man has dared to go. To the end of the line!
    var row = editorSession.getLength() - 1
    var column = editorSession.getLine(row).length // or simply Infinity
    editor.gotoLine(row + 1, column)
}

editorSession.on("change", (e) => {
    if (e.action == "insert" && e.start.row == e.end.row - 1)
    {
        /*
            Later:
            catch keyboard event instead
            I cannot check for shift here
         */

        if (e.lines.length != 2)
            return

        if (e.lines[0] != "" || e.lines[1] != "")
            return

        // but escape if the new line is not empty
        // (enter wasn't hit at the end of the line)
        if (editorSession.getLine(e.end.row) != "")
            return

        if (editorSession.getLine(e.start.row) == "")
            return

        //console.log(e)
        //console.log("Enter on line: " + e.start.row)
        lineSubmitted(e.start.row)
    }
})