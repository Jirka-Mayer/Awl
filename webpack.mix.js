let mix = require("laravel-mix")

mix.stylus("app/assets/stylus/window.styl", "app/electron/resources/window.css")
mix.stylus("app/assets/stylus/awl.styl", "app/electron/resources/awl.css")
mix.stylus("app/assets/stylus/ace-theme-awl.styl", "app/electron/resources/ace-theme-awl.css")
mix.copyDirectory("app/assets/fonts/fira-code", "app/electron/resources/fira-code")

// build for browsers
mix.js("app/awl/Awl.js", "app/electron/resources/awl.js")

// mix settings
mix.setPublicPath(".")