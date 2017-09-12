const {TextHighlightRules} = ace.require("ace/mode/text_highlight_rules")

const rules = {
"start": [
    {
        // operator
        token: "keyword",
        regex: /[\+\-\*\/\!\=\^]|choose|C|sin|cos/
    },
    {
        // bracket
        token: "bracket",
        regex: /\(|\)/
    },
    {
        // constant
        token: "constant.numeric",
        regex: /(?:\d\d*(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+\b)?/
    },
    {
        // variable
        token: "support.constant",
        regex: /[A-Za-z]/,
        next: "variable"
    },
    {
        // comment
        token: "comment",
        regex: /#.*$/
    }
],
"variable": [
    {
        // variable
        token: "support.constant",
        regex: /[A-Za-z]/
    },
    {
        // exponent
        token: "keyword",
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