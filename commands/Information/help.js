const { MessageEmbed } = require('discord.js');
const index = require('../../index');
const { MessageButton } = require('discord-buttons');

const command = {
    config: {
        commandName: 'help',
        commandAliases: ['helpme']
    },
    run: async (bot, message, arguments) => {
        const commands = await handler.run()

        let txt_Fun = 'FUN COMMANDS: \n\n';
        let txt_dev = 'DEVELOPER COMMANDS (Hey dev!): \n\n';
        let txt_uti = 'UTILITY COMMANDS: \n\n';
        let txt_mod = 'MODERATION COMMANDS: \n\n'     
        
        for (const command of commands) {
            let permissions = command.permission
            if(permissions) {
                let hasPermission = true
                if(typeof permissions === 'string') {
                    permissions = [permissions]
                }

                for(const permission of permissions) {
                    if(!message.member.hasPermission(permission)) {
                        hasPermission = false
                        break
                    }
                }

                if(!hasPermission) {
                    continue
                }

            }

            if(!command.commands) {
                continue
            }

            const mainCommand = typeof command.commands === 'string' 
            ? command.commands 
            : command.commands[0];


            const args = command.expectedArgs ? ` ${command.expectedArgs}` : ''
            const description = command.description
            ? command.description
            : 'No description'

            let reply = `**${index.prefix}${mainCommand}${args}** - ${description}\n`


            if(command.group) {
                if(command.group === 'fun') {
                    txt_Fun += reply
                } else if (command.group === 'utility') {
                    txt_uti += reply
                } else if (command.group === 'developer') {
                    txt_dev += reply
                } else if (command.group === 'moderation') {
                    txt_mod += reply
                }
            }        

        }

        let init = `HELP PAGE \nWelcome to the HELP page. \n\n If you have any questions about commands, ask a developer. \nADVERTISEMENT: [Our Roblox Group](https://www.roblox.com/groups/10186959)`

        let pages = [init, txt_Fun, txt_uti, txt_mod, txt_dev]
        let titles = ["HELP", 'FUN', "UTILITY", "MODERATION", "DEVELOPER"]
        let page = 1
        let title = 1

        if(message.member.id !== '697864119302225952') {
            pages.pop()
            titles.pop()
        }

        if(!message.member.hasPermission('MANAGE_MESSAGES')) {
            pages.pop()
            titles.pop()
        }

        const helpEmbed = new MessageEmbed()
        .setAuthor(emb.author, emb.img)
        .setTitle(titles[title - 1])
        .setDescription(pages[page - 1])
        .setColor(emb.col.gold)
        .setFooter(`Page ${page} of ${pages.length}`)
        .setThumbnail(emb.img)


        const dbutton = new MessageButton()
        .setStyle('url')
        .setURL('https://www.roblox.com/games/6007705126/Escape-The-Farm-Obby')
        .setLabel(`Our Game (Click me!)`);

        
        message.author.send(helpEmbed, {embed: helpEmbed, button: dbutton}).then(async msg => {
            await msg.react('◀') //⏩⏪
            await msg.react('▶')

            const rightFilter = (reaction, user) => reaction.emoji.name === '▶'
            const leftFilter = (reaction, user) => reaction.emoji.name === '◀'

            const turnRight = msg.createReactionCollector(rightFilter, { time: (1000 * 60 * 5) })
            const turnLeft = msg.createReactionCollector(leftFilter, { time: (1000 * 60 * 5) })

            turnRight.on('collect', r => {
                if (page === pages.length) return;
                page++;
                if (title === pages.length) return;
                title++;
                helpEmbed.setDescription(pages[page-1])
                helpEmbed.setTitle(titles[title-1])
                helpEmbed.setFooter(`Page ${page} of ${pages.length}`)
                msg.edit(helpEmbed)
            })

            turnLeft.on('collect', r => {
                if (page === 1) return;
                page--;
                if (title === 1) return;
                title--;
                helpEmbed.setDescription(pages[page-1])
                helpEmbed.setTitle(titles[title-1])
                helpEmbed.setFooter(`Page ${page} of ${pages.length}`)
                msg.edit(helpEmbed)
            })

            turnRight.on('end', r => {
                if(msg) {
                    msg.reactions.removeALL()
                    msg.delete()
                }
            })

            message.channel.send('**You have mail**')
            message.react('📥')
        })
    },
};

module.exports = command;