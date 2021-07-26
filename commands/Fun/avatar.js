const { MessageEmbed } = require('discord.js');
const { Gold_Color } = require('../../Data/colors.json')

const command = {
    config: {
        commandName: 'avatar',
        commandAliases: ['av']
    },
    run: (bot, message, arguments) => {
        const member = message.mentions.users.first() || message.author
        const avatar = member.displayAvatarURL({size: 1024})

        const embed = new MessageEmbed()
        .setTitle(`${member.username}'s avatar`)
        .setImage(avatar)
        .setColor(Gold_Color)

        message.channel.send(embed)
    },
};

module.exports = command;