let ExpressionSolver = require("../ExpressionSolver.js")

/**
 * The command for solving an expression
 * (called, when return pressed)
 */
module.exports = {
    name: "solveExpression",
    
    // command is called via API, not keybinds
    bindKey: {
        win: null,
        mac: null
    },

    exec: function(editor) {
        
        let row = editor.selection.lead.row
        
        let solver = new ExpressionSolver(editor)
        let response = solver.solve(row)

        if (!response)
            response = ""

        editor.insert("\n" + response)

    },
    readOnly: false
}