const ExceptionHandler = require("./ExceptionHandler.js")
const SymbolResolver = require("./SymbolResolver.js")
const InputEmptyException = require("../Exceptions/InputEmptyException.js")

class Evaluator
{
    constructor(ace, parser)
    {
        this.ace = ace
        this.parser = parser

        this.exceptionHandler = new ExceptionHandler(this.ace)
        this.symbolResolver = new SymbolResolver()
    }

    /**
     * Evaluates row and prints output
     *
     * Called on row submit
     */
    evaluateRow(row)
    {
        let parseTree

        try
        {
            parseTree = this.parser.parse(row)
        }
        catch (e)
        {
            if (e instanceof InputEmptyException)
            {
                this.$printEmptySolution()
                return
            }

            this.exceptionHandler.handle(e)
            return
        }

        let {resolvedTree, resolvedAll} =
            this.symbolResolver.resolveSymbols(parseTree)

        if (resolvedAll)
        {
            let result = resolvedTree.eval()

            if (math.parse(result.toString()).equals(parseTree))
                this.$printEmptySolution()
            else
                this.$printSolution(result)
        }
        else
        {
            let simplified = math.simplify(resolvedTree)

            if (simplified.equals(parseTree))
                this.$printEmptySolution()
            else
                this.$printSolution(simplified)
        }
    }

    $printSolution(solution)
    {
        this.ace.editor.insert("\n" + solution.toString())
    }

    $printEmptySolution()
    {
        this.ace.editor.insert("\n")
    }
}

module.exports = Evaluator