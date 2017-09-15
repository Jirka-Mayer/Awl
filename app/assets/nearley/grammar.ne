@include "./builders.ne"
@include "./tokens.ne"

start -> _ AS _ {% (d) => d[1] %}

#############
# Operators #
#############

# unary postfix
UPO -> UN %unaryPostfixOperatorToken {% buildUnaryPostfix %}
     | UN                            {% id %}

# infix
IX -> IX _ %infixToken _ UPO {% buildInfix %}
    | UPO                    {% id %}

# multiplication and division
MD -> MD _ %multiplicationToken _ IX {% buildMultiplication %}
    | IX                             {% id %}

# unary prefix
UPR -> %unaryPrefixOperatorToken MD {% buildUnaryPrefix %}
     | MD {% id %}

# addition and subtraction
AS -> AS _ %additionToken _ UPR {% buildAddition %}
    | UPR                       {% id %}

#########
# Units #
#########

# unit = an indivisible part of the expression
UN -> EL  {% id %}
    | F   {% id %}
    | TE  {% id %}
    | TM  {% id %}

# element = even smaller part than a unit (number, var or parentheses)
# exists to prevent ambiguity in tight expression recursion
EL -> P   {% id %}
    | VAR {% id %}
    | N   {% id %}

# parentheses
P -> %leftBraceToken _ AS _ %rightBraceToken {% d => d[2] %}

# functions
F -> %functionToken _ FARGS {% buildFunction %}
   | LOG {% id %}

# func args
FARGS -> %leftBraceToken _ ARGLIST _ %rightBraceToken {% buildFargs %}
       | (  # a unit except for "P"
              VAR {% id %}
            | N   {% id %}
            | F   {% id %}
            | TE  {% id %}
            | TM  {% id %}
         ) {% ([x]) => [x] %}

# list of arguments
ARGLIST -> null
         | AS
         | ARGLIST _ %commaToken _ AS

# logarithm
LOG -> %logToken LOGBASE _ UN {% buildLog %}
     | %logToken _ FARGS {% buildFargLog %}

# logarithm base
LOGBASE -> %baseToken {% buildBase %}

# tight exponentiation
TE -> VAR EX {% buildTightExponentiation %}

# exponent
EX -> %exponentToken {% buildExponent %}

# tight multiplication
TM -> N VAR {% buildTightMultiplication %}
    | EL TE {% buildTightMultiplication %}
    | EL P  {% buildTightMultiplication %}
    | TM P  {% buildTightMultiplication %}

# variable
VAR -> %variableToken {% buildVariable %}

# number
N -> %numberToken {% buildNumber %}

#########
# Utils #
#########

# whitespace
_ -> %whitespaceToken:* {% x => null %}