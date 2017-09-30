const nearley = require("nearley")
const grammar = require("./nearley/grammar.js")
const InputNotParsedException = require("../Exceptions/InputNotParsedException.js")
const InputAmbiguousException = require("../Exceptions/InputAmbiguousException.js")

class Parser
{
    constructor(tokenizer)
    {
        this.tokenizer = tokenizer
    }

    parse(row)
    {
        let tokens = this.tokenizer.getTokens(row)

        let parser = new nearley.Parser(
            nearley.Grammar.fromCompiled(grammar)
        )

        let lastSensiblePosition = 0
        for (let i = 0; i < tokens.length; i++)
        {
            parser.feed([tokens[i]])
            
            if (parser.results.length > 0)
                lastSensiblePosition = i
        }

        if (parser.results.length === 0)
            throw new InputNotParsedException(lastSensiblePosition)

        if (parser.results.length > 1)
            throw new InputAmbiguousException(parser.results)

        return parser.results[0]
    }
}

module.exports = Parser