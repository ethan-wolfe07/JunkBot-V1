const Discord = require('discord.js')
const { JunkyardStudiosLogo } = require('../../Data/images.json')

module.exports = {
    commands: 'invite',
    description: 'An invite to our discord and group. As well as some other group information',
    group: 'utiliy',
    callback: (client, message, arguments, emb) => {

        const discordInvite = '[Discord invite for friends](https://discord.gg/jKdC4sSWZh)'
        const robloxGroupInvite = '[Roblox invite for exclusive benefits in our games](https://www.roblox.com/groups/10186959)'

        const ETFO = '[Escape The Farm  Obby](https://www.roblox.com/games/6007705126/Escape-The-Farm-Obby)'

        const inviteEmbed = new Discord.MessageEmbed()
        .setTitle('📋 Junkyard Invite List!')
        .setDescription('Junkyard is a great place to hang out and socialize. We offer great games as well as a nice and actie community. \n\n We have friendly staff who will help with anything you need! (To access the complete staff list, use `junkstaff` in <#788948377458442273>)')
        .setColor(emb.col.gold)
        .addField('Community Invite Links', [
            discordInvite,
            robloxGroupInvite
        ])
        .addField('Our Games', [
            ETFO
        ])
        .setThumbnail(JunkyardStudiosLogo)
    message.channel.send(inviteEmbed)
    }
}