@{%

const math = require("mathjs")

function buildNumber([token])
{
    return new math.expression.node.ConstantNode(
        parseFloat(token.value)
    )
}

function buildExponent([token])
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

function buildInfix([a, _, operator, __, b])
{
    switch (operator.value)
    {
        case "^":
        case "**":
            return new math.expression.node.OperatorNode("^", "pow", [a, b])

        case "//":
            return new math.expression.node.FunctionNode("nthRoot", [b, a])

        case "choose":
        case "C":
            return new math.expression.node.FunctionNode("combinations", [a, b])
    }
}

function buildVariable([token])
{
    return new math.expression.node.SymbolNode(token.value)
}

function buildTightMultiplication([a, b])
{
    return buildMultiplication([a, null, { value: "*" }, null, b])
}

function buildTightExponentiation([a, b])
{
    return buildInfix([a, null, { value: "**" }, null, b])
}

function buildUnaryPrefix([operator, a])
{
    switch (operator.value)
    {
        case "+":
            return new math.expression.node.OperatorNode("+", "unaryPlus", [a])

        case "-":
            return new math.expression.node.OperatorNode("-", "unaryMinus", [a])
    }
}

function buildUnaryPostfix([a, operator])
{
    switch (operator.value)
    {
        case "!":
            return new math.expression.node.OperatorNode("!", "factorial", [a])
    }
}

%}