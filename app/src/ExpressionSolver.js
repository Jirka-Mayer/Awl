const math = require("mathjs")
const PostTokenizer = require("../../app/src/PostTokenizer.js")
const nearley = require("nearley")
const grammar = require("../../app/assets/compiled/grammar.js")

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

        if (original.toString() === simplified.toString())
            return

        return simplified.toString()
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
        this.simplified = math.simplify(this.parsed)

        if (this.simplified.toString() === this.parsed.toString())
            throw new NoDifferenceException()
    }

    $print()
    {
        return this.simplified.toString()
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

        throw e
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
}

module.exports = ExpressionSolver