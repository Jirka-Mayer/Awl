const Solution = require("./Solution.js")
const math = require("../math.js")

class SimplifiedSolution extends Solution
{
    constructor(parseTree)
    {
        super()

        this.result = math.simplify(parseTree)
    }

    sameAs(that)
    {
        return this.toString() === that.toString()
    }

    exists()
    {
        return true
    }

    toString()
    {
        return this.result.toString()
    }
}

module.exports = SimplifiedSolution