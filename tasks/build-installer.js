const electronInstaller = require("electron-winstaller")
const path = require("path")

let resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: path.join(__dirname, "../out/awl-win32-x64"),
    outputDirectory: path.join(__dirname, "../out/win-installer-x64"),
    authors: "Jirka Mayer",
    exe: "Awl.exe",
    setupExe: "AwlSetup.exe",
    noMsi: true
})

resultPromise.then(() => {
    console.log("Installer has been created.")
}, (e) => {
    console.log(`Error: ${e.message}`)
})