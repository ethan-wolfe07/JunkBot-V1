const { MessageEmbed } = require('discord.js')
const { JDS_Color } = require('../../Data/colors.json')

const JunkyardStudiosLogo = 'https://cdn.discordapp.com/attachments/782634444028772354/826839413153464340/JunkyardStudiosLogo.jpg'

const command = {
    config: {
        commandName: 'help',
        commandAliases: ['helpme']
    },
    run: (bot, message, arguments) => {

        const fs = require('fs')
        let data = new Object();

        if (!arguments[0]) {
            let categories = [];

            fs.readdirSync('./commands/').forEach(dir => {
                const commands = fs.readdirSync(`./commands/Fun/`).filter(file => file.endsWith('.js'));

                const cmds = commands.map(command => {

                    let file = require(`../../commands/Fun/${command}`);

                    if (!file.config.commandName) return 'No command name.';

                    let name = file.config.commandName.replace('.js', '');
                    let aliases = file.config.commandAliases

                    if (!aliases) {
                        return `**Command:** \`${name}\`\n`
                    }

                    return [`**Command:** \`${name}\``, `\n **Aliases: ${aliases}**\n`];
                });

                fs.readdirSync('./commands/').forEach(dir => {
                    const infocommands = fs.readdirSync(`./commands/Information/`).filter(file => file.endsWith('.js'));
    
                    const infocmds = infocommands.map(command => {
    
                        let infofile = require(`../../commands/Information/${command}`);
    
                        if (!infofile.config.commandName) return 'No command name.';
    
                        let infocmdname = infofile.config.commandName.replace('.js', '');
                        let infocmdaliases = infofile.config.commandAliases
    
                        if (!infocmdaliases) {
                            return `**Command:** \`${infocmdname}\`\n`
                        }
    
                        return [`**Command:** \`${infocmdname}\``, `\n **Aliases: ${infocmdaliases}**\n`];
                        
                    });
     
                data = {
                    name: 'Fun',
                    value: cmds.length === 0 ? 'In progress' : cmds.join('\n'),
                    inline: true
                };

                infoData = {
                    name: 'Information',
                    value: infocmds.length === 0 ? 'In progress' : infocmds.join('\n'),
                    inline: true
                }
                categories.push(data)
                })});

        message.author.send({ embeds: [new MessageEmbed()
            .setTitle('Junkyard Discord Bot Help Menu')
            .setDescription('This is the list of all of the commands that the **JunkBot** has to offer')
            .setThumbnail(JunkyardStudiosLogo)
            .setColor(JDS_Color)
            .addFields(data)
            .addFields(infoData)
            .setFooter('For any new command suggestions, please talk to a bot developer')
            .setTimestamp()] 
        })

            const confirmSentEmbed = new MessageEmbed()
            .setTitle(':white_check_mark: Sent the help embed to your DMs')
            .setColor("GREEN")
        message.channel.send({ embeds: [confirmSentEmbed] })

        }
    }
}

module.exports = command;