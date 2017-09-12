@{%
const math = require("mathjs")

function buildNumber([token])
{
    return new math.expression.node.ConstantNode(
        parseFloat(token.value)
    )
}

function buildAddition([a, _, operator, __, b])
{
    switch (operator.value)
    {
        case "+":
            return new math.expression.node.OperatorNode(
                "+", "add", [a, b]
            )

        case "-":
            return new math.expression.node.OperatorNode(
                "-", "subtract", [a, b]
            )
    }
}

function buildMultiplication([a, _, operator, __, b])
{
    switch (operator.value)
    {
        case "*":
            return new math.expression.node.OperatorNode(
                "*", "multiply", [a, b]
            )

        case "/":
            return new math.expression.node.OperatorNode(
                "/", "divide", [a, b]
            )
    }
}

const whitespaceToken = { test: x => x.type === "whitespace" }
const numberToken = { test: x => x.type === "number" }
const additionToken = {
    test: x => x.type === "operator" && (x.value === "+" || x.value === "-")
}
const multiplicationToken = {
    test: x => x.type === "operator" && (x.value === "*" || x.value === "/")
}

// SEE:
// https://github.com/Hardmath123/nearley/blob/master/examples/calculator/arithmetic.ne

%}

start -> _ AS _ {% ([_, a, __]) => a %}

# exponents
E -> N {% id %}

# multiplication and division
MD -> MD _ %multiplicationToken _ E {% buildMultiplication %}
    | E                             {% id %}

# addition and subtraction
AS -> AS _ %additionToken _ MD {% buildAddition %}
    | MD                       {% id %}

# number
N -> %numberToken {% buildNumber %}

# whitespace
_ -> %whitespaceToken:* {% x => null %}