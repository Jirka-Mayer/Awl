let math = require("mathjs")
let awlParser = require("../assets/compiled/parser.js")

class ExpressionSolver
{
    construct()
    {

    }

    solve(expressionString)
    {
        if (!expressionString.trim())
            return

        let original = awlParser.parse(expressionString)
        let simplified = math.simplify(original)

        if (original.toString() === simplified.toString())
            return

        return simplified.toString()
    }
}

module.exports = ExpressionSolver