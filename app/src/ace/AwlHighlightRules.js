const {TextHighlightRules} = ace.require("ace/mode/text_highlight_rules")

const rules = {
"start": [
    {
        token: "whitespace",
        regex: /\s+/
    },
    {
        token: "operator",
        regex: /[\+\-\*\/\!\=\^]/
    },
    {
        token: "function",
        regex: /(choose|C|sin|cos|ln)(?=[^A-Za-z]|$)/
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
        regex: /(pi|e)(?=[^A-Za-z]|$)/,
        next: "exponent"
    },
    {
        token: "bracket",
        regex: /[\(\)\[\]\{\}]/
    },
    {
        token: "number",
        regex: /(?:\d\d*(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+\b)?/
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
        regex: /[0-9]+/,
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
        regex: /[0-9]+/,
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