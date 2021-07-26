const giveMeAJoke = require('discord-jokes')

const command = {
    config: {
        commandName: 'joke',
        commandAliases: ['dadjoke', 'dj']
    },
    run: (bot, message, arguments) => {

        giveMeAJoke.getRandomDadJoke(function(joke) {
            message.channel.send(joke)
        })
    },
};

module.exports = command;