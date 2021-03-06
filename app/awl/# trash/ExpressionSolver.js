const math = require("./math.js")
const nearley = require("nearley")
const grammar = require("./nearley/grammar.js")
const PostTokenizer = require("./PostTokenizer.js")

const InputEmptyException = require("./Exceptions/InputEmptyException.js")
const NoDifferenceException = require("./Exceptions/NoDifferenceException.js")
const InputNotParsedException = require("./Exceptions/InputNotParsedException.js")
const InputAmbiguousException = require("./Exceptions/InputAmbiguousException.js")

class ExpressionSolver
{
    constructor(editor)
    {
        this.$editor = editor
    }

    solve(row)
    {
        try
        {
            this.$getTokens(row)
            
            this.$parse()

            this.$simplify()

            return this.$print()
        }
        catch (e)
        {
            return this.$handleError(e)
        }
    }

    $getTokens(row)
    {
        // tokenize
        this.tokens = this.$editor.session.getTokens(row)

        // post tokenize
        this.tokens = (new PostTokenizer(this.tokens)).run()

        // if empty
        if (this.tokens.length === 0)
            throw new InputEmptyException()
    }

    $parse()
    {
        let parser = new nearley.Parser(
            nearley.Grammar.fromCompiled(grammar)
        )

        let lastSensiblePosition = 0
        for (let i = 0; i < this.tokens.length; i++)
        {
            parser.feed([this.tokens[i]])
            
            if (parser.results.length > 0)
                lastSensiblePosition = i
        }

        if (parser.results.length === 0)
            throw new InputNotParsedException(lastSensiblePosition)

        if (parser.results.length > 1)
            throw new InputAmbiguousException(parser.results)

        this.parsed = parser.results[0]
    }

    $simplify()
    {
        /*
            Try to evaluate. If not possible because
            of symbols, try to simplify then
         */
        try
        {
            this.simplified = this.parsed.eval()
        }
        catch (e)
        {
            if (e.message.match("Undefined symbol"))
                this.simplified = math.simplify(this.parsed)
            else
                throw e
        }

        // debug
        window.result = this.simplified
        window.parsed = this.parsed

        if (math.format(this.simplified) === math.format(this.parsed))
            throw new NoDifferenceException()
    }

    $print()
    {
        return math.format(this.simplified, { fraction: "ratio" })
        // "ratio" or "decimal"
    }

    $handleError(e)
    {
        // for debugging
        window.e = e

        if (e instanceof InputEmptyException)
            return null

        if (e instanceof NoDifferenceException)
            return null

        if (e instanceof InputNotParsedException)
            return this.$handleInputNotParsed(e)

        if (e instanceof InputAmbiguousException)
            return this.$handleAmbiguousInput(e)

        if ("offset" in e && "token" in e)
            return this.$handleUnexpectedToken(e)

        return this.$handleUnknownException(e)
    }

    $handleInputNotParsed(e)
    {
        let column = 0

        for (let i = 0; i < e.lastSensiblePosition; i++)
            column += this.tokens[i].value.length

        let pointer = ""
        for (let i = 1; i < column; i++)
            pointer += " "
        for (let i = e.lastSensiblePosition; i < this.tokens.length; i++)
            for (let j = 0; j < this.tokens[i].value.length; j++)
                pointer += "^"

        return "#" + pointer + "\n" +
               "# Parsing error\n" +
               "#\n"
    }

    $handleAmbiguousInput(e)
    {
        return "#\n" +
               "# Input is ambiguous\n" +
               "#\n"
    }

    $handleUnexpectedToken(e)
    {
        let token = e.token.value
        let column = 0

        for (let i = 0; i < e.offset; i++)
            column += this.tokens[i].value.length

        let pointer = ""
        for (let i = 1; i < column; i++)
            pointer += " "
        for (let i = 0; i < token.value.length; i++)
            pointer += "^"

        let tokenIdentifier = token.type + " '" + token.value + "'"

        return "#" + pointer + "\n" +
               "# Unexpected token: " + tokenIdentifier + "\n" +
               "#\n"
    }

    $handleUnknownException(e)
    {
        console.error(e)
        
        return "#\n" +
               "# Exception: " + e.message + "\n" +
               "#\n"
    }
}

module.exports = ExpressionSolver