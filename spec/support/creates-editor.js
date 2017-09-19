const {JSDOM} = require("jsdom")

/*
    MAGIC!
    don't touch this

    - ACE thinks global is window
    - JSDOM thinks dom.window is window
    - ACE loads via AMD under CommonJS
    - ACE thinks it's running in a browser, but it doesn't

    Update:
    - ACE is loaded via "brace" - even greater madness

    ¯\_(ツ)_/¯
 */

const dom = new JSDOM(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Awl testing</title>
    </head>
    <body>
        <div id="editor"></div>
    </body>
    </html>
`)

global.document = dom.window.document
global.window = global

require("brace")
require("../../app/awl/ace/mode-awl.js")

const editor = global.ace.edit("editor")
editor.session.setMode("ace/mode/awl")

module.exports = editor