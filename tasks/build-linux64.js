const packager = require("electron-packager")
const path = require("path")

packager({
    arch: "x64",
    name: "Awl",
    dir: path.join(__dirname, ".."),
    platform: "linux",
    asar: true,
    overwrite: true,
    out: path.join(__dirname, "../out"),
    icon: path.join(__dirname, "../app/icon.png"),
    "version-string": {
        ProductName: "Awl",
        CompanyName: "Jirka Mayer"
    }
}, (err, appPath) => {
    if (err) {
        console.log(err)
    }
})