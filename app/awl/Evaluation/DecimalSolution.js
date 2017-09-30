const Solution = require("./Solution.js")
const math = require("../math.js")

class DecimalSolution extends Solution
{
    constructor(parseTree)
    {
        super()

        this.result = parseTree.eval()
    }

    toParseTree()
    {
        return new math.expression.node.ConstantNode(
            this.result.toString(),
            "number"
        )
    }

    toString()
    {
        return this.result.toString()
    }
}

module.exports = DecimalSolution