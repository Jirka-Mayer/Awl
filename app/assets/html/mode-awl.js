define("ace/mode/awl_highlight_rules", function(require, exports, module) {
    var oop = require("../lib/oop")
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules

    var AwlHighlightRules = function() {

       this.$rules = {
            "start" : [
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
            "variable" : [
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
    }

    oop.inherits(AwlHighlightRules, TextHighlightRules)

    exports.AwlHighlightRules = AwlHighlightRules
})


define("ace/mode/awl", function(require, exports, module) {
    var oop = require("../lib/oop")
    var TextMode = require("./text").Mode
    var AwlHighlightRules = require("./awl_highlight_rules").AwlHighlightRules

    var Mode = function() {
        this.HighlightRules = AwlHighlightRules;
    }
    oop.inherits(Mode, TextMode)

    ;(function() {
        this.getNextLineIndent = function(state, line, tab) {
            return this.$getIndent(line)
        }
        this.checkOutdent = function(state, line, input) {}
        this.autoOutdent = function(state, doc, row) {}
        this.createWorker = function(session) {
            var worker = new WorkerClient(["ace"], "ace/mode/mynew_worker", "NewWorker")
            worker.attachToDocument(session.getDocument())
            worker.on("errors", function(e) {
                session.setAnnotations(e.data)
            })
            return worker
        }
    }).call(Mode.prototype)

    exports.Mode = Mode
})