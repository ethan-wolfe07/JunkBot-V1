const giveMeAJoke = require('discord-jokes')

module.exports = {
    commands: ['dadjoke', 'dj'],
    description: 'Tells you a random joke!',
    group: 'fun',
    callback: (client, message, arguments, emb) => {

        giveMeAJoke.getRandomDadJoke(function(joke) {
            message.channel.send(joke)
        })
    }
}