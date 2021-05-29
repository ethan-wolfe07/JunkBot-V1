const { blacklistedWords } = require('../../Data/blacklisted-words.json')

module.exports = {
    commands: ['say'],
    description: 'Make the bot say anything you wish. (Includes blacklisted words)',
    group: 'fun',
    minArgs: 1,
    expectedArgs: '<message>',
    callback: (message, arguments) => {

        let confirm = false

        let i;
        for (i = 0;i < blacklistedWords.length; i++) {
            if (message.content.toLowerCase().includes(blacklistedWords[i].toLowerCase())) {
                confirm = true;
            }

            if (confirm) {
                message.delete()
                return message.channel.send('I cannot send your message as it contains words that are blacklisted!')
            }
        }

        let msg;
        let textChannel = message.mentions.channels.first()
        message.delete()

        if (textChannel) {
            msg = arguments.slice(1).join(" ")
            textChannel.send(msg)
        } else {
            msg = arguments.join(" ")
            message.channel.send(msg)
        }
    }
}