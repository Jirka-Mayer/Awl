class PostTokenizer
{
    constructor(tokens)
    {
        this.tokens = tokens.slice()
    }

    run()
    {
        this.$removeComments()
        this.$trim()
        this.$splitBrackets()

        return this.tokens
    }

    /**
     * Remove whitespace tokens on both sides
     */
    $trim()
    {
        if (this.tokens.length > 0)
            if (this.tokens[0].type === "whitespace")
                this.tokens.splice(0, 1)

        let len = this.tokens.length
        if (len > 0)
            if (this.tokens[len - 1].type === "whitespace")
                this.tokens.splice(len - 1, 1)
    }

    /**
     * Remove comment tokens
     */
    $removeComments()
    {
        for (let i = 0; i < this.tokens.length; i++)
        {
            if (this.tokens[i].type === "comment")
            {
                this.tokens.splice(i, 1)
                i--
            }
        }
    }

    /**
     * Splits bracket tokens
     */
    $splitBrackets()
    {
        for (let i = 0; i < this.tokens.length; i++)
        {
            if (this.tokens[i].type !== "bracket")
                continue

            if (this.tokens[i].value.length <= 1)
                continue

            this.tokens.splice(i, 1,
                {
                    type: "bracket",
                    value: this.tokens[i].value[0]
                },
                {
                    type: "bracket",
                    value: this.tokens[i].value.substr(1)
                }
            )
        }
    }
}

module.exports = PostTokenizer