const FractionalSolution = require("../../app/awl/Evaluation/FractionalSolution.js")

describe("FractionalSolution", () => {

    beforeAll(() => {

        const editor = require("../support/creates-editor.js")

        this.solutionOf = (expression) {
            editor.setValue(expression)
        }

    })

    it("fails on integers", () => {
        expect(false).toBeFalse()
    })

})