const math = require("../math.js")

class Solution
{
    /**
     * Returns true if the solution is the same as provided
     */
    sameAs(parseTree)
    {
        if (!this.exists())
            return false

        return this.toParseTree().equals(parseTree)
    }

    /**
     * Returns true if the solution exists
     */
    exists()
    {
        return !!this.result
    }

    toParseTree()
    {
        throw new Error("Not overriden")
    }

    toString()
    {
        throw new Error("Not overriden")
    }
}

module.exports = Solution