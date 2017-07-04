/**
 * Todo:
 * - Functions (cos pi ; f(x))
 * - Floats
 */

{
    // alias
    const math = mathjs // via "--dependency"

    function buildInteger(text)
    {
        return new math.expression.node.ConstantNode(parseInt(text, 10))
    }

    function buildSymbol(name)
    {
        return new math.expression.node.SymbolNode(name)
    }

    ///////////////
    // Operators //
    ///////////////

    function buildAddition(a, operator, b)
    {
        switch (operator)
        {
            case "+":
                return new math.expression.node.OperatorNode("+", "add", [a, b])

            case "-":
                return new math.expression.node.OperatorNode("-", "subtract", [a, b])
        }
    }

    function buildMultiplication(a, operator, b)
    {
        switch (operator)
        {
            case "*":
                return new math.expression.node.OperatorNode("*", "multiply", [a, b])

            case "/":
                return new math.expression.node.OperatorNode("/", "divide", [a, b])
        }
    }

    function buildUnary(operator, a)
    {
        switch (operator)
        {
            case "+":
                return new math.expression.node.OperatorNode("+", "unaryPlus", [a])

            case "-":
                return new math.expression.node.OperatorNode("-", "unaryMinus", [a])
        }
    }

    function buildInfix(a, operator, b)
    {
        switch (operator)
        {
            case "^":
                return new math.expression.node.OperatorNode("^", "pow", [a, b])

            case "**":
                return new math.expression.node.OperatorNode("^", "pow", [a, b])

            case "//":
                return new math.expression.node.FunctionNode("nthRoot", [b, a])

            case "choose":
                return new math.expression.node.FunctionNode("combinations", [a, b])

            case "C":
                return new math.expression.node.FunctionNode("combinations", [a, b])
        }
    }

    function buildPostfix(a, operator)
    {
        switch (operator)
        {
            case "!":
                return new math.expression.node.OperatorNode("!", "factorial", [a])
        }
    }
}

Start
    = Addition

Addition
    = head:Unary tail:(_ AdditiveOperator Unary)* {
        var foo = tail.reduce(function(body, item) {
            return buildAddition(body, item[1], item[2])
        }, head)
        return foo
    }
    / Unary

Unary
    = _ o:UnaryOperator _ a:Multiplication {
        return buildUnary(o, a)
    }
    / Multiplication

Multiplication
    = a:Infix _ o:MultiplicativeOperator _ b:Multiplication {
        return buildMultiplication(a, o, b)
    }
    / _ a:IntegerText_NoWhitespace b:(SymbolPower_NoWhitespace / Symbol_NoWhitespace) {
        return buildMultiplication(buildInteger(a), "*", b)
    }
    / Infix

Infix
    = a:Postfix _ o:InfixOperator _ b:Infix {
        return buildInfix(a, o, b)
    }
    / SymbolPower_NoWhitespace
    / Postfix

SymbolPower_NoWhitespace
    = a:Symbol b:IntegerText_NoWhitespace {
        return buildInfix(a, "^", buildInteger(b))
    }

Postfix
    = a:Primary _ o:PostfixOperator {
        return buildPostfix(a, o)
    }
    / Primary

Primary
    = Constant
    / Symbol
    / Factor

Constant
    = Integer

Symbol
    = _ sym:Symbol_NoWhitespace {
        return sym
    }

Symbol_NoWhitespace
    = _ ([A-Za-z]+ ("_" IntegerText_NoWhitespace)?) {
        return buildSymbol(text().trim())
    }

Factor
    = "(" _ a:Start _ ")" {
        return a
    }

////////////////
// Base units //
////////////////

IntegerText_NoWhitespace
    = [0-9]+ {
        return text()
    }

Integer
    = _ t:IntegerText_NoWhitespace {
        return buildInteger(t)
    }

_ "whitespace"
    = [ \t\n\r]*

//////////////////////
// List definitions //
//////////////////////

AdditiveOperator
    = "+"
    / "-"

MultiplicativeOperator
    = "*"
    / "/"

UnaryOperator
    = "+"
    / "-"

InfixOperator
    = "^"
    / "**"
    / "//"
    / "choose"
    / "C"

PostfixOperator
    = "!"