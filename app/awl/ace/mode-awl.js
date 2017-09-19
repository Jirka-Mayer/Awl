const TextMode = ace.acequire("ace/mode/text").Mode
const AwlHighlightRules = require("./AwlHighlightRules.js")

class AwlMode extends TextMode
{
    constructor()
    {
        super()

        this.HighlightRules = AwlHighlightRules
    }

    getNextLineIndent(state, line, tab)
    {
        return this.$getIndent(line)
    }

    checkOutdent(state, line, input) {}

    autoOutdent(state, doc, row) {}

    createWorker(session)
    {
        // look at docs to find out
        // what is a worker for
        return null

        var worker = new WorkerClient(["ace"], "ace/mode/mynew_worker", "NewWorker")
        worker.attachToDocument(session.getDocument())
        worker.on("errors", function(e) {
            session.setAnnotations(e.data)
        })
        return worker
    }
}

// register as ace module
ace.define("ace/mode/awl", function(require, exports, module) {
    exports.Mode = AwlMode
})

// export as commonJS module
module.exports = AwlMode