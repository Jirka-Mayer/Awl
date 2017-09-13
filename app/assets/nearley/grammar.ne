@include "./builders.ne"
@include "./tokens.ne"

start -> _ AS _ {% (d) => d[1] %}

# unary postfix
UPO -> UN %unaryPostfixOperatorToken {% buildUnaryPostfix %}
     | UN                            {% id %}

# infix
IX -> IX _ %infixToken _ UPO {% buildInfix %}
    | TE                     {% id %}
    | UPO                    {% id %}

# multiplication and division
MD -> MD _ %multiplicationToken _ IX {% buildMultiplication %}
    | TM                             {% id %}
    | IX                             {% id %}

# unary prefix
UPR -> %unaryPrefixOperatorToken MD {% buildUnaryPrefix %}
     | MD {% id %}

# addition and subtraction
AS -> AS _ %additionToken _ UPR {% buildAddition %}
    | UPR                       {% id %}

# tight exponentiation
TE -> VAR EX {% buildTightExponentiation %}

# exponent
EX -> %exponentToken {% buildExponent %}

# tight multiplication
TM -> N VAR {% buildTightMultiplication %}
    | UN TE {% buildTightMultiplication %}
    | UN P  {% buildTightMultiplication %}

# unit = number, variable or parentheses
UN -> P   {% id %}
    | N   {% id %}
    | VAR {% id %}

# parentheses
P -> %leftBraceToken _ AS _ %rightBraceToken {% d => d[2] %}

# variable
VAR -> %variableToken {% buildVariable %}

# number
N -> %numberToken {% buildNumber %}

# whitespace
_ -> %whitespaceToken:* {% x => null %}