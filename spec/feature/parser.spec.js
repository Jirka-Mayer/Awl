const PostTokenizer = require("../../app/src/PostTokenizer.js")
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
            
            let pt = new PostTokenizer(this.tokens)
            this.tokens = pt.run()

            return this.tokens
        }

        this.parse = (expression) => {
            let tokens = this.tokenize(expression)
            
            let parser = new nearley.Parser(
                nearley.Grammar.fromCompiled(grammar)
            )
            
            parser.feed(tokens)
            this.parserResult = parser.results[0]
            
            expect(parser.results.length).toBe(1, "Ambiguous grammar")

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

    it("handles parentheses in multiplication", () => {
        this.parse("(42 + 50) * 8")
        this.expectResult("(42 + 50) * 8")

        this.parse("(42 * 50) + 8")
        this.expectResult("42 * 50 + 8")
    })

    it("parses infix operators", () => {
        this.parse("5 ** 2")
        this.expectResult("5 ^ 2")

        this.parse("2 // 4")
        this.expectResult("nthRoot(4, 2)")

        this.parse("4 choose 3")
        this.expectResult("combinations(4, 3)")
    })

    it("handles parentheses in infixes", () => {
        this.parse("5 ^ 2 ^ 3")
        this.expectResult("(5 ^ 2) ^ 3")

        this.parse("5 ^ (2 ^ 3)")
        this.expectResult("5 ^ 2 ^ 3")

        this.parse("2 * 2 ^ 3")
        this.expectResult("2 * 2 ^ 3")

        this.parse("(2 * 2) ^ 3")
        this.expectResult("(2 * 2) ^ 3")
    })

    ////////////////////////
    // Fancier operations //
    ////////////////////////

    it("parses unary prefixes", () => {
        this.parse("-5")
        this.expectResult("-5")

        this.parse("-x2")
        this.expectResult("-x ^ 2")

        this.parse("-4x2")
        this.expectResult("-(4 * x ^ 2)")

        this.parse("2 - -5")
        this.expectResult("2 - -5")

        this.parse("2 + -5x")
        this.expectResult("2 + -(5 * x)")
    })

    it("parses unary postfixes", () => {
        this.parse("5!")
        this.expectResult("5!")

        this.parse("2 + 5!")
        this.expectResult("2 + 5!")

        this.parse("5! - 2")
        this.expectResult("5! - 2")

        this.parse("2 * 5!")
        this.expectResult("2 * 5!")

        this.parse("5! * 2")
        this.expectResult("5! * 2")

        this.parse("-5!")
        this.expectResult("-5!")

        this.parse("(x + 1)!")
        this.expectResult("(x + 1)!")

        this.parse("2 ^ 3!")
        this.expectResult("2 ^ 3!")

        this.parse("2! ^ 3")
        this.expectResult("2! ^ 3")
    })

    ///////////////
    // Variables //
    ///////////////

    it("parses variables", () => {
        this.parse("x")
        this.expectResult("x")

        this.parse("x + 5")
        this.expectResult("x + 5")
    })

    it("parses constants as variables", () => {
        this.parse("pi")
        this.expectResult("pi")
    })

    /////////////////////
    // Syntactic hacks //
    /////////////////////

    it("parses tight multiplication", () => {
        this.parse("5x")
        this.expectResult("5 * x")

        this.parse("5(x + 1)")
        this.expectResult("5 * (x + 1)")

        this.parse("a(x + 1)")
        this.expectResult("a * (x + 1)")

        this.parse("(x - 1)(x + 1)")
        this.expectResult("(x - 1) * (x + 1)")
    })

    it("parses tight exponentiation", () => {
        this.parse("x2")
        this.expectResult("x ^ 2")
    })

    it("parses supertight expressions", () => {
        this.parse("4x2")
        this.expectResult("4 * x ^ 2")
    })

    ///////////////
    // Functions //
    ///////////////

    it("parses function", () => {
        this.parse("sin 5")
        this.expectResult("sin(5)")

        this.parse("sin(5)")
        this.expectResult("sin(5)")

        this.parse("sin(5 + x)")
        this.expectResult("sin(5 + x)")

        this.parse("sin x")
        this.expectResult("sin(x)")

        this.parse("sin 2x")
        this.expectResult("sin(2 * x)")

        this.parse("sin x3")
        this.expectResult("sin(x ^ 3)")

        this.parse("sin 2x3")
        this.expectResult("sin(2 * x ^ 3)")

        this.parse("sin 2x3 ^ 2")
        this.expectResult("sin(2 * x ^ 3) ^ 2")

        this.parse("sin 2x(3 ^ 2)")
        this.expectResult("sin(2 * x * 3 ^ 2)")

        this.parse("gcd(5, 6)")
        this.expectResult("gcd(5, 6)")

        this.parse("log2 8")
        this.expectResult("log(8, 2)")

        this.parse("log2 2x3")
        this.expectResult("log(2 * x ^ 3, 2)")

        this.parse("log2(pi)")
        this.expectResult("log(pi, 2)")

        this.parse("log 100")
        this.expectResult("log(100, 10)")

        this.parse("log(a, b)")
        this.expectResult("log(b, a)")
    })
})