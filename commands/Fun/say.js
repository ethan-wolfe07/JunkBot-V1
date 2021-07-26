const { blacklistedWords } = require('../../Data/blacklisted-words.json')

const command = {
    config: {
        commandName: 'say'
    },
    run: (bot, message, arguments) => {

        for(const c in blacklistedWords) {
            if(arguments[0].toLowerCase().includes(blacklistedWords[c])) {
                return message.channel.send('I cannot send your message as it contains words that are blacklisted!')
            }
        }

        let msg = arguments.slice(arguments[0]).join(" ") // Putting it into one variable since they will always have at least one word
        message.channel.send(msg) // Sending it to the same channel they are in. Change the way it works if you want.
    },
};

module.exports = command;