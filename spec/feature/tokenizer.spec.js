const {JSDOM} = require("jsdom")

describe("Tokenizer", () => {

    beforeAll(() => {

        /*
            MAGIC!
            don't touch this

            - ACE thinks global is window
            - JSDOM thinks dom.window is window
            - ACE loads via AMD under CommonJS
            - ACE thinks it's running in a browser, but it doesn't

            ¯\_(ツ)_/¯
         */

        const dom = new JSDOM(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Awl testing</title>
            </head>
            <body>
                <div id="editor"></div>
            </body>
            </html>
        `)

        global.document = dom.window.document
        global.window = global

        require("ace-builds/src/ace.js")
        require("../../app/src/ace/mode-awl.js")

        const editor = global.ace.edit("editor")
        editor.session.setMode("ace/mode/awl")

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

    it("tokenizes empty string", () => {
        this.tokenize("")
        this.expectTokens().toEqual([])
    })

    it("tokenizes whitespace", () => {
        this.tokenize(" \t   ")
        this.expectTokens().toEqual([
            { type: "text", value: " \t   " }
        ])
    })

    it("tokenizes integers", () => {
        this.tokenize("56")
        this.expectTokens().toEqual([
            { type: "number", value: "56" }
        ])
    })

    it("tokenizes operators", () => {
        this.tokenize("+")
        this.expectTokens().toEqual([
            { type: "operator", value: "+" }
        ])
    })

})