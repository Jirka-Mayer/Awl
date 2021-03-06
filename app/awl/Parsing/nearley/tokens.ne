@{%

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

%}