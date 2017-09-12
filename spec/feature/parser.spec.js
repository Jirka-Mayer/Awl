const nearley = require("nearley")
const grammar = require("../../app/assets/compiled/grammar.js")

describe("Parser", () => {

    it("does something", () => {

        const parser = new nearley.Parser(
            nearley.Grammar.fromCompiled(grammar)
        )

        parser.feed(["print", 12, ";;"])

        console.log(parser.results)

        expect(true).toBe(true)

    })

})