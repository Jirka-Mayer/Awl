const nearley = require("nearley")
const grammar = require("../../app/assets/compiled/grammar.js")

describe("Parser", () => {

    beforeAll(() => {

        const editor = require("../support/creates-editor.js")

        // silence warnings from ACE
        console.warn = () => {}

        this.tokenize = (expression) => {
            editor.setValue(expression)
            this.tokens = editor.session.getTokens(0)
            return this.tokens
        }

        this.parse = (expression) => {
            let tokens = this.tokenize(expression)
            let parser = new nearley.Parser(
                nearley.Grammar.fromCompiled(grammar)
            )
            parser.feed(tokens)
            this.parserResult = parser.results[0]
            return this.parserResult
        }

    })

    this.expectResult = (expected) => {
        expect(this.parserResult.toString()).toBe(expected)
    }

    it("parses numbers", () => {
        this.parse("1")
        this.expectResult("1")

        this.parse("1.8")
        this.expectResult("1.8")

        this.parse("1.8e-9")
        this.expectResult("1.8e-9")
    })

    it("parses addition", () => {
        this.parse("1 + 2")
        this.expectResult("1 + 2")

        this.parse("42 + 50 - 8")
        this.expectResult("42 + 50 - 8")
    })

    it("parses multiplication", () => {
        this.parse("1 * 2")
        this.expectResult("1 * 2")

        this.parse("1 * 2 * 3")
        this.expectResult("1 * 2 * 3")

        this.parse("42 + 50 * 8")
        this.expectResult("42 + 50 * 8")

        this.parse("42 * 50 + 8")
        this.expectResult("42 * 50 + 8")
    })

})