const electronInstaller = require("electron-winstaller")
const path = require("path")

let resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: path.join(__dirname, "../out/Awl-win32-ia32"),
    outputDirectory: path.join(__dirname, "../out/installers/win-installer-ia32"),
    authors: "Jirka Mayer",
    exe: "Awl.exe",
    setupExe: "AwlSetup-ia32.exe",
    setupIcon: path.join(__dirname, "../app/icon.ico"),
    noMsi: true
})

resultPromise.then(() => {
    console.log("Installer has been created.")
}, (e) => {
    console.log(`Error: ${e.message}`)
})