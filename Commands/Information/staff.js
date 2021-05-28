const { JDS_Color } = require('../../Data/colors.json')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'staff',
    aliases: ['currentstaff', 'jdsstaff'],
    description: 'A list of all of the current Junkyard staff',
    category: 'Help',
    callback: async ({ message }) => {

        const ProjectManagerMembers = message.guild.roles.cache.get('833760959179915285').members.map(m=>m.user).join('\n') || 'No staff members'
        const ManagmentMembers = message.guild.roles.cache.get('826808108286083074').members.map(m=>m.user).join('\n') || 'No staff members'
        const HeadAdvisorMembers = message.guild.roles.cache.get('842787860398735390').members.map(m=>m.user).join('\n') || 'No staff members'
        const GameAdvisoryMembers = message.guild.roles.cache.get('826807080002387988').members.map(m=>m.user).join('\n') || 'No staff members'
        const DevelopmentAdvisoryMembers = message.guild.roles.cache.get('841864525984694322').members.map(m=>m.user).join('\n') || 'No staff members'
        const InternMembers = message.guild.roles.cache.get('826807812666556466').members.map(m=>m.user).join('\n') || 'No staff members'

        const staff = message.guild.roles.cache.find(role => role.name == "Staff");

        const staffEmbed = new MessageEmbed()
        .setTitle('Current Staff of Junkyard')
        .setDescription(`This is a list of all the current staff in Junkyard \n These members are official staff listed with the ${staff} role.`)
        .setColor(JDS_Color)
        .addFields([
            { name: '📋 Project Manager', value: `${ProjectManagerMembers}`, inline: true },
            { name: '⚒️ Management', value: `${ManagmentMembers}`, inline: true },
            { name: '⚔️ Head Advisory', value: `${HeadAdvisorMembers}`, inline: true },
            { name: '🛡️ Game Advisory', value: `${GameAdvisoryMembers}`, inline: true },
            { name: '🔨 Development Advisory', value: `${DevelopmentAdvisoryMembers}`, inline: true },
            { name: '📚 Interns', value: `${InternMembers}`, inline: true },
        ])

        message.channel.send(staffEmbed)
        }
    }