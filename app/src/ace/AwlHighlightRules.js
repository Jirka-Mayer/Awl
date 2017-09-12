const {TextHighlightRules} = ace.require("ace/mode/text_highlight_rules")

const rules = {
"start": [
    {
        token: "operator",
        regex: /[\+\-\*\/\!\=\^]/
    },
    {
        token: "function",
        regex: /choose|C|sin|cos|log|ln/
    },
    {
        token: "constant",
        regex: /pi|e/
    },
    {
        token: "bracket",
        regex: /\(|\)/
    },
    {
        token: "number",
        regex: /(?:\d\d*(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+\b)?/
    },
    {
        token: "variable",
        regex: /[A-Za-z]/,
        next: "variable"
    },
    {
        token: "comment",
        regex: /#.*$/
    }
],
"variable": [
    {
        token: "variable",
        regex: /[A-Za-z]/
    },
    {
        token: "exponent",
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