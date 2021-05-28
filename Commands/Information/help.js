const Discord = require('discord.js')
const fs = require('fs');
const { JDS_Color } = require('../../Data/colors.json')

module.exports = {
    name: 'help',
    aliases: ['h'],
    description: 'A list of all of the commands for the bot',
    category: 'Help',
    callback: async ({ args, client, message, prefix }) => {

        if (!args[0]) {
            let categories = [];

            fs.readdirSync('./Commands/').forEach(dir => {
                const commands = fs.readdirSync(`./Commands/${dir}/`).filter(file => file.endsWith('.js'));

                const cmds = commands.map(command => {
                    let file = require(`../../Commands/${dir}/${command}`);

                    if (!file.name) return 'No command name.';

                    let name = file.name.replace('.js', '');

                    return `\`${name}\``;
                });

                let data = new Object();

                data = {
                    name: dir.toUpperCase(),
                    value: cmds.length === 0 ? 'In progress' : cmds.join(', '),
                };
                categories.push(data)
            });

            const helpEmbed = new Discord.MessageEmbed()
            .setTitle('Help Menu')
            .addFields(categories)
            .setDescription(`Here is the help menu for this bot. \n Prefix is \`${prefix}\``)
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setColor(JDS_Color)
            .setTimestamp()
        return message.channel.send(helpEmbed)

        }
    }
}