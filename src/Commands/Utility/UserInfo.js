const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'userinfo',
	description: 'Displays various information about user',
	options: [
		{
			name: 'user',
			description: 'Mention user.',
			required: false,
			type: 'USER'
		}
	],
	category: 'Utility',
	async run({ interaction, bot, guild }) {
		const user = interaction.options.getMember('user') || interaction.member;
		await user.user.fetch(true);
		const filter = { owner: guild.ownerId === user.id };

		var flags = {
			'': 'None',
			DISCORD_EMPLOYEE: 'Discord Employee',
			DISCORD_PARTNER: 'Discord Partner',
			BUGHUNTER_LEVEL_1: 'Bug Hunter ( Level 1 )',
			BUGHUNTER_LEVEL_2: 'Bug Hunter ( Level 2 )',
			HYPESQUAD_EVENTS: 'Hypesquad Events',
			HOUSE_BRILLIANCE: `HypeSquad Brilliance`,
			HOUSE_BRAVERY: `HypeSquad Bravery`,
			HOUSE_BALANCE: `HypeSquad Balance`,
			EARLY_SUPPORTER: 'Early Supporter',
			TEAM_USER: 'Team User',
			VERIFIED_BOT: 'Verified Bot',
			VERIFIED_DEVELOPER: 'Verified Bot Developer',
			DISCORD_NITRO: 'Discord Nitro'
		};
		const Flags = flags[user.user.flags.toArray().join(', ')];
		if (user.avatar && user.avatar.startsWith('a_')) Flags.push(Badges['DISCORD_NITRO']);

		let acknowledgement;
		if (filter.owner) acknowledgement = 'Guild Owner';
		if (user.permissions.has('ADMINISTRATOR') && !filter.owner) acknowledgement = 'Administrator';
		if (
			user.permissions.has(['MANAGE_ROLES', 'MANAGE_MESSAGES']) &&
			!user.permissions.has('ADMINISTRATOR') &&
			!filter.owner
		)
			acknowledgement = 'Moderator';
		if (
			user.permissions.has(['SEND_MESSAGES']) &&
			!user.permissions.has(['MANAGE_ROLES', 'MANAGE_MESSAGES']) &&
			!filter.owner
		)
			acknowledgement = 'Member';

		const embed = new MessageEmbed()
			.setColor('BLURPLE')
			.setAuthor({
				name: user.user.tag,
				iconURL: user.displayAvatarURL() || 'https://i.pinimg.com/736x/35/79/3b/35793b67607923a68d813a72185284fe.jpg'
			})
			.setThumbnail(
				user.displayAvatarURL() || 'https://i.pinimg.com/736x/35/79/3b/35793b67607923a68d813a72185284fe.jpg'
			)
			.addField('Account Creation', `<t:${Math.round(user.user.createdTimestamp / 1000)}:f>`, false)
			.addField('Badges', `${Flags}`, false)
			.setFooter({
				text: `User ID: ${user.id}`
			});
		if (acknowledgement.length > 0) embed.addField('Acknowledgment', `${acknowledgement}`, false);

		await interaction.reply({
			embeds: [embed]
		});
	}
};
