class InputNotParsedException extends Error
{
    constructor(lastSensiblePosition)
    {
        super()

        this.lastSensiblePosition = lastSensiblePosition
    }
}

module.exports = InputNotParsedException