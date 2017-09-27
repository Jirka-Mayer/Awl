const {TextHighlightRules} = ace.acequire("ace/mode/text_highlight_rules")

const constants = [
    "pi", "e", "PI", "E", "phi", "tau",
    "null", "NaN", "Infinity",
    "version"
]

const functions = [
    "ln", "exp",
    "sin", "cos", "tan",
    "asin", "acos", "atan",
    "floor", "ceil", "gcd",
    "gcd", "random", "randomInt"
]

const numberRegex = /(?:\d\d*(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+\b)?/

const rules = {
"start": [
    {
        token: "whitespace",
        regex: /\s+/
    },
    {
        token: "operator",
        regex: /[\+\-\*\/\!\=\^\<\>]/
    },
    {
        token: "function",
        regex: new RegExp("(" + functions.join("|") + ")(?=[^A-Za-z]|$)")
    },
    {
        token: "function.infix",
        regex: /(choose|C|mod)(?=[^A-Za-z]|$)/
    },
    {
        token: "function.log",
        regex: /log$/
    },
    {
        token: "function.log",
        regex: /log(?=[^A-Za-z]|$)/,
        next: "base"
    },
    {
        token: "constant",
        regex: new RegExp("(" + constants.join("|") + ")$")
    },
    {
        token: "constant",
        regex: new RegExp("(" + constants.join("|") + ")(?=[^A-Za-z]|$)"),
        next: "exponent"
    },
    {
        token: "bracket",
        regex: /[\(\)\[\]\{\}]/
    },
    {
        token: "comma",
        regex: /[\,]/
    },
    {
        token: "number",
        regex: numberRegex
    },
    {
        token: "variable",
        regex: /[A-Za-z]+$/
    },
    {
        token: "variable",
        regex: /[A-Za-z]+/,
        next: "exponent"
    },
    {
        token: "comment",
        regex: /#.*$/
    }
],
"exponent": [
    {
        token: "exponent",
        regex: numberRegex,
        next: "start"
    },
    {
        regex: /(?=.)/,
        next: "start"
    }
],
"base": [
    {
        token: "base",
        regex: numberRegex,
        next: "start"
    },
    {
        regex: /(?=.)/,
        next: "start"
    }
]
}

class AwlHighlightRules extends TextHighlightRules
{
    constructor()
    {
        super()

        this.$rules = rules
    }
}

module.exports = AwlHighlightRules