const Ace = require("./Editor/Ace.js")
const Tokenizer = require("./Tokenization/Tokenizer.js")
const Parser = require("./Parsing/Parser.js")
const Evaluator = require("./Evaluation/Evaluator.js")
const InfoBar = require("./InfoBar.js")

class Awl
{
    constructor(element)
    {
        this.$findElement(element)
        this.$buildDOM()

        this.ace = new Ace(this.refs.ace)
        
        this.tokenizer = new Tokenizer(this.ace)
        this.parser = new Parser(this.tokenizer)
        this.evaluator = new Evaluator(this.ace, this.parser)

        this.infoBar = new InfoBar()

        this.$registerEvents()
    }

    $findElement(element)
    {
        if (typeof(element) === "string")
            element = document.querySelector(element)

        if (!element)
            throw new Error("Element not found")

        this.element = element
    }

    $buildDOM()
    {
        this.element.className += " " + "awl"

        this.element.innerHTML = `
            <div class="ace"></div>
        `

        this.refs = {
            ace: this.element.querySelector(".ace")
        }
    }

    $registerEvents()
    {
        this.ace.on(
            "expressionSubmit",
            this.onExpressionSubmit.bind(this)
        )
        
        this.ace.on(
            "showAlternativeSolution",
            this.onShowAlternativeSolution.bind(this)
        )
    }

    ////////////////////
    // Event handlers //
    ////////////////////
    
    onExpressionSubmit()
    {
        this.ace.editor.forEachSelection(() => {
            this.evaluator.evaluateRow(this.ace.editor.selection.lead.row)
        })
    }

    onShowAlternativeSolution()
    {
        this.ace.editor.forEachSelection(() => {
            this.evaluator.showAlternativeSolution(
                this.ace.editor.selection.lead.row
            )
        })
    }
}

// register on the window if loaded in browser
if (window)
    window.Awl = Awl

module.exports = Awl