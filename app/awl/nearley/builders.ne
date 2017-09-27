@{%

const math = require("../math.js")

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

        case "mod":
            return new math.expression.node.FunctionNode("mod", [a, b])
    }
}

function buildVariable([token])
{
    if (token.value === "version")
    {
        return new math.expression.node.ConstantNode(
            "Awl " + require("../../../package.json").version +
            " </> Math.js " + math.version +
            " </> Ace.js " + ace.version
        )
    }

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
            return new math.expression.node.OperatorNode(
                "+",
                "unaryPlus",
                [a]
            )

        case "-":
            return new math.expression.node.OperatorNode(
                "-",
                "unaryMinus",
                [a]
            )
    }
}

function buildUnaryPostfix([a, operator])
{
    switch (operator.value)
    {
        case "!":
            return new math.expression.node.OperatorNode(
                "!",
                "factorial",
                [a]
            )
    }
}

function buildFunction([token, _, args])
{
    switch (token.value)
    {
        case "ln":
            return new math.expression.node.FunctionNode(
                "log",
                [
                    args[0],
                    new math.expression.node.SymbolNode("e")
                ]
            )

        default:
            return new math.expression.node.FunctionNode(
                token.value,
                args
            )
    }
}

function buildFargs([_1, _2, args, _3, _4])
{
    // empty agument list
    if (args.length === 0)
        return []

    let outArgs = []

    let flatten = ([a, _5, _6, _7, b]) => {
        if (a instanceof Array)
            flatten(a)
        else
            return outArgs.push(a)

        outArgs.push(b)
    }

    flatten(args)

    return outArgs
}

function buildLog([_, base, __, arg])
{
    return new math.expression.node.FunctionNode("log", [arg, base])
}

function buildFargLog([_, __, args])
{
    if (args.length == 0)
        throw new Error("Log has to have some arguments.")

    if (args.length == 1)
        return new math.expression.node.FunctionNode(
            "log",
            [args[0], new math.expression.node.ConstantNode(10)]
        )

    if (args.length == 2)
        return buildLog([null, args[0], null, args[1]])

    throw new Error("Log has to have at most 2 arguments.")
}

function buildBase([token])
{
    return new math.expression.node.ConstantNode(
        parseFloat(token.value)
    )
}

%}