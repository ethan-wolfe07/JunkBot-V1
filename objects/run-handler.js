const path = require('path')
const fs = require('fs')

module.exports.run = (client) => {
    const baseFile = 'handler.js'
    const commandBase = require(`./${baseFile}`)

    const commands = []

    const readCommands = directory => {
        const files = fs.readdirSync(path.join(__dirname, directory))
        for (const file of files) {
             if (file !== baseFile && file !== 'run-handler.js') {
                const option = require(path.join(__dirname, directory, file))
                commands.push(file)
                if(client) {
                    commandBase(client, option)
                }
            }
        }
    }

    ['./Information', './Fun'].forEach((folder) => readCommands(folder));

    return commands
}