const { MessageEmbed } = require('discord.js');
const { Gold_Color } = require('../../Data/colors.json')
const got = require('got');

const command = {
        config: {
            commandName: 'cat',
            commandAliases: ['catpics', 'cats']
        },
    run: (bot, message, arguments) => {
		const embed = new MessageEmbed()
        got('https://www.reddit.com/r/catpics/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            embed.setURL(`${memeUrl}`)
            embed.setImage(memeImage)
            embed.setColor(Gold_Color)
		message.channel.send({ embeds: [embed] });
		})
	},
};

module.exports = command;