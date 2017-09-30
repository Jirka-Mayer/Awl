// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }


const math = require("../../math.js")

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




/**
 * Tests if the subject satisfies token properties
 */
function testToken(subject, type, values)
{
    if (subject.type !== type)
        return false

    if (values === undefined)
        return true

    if (typeof(values) === "string")
        values = [values]

    if (values.indexOf(subject.value) === -1)
        return false

    return true
}

/**
 * Creates a token matcher
 */
function token(type, values)
{
    return {
        test: subject => testToken(subject, type, values)
    }
}

/**
 * Create mathcher for many tokens
 * (any one of them may match)
 */
function anyToken(tokens)
{
    return {
        test(subject)
        {
            for (let i = 0; i < tokens.length; i++)
                if (tokens[i].test(subject))
                    return true

            return false
        }
    }
}

///////////////////////
// Token definitions //
///////////////////////

const whitespaceToken = token("whitespace")
const numberToken = token("number")

const additionToken = token("operator", ["+", "-"])
const multiplicationToken = token("operator", ["*", "/"])

const leftBraceToken = token("bracket", "(")
const rightBraceToken = token("bracket", ")")
const commaToken = token("comma")

const infixToken = anyToken([
    token("operator", ["^", "**", "//"]),
    token("function.infix", ["C", "choose", "mod"])
])

const variableToken = anyToken([
    token("variable"),
    token("constant"),
    token("constant.pi"),
    token("constant.e")
])

const exponentToken = token("exponent")

const unaryPrefixOperatorToken = token("operator", ["+", "-"])

const unaryPostfixOperatorToken = token("operator", ["!"])

const functionToken = token("function")

const logToken = token("function.log")
const baseToken = token("base")

var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "start", "symbols": ["_", "AS", "_"], "postprocess": (d) => d[1]},
    {"name": "UPO", "symbols": ["UN", unaryPostfixOperatorToken], "postprocess": buildUnaryPostfix},
    {"name": "UPO", "symbols": ["UN"], "postprocess": id},
    {"name": "IX", "symbols": ["IX", "_", infixToken, "_", "UPO"], "postprocess": buildInfix},
    {"name": "IX", "symbols": ["UPO"], "postprocess": id},
    {"name": "MD", "symbols": ["MD", "_", multiplicationToken, "_", "IX"], "postprocess": buildMultiplication},
    {"name": "MD", "symbols": ["IX"], "postprocess": id},
    {"name": "UPR", "symbols": [unaryPrefixOperatorToken, "MD"], "postprocess": buildUnaryPrefix},
    {"name": "UPR", "symbols": ["MD"], "postprocess": id},
    {"name": "AS", "symbols": ["AS", "_", additionToken, "_", "UPR"], "postprocess": buildAddition},
    {"name": "AS", "symbols": ["UPR"], "postprocess": id},
    {"name": "UN", "symbols": ["EL"], "postprocess": id},
    {"name": "UN", "symbols": ["F"], "postprocess": id},
    {"name": "UN", "symbols": ["TE"], "postprocess": id},
    {"name": "UN", "symbols": ["TM"], "postprocess": id},
    {"name": "EL", "symbols": ["P"], "postprocess": id},
    {"name": "EL", "symbols": ["VAR"], "postprocess": id},
    {"name": "EL", "symbols": ["N"], "postprocess": id},
    {"name": "P", "symbols": [leftBraceToken, "_", "AS", "_", rightBraceToken], "postprocess": d => d[2]},
    {"name": "F", "symbols": [functionToken, "_", "FARGS"], "postprocess": buildFunction},
    {"name": "F", "symbols": ["LOG"], "postprocess": id},
    {"name": "FARGS", "symbols": [leftBraceToken, "_", "ARGLIST", "_", rightBraceToken], "postprocess": buildFargs},
    {"name": "FARGS$subexpression$1", "symbols": ["VAR"], "postprocess": id},
    {"name": "FARGS$subexpression$1", "symbols": ["N"], "postprocess": id},
    {"name": "FARGS$subexpression$1", "symbols": ["F"], "postprocess": id},
    {"name": "FARGS$subexpression$1", "symbols": ["TE"], "postprocess": id},
    {"name": "FARGS$subexpression$1", "symbols": ["TM"], "postprocess": id},
    {"name": "FARGS", "symbols": ["FARGS$subexpression$1"], "postprocess": ([x]) => [x]},
    {"name": "ARGLIST", "symbols": []},
    {"name": "ARGLIST", "symbols": ["AS"]},
    {"name": "ARGLIST", "symbols": ["ARGLIST", "_", commaToken, "_", "AS"]},
    {"name": "LOG", "symbols": [logToken, "LOGBASE", "_", "UN"], "postprocess": buildLog},
    {"name": "LOG", "symbols": [logToken, "_", "FARGS"], "postprocess": buildFargLog},
    {"name": "LOGBASE", "symbols": [baseToken], "postprocess": buildBase},
    {"name": "TE", "symbols": ["VAR", "EX"], "postprocess": buildTightExponentiation},
    {"name": "EX", "symbols": [exponentToken], "postprocess": buildExponent},
    {"name": "TM", "symbols": ["N", "VAR"], "postprocess": buildTightMultiplication},
    {"name": "TM", "symbols": ["EL", "TE"], "postprocess": buildTightMultiplication},
    {"name": "TM", "symbols": ["EL", "P"], "postprocess": buildTightMultiplication},
    {"name": "TM", "symbols": ["TM", "P"], "postprocess": buildTightMultiplication},
    {"name": "VAR", "symbols": [variableToken], "postprocess": buildVariable},
    {"name": "N", "symbols": [numberToken], "postprocess": buildNumber},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", whitespaceToken], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": x => null}
]
  , ParserStart: "start"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
