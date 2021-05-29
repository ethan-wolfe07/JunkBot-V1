const { MessageEmbed } = require('discord.js');

module.exports = {
    commands: ["avatar", "av"],
    description: "Displays a user's avatar",
    group: 'fun',
    minArgs: 0,
    maxArgs: 1,
    callback: (client, message, arguments, emb) => {
        const member = message.mentions.users.first() || message.author
        const avatar = member.displayAvatarURL({size: 1024})

        const embed = new MessageEmbed()
        .setTitle(`${member.username}'s avatar`)
        .setImage(avatar)
        .setColor(emb.col.gold)

        message.channel.send(embed)
	}
}