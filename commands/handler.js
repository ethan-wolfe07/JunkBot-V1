const { MessageEmbed } = require('discord.js');
const devId = '697864119302225952' //EzE E's id

const index = require('../index')


const autoFooter = () => {
    const footers = [
        'JunkBot - Best Discord Bot',
        'JunkBot - Better than Yagpdb',
    ]

    const random = Math.floor(Math.random() * footers.length)

    return footers[random]
}

const autoIcon = (message) => {
    const icons = [
        message.member.user.displayAvatarURL({dynamic: true}),
        'https://cdn.discordapp.com/attachments/825539764819066931/843169015236526130/dark-mode-parrot.gif',
        'https://cdn.discordapp.com/attachments/825539764819066931/843168982130884648/pepe-hype.gif',
        'https://cdn.discordapp.com/attachments/825539764819066931/843168969862676500/record-spin.gif',
        'https://cdn.discordapp.com/attachments/825539764819066931/843168966003785768/poly-sphere.gif',
        'https://cdn.discordapp.com/attachments/825539764819066931/843168977365631026/twitch-100.gif',
        'https://cdn.discordapp.com/attachments/825539764819066931/843169034170007612/close-im-out.gif',
        'https://cdn.discordapp.com/attachments/825539764819066931/843169026338717696/pixel-heart-drain.gif',
        'https://cdn.discordapp.com/attachments/825539764819066931/843168984459116584/kirby.gif',
        'https://cdn.discordapp.com/attachments/825539764819066931/843169023343853588/glow-cube.gif'
    ]

    const random = Math.floor(Math.random() * icons.length)

    return icons[random]
}




const validatePerms = (permissions) => {
    const validPermissions = [
        'ADMINISTRATOR',
        'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'ADMINISTRATOR',
        'MANAGE_CHANNELS',
        'MANAGE_GUILD',
        'ADD_REACTIONS',
        'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER',
        'STREAM',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS',
        'VIEW_GUILD_INSIGHTS',
        'CONNECT',
        'SPEAK',
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
        'MOVE_MEMBERS',
        'USE_VAD',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_ROLES',
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS',
    ]

    for (const permission of permissions) {
        if (!validPermissions.includes(permission)) {
            throw new Error(`Unknown permission node "${permission}`)
        }
    }
}

let recentlyRan = []

module.exports = async (client, commandOptions) => {
    let {
        commands,
        isdev = false,
        group,
        description,
        needRoles = [],
        delmsg = -1,
        cooldown = -1,
        expectedArgs = '',
        permissionError = 'You have no permission to run this command.',
        minArgs = 0,
        maxArgs = null,
        permissions = [],
        requiredRoles = [],
        callback
    } = commandOptions

    if (typeof commands === 'string') {
        commands = [commands]
    }

    if (!commands) {
        return
    }

    await console.log(`=> "${commands[0]}" command now active!`)

    if (!description) {
        description = 'No Description'
    }

    if(needRoles.length) {
        if(typeof needRoles === 'string') {
            needRoles = [needRoles]
        }
        validatePerms(needRoles)
    }

    //good Perms in command
    if (permissions.length) {
        if (typeof permissions === 'string') {
            permissions = [permissions]
        }

        validatePerms(permissions)
    }

    client.on('message', async message => {
        const { member, content, guild, user } = message

        const starter = message.content + ' '

        /* Embeds for the any purpose */

        const cooldownEmbed = new MessageEmbed()
            .setDescription(`Woah, slow it down ${message.author}! You need to wait ${cooldown} seconds before using this command again!`)
            .setColor('#FF0R00')
            .setTimestamp();


        /* ----------------------------------------------------------------------------------------------------------------------- */

        for (const alias of commands) {
            if (starter.toLowerCase().startsWith(`${index.prefix}${alias.toLowerCase()} `)) {
                if (!commands.includes(alias)) {
                    message.reply(`That is not a valid command!`)
                    message.delete()
                    return
                }
                //Ensure required Perms
                for (const permission of permissions) {
                    if (!member.hasPermission(permission)) {
                        message.reply(permissionError)
                        return
                    }
                }

                //Ensure required Roles
                for (const requiredRole of requiredRoles) {
                    const role = guild.roles.cache.find(role => role.name === requiredRole)

                    if (!role || !member.roles.cache.has(role.id)) {
                        message.reply(`You must have the required Role "${requiredRole}" to use
                        this command.`)
                        return
                    }
                }

                for (const permission of needRoles) {
                    if(!guild.me.hasPermission(permission)) {
                        message.channel.send(`I do not have the required role to run!`)
                        return
                    }
                }




                const args = content.split(/[ ]+/)

                //Removing the first index
                args.shift()



                //Ensure we have correct number of args
                if (args.length < minArgs || (
                    maxArgs !== null && args.length > maxArgs
                )) {
                    message.reply(`Incorrect syntax! Use ${index.prefix}${alias} ${expectedArgs}`)
                    return
                }

                // adding array
                //Cooldown
                let cooldownString = `${member.id}-${commands[0]}`
                if (cooldown > 0 && recentlyRan.includes(cooldownString)) {
                    message.reply(cooldownEmbed)
                    return
                }

                if (cooldown > 0) {
                    recentlyRan.push(cooldownString)

                    setTimeout(() => {
                        recentlyRan = recentlyRan.filter((string) => {
                            return string !== cooldownString
                        })
                    }, 1000 * cooldown)
                }

                let color = '#96f1ff'

                //delete a message
                if (delmsg > 0) {
                    message.delete({
                        timeout: delmsg * 1000
                    })
                }

                if (delmsg === 0) {
                    message.delete()
                }

                if (isdev == true) {
                    if (message.author.id !== devId) {
                        message.delete()
                        return
                    }
                }

                const footer = await autoFooter();
                const icon = await autoIcon(message);


                const mainFooter = {
                    author: message.author.username, // The message Author
                    img: message.member.user.displayAvatarURL({dynamic: true}), // The message author's pfp
                    footer: footer, // AutoFooter function - Random messages as footers, or text
                    icon: icon, // AutoIcon function - Random Icons as footer icons, or pics
                    col: {
                        gold: "#ffd700",
                        JDS: "#a04b00",
                    }, //Color - For the embed
                }

                //Run the code
                callback(client, message, args, mainFooter)
                // .catch(e => {
                //     message.channel.send(`There was a problem! Check if I have permission to use this command, or this may be a bug.`)
                //     console.log(e.message)
                // })


                return
            }
        }
    })


}

/*

COPY THIS TO MAKE A NEW COMMAND!

module.exports = {
    commands: [''],
    description: '',
    minArgs: 0,
    maxArgs: 0,
    callback: (client, message, arguments, emb) => {

    },
}




expectedArgs: '',
permissionError: '',
permissions: [],
requiredRoles: [],



*/