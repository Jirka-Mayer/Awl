const math = require("../math.js")

class SymbolResolver
{
    resolveSymbols(parseTree)
    {
        let resolvedAll = true

        let resolvedTree = parseTree.transform((node, path, parent) => {
            if (!node.isSymbolNode)
                return node

            let val = this.symbolValue(node.name)

            if (val === null)
            {
                resolvedAll = false
                return node
            }

            return new math.expression.node.ConstantNode(val)
        })

        return {resolvedTree, resolvedAll}
    }

    symbolValue(name)
    {
        if (name === "pi")
            return 3.14

        if (name === "e")
            return 2.71

        return null
    }
}

module.exports = SymbolResolver