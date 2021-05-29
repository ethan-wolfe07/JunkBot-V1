const { MessageEmbed } = require('discord.js');
const got = require('got');

module.exports = {
    commands: ['cat', 'catpics', 'cats'],
    description: 'Shows a picture from the r/catpics subreddit',
    group: 'fun',
    permissions: ['SEND_MESSAGES'],
    callback: (message, emb) => {
		const embed = new MessageEmbed()
        got('https://www.reddit.com/r/catpics/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            embed.setURL(`${memeUrl}`)
            embed.setImage(memeImage)
            embed.setColor(emb.col.gold)
		message.channel.send(embed);
		})
	}

};