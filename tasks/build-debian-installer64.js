const installer = require("electron-installer-debian")
const path = require("path")

let options = {
    src: path.join(__dirname, "../out/Awl-linux-x64"),
    dest: path.join(__dirname, "../out/installers/"),
    icon: path.join(__dirname, "../app/icon.png"),
    arch: "amd64"
}

installer(options, function (err) {
    if (err)
    {
        console.error(err, err.stack)
        process.exit(1)
    }

    console.log("Debian installer has been created.")
})