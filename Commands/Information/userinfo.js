const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: 'Verified Bot Developer'
};

module.exports = {
            name: 'userinfo',
			aliases: ['user', 'ui'],
			description: 'Displays information about a provided user or the message author.',
			category: 'Information',
			callback: ({ message }) => {

				let target = message.mentions.members.first() || message.author;
				const member = message.mentions.members.last() || message.guild.members.cache.get(target) || message.member;

			const roles = message.member.roles.cache
				.filter(r => r.id !== message.guild.id)
				.map(r => `${r}`)
				.join(" **|** ")

		const userFlags = member.user.flags ? member.user.flags.toArray() : [];
		const embed = new MessageEmbed()
			.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
			.setColor(member.displayHexColor || 'BLUE')
			.addField('User', [
				`**Username:** ${member.user.username}`,
				`**Discriminator:** ${member.user.discriminator}`,
				`**ID:** ${member.id}`,
				`**Flags:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`,
				`**Avatar:** [Link to avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
				`**Time Created:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`,
				`**Status:** ${member.user.presence.status}`,
				`\u200b`
			])
			.addField('Member', [
				`**Highest Role:** ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`,
				`**Server Join Date:** ${moment(member.joinedAt).format('LL LTS')}`,
				`**Hoist Role:** ${member.roles.hoist ? member.roles.hoist.name : 'None'}`,
				`**Roles:** ${roles || 'None'}`,
				`\u200b`
			]);
		return message.channel.send(embed);
	}

};