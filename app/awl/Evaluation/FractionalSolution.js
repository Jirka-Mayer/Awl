const DecimalSolution = require("./DecimalSolution.js")
const math = require("../math.js")

class FractionalSolution extends DecimalSolution
{
    constructor(parseTree)
    {
        super(parseTree)

        if (this.result === null)
            return

        // source string
        this.source = this.result.toString()
        
        // if anything goes wrong, we don't have a solution
        this.result = null

        this.$formatRepeatingDigits()

        if (this.result !== null)
            this.result = math.fraction(this.result)
    }

    $formatRepeatingDigits()
    {
        let decimalPoint = this.source.indexOf(".")

        if (decimalPoint === -1)
            return

        if (this.source.length < this.$precision() - 2)
            return

        this.beforePoint = this.source.substr(0, decimalPoint)
        this.afterPoint = this.source.substr(decimalPoint + 1)

        // remove last digit, may be rounded
        this.afterPoint = this.afterPoint.substr(0, this.afterPoint.length - 1)

        this.$findRepetition()
    }

    $findRepetition()
    {
        for (
            let periodLength = 1;
            periodLength < this.afterPoint.length / 2 + 1;
            periodLength++
        )
        {
            let period = this.afterPoint.substr(0, periodLength)

            if (this.$testPeriod(period))
            {
                // we have a solution!
                this.period = period
                this.result = this.beforePoint + ".(" + this.period + ")"
                return
            }
        }
    }

    $testPeriod(period)
    {
        let myDecimal = ""
        for (let i = 0; i < this.afterPoint.length / period.length + 1; i++)
            myDecimal += period
        myDecimal = myDecimal.substr(0, this.afterPoint.length)

        return myDecimal === this.afterPoint
    }

    $precision()
    {
        return math.config().precision
    }

    toParseTree()
    {
        return new math.parse(this.toString())
    }

    toString()
    {
        return math.format(this.result, { fraction: "ratio" })
    }
}

module.exports = FractionalSolution