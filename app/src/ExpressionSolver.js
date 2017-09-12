let math = require("mathjs")
let awlParser = require("../assets/compiled/parser.js")

class ExpressionSolver
{
    constructor(editor)
    {
        this.$editor = editor
    }

    solve(row)
    {
        let expression = this.$editor.session.getLine(row)
        let tokens = this.$editor.session.getTokens(row)

        if (!expression.trim())
            return

        let original, simplified

        try
        {
            original = awlParser.parse(expression)
            simplified = math.simplify(original)
        }
        catch (e)
        {
            if (e instanceof awlParser.SyntaxError)
                return this.$handleSyntaxError(e)

            throw e
        }

        if (original.toString() === simplified.toString())
            return

        return simplified.toString()
    }

    $handleSyntaxError(e)
    {
        let pointer = ""
        let i = 1

        for (; i < e.location.start.column; i++)
            pointer += " "

        for (; i < e.location.end.column; i++)
            pointer += "^"

        pointer = "#" + pointer.substr(1)

        return pointer + "\n# " + e.message + "\n#\n"
    }
}

module.exports = ExpressionSolver