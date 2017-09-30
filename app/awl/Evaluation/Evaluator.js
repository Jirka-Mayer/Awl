const FractionalSolution = require("./FractionalSolution.js")
const DecimalSolution = require("./DecimalSolution.js")
const SimplifiedSolution = require("./SimplifiedSolution.js")

class Evaluator
{
    constructor(ace, parser)
    {
        this.ace = ace
        this.parser = parser
    }

    /**
     * Evaluates row and prints output
     *
     * Called on row submit
     */
    evaluateRow(row)
    {
        let solutions = this.$solveRow(row)

        if (solutions.items.length === 0)
        {
            console.log("No solution")
            this.$printEmptySolution()
            return
        }

        let solution = solutions.items[0]

        // maybe check for any solution and not just the first one?

        if (solution.sameAs(solutions.original))
        {
            console.log("Not able to simplify further.")
            this.$printEmptySolution()
            return
        }

        this.$printNewSolution(solution)
    }

    /**
     * Show alternative solution for a given row
     *
     * Call on tab press
     */
    showAlternativeSolution(row)
    {
        let solutions = this.$solveRow(row)

        let current = null
        for (let i = 0; i < solutions.items.length; i++)
        {
            if (solutions.items[i].sameAs(solutions.original))
            {
                current = i
                break
            }
        }

        if (current === null || solutions.items.length <= 1)
        {
            console.log("No alternative solution")
            return
        }

        this.$printAlternativeSolution(
            row,
            solutions.items[(current + 1) % solutions.items.length]
        )
    }

    $solveRow(row)
    {
        let parseTree = this.parser.parse(row)
        let items = []
        const types = [
            FractionalSolution,
            DecimalSolution,
            //SimplifiedSolution
        ]

        for (let t in types)
        {
            let solution = new types[t](parseTree)
            if (solution.exists())
                items.push(solution)
        }

        return {
            original: parseTree,
            items: items
        }
    }

    //////////////
    // Printing //
    //////////////

    $printNewSolution(solution)
    {
        this.ace.editor.insert("\n" + solution.toString())
    }

    $printAlternativeSolution(row, solution)
    {
        console.log("Solution type:", solution)

        this.ace.replaceRow(row, solution.toString())
    }

    $printEmptySolution()
    {
        this.ace.editor.insert("\n")
    }
}

module.exports = Evaluator