const InputNotParsedException = require("../Exceptions/InputNotParsedException.js")
const InputAmbiguousException = require("../Exceptions/InputAmbiguousException.js")

class ExceptionHandler
{
    construtor(ace)
    {
        this.ace = ace
    }

    handle(e)
    {
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

        let o ="#" + pointer + "\n" +
               "# Parsing error\n" +
               "#\n"

       this.ace.editor.session.insert(o)
    }

    $handleAmbiguousInput(e)
    {
        let o ="#\n" +
               "# Input is ambiguous\n" +
               "#\n"

       this.ace.editor.session.insert(o)
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

        let o ="#" + pointer + "\n" +
               "# Unexpected token: " + tokenIdentifier + "\n" +
               "#\n"

       this.ace.editor.session.insert(o)
    }

    $handleUnknownException(e)
    {
        console.error(e)
        
        let o ="#\n" +
               "# Exception: " + e.message + "\n" +
               "#\n"

       this.ace.editor.session.insert(o)
    }
}

module.exports = ExceptionHandler