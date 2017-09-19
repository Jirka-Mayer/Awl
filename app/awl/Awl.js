const Ace = require("./Ace.js")

class Awl
{
    constructor(element)
    {
        if (typeof(element) === "string")
            element = document.querySelector(element)

        if (!element)
            throw new Error("Element not found")

        this.$el = element
        this.buildDOM()

        this.ace = new Ace(this.$refs.ace)
    }

    buildDOM()
    {
        this.$el.className += " " + "awl"

        this.$el.innerHTML = `
            <div class="ace"></div>
        `

        this.$refs = {
            ace: this.$el.querySelector(".ace")
        }
    }
}

// register on the window if loaded in browser
if (window)
    window.Awl = Awl

module.exports = Awl