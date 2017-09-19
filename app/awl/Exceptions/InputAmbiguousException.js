class InputAmbiguousException extends Error
{
    constructor(results)
    {
        super()

        this.results = results
    }
}

module.exports = InputAmbiguousException