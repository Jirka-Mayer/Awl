const electronInstaller = require("electron-winstaller")
const path = require("path")

let resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: path.join(__dirname, "../out/awl-win32-ia32"),
    outputDirectory: path.join(__dirname, "../out/win-installer-ia32"),
    authors: "Jirka Mayer",
    exe: "Awl.exe",
    setupExe: "AwlSetup.exe",
    setupIcon: path.join(__dirname, "../app/assets/icon.ico"),
    noMsi: true
})

resultPromise.then(() => {
    console.log("Installer has been created.")
}, (e) => {
    console.log(`Error: ${e.message}`)
})