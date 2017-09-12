describe("Tokenizer", () => {

    beforeAll(() => {

        const editor = require("../support/creates-editor.js")

        // silence warnings from ACE
        console.warn = () => {}

        this.tokenize = (expression) => {
            editor.setValue(expression)
            this.tokens = editor.session.getTokens(0)
            return this.tokens
        }

    })

    this.expectTokens = () => {
        return expect(this.tokens)
    }

    ////////////
    // Basics //
    ////////////

    it("tokenizes empty string", () => {
        this.tokenize("")
        this.expectTokens().toEqual([])
    })

    it("tokenizes whitespace", () => {
        this.tokenize(" \t   ")
        this.expectTokens().toEqual([
            { type: "whitespace", value: " \t   " }
        ])
    })

    /////////////
    // Numbers //
    /////////////

    it("tokenizes integers", () => {
        this.tokenize("56")
        this.expectTokens().toEqual([
            { type: "number", value: "56" }
        ])
    })

    it("tokenizes floats", () => {
        this.tokenize("56.02")
        this.expectTokens().toEqual([
            { type: "number", value: "56.02" }
        ])
    })

    it("tokenizes scientific notation", () => {
        this.tokenize("56.02e-9")
        this.expectTokens().toEqual([
            { type: "number", value: "56.02e-9" }
        ])
    })

    ///////////////
    // Operators //
    ///////////////

    it("tokenizes operators", () => {
        this.tokenize("+")
        this.expectTokens().toEqual([
            { type: "operator", value: "+" }
        ])
    })

    it("tokenizes multicharacter operators", () => {
        this.tokenize("**")
        this.expectTokens().toEqual([
            { type: "operator", value: "**" }
        ])
    })

    ///////////////
    // Variables //
    ///////////////

    it("tokenizes variables", () => {
        this.tokenize("x + a")
        this.expectTokens().toEqual([
            { type: "variable", value: "x" },
            { type: "whitespace", value: " " },
            { type: "operator", value: "+" },
            { type: "whitespace", value: " " },
            { type: "variable", value: "a" }
        ])
    })

    //////////////
    // Funtions //
    //////////////

    it("tokenizes functions", () => {
        this.tokenize("sin")
        this.expectTokens().toEqual([
            { type: "function", value: "sin" }
        ])
    })

    it("doesn't look for function names inside variables", () => {
        this.tokenize("sinniminni minisinni")
        this.expectTokens().toEqual([
            { type: "variable", value: "sinniminni" },
            { type: "whitespace", value: " " },
            { type: "variable", value: "minisinni" }
        ])
    })

    ///////////////
    // Constants //
    ///////////////

    it("tokenizes constants", () => {
        this.tokenize("pi")
        this.expectTokens().toEqual([
            { type: "constant", value: "pi" }
        ])
    })

    /////////////////////////
    // Exponents and bases //
    /////////////////////////

    it("tokenizes exponents", () => {
        this.tokenize("x2")
        this.expectTokens().toEqual([
            { type: "variable", value: "x" },
            { type: "exponent", value: "2" }
        ])
    })

    it("tokenizes bases", () => {
        this.tokenize("log2")
        this.expectTokens().toEqual([
            { type: "function.log", value: "log" },
            { type: "base", value: "2" }
        ])
    })

    //////////////
    // Comments //
    //////////////

    it("tokenizes comments", () => {
        this.tokenize("lorem # comment content")
        this.expectTokens().toEqual([
            { type: "variable", value: "lorem" },
            { type: "whitespace", value: " " },
            { type: "comment", value: "# comment content" }
        ])
    })

})