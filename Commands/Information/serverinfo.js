const { JDS_Color } = require('../../Data/colors.json')
const { MessageEmbed } = require('discord.js')
const { JunkyardStudiosLogo } = require('../../Data/images.json')

module.exports = {
    name: 'serverinfo',
    aliases: ['server'],
    description: 'Info about our server!',
    category: 'Information',
    callback: async ({ message }) => {
        
        const botCount = message.guild.members.cache.filter(mem => mem.user.bot === true).size

        let region;
        switch (message.guild.region) {
            case "europe":
                region = '🇪🇺 Europe';
                break;
            case "us-east":
                region = '🇺🇸 us-east'
                break;
            case "us-west":
                region = '🇺🇸 us-west';
                break;
            case "us-south":
                region = '🇺🇸 us-south'
                break;
            case "us-central":
                region = '🇺🇸 us-central'
                break;
		}

        const roles = message.guild.roles.cache
				.filter(r => r.id !== message.guild.id)
				.map(r => `${r}`)
				.join(" ")
                .replace('@everyone', ' ')

        const serverInfoEmbed = new MessageEmbed()
        .setTitle('Server info for the Junkyard Discord')
        .setDescription('Here is a little info about our Junkyard Server')
        .setColor(JDS_Color)
        .addFields([
            { name: 'Server Owner', value: `The owner of this server is ${message.guild.owner.user.tag}.`, inline: true },
            { name: 'Member Count', value: `There are a total of ${message.guild.memberCount} members!`, inline: true },
            { name: 'Members Online', value: `${message.guild.members.cache.filter(m => m.user.presence.status == "online").size} members`, inline: true },
            { name: 'Bot Count', value: `There are ${botCount} bots.`, inline: true },
            { name: 'Region', value: `${region}`, inline: true },
            { name: '\u200b', value: '\u200b', inline: true},
            { name: `Role count [${message.guild.roles.cache.size - 1}]`, value: roles, inline: true }
        ])
        .setThumbnail(JunkyardStudiosLogo)
        .setTimestamp()
    message.channel.send(serverInfoEmbed)
    }
}