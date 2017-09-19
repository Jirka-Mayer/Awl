const packager = require("electron-packager")
const path = require("path")

packager({
    arch: "x64",
    name: "Awl",
    dir: path.join(__dirname, ".."),
    platform: "win32",
    asar: true,
    overwrite: true,
    out: path.join(__dirname, "../out"),
    icon: path.join(__dirname, "../app/icon.ico"),
    "version-string": {
        ProductName: "Awl",
        CompanyName: "Jirka Mayer"
    }
}, (err, appPath) => {
    if (err) {
        console.log(err)
    }
})